function renderHeader(opts = {}) {
  const root = opts.root || '';
  return `
<header class="header">
  <div class="header-top">
    <div class="header-top-inner">
      <span class="header-top-item">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        г. Бузулук, ТЦ «Русь», 1-й мкр., 5Б
      </span>
      <span class="header-top-item">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.7a16 16 0 0 0 6.29 6.29l.97-1.06a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        +7 (35342) 5-52-37
      </span>
      <span class="header-top-item">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        Работаем ежедневно
      </span>
    </div>
  </div>
  <div class="header-main">
    <button class="burger" id="burger-btn" aria-label="Меню">
      <span></span><span></span><span></span>
    </button>
    <a href="${root}index.html" class="logo">3D<span>Moled</span></a>
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
      <div class="logo" style="color:#4ade80;margin-bottom:12px;font-size:20px">3D<span style="color:#9ca3af">Moled</span></div>
      <p>Интернет-магазин 3D принтеров в Бузулуке. Работаем с 2020 года. Доставка по всей России.</p>
      <div style="margin-top:16px">
        <a href="https://vk.ru/3dmoled" target="_blank" style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#0077ff;border-radius:8px;color:#fff">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.253-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.762-.491h1.744c.525 0 .643.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.202 1.253.745.847 1.32 1.558 1.473 2.049.17.491-.085.745-.576.745z"/></svg>
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
        <li><a href="${root}pages/privacy.html">Конфиденциальность</a></li>
        <li><a href="${root}pages/contacts.html">Контакты</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Контакты</h4>
      <ul style="gap:10px">
        <li style="display:flex;align-items:flex-start;gap:8px">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0;margin-top:2px;color:#4ade80"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.7a16 16 0 0 0 6.29 6.29l.97-1.06a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          +7 (35342) 5-52-37
        </li>
        <li style="display:flex;align-items:flex-start;gap:8px">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0;margin-top:2px;color:#4ade80"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          3dmoledbuz@yandex.ru
        </li>
        <li style="display:flex;align-items:flex-start;gap:8px">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0;margin-top:2px;color:#4ade80"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          Бузулук, 1-й мкр., 5Б, ТЦ «Русь»
        </li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="footer-bottom-inner">
      <span>© 2025 3DMoled · ИП Гагаркина И.Ю. · ОГРНИП: 306560312300060 · ИНН: 560305731536</span>
      <span><a href="${root}pages/privacy.html">Политика конфиденциальности</a></span>
    </div>
  </div>
</footer>

<a href="https://vk.ru/3dmoled" target="_blank" class="vk-float">
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.253-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.762-.491h1.744c.525 0 .643.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.202 1.253.745.847 1.32 1.558 1.473 2.049.17.491-.085.745-.576.745z"/></svg>
  <span>Написать в VK</span>
</a>

<button class="back-to-top" id="back-to-top" aria-label="Наверх">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"/></svg>
</button>

<div id="toast" class="toast"></div>

<script>
(function(){
  var burger = document.getElementById('burger-btn');
  var nav = document.getElementById('main-nav');
  if(burger && nav){
    burger.addEventListener('click', function(){
      burger.classList.toggle('open');
      nav.classList.toggle('open');
    });
  }
  var msBtn = document.getElementById('mobile-search-btn');
  var msBar = document.getElementById('mobile-search-bar');
  var msInput = document.getElementById('mobile-search-input');
  var msGo = document.getElementById('mobile-search-go');
  var rootPath = '${root}';
  if(msBtn && msBar){
    msBtn.addEventListener('click', function(){ msBar.classList.toggle('open'); if(msBar.classList.contains('open')) msInput.focus(); });
  }
  function doMobileSearch(){ if(msInput && msInput.value.trim()) window.location.href = rootPath+'index.html?q='+encodeURIComponent(msInput.value.trim()); }
  if(msGo) msGo.addEventListener('click', doMobileSearch);
  if(msInput) msInput.addEventListener('keydown', function(e){ if(e.key==='Enter') doMobileSearch(); });
  var backTop = document.getElementById('back-to-top');
  if(backTop){
    window.addEventListener('scroll', function(){ backTop.classList.toggle('visible', window.scrollY > 400); });
    backTop.addEventListener('click', function(){ window.scrollTo({top:0,behavior:'smooth'}); });
  }
})();
</script>`;
}
