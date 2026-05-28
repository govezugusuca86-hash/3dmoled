// ============================================================
//                       3Dxob — app.js
// Корзина, избранное, виджет мессенджеров, отправка заказов.
// ============================================================

// ===== КОНФИГ =====
// URL веб-приложения Google Apps Script (см. SETUP_GUIDE.md).
// Если пусто или сервер недоступен — заказ оформится в офлайн-режиме
// с локальным номером и пометкой isPending.
window.ORDER_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbx7YM0QEcPn__H6bL8RZiLW5PQ215RS0PljmniBxTXSJQRZ_Eg9WWtRiZsf-gLdczBMng/exec';

// Контакты менеджера для виджета и success-страницы.
window.TG_URL  = 'https://t.me/manager_3dxob';
window.MAX_URL = 'https://max.ru/u/f9LHodD0cOLbPms83NhpLUuBMuNHSX0ACmj8j15deTMlhrJ55qC9Y1KHtdQ';

// Префикс номера заказа и стартовое значение для офлайн-fallback.
const ORDER_PREFIX = '3DX-';
const ORDER_START  = 986; // первый офлайн-заказ будет 3DX-0987

// ===== CART =====
const Cart = {
  get() { try { return JSON.parse(localStorage.getItem('cart') || '[]'); } catch { return []; } },
  save(items) { localStorage.setItem('cart', JSON.stringify(items)); Cart.updateBadge(); },
  add(id, qty = 1) {
    const items = Cart.get();
    const idx = items.findIndex(i => i.id === id);
    if (idx >= 0) items[idx].qty += qty; else items.push({ id, qty });
    Cart.save(items);
    showToast('Товар добавлен в корзину');
  },
  remove(id) { Cart.save(Cart.get().filter(i => i.id !== id)); },
  setQty(id, qty) {
    const items = Cart.get();
    const idx = items.findIndex(i => i.id === id);
    if (idx >= 0) { if (qty <= 0) items.splice(idx, 1); else items[idx].qty = qty; }
    Cart.save(items);
  },
  count() { return Cart.get().reduce((s, i) => s + i.qty, 0); },
  total(prods) {
    return Cart.get().reduce((s, ci) => {
      const p = prods.find(p => p.id === ci.id);
      return s + (p ? p.price * ci.qty : 0);
    }, 0);
  },
  clear() { localStorage.removeItem('cart'); Cart.updateBadge(); },
  updateBadge() {
    const c = Cart.count();
    document.querySelectorAll('.cart-badge').forEach(el => {
      el.textContent = c;
      el.style.display = c > 0 ? 'flex' : 'none';
    });
  },

  // Собирает данные о текущей корзине для отправки на сервер.
  // Использует глобальный массив `products` (из products.js).
  getOrderSummary() {
    const list = (typeof products !== 'undefined' && products) ? products : [];
    const items = Cart.get().map(ci => {
      const p = list.find(p => p.id === ci.id) || {};
      return {
        id: ci.id,
        name: p.name || ci.id,
        brand: p.brand || '',
        price: p.price || 0,
        qty: ci.qty,
        picture: (p.photos && p.photos[0]) || ''
      };
    });
    const total = items.reduce((s, i) => s + i.price * i.qty, 0);
    return { items, total };
  },

  // Отправка заказа на Google Apps Script webhook.
  // Возвращает Promise<{ orderNumber, isPending, items, total, createdAt }>.
  async submitOrder(extra) {
    const summary = Cart.getOrderSummary();
    const payload = Object.assign({
      anonymous: true,
      fullName: '',
      contact: '',
      email: '',
      website: '', // honeypot — должно остаться пустым
      items: summary.items,
      total: summary.total,
      userAgent: navigator.userAgent,
      referer: document.referrer || '',
      createdAt: new Date().toISOString()
    }, extra || {});

    const url = window.ORDER_WEBHOOK_URL;
    const looksConfigured = url && url.indexOf('PASTE_DEPLOY_ID_HERE') === -1;

    if (looksConfigured) {
      try {
        const resp = await fetch(url, {
          method: 'POST',
          // Используем text/plain, чтобы избежать CORS preflight.
          // Apps Script всё равно прочитает тело через e.postData.contents.
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload),
          redirect: 'follow'
        });
        const data = await resp.json();
        if (data && data.ok && data.orderNumber) {
          return {
            orderNumber: data.orderNumber,
            isPending: false,
            items: summary.items,
            total: summary.total,
            createdAt: payload.createdAt
          };
        }
        throw new Error((data && data.error) || 'server_error');
      } catch (err) {
        console.warn('[Cart.submitOrder] webhook failed, using fallback:', err);
      }
    }

    // Fallback — локальный номер заказа
    return {
      orderNumber: nextLocalNumber(),
      isPending: true,
      items: summary.items,
      total: summary.total,
      createdAt: payload.createdAt
    };
  }
};

// Генератор локального номера заказа (только для офлайн-fallback).
function nextLocalNumber() {
  const key = 'gg_local_order_counter';
  let n = parseInt(localStorage.getItem(key) || String(ORDER_START), 10);
  if (isNaN(n)) n = ORDER_START;
  n += 1;
  localStorage.setItem(key, String(n));
  return ORDER_PREFIX + String(n).padStart(4, '0');
}

// ===== FAVORITES =====
const Favs = {
  get() { try { return JSON.parse(localStorage.getItem('favs') || '[]'); } catch { return []; } },
  save(ids) { localStorage.setItem('favs', JSON.stringify(ids)); Favs.updateBadge(); },
  toggle(id) {
    const favs = Favs.get();
    const idx = favs.indexOf(id);
    if (idx >= 0) { favs.splice(idx, 1); showToast('Удалено из избранного'); }
    else { favs.push(id); showToast('Добавлено в избранное'); }
    Favs.save(favs);
    return idx < 0;
  },
  has(id) { return Favs.get().includes(id); },
  count() { return Favs.get().length; },
  updateBadge() {
    const c = Favs.count();
    document.querySelectorAll('.fav-badge').forEach(el => {
      el.textContent = c;
      el.style.display = c > 0 ? 'flex' : 'none';
    });
  }
};

// ===== TOAST =====
function showToast(msg) {
  let el = document.getElementById('toast');
  if (!el) { el = document.createElement('div'); el.id = 'toast'; el.className = 'toast'; document.body.appendChild(el); }
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), 2500);
}

// ===== FORMAT =====
function formatPrice(n) { return n.toLocaleString('ru-RU') + ' ₽'; }

// ===== PRODUCT CARD =====
function productCard(p, opts = {}) {
  const isFav = Favs.has(p.id);
  const photo = p.photos[0] || 'https://via.placeholder.com/300x300?text=Нет+фото';
  const discount = p.discount > 0 ? `<span class="badge-discount">-${p.discount}%</span>` : '';
  const tech = p.technology ? `<span class="card-tech">${p.technology}</span>` : '';
  const oldPrice = p.oldPrice > p.price ? `<span class="price-old">${formatPrice(p.oldPrice)}</span>` : '';
  const root = opts.root !== undefined ? opts.root : '';
  const href = `${root}pages/product.html?id=${p.id}`;
  return `
<div class="product-card" data-id="${p.id}">
  <div class="card-img">
    <a href="${href}"><img src="${photo}" alt="${p.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/300x300?text=Нет+фото'"></a>
    <div class="card-badges">${discount}</div>
    <button class="card-fav${isFav ? ' active' : ''}" onclick="toggleFav('${p.id}',this)" aria-label="В избранное">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
    </button>
  </div>
  <div class="card-body">
    <div class="card-brand">${p.brand || ''}</div>
    <div class="card-name"><a href="${href}">${p.name}</a></div>
    ${tech}
    <div class="card-price">
      <span class="price-current">${formatPrice(p.price)}</span>
      ${oldPrice}
    </div>
    <div class="card-actions">
      <button class="btn-cart" onclick="addToCart('${p.id}',this,'${root}')">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
        В корзину
      </button>
    </div>
  </div>
</div>`;
}

function addToCart(id, btn, root) {
  Cart.add(id);
  if (btn) {
    const cartUrl = (root !== undefined ? root : '') + 'pages/cart.html';
    btn.classList.add('added');
    btn.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Добавлено';
    const wrap = btn.parentElement;
    const goBtn = document.createElement('a');
    goBtn.href = cartUrl;
    goBtn.className = 'btn-go-cart';
    goBtn.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg> В корзину';
    wrap.appendChild(goBtn);
    setTimeout(() => {
      btn.classList.remove('added');
      btn.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg> В корзину';
      goBtn.remove();
    }, 4000);
  }
}

function toggleFav(id, btn) {
  const active = Favs.toggle(id);
  if (btn) {
    btn.classList.toggle('active', active);
    const svg = btn.querySelector('svg');
    if (svg) svg.setAttribute('fill', active ? 'currentColor' : 'none');
  }
}

// ===== ВИДЖЕТ МЕССЕНДЖЕРОВ =====
// Плавающие кнопки Telegram + MAX в правом нижнем углу — на всех страницах.
function initMsgWidgets() {
  if (document.getElementById('msg-widgets')) return;

  // CSS встроен в JS, чтобы виджет не зависел от внешних стилей.
  const css = `
.msg-widgets { position: fixed; right: 16px; bottom: 16px; display: flex; flex-direction: column; gap: 10px; z-index: 9998; }
.msg-btn { position: relative; display: flex; align-items: center; justify-content: center; width: 52px; height: 52px; border-radius: 50%; color: #fff; text-decoration: none; box-shadow: 0 6px 20px rgba(0,0,0,.25); transition: transform .15s ease, box-shadow .15s ease; }
.msg-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 26px rgba(0,0,0,.32); }
.msg-btn svg { width: 26px; height: 26px; display: block; }
.msg-btn--tg  { background: #29b6f6; }
.msg-btn--max { background: #1a1a1a; }
.msg-tooltip { position: absolute; right: 64px; top: 50%; transform: translateY(-50%); background: #111; color: #fff; font-size: 13px; line-height: 1; padding: 8px 12px; border-radius: 8px; white-space: nowrap; opacity: 0; pointer-events: none; transition: opacity .15s ease; box-shadow: 0 4px 14px rgba(0,0,0,.25); }
.msg-tooltip::after { content: ''; position: absolute; right: -5px; top: 50%; transform: translateY(-50%); border-left: 5px solid #111; border-top: 5px solid transparent; border-bottom: 5px solid transparent; }
.msg-btn:hover .msg-tooltip { opacity: 1; }
@media (max-width: 480px) {
  .msg-widgets { right: 12px; bottom: 12px; gap: 8px; }
  .msg-btn { width: 46px; height: 46px; }
  .msg-btn svg { width: 22px; height: 22px; }
  .msg-tooltip { display: none; }
}
@media (max-width: 768px) {
  .msg-widgets { bottom: 88px; } /* приподнимаем над "наверх" и другими кнопками */
}
`;
  const styleTag = document.createElement('style');
  styleTag.id = 'msg-widgets-style';
  styleTag.textContent = css;
  document.head.appendChild(styleTag);

  const wrap = document.createElement('div');
  wrap.id = 'msg-widgets';
  wrap.className = 'msg-widgets';
  wrap.innerHTML = `
    <a class="msg-btn msg-btn--tg" href="${window.TG_URL}" target="_blank" rel="noopener" aria-label="Написать в Telegram">
      <span class="msg-tooltip">Написать в Telegram</span>
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/></svg>
    </a>
    <a class="msg-btn msg-btn--max" href="${window.MAX_URL}" target="_blank" rel="noopener" aria-label="Написать в MAX">
      <span class="msg-tooltip">Написать в MAX</span>
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 4h4l5 7 5-7h4v16h-4V11l-5 7-5-7v9H3V4z"/></svg>
    </a>
  `;
  document.body.appendChild(wrap);
}

// ===== SEARCH (обратная совместимость) =====
function initSearch(inputSel, rootPrefix) { /* no-op: см. initLayout() */ }

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  Cart.updateBadge();
  Favs.updateBadge();
  initMsgWidgets();
});
