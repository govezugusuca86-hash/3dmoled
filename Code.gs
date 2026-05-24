/* ============================================================
   3Dxob — Google Apps Script бэкенд для приёма заказов
   Привязывается к Google-таблице через Extensions → Apps Script.
   Деплоится как Web App с правами "Execute as: Me, Who has access: Anyone".
   ============================================================ */

// ---------- НАСТРОЙКИ ----------
var ORDER_PREFIX = '3DX-';

// Telegram-уведомления (опционально, можно оставить пустыми).
// Получить токен: @BotFather → /newbot
// Узнать chat_id: @userinfobot → /start
// ВАЖНО: после получения токена напишите боту /start, иначе он не сможет вам отвечать.
var TELEGRAM_BOT_TOKEN = ''; // например '7123456789:AAH...'
var TELEGRAM_CHAT_ID   = ''; // например '123456789'

// Защита от спама
var MAX_ORDERS_PER_UA_PER_HOUR = 10;
var MAX_ORDERS_PER_DAY = 200;
var DEDUP_WINDOW_SEC = 60;

// Название листа для заказов
var SHEET_NAME = 'Заказы';

// ---------- ВХОДНАЯ ТОЧКА ----------
function doPost(e) {
  try {
    var payload;
    try {
      payload = JSON.parse(e.postData.contents);
    } catch (err) {
      return jsonResponse({ ok: false, error: 'bad_json' });
    }

    // 1. Honeypot — если бот заполнил скрытое поле, тихо игнорируем
    if (payload.website && String(payload.website).trim() !== '') {
      return jsonResponse({ ok: true, orderNumber: ORDER_PREFIX + '0000' }); // фейковый ответ
    }

    // 2. Валидация
    if (!payload.items || !Array.isArray(payload.items) || payload.items.length === 0) {
      return jsonResponse({ ok: false, error: 'empty_cart' });
    }

    // 3. Rate limit по User-Agent
    var ua = String(payload.userAgent || '').slice(0, 200);
    if (!checkRateLimit(ua)) {
      return jsonResponse({ ok: false, error: 'rate_limit' });
    }

    // 4. Суточный лимит
    if (!checkDailyLimit()) {
      return jsonResponse({ ok: false, error: 'daily_limit' });
    }

    // 5. Дедупликация (одинаковый заказ за DEDUP_WINDOW_SEC сек)
    var dedupKey = makeDedupKey(payload);
    var lastOrderNum = checkDedup(dedupKey);
    if (lastOrderNum) {
      return jsonResponse({ ok: true, orderNumber: lastOrderNum, deduped: true });
    }

    // 6. Генерация номера заказа
    var orderNumber = nextOrderNumber();

    // 7. Запись в Google Sheets
    writeOrderToSheet(orderNumber, payload);

    // 8. Telegram-уведомление (best-effort, не блокирует)
    try { sendTelegramNotification(orderNumber, payload); } catch (tgErr) { /* ignore */ }

    // 9. Сохраняем dedup-ключ
    saveDedup(dedupKey, orderNumber);

    return jsonResponse({ ok: true, orderNumber: orderNumber });

  } catch (err) {
    return jsonResponse({ ok: false, error: 'internal_error', detail: String(err) });
  }
}

// GET — для проверки, что веб-приложение работает
function doGet(e) {
  return jsonResponse({ ok: true, status: 'alive', service: '3Dxob orders' });
}

// ---------- ЗАПИСЬ В ТАБЛИЦУ ----------
function writeOrderToSheet(orderNumber, payload) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow([
      'Номер заказа', 'Дата', 'Статус', 'ФИ', 'Контакт', 'Email',
      'Доставка', 'Товары', 'Кол-во', 'Сумма', 'Комментарий',
      'User-Agent', 'Referer'
    ]);
    sheet.getRange(1, 1, 1, 13).setFontWeight('bold').setBackground('#16a34a').setFontColor('#fff');
    sheet.setFrozenRows(1);
  }

  var items = payload.items || [];
  var totalQty = items.reduce(function (s, i) { return s + (parseInt(i.qty, 10) || 0); }, 0);
  var itemsStr = items.map(function (i) {
    return '• ' + i.name + ' × ' + i.qty + ' = ' + (i.price * i.qty).toLocaleString('ru-RU') + ' ₽';
  }).join('\n');

  var status = payload.anonymous ? '⏳ Ждём сообщения' : '🆕 Новый';
  var delivery = payload.anonymous ? 'Уточняется в чате' : (payload.delivery || '');

  sheet.appendRow([
    orderNumber,
    new Date(),
    status,
    payload.fullName || '—',
    payload.contact || '—',
    payload.email || '—',
    delivery,
    itemsStr,
    totalQty,
    payload.total || 0,
    payload.comment || '',
    payload.userAgent || '',
    payload.referer || ''
  ]);
}

// ---------- НОМЕР ЗАКАЗА ----------
function nextOrderNumber() {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var props = PropertiesService.getScriptProperties();
    var current = parseInt(props.getProperty('lastOrderNumber') || '986', 10);
    if (isNaN(current)) current = 986;
    current += 1;
    props.setProperty('lastOrderNumber', String(current));
    return ORDER_PREFIX + padLeft(String(current), 4, '0');
  } finally {
    lock.releaseLock();
  }
}

function padLeft(s, len, ch) {
  while (s.length < len) s = ch + s;
  return s;
}

// ---------- RATE LIMIT / DAILY LIMIT / DEDUP ----------
function checkRateLimit(ua) {
  if (!ua) return true; // если UA пустой — пропускаем
  var cache = CacheService.getScriptCache();
  var key = 'rl_' + Utilities.base64Encode(ua).slice(0, 80);
  var count = parseInt(cache.get(key) || '0', 10);
  if (count >= MAX_ORDERS_PER_UA_PER_HOUR) return false;
  cache.put(key, String(count + 1), 3600);
  return true;
}

function checkDailyLimit() {
  var cache = CacheService.getScriptCache();
  var key = 'daily_' + new Date().toISOString().slice(0, 10);
  var count = parseInt(cache.get(key) || '0', 10);
  if (count >= MAX_ORDERS_PER_DAY) return false;
  cache.put(key, String(count + 1), 86400);
  return true;
}

function makeDedupKey(payload) {
  var items = (payload.items || []).map(function (i) { return i.id + ':' + i.qty; }).join('|');
  var raw = items + '|' + (payload.total || 0) + '|' + (payload.userAgent || '');
  return 'dd_' + Utilities.base64Encode(Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, raw)).slice(0, 24);
}
function checkDedup(key) {
  return CacheService.getScriptCache().get(key);
}
function saveDedup(key, orderNumber) {
  CacheService.getScriptCache().put(key, orderNumber, DEDUP_WINDOW_SEC);
}

// ---------- TELEGRAM ----------
function sendTelegramNotification(orderNumber, payload) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return;

  var items = payload.items || [];
  var totalQty = items.reduce(function (s, i) { return s + (parseInt(i.qty, 10) || 0); }, 0);
  var itemsStr = items.map(function (i) {
    return '• ' + i.name + ' × ' + i.qty + ' = ' + (i.price * i.qty).toLocaleString('ru-RU') + ' ₽';
  }).join('\n');

  var statusLine = payload.anonymous
    ? '⏳ Ждём сообщения от клиента\nКонтакты не оставлены — клиент должен написать сам.'
    : '🆕 Новый заказ';

  var text = '🛒 НОВЫЙ ЗАКАЗ ' + orderNumber + '\n' +
    '━━━━━━━━━━━━━━━━━━━━\n' +
    statusLine + '\n\n' +
    '📦 Состав (' + totalQty + ' шт.):\n' +
    itemsStr + '\n\n' +
    '💰 Итого: ' + (payload.total || 0).toLocaleString('ru-RU') + ' ₽';

  var url = 'https://api.telegram.org/bot' + TELEGRAM_BOT_TOKEN + '/sendMessage';
  UrlFetchApp.fetch(url, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: text,
      disable_web_page_preview: true
    }),
    muteHttpExceptions: true
  });
}

// Тест Telegram-уведомления — выберите эту функцию в редакторе и нажмите Run
function testTelegram() {
  sendTelegramNotification('3DX-TEST', {
    anonymous: true,
    items: [
      { id: 'test1', name: 'Тестовый принтер', qty: 1, price: 50000 },
      { id: 'test2', name: 'Катушка PLA', qty: 2, price: 990 }
    ],
    total: 51980
  });
}

// ---------- УТИЛИТЫ ----------
function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
