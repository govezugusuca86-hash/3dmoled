function renderHeader(opts = {}) {
  const root = opts.root || '';
  return `
<header class="header">
  <div class="header-top">🚀 Быстрая доставка по всей России · Гарантия на все товары · Помощь в выборе</div>
  <div class="header-main">
    <a href="${root}index.html" class="logo">3D<span>Moled</span></a>
    <div class="search-wrap">
      <input type="text" id="header-search" placeholder="Поиск 3D принтеров, расходников..." value="${opts.query || ''}">
      <button onclick="document.getElementById('header-search').dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true}))">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
      </button>
    </div>
    <div class="header-actions">
      <a href="${root}pages/favorites.html" class="header-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        <span class="badge fav-badge" style="display:none">0</span>
        Избранное
      </a>
      <a href="${root}pages/cart.html" class="header-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
        <span class="badge cart-badge" style="display:none">0</span>
        Корзина
      </a>
    </div>
  </div>
</header>
<nav class="nav">
  <div class="nav-inner">
    <a href="${root}index.html" class="nav-link${opts.page==='home'?' active':''}">Главная</a>
    <a href="${root}index.html?cat=3D+принтеры+персональные" class="nav-link${opts.page==='printers'?' active':''}">3D Принтеры</a>
    <a href="${root}index.html?cat=Для+3D+принтеров" class="nav-link${opts.page==='accessories'?' active':''}">Расходники и аксессуары</a>
    <a href="${root}pages/delivery.html" class="nav-link${opts.page==='delivery'?' active':''}">Доставка</a>
    <a href="${root}pages/guarantee.html" class="nav-link${opts.page==='guarantee'?' active':''}">Гарантия</a>
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
      <div class="logo">3D<span style="color:#9ca3af">Moled</span></div>
      <p>Интернет-магазин 3D принтеров и расходных материалов. Работаем по всей России. Гарантия на все товары.</p>
    </div>
    <div class="footer-col">
      <h4>Каталог</h4>
      <ul>
        <li><a href="${root}index.html?cat=3D+принтеры+персональные">3D Принтеры</a></li>
        <li><a href="${root}index.html?cat=Для+3D+принтеров">Аксессуары</a></li>
        <li><a href="${root}index.html?sort=discount">Акции</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Информация</h4>
      <ul>
        <li><a href="${root}pages/about.html">О магазине</a></li>
        <li><a href="${root}pages/delivery.html">Доставка и оплата</a></li>
        <li><a href="${root}pages/guarantee.html">Гарантия и возврат</a></li>
        <li><a href="${root}pages/privacy.html">Конфиденциальность</a></li>
        <li><a href="${root}pages/contacts.html">Контакты</a></li>
      </ul>
    </div>
    <div class="footer-col footer-contacts">
      <h4>Контакты</h4>
      <p>📞 +7 (800) 000-00-00</p>
      <p>✉️ info@3dmoled.ru</p>
      <p>🕐 Пн–Вс: 9:00–21:00</p>
      <p style="margin-top:12px"><a href="https://vk.com/3dmoled" target="_blank" style="color:#4ade80">ВКонтакте</a></p>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="footer-bottom-inner">
      <span>© 2025 3DModled. Все права защищены.</span>
      <span><a href="${root}pages/privacy.html">Политика конфиденциальности</a></span>
    </div>
  </div>
</footer>
<a href="https://vk.com/3dmoled" target="_blank" class="vk-float">
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.253-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.762-.491h1.744c.525 0 .643.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.202 1.253.745.847 1.32 1.558 1.473 2.049.17.491-.085.745-.576.745z"/></svg>
  <span>Написать в VK</span>
</a>
<div id="toast" class="toast"></div>`;
}
