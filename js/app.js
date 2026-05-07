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
  updateBadge() {
    const c = Cart.count();
    document.querySelectorAll('.cart-badge').forEach(el => {
      el.textContent = c;
      el.style.display = c > 0 ? 'flex' : 'none';
    });
  }
};

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
  // Рейтинг магазина — общие звёзды со ссылкой на страницу отзывов
  const ratingHtml = (typeof productRatingHtml === 'function') ? productRatingHtml(root) : '';
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
    ${ratingHtml}
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

// ===== SEARCH =====
// initSearch оставлена для обратной совместимости со страницами,
// которые её вызывают. Реальная логика поиска теперь живёт в initLayout()
// (в layout.js) и навешивается автоматически после рендера шапки.
// Это исправляет ситуацию, когда поиск переставал работать из-за того,
// что <script> внутри innerHTML не выполнялся.
function initSearch(inputSel, rootPrefix) {
  // no-op: см. initLayout() в layout.js
}

// ===== REVIEWS UI =====

// SVG-звезда. fill: 'full' | 'half' | 'empty'
function starSvg(fill) {
  if (fill === 'full') {
    return `<svg viewBox="0 0 24 24" class="star star-full"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
  }
  if (fill === 'half') {
    return `<svg viewBox="0 0 24 24" class="star star-half">
      <defs><linearGradient id="halfGrad${Math.random().toString(36).slice(2,8)}"><stop offset="50%" stop-color="currentColor"/><stop offset="50%" stop-color="transparent"/></linearGradient></defs>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor" stroke="currentColor" stroke-width="1.5" style="fill: url(#halfStar)"/>
    </svg>`;
  }
  return `<svg viewBox="0 0 24 24" class="star star-empty"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
}

// Универсальная отрисовка 5 звёзд по числу (5, 4.5, 4, ...)
function renderStars(rating) {
  const r = Math.round(rating * 2) / 2; // округление до 0.5
  let html = '<span class="stars">';
  for (let i = 1; i <= 5; i++) {
    if (i <= r) html += starSvg('full');
    else if (i - 0.5 === r) html += starSvg('half');
    else html += starSvg('empty');
  }
  html += '</span>';
  return html;
}

// Звёзды для карточки товара (inline) — кликабельные, ведут на страницу отзывов
// Если у товара нет отзывов — показываем "Нет отзывов" нейтрально (кликабельно тоже)
function starRatingInline(productId, root) {
  if (typeof getProductRating !== 'function') return '';
  const data = getProductRating(productId);
  const reviewsUrl = `${root || ''}pages/reviews.html?product=${productId}`;
  if (!data) {
    return `<a href="${reviewsUrl}" class="card-rating card-rating-empty">
      ${renderStars(0)}
      <span class="rating-text">Нет отзывов</span>
    </a>`;
  }
  return `<a href="${reviewsUrl}" class="card-rating">
    ${renderStars(parseFloat(data.avg))}
    <span class="rating-text"><strong>${data.avg}</strong> · ${data.count} ${pluralReviews(data.count)}</span>
  </a>`;
}

// Склонение слова "отзыв"
function pluralReviews(n) {
  const mod10 = n % 10, mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return 'отзыв';
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'отзыва';
  return 'отзывов';
}

// Форматирование даты в "15 сентября 2025"
function formatReviewDate(dateStr) {
  const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
                  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
  const d = new Date(dateStr);
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

// Карточка отзыва. opts.compact = true — для карусели на главной (без названия товара)
function reviewCard(review, opts = {}) {
  const root = opts.root !== undefined ? opts.root : '';
  const initials = review.name.split(' ').map(s => s[0]).join('').toUpperCase().slice(0, 2);
  const avatar = review.avatar
    ? `<img src="${root}${review.avatar}" alt="${review.name}" onerror="this.parentElement.innerHTML='${initials}'">`
    : initials;
  const photo = review.photo
    ? `<div class="review-photo"><img src="${root}${review.photo}" alt="Фото покупателя" loading="lazy" onclick="openReviewPhoto(this.src)"></div>`
    : '';
  const verified = review.verified
    ? `<span class="review-verified" title="Подтверждённая покупка">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 12l2 2 4-4"/>
          <circle cx="12" cy="12" r="10"/>
        </svg>
        Подтверждённый отзыв
      </span>`
    : '';
  const productLink = (!opts.compact && review.productId)
    ? `<a href="${root}pages/product.html?id=${review.productId}" class="review-product">${review.productName || 'Товар'}</a>`
    : '';
  return `
<article class="review-card${opts.compact ? ' review-card-compact' : ''}">
  <header class="review-head">
    <div class="review-avatar">${avatar}</div>
    <div class="review-meta">
      <div class="review-name">${review.name}</div>
      <div class="review-date">${formatReviewDate(review.date)}</div>
    </div>
    <div class="review-stars">${renderStars(review.rating)}</div>
  </header>
  ${verified}
  ${productLink}
  <p class="review-text">${review.text}</p>
  ${photo}
</article>`;
}

// Карусель отзывов на главной — листается стрелками + свайп на мобиле
function initReviewsCarousel(containerId, opts = {}) {
  if (typeof reviews === 'undefined') return;
  const root = opts.root || '';
  const wrap = document.getElementById(containerId);
  if (!wrap) return;
  // Берём только подтверждённые с фото или текстом, сортируем по дате
  const list = reviews.slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, opts.max || 10);
  const overall = (typeof getOverallRating === 'function') ? getOverallRating() : null;
  const overallHtml = overall ? `
    <div class="reviews-overall">
      <div class="reviews-overall-rating">
        <span class="reviews-overall-num">${overall.avg}</span>
        ${renderStars(parseFloat(overall.avg))}
      </div>
      <div class="reviews-overall-count">На основе ${overall.count} ${pluralReviews(overall.count)}</div>
    </div>` : '';
  wrap.innerHTML = `
    <div class="reviews-head">
      <div>
        <h2 class="section-title">Отзывы наших <span>покупателей</span></h2>
        ${overallHtml}
      </div>
      <a href="${root}pages/reviews.html" class="link-more">Все отзывы →</a>
    </div>
    <div class="reviews-carousel">
      <button class="carousel-btn carousel-prev" aria-label="Предыдущий" data-dir="-1">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <div class="reviews-track" id="${containerId}-track">
        ${list.map(r => reviewCard(r, { compact: true, root })).join('')}
      </div>
      <button class="carousel-btn carousel-next" aria-label="Следующий" data-dir="1">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>
  `;
  const track = document.getElementById(`${containerId}-track`);
  const prev = wrap.querySelector('.carousel-prev');
  const next = wrap.querySelector('.carousel-next');
  function scrollByCard(dir) {
    const card = track.querySelector('.review-card');
    if (!card) return;
    const gap = parseFloat(getComputedStyle(track).gap) || 16;
    track.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: 'smooth' });
  }
  prev.addEventListener('click', () => scrollByCard(-1));
  next.addEventListener('click', () => scrollByCard(1));
}

// Лайтбокс для фото покупателя в отзыве
function openReviewPhoto(src) {
  let lb = document.getElementById('review-lightbox');
  if (!lb) {
    lb = document.createElement('div');
    lb.id = 'review-lightbox';
    lb.className = 'lightbox';
    lb.innerHTML = `<button class="lightbox-close" onclick="this.parentElement.classList.remove('open')">×</button><img src="" alt="">`;
    lb.addEventListener('click', e => { if (e.target === lb) lb.classList.remove('open'); });
    document.body.appendChild(lb);
  }
  lb.querySelector('img').src = src;
  lb.classList.add('open');
}

// ===== INIT BADGES =====
document.addEventListener('DOMContentLoaded', () => {
  Cart.updateBadge();
  Favs.updateBadge();
});
