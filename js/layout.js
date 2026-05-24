function renderHeader(opts = {}) {
  const root = opts.root || '';
  return `
<header class="header">
  <div class="header-top">
    <div class="header-top-inner">
      <span class="header-top-item">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        г. Белгород, ул. Щорса, 8Д, 1 эт.
      </span>
      <span class="header-top-item">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.7a16 16 0 0 0 6.29 6.29l.97-1.06a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        +7 (3534) 23-52-37
      </span>
      <a href="https://t.me/manager_3dxob" target="_blank" rel="noopener" class="header-top-item header-top-link">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/></svg>
        Telegram
      </a>
    </div>
  </div>
  <div class="header-main">
    <button class="burger" id="burger-btn" aria-label="Меню">
      <span></span><span></span><span></span>
    </button>
    <a href="${root}index.html" class="logo">3D<span>xob</span></a>
    <div class="search-wrap">
      <input type="text" id="header-search" placeholder="Поиск 3D принтеров..." value="${opts.query || ''}">
      <button onclick="document.getElementById('header-search').dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true}))" aria-label="Поиск">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
      </button>
    </div>
    <button class="mobile-search-btn" id="mobile-search-btn" aria-label="Поиск">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
    </button>
    <div class="header-actions">
      <a href="${root}pages/favorites.html" class="header-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        <span class="badge fav-badge" style="display:none">0</span>
        <span class="btn-label">Избранное</span>
      </a>
      <a href="${root}pages/cart.html" class="header-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
        <span class="badge cart-badge" style="display:none">0</span>
        <span class="btn-label">Корзина</span>
      </a>
    </div>
  </div>
  <div class="mobile-search-bar" id="mobile-search-bar">
    <input type="text" id="mobile-search-input" placeholder="Поиск 3D принтеров...">
    <button id="mobile-search-go">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
    </button>
  </div>
</header>
<nav class="nav" id="main-nav">
  <div class="nav-inner">
    <a href="${root}index.html" class="nav-link${opts.page==='home'?' active':''}">Главная</a>
    <a href="${root}index.html?cat=3D+принтеры+персональные" class="nav-link${opts.page==='printers'?' active':''}">3D Принтеры</a>
    <a href="${root}index.html?cat=Для+3D+принтеров" class="nav-link${opts.page==='accessories'?' active':''}">Расходники</a>
    <a href="${root}pages/delivery.html" class="nav-link${opts.page==='delivery'?' active':''}">Доставка и оплата</a>
    <a href="${root}pages/reviews.html" class="nav-link${opts.page==='reviews'?' active':''}">Отзывы</a>
    <a href="${root}pages/about.html" class="nav-link${opts.page==='about'?' active':''}">О магазине</a>
    <a href="${root}pages/contacts.html" class="nav-link${opts.page==='contacts'?' active':''}">Контакты</a>
  </div>
</nav>`;
}

function renderFooter(opts = {}) {
  const root = opts.root || '';
  return `
<footer class="footer">
  <div class="footer-main">
    <div class="footer-brand">
      <div class="logo" style="color:#4ade80;margin-bottom:12px;font-size:20px">3D<span style="color:#9ca3af">xob</span></div>
      <p>Магазин 3D принтеров в Белгороде. Работаем с 2020 года. Доставка по всей России.</p>
      <div style="margin-top:16px;display:flex;gap:10px">
        <a href="https://t.me/manager_3dxob" target="_blank" rel="noopener" aria-label="Telegram" style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#29b6f6;border-radius:8px;color:#fff">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/></svg>
        </a>
        <a href="https://max.ru/u/f9LHodD0cOLbPms83NhpLUuBMuNHSX0ACmj8j15deTMlhrJ55qC9Y1KHtdQ" target="_blank" rel="noopener" aria-label="MAX" style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#1a1a1a;border-radius:8px;color:#fff">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3 4h4l5 7 5-7h4v16h-4V11l-5 7-5-7v9H3V4z"/></svg>
        </a>
      </div>
    </div>
    <div class="footer-col">
      <h4>Каталог</h4>
      <ul>
        <li><a href="${root}index.html?cat=3D+принтеры+персональные">3D Принтеры</a></li>
        <li><a href="${root}index.html?cat=Для+3D+принтеров">Расходники</a></li>
        <li><a href="${root}index.html?sort=discount">Акции</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Информация</h4>
      <ul>
        <li><a href="${root}pages/about.html">О магазине</a></li>
        <li><a href="${root}pages/delivery.html">Доставка и оплата</a></li>
        <li><a href="${root}pages/offer.html">Публичная оферта</a></li>
        <li><a href="${root}pages/privacy.html">Конфиденциальность</a></li>
        <li><a href="${root}pages/contacts.html">Контакты</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Контакты</h4>
      <ul style="gap:10px">
        <li style="display:flex;align-items:flex-start;gap:8px">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0;margin-top:2px;color:#4ade80"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.7a16 16 0 0 0 6.29 6.29l.97-1.06a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          +7 (3534) 23-52-37
        </li>
        <li style="display:flex;align-items:flex-start;gap:8px">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0;margin-top:2px;color:#4ade80"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          info@3dxob.ru
        </li>
        <li style="display:flex;align-items:flex-start;gap:8px">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0;margin-top:2px;color:#4ade80"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          Белгород, ул. Щорса, 8Д, 1 эт.
        </li>
        <li style="display:flex;align-items:flex-start;gap:8px">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style="flex-shrink:0;margin-top:2px;color:#29b6f6"><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/></svg>
          <a href="https://t.me/manager_3dxob" target="_blank" rel="noopener">Telegram: @manager_3dxob</a>
        </li>
        <li style="display:flex;align-items:flex-start;gap:8px">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style="flex-shrink:0;margin-top:2px;color:#1a1a1a"><path d="M3 4h4l5 7 5-7h4v16h-4V11l-5 7-5-7v9H3V4z"/></svg>
          <a href="https://max.ru/u/f9LHodD0cOLbPms83NhpLUuBMuNHSX0ACmj8j15deTMlhrJ55qC9Y1KHtdQ" target="_blank" rel="noopener">Написать в MAX</a>
        </li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="footer-bottom-inner">
      <span>© 2026 3Dxob · ИП Гагаркина И.Ю. · ОГРНИП: 306560312300060 · ИНН: 560305731536</span>
      <span style="display:flex;gap:16px;flex-wrap:wrap">
        <a href="${root}pages/offer.html">Публичная оферта</a>
        <a href="${root}pages/privacy.html">Политика конфиденциальности</a>
      </span>
    </div>
  </div>
</footer>

<button class="back-to-top" id="back-to-top" aria-label="Наверх">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"/></svg>
</button>

<div id="toast" class="toast"></div>`;
}

// Инициализация интерактивности шапки/футера.
// Должна вызываться ПОСЛЕ вставки renderHeader/renderFooter в DOM.
// Скрипты, вставленные через innerHTML, не выполняются, поэтому
// логику нельзя класть внутрь шаблонной строки.
function initLayout(rootPath) {
  if (window.__layoutInited) return; // защита от двойной инициализации
  window.__layoutInited = true;
  rootPath = rootPath || '';

  // --- Бургер-меню ---
  var burger = document.getElementById('burger-btn');
  var nav = document.getElementById('main-nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      burger.classList.toggle('open');
      nav.classList.toggle('open');
    });
  }

  // --- Мобильный поиск ---
  var msBtn = document.getElementById('mobile-search-btn');
  var msBar = document.getElementById('mobile-search-bar');
  var msInput = document.getElementById('mobile-search-input');
  var msGo = document.getElementById('mobile-search-go');

  if (msBtn && msBar) {
    msBtn.addEventListener('click', function () {
      msBar.classList.toggle('open');
      if (msBar.classList.contains('open') && msInput) msInput.focus();
    });
  }

  function doMobileSearch() {
    if (msInput && msInput.value.trim()) {
      window.location.href = rootPath + 'index.html?q=' + encodeURIComponent(msInput.value.trim());
    }
  }
  if (msGo) msGo.addEventListener('click', doMobileSearch);
  if (msInput) msInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') doMobileSearch();
  });

  // Если пользователь уже на странице с поиском — подставим текст в инпут
  var urlQ = new URLSearchParams(location.search).get('q');
  if (urlQ && msInput) msInput.value = urlQ;

  // --- Поиск в десктопной шапке (#header-search) ---
  // Раньше initSearch вызывался отдельно из каждой страницы — теперь делаем
  // здесь централизованно, чтобы поиск работал гарантированно.
  var hSearch = document.getElementById('header-search');
  if (hSearch) {
    if (urlQ) hSearch.value = urlQ;
    hSearch.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && hSearch.value.trim()) {
        window.location.href = rootPath + 'index.html?q=' + encodeURIComponent(hSearch.value.trim());
      }
    });
  }

  // --- Кнопка "Наверх" ---
  var backTop = document.getElementById('back-to-top');
  if (backTop) {
    window.addEventListener('scroll', function () {
      backTop.classList.toggle('visible', window.scrollY > 400);
    });
    backTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// Авто-инициализация: если страница забыла вызвать initLayout вручную —
// мы сами поймаем момент, когда шапка появится в DOM, и навесим обработчики.
// Это нужно для обратной совместимости со страницами, где раньше работал
// inline <script> внутри HTML-шаблона.
(function autoInitLayout() {
  var initialized = false;
  function tryInit() {
    if (initialized) return;
    if (document.getElementById('header-search') ||
        document.getElementById('burger-btn') ||
        document.getElementById('mobile-search-btn')) {
      initialized = true;
      // Определяем rootPath по расположению страницы:
      // если мы в /pages/* — то корень это '../', иначе ''
      var rootPath = location.pathname.indexOf('/pages/') !== -1 ? '../' : '';
      initLayout(rootPath);
    }
  }
  // 1) Если шапка уже в DOM (вставлена синхронно скриптом до layout.js загрузился) — стартуем сразу
  if (document.readyState !== 'loading') {
    setTimeout(tryInit, 0);
  } else {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(tryInit, 0); });
  }
  // 2) Подстрахуемся MutationObserver-ом — на случай, если шапка вставится позже
  if (typeof MutationObserver !== 'undefined') {
    var obs = new MutationObserver(function () {
      tryInit();
      if (initialized) obs.disconnect();
    });
    if (document.body) {
      obs.observe(document.body, { childList: true, subtree: true });
    } else {
      document.addEventListener('DOMContentLoaded', function () {
        obs.observe(document.body, { childList: true, subtree: true });
      });
    }
  }
})();
