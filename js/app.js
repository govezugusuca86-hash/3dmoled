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
      <button class="btn-cart" onclick="addToCart('${p.id}',this)">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
        В корзину
      </button>
    </div>
  </div>
</div>`;
}

function addToCart(id, btn) {
  Cart.add(id);
  if (btn) { btn.classList.add('added'); btn.textContent = '✓ Добавлено'; setTimeout(() => { btn.classList.remove('added'); btn.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg> В корзину'; }, 1500); }
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
function initSearch(inputSel, rootPrefix) {
  const input = document.querySelector(inputSel);
  if (!input) return;
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && input.value.trim()) {
      window.location.href = `${rootPrefix || ''}index.html?q=${encodeURIComponent(input.value.trim())}`;
    }
  });
}

// ===== INIT BADGES =====
document.addEventListener('DOMContentLoaded', () => {
  Cart.updateBadge();
  Favs.updateBadge();
});
