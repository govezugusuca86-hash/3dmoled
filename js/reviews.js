// ===== REVIEWS DATA =====
// Фото хранятся на Cloudinary CDN (cloud: dldf74clk, папка 3dxob/reviews)
// Чтобы добавить отзыв — добавь объект в массив reviews

var reviews = [
  {
    "id": "r1",
    "name": "Сергей К.",
    "city": "Бузулук",
    "date": "2025-01-15",
    "rating": 5,
    "text": "Долго думали, решили, и не зря, печатает с коробки, программное обеспечение всё есть, рекомендую! Это первый принтер, но всё понятно, порадовала система AMS, хотим взять ещё одну на 4 катушки! Продавцу огромное спасибо!!!!",
    "avatar": "https://res.cloudinary.com/dldf74clk/image/upload/3dxob/reviews/avatar1.webp",
    "photo": "https://res.cloudinary.com/dldf74clk/image/upload/3dxob/reviews/photo1.webp",
    "verified": true
  },
  {
    "id": "r2",
    "name": "Дмитрий А.",
    "city": "Оренбург",
    "date": "2025-01-28",
    "rating": 5,
    "text": "Пока я в шоке, это что-то нереально классное. Я доволен. Работает не громко. Пока только начали печатать, но я уже доволен, разбираться ещё конечно долго, но бесплатные модельки распечатает даже ребенок. Менеджеру отдельное спасибо, помог с оформлением и оплатой, после оплаты выслали на следующий день, благодарю!",
    "avatar": "https://res.cloudinary.com/dldf74clk/image/upload/3dxob/reviews/avatar2.webp",
    "photo": "https://res.cloudinary.com/dldf74clk/image/upload/3dxob/reviews/photo2.webp",
    "verified": true
  },
  {
    "id": "r3",
    "name": "Максим В.",
    "city": "Самара",
    "date": "2025-02-10",
    "rating": 5,
    "text": "Очень понравился принтер, первый, раньше никаких не было, сравнить не с чем. Инструкция очень подробная на русском, собирать и все подключать по ней легко. Сам принтер тоже на русском языке, все легко настраивается, быстрая печать с мобильного приложения, выбрал и отправил на печать. Поддерживает 4 катушки и как понял, что можно еще 5-ую вешать сбоку, но пока и верхних хватает. Внутри есть камера и удобно следить иногда за процессом.",
    "avatar": "https://res.cloudinary.com/dldf74clk/image/upload/3dxob/reviews/avatar3.webp",
    "photo": "https://res.cloudinary.com/dldf74clk/image/upload/3dxob/reviews/photo3.webp",
    "verified": true
  },
  {
    "id": "r4",
    "name": "Андрей Л.",
    "city": "Бугуруслан",
    "date": "2025-02-22",
    "rating": 5,
    "text": "Отличная доставка, все в целости и сохранности. Отдельное спасибо менеджеру, который рассказал и подсказал как по принтеру, так и по оформлению и оплате! Сам принтер отличный, печатает из под коробки! Спасибо!",
    "avatar": "https://res.cloudinary.com/dldf74clk/image/upload/3dxob/reviews/avatar4.webp",
    "photo": "https://res.cloudinary.com/dldf74clk/image/upload/3dxob/reviews/photo4.webp",
    "verified": true
  },
  {
    "id": "r5",
    "name": "Елена П.",
    "city": "Новотроицк",
    "date": "2025-03-05",
    "rating": 5,
    "text": "Пришел целый. Брали в подарок сыну на ДР. Крутейшая конечно техника. Как я понял, нужно покупать хороший пластик и соблюдать влажность и чистоту при работе. Будем покупать AMS систему для многоцветной печати. Рекомендую продавца.",
    "avatar": "https://res.cloudinary.com/dldf74clk/image/upload/3dxob/reviews/avatar5.webp",
    "photo": "https://res.cloudinary.com/dldf74clk/image/upload/3dxob/reviews/photo5.webp",
    "verified": true
  },
  {
    "id": "r6",
    "name": "Артём С.",
    "city": "Орск",
    "date": "2025-03-18",
    "rating": 5,
    "text": "Это мой первый принтер, очень долго выбирал сравнивал с различными другими но остановился на этой модели и не пожалел, распаковал включил сделал калибровку в течении 20 минут, загрузил пластик и сразу начал печатать без танцев с бубном. Качество печати пластиком PLA понравилось. Менеджер отвечает на вопросы быстро. Рекомендую к покупке.",
    "avatar": "https://res.cloudinary.com/dldf74clk/image/upload/3dxob/reviews/avatar6.webp",
    "photo": "https://res.cloudinary.com/dldf74clk/image/upload/3dxob/reviews/photo6.webp",
    "verified": true
  },
  {
    "id": "r7",
    "name": "Павел М.",
    "city": "Тольятти",
    "date": "2025-03-30",
    "rating": 5,
    "text": "Очень давно хотел купить себе принтер. Выбор пал на эту модель, т.к она подходит для начинающих и с ней легко справится. Пока тестируем и учимся. После оформления и оплаты отгрузили на следующий день. Упаковано знатно, ничего не повредилось при доставке, спасибо!",
    "avatar": "https://res.cloudinary.com/dldf74clk/image/upload/3dxob/reviews/avatar7.webp",
    "photo": "https://res.cloudinary.com/dldf74clk/image/upload/3dxob/reviews/photo7.webp",
    "verified": true
  },
  {
    "id": "r8",
    "name": "Иван Р.",
    "city": "Сорочинск",
    "date": "2025-04-08",
    "rating": 5,
    "text": "Для меня он бесшумный, никаких танцев с бубном, в бамбухэнди чего только нет, слайсеры удобный. Качество печати на высоте. Стенки гладкие получаются, поддержки отрываются легко. Вообще огонь. Я доволен. Есть с чем сравнивать.",
    "avatar": "https://res.cloudinary.com/dldf74clk/image/upload/3dxob/reviews/avatar8.webp",
    "photo": "https://res.cloudinary.com/dldf74clk/image/upload/3dxob/reviews/photo8.webp",
    "verified": true
  },
  {
    "id": "r9",
    "name": "Олег Н.",
    "city": "Бузулук",
    "date": "2025-04-20",
    "rating": 5,
    "text": "Легкий в управлении, не шумный, удобный интерфейс, печатает на «ура», очень понравился. Долго выбирал, спрашивал у менеджера, но отдал предпочтение этой модели, оформление очень удобное и оплата тоже! Рекомендую к покупке.",
    "avatar": "https://res.cloudinary.com/dldf74clk/image/upload/3dxob/reviews/avatar9.webp",
    "photo": "https://res.cloudinary.com/dldf74clk/image/upload/3dxob/reviews/photo9.webp",
    "verified": true
  },
  {
    "id": "r10",
    "name": "Виктор Ш.",
    "city": "Уфа",
    "date": "2025-05-02",
    "rating": 5,
    "text": "Доставка супер, после оформления и оплаты отправили. Принтер приехал на 2 дня раньше срока, все целое, сборка заняла 5 минут! Калибровка и обновление прошивки еще 25 минут, принтер печатает сразу после калибровки, никаких доп настроек не нужно.",
    "avatar": "https://res.cloudinary.com/dldf74clk/image/upload/3dxob/reviews/avatar10.webp",
    "photo": "https://res.cloudinary.com/dldf74clk/image/upload/3dxob/reviews/photo10.webp",
    "verified": true
  },
  {
    "id": "r11",
    "name": "Алексей Г.",
    "city": "Казань",
    "date": "2025-05-15",
    "rating": 5,
    "text": "Доставка отличная, ничего не повредили. Собрали, подключили, установили приложение, он провел тесты и калибровку, всё в идеале. Визуальные впечатления абсолютно восторженные.",
    "avatar": "https://res.cloudinary.com/dldf74clk/image/upload/3dxob/reviews/avatar11.webp",
    "photo": "https://res.cloudinary.com/dldf74clk/image/upload/3dxob/reviews/photo11.webp",
    "verified": true
  },
  {
    "id": "r12",
    "name": "Роман Д.",
    "city": "Саратов",
    "date": "2025-05-27",
    "rating": 5,
    "text": "Получил принтер в назначенный срок, коробка целая, упаковано очень качественно, по каждым мелочам видно качественный и оригинальный продукт. Очень доволен. Сборка не составила труда. Принтер однозначно рекомендую у этого продавца.",
    "avatar": "https://res.cloudinary.com/dldf74clk/image/upload/3dxob/reviews/avatar12.webp",
    "photo": "https://res.cloudinary.com/dldf74clk/image/upload/3dxob/reviews/photo12.webp",
    "verified": true
  },
  {
    "id": "r13",
    "name": "Николай Б.",
    "city": "Пенза",
    "date": "2025-06-06",
    "rating": 5,
    "text": "Принтер пушка! Менеджер помог с выбором и объяснил по оформлению, оплатил — отправили, все четко! Всем рекомендую, удобный в сборке, удобный в настройках, да и вообще просто лучший!",
    "avatar": "https://res.cloudinary.com/dldf74clk/image/upload/3dxob/reviews/avatar13.webp",
    "photo": "https://res.cloudinary.com/dldf74clk/image/upload/3dxob/reviews/photo13.webp",
    "verified": true
  },
  {
    "id": "r14",
    "name": "Михаил Т.",
    "city": "Бузулук",
    "date": "2025-06-18",
    "rating": 5,
    "text": "Здорово, принтер просто бомба! Спасибо продавцу, доставили раньше срока за день! Первый принтер, особо сравнивать не с чем. Но свои задачи выполняет. Печатает качественно.",
    "avatar": "https://res.cloudinary.com/dldf74clk/image/upload/3dxob/reviews/avatar14.webp",
    "photo": "https://res.cloudinary.com/dldf74clk/image/upload/3dxob/reviews/photo14.webp",
    "verified": true
  },
  {
    "id": "r15",
    "name": "Наталья Р.",
    "city": "Бузулук",
    "date": "2025-06-29",
    "rating": 5,
    "text": "Мой первый принтер и я пока довольна, ничего в 3д печати не шарю совсем, но у меня получилось что-то напечатать и я рада! Менеджер всегда был на связи, от момента оформления и оплаты, до момента получения, самый лучший магазин!",
    "avatar": "https://res.cloudinary.com/dldf74clk/image/upload/3dxob/reviews/avatar15.webp",
    "photo": "https://res.cloudinary.com/dldf74clk/image/upload/3dxob/reviews/photo15.webp",
    "verified": true
  },
  {
    "id": "r16",
    "name": "Кирилл Ж.",
    "city": "Оренбург",
    "date": "2025-07-10",
    "rating": 5,
    "text": "Наш первый 3Д принтер! Довольны! Решили взять флагманский 3D-принтер. Двойная экструзия, высокое качество печати. Высокие стандарты скорости. Работает из коробки, удобное ПО, простота настройки. Добротная, монолитная конструкция.",
    "avatar": "https://res.cloudinary.com/dldf74clk/image/upload/3dxob/reviews/avatar16.webp",
    "photo": "https://res.cloudinary.com/dldf74clk/image/upload/3dxob/reviews/photo16.webp",
    "verified": true
  },
  {
    "id": "r17",
    "name": "Евгений Ф.",
    "city": "Самара",
    "date": "2025-07-22",
    "rating": 5,
    "text": "Доставка быстрая. Пришла посылка за 3-е суток. Упаковка качественная, все в целости и сохранности. Пересмотрел много видеообзоров и нашел ваш магазин с приятными ценами! После оформления и оплаты выслали в этот же вечер. Всё быстро, легко и качественно. Спасибо.",
    "avatar": "https://res.cloudinary.com/dldf74clk/image/upload/3dxob/reviews/avatar17.webp",
    "photo": "https://res.cloudinary.com/dldf74clk/image/upload/3dxob/reviews/photo17.webp",
    "verified": true
  },
  {
    "id": "r18",
    "name": "Денис О.",
    "city": "Орск",
    "date": "2025-08-03",
    "rating": 5,
    "text": "Принтер порадовал, соответствует описанию, выглядит надежно. Пластика в комплекте нет, не знал об этом, надо заказывать сразу. Работает из под коробки. Рекомендую!",
    "avatar": "https://res.cloudinary.com/dldf74clk/image/upload/3dxob/reviews/avatar18.webp",
    "photo": "https://res.cloudinary.com/dldf74clk/image/upload/3dxob/reviews/photo18.webp",
    "verified": true
  },
  {
    "id": "r19",
    "name": "Антон З.",
    "city": "Бугуруслан",
    "date": "2025-08-15",
    "rating": 5,
    "text": "Вот и пришел ко мне долгожданный! Менеджер красавчик, все рассказал, объяснил, очень удобная оплата, после нее отправили на следующее утро. Принтер упакован надёжно. Из коробки заработал без танцев с бубном. Цена приятная. Продавца однозначно рекомендую.",
    "avatar": "https://res.cloudinary.com/dldf74clk/image/upload/3dxob/reviews/avatar19.webp",
    "photo": "https://res.cloudinary.com/dldf74clk/image/upload/3dxob/reviews/photo19.webp",
    "verified": true
  },
  {
    "id": "r20",
    "name": "Владимир Е.",
    "city": "Тольятти",
    "date": "2025-08-28",
    "rating": 5,
    "text": "Ставлю 5+, сравнить не с чем так как я новичок в 3d печати, но распечатка и настройка заняла 20 мин. В приложении очень много готовых образов, можно находясь в любой точке планеты запустить принтер через смартфон и наблюдать через встроенную камеру.",
    "avatar": "https://res.cloudinary.com/dldf74clk/image/upload/3dxob/reviews/avatar20.webp",
    "photo": "https://res.cloudinary.com/dldf74clk/image/upload/3dxob/reviews/photo20.webp",
    "verified": true
  },
  {
    "id": "r21",
    "name": "Александр Х.",
    "city": "Оренбург",
    "date": "2025-09-08",
    "rating": 5,
    "text": "Печатает из коробки, калибровка потока прекрасно подстраивает принтер под филамент сторонних производителей. Сушка в AMS — просто супер. Оставил 4 катушки на ночь, утром сухой материал с отличным качеством печати. Компактный, удалось установить AMS не на принтере, а рядом, отлично работает.",
    "avatar": "https://res.cloudinary.com/dldf74clk/image/upload/3dxob/reviews/avatar21.webp",
    "photo": "https://res.cloudinary.com/dldf74clk/image/upload/3dxob/reviews/photo21.webp",
    "verified": true
  },
  {
    "id": "r22",
    "name": "Тимур И.",
    "city": "Бузулук",
    "date": "2025-09-20",
    "rating": 5,
    "text": "Печатает из коробки, калибровка потока прекрасно подстраивает принтер под филамент сторонних производителей. Сушка в AMS — просто супер. Компактный, отлично работает.",
    "avatar": "https://res.cloudinary.com/dldf74clk/image/upload/3dxob/reviews/avatar22.webp",
    "photo": "https://res.cloudinary.com/dldf74clk/image/upload/3dxob/reviews/photo22.webp",
    "verified": true
  }
];

// Средний рейтинг
function getAverageRating() {
  if (!reviews.length) return 0;
  return (reviews.reduce(function(s, r) { return s + r.rating; }, 0) / reviews.length).toFixed(1);
}

// Форматирование даты
function formatReviewDate(dateStr) {
  var months = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
  var d = new Date(dateStr);
  return d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();
}

// Генерация звёзд SVG
function starsHtml(rating, size) {
  size = size || 14;
  var html = '';
  for (var i = 1; i <= 5; i++) {
    if (i <= rating) {
      html += '<svg width="'+size+'" height="'+size+'" viewBox="0 0 24 24" fill="#facc15" stroke="#facc15" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
    } else {
      html += '<svg width="'+size+'" height="'+size+'" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
    }
  }
  return html;
}

// Карточка отзыва (компактная, для главной)
function reviewCardSmall(r, root) {
  root = root || '';
  var avatarHtml;
  if (r.avatar) {
    avatarHtml = '<img src="'+r.avatar+'" alt="'+r.name+'" class="review-avatar" style="width:48px;height:48px;">';
  } else {
    avatarHtml = '<div class="review-avatar-placeholder" style="width:48px;height:48px;font-size:20px;">'+r.name.charAt(0)+'</div>';
  }
  var photoHtml = r.photo ? '<div class="review-photo-wrap"><img src="'+r.photo+'" alt="Фото от '+r.name+'" class="review-photo-thumb" onclick="openReviewPhoto(this.src)"></div>' : '';
  var verified = r.verified ? '<span class="review-verified"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> Подтверждённый отзыв</span>' : '';
  return '<div class="review-card">' +
    '<div class="review-card-header">' + avatarHtml +
      '<div class="review-card-author">' +
        '<div class="review-card-name">'+r.name+'</div>' +
        '<div class="review-card-meta">'+r.city+' · '+formatReviewDate(r.date)+'</div>' +
      '</div>' +
    '</div>' +
    '<div class="review-card-stars">'+starsHtml(r.rating)+'</div>' +
    '<div class="review-card-text">'+r.text+'</div>' +
    photoHtml + verified +
  '</div>';
}

// Карточка отзыва (полная, для страницы отзывов)
function reviewCardFull(r, root) {
  root = root || '../';
  var avatarHtml;
  if (r.avatar) {
    avatarHtml = '<img src="'+r.avatar+'" alt="'+r.name+'" class="review-avatar" style="width:56px;height:56px;">';
  } else {
    avatarHtml = '<div class="review-avatar-placeholder" style="width:56px;height:56px;font-size:23px;">'+r.name.charAt(0)+'</div>';
  }
  var photoHtml = r.photo ? '<div class="review-photo-wrap-full"><img src="'+r.photo+'" alt="Фото от '+r.name+'" class="review-photo-full" onclick="openReviewPhoto(this.src)"></div>' : '';
  var verified = r.verified ? '<span class="review-verified"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> Подтверждённый отзыв</span>' : '';
  return '<div class="review-card review-card--full">' +
    '<div class="review-card-header">' + avatarHtml +
      '<div class="review-card-author">' +
        '<div class="review-card-name">'+r.name+'</div>' +
        '<div class="review-card-meta">'+r.city+' · '+formatReviewDate(r.date)+'</div>' +
      '</div>' +
      '<div class="review-card-stars-right">'+starsHtml(r.rating, 16)+'</div>' +
    '</div>' +
    '<div class="review-card-text-full">'+r.text+'</div>' +
    photoHtml + verified +
  '</div>';
}

// Рейтинг для карточки товара
function productRatingHtml(root) {
  root = root || '';
  var avg = getAverageRating();
  var count = reviews.length;
  return '<a href="'+root+'pages/reviews.html" class="product-rating-link">' +
    '<span class="product-rating-stars">'+starsHtml(5, 13)+'</span>' +
    '<span class="product-rating-score">'+avg+'</span>' +
    '<span class="product-rating-count">('+count+' отзывов)</span>' +
  '</a>';
}

// Лайтбокс
function openReviewPhoto(src) {
  var lb = document.getElementById('review-lightbox');
  if (!lb) {
    lb = document.createElement('div');
    lb.id = 'review-lightbox';
    lb.className = 'review-lightbox';
    lb.innerHTML = '<div class="review-lightbox-inner"><button class="review-lightbox-close" onclick="closeReviewPhoto()">&times;</button><img id="review-lightbox-img" src="" alt=""></div>';
    lb.addEventListener('click', function(e) { if (e.target === lb) closeReviewPhoto(); });
    document.body.appendChild(lb);
  }
  document.getElementById('review-lightbox-img').src = src;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeReviewPhoto() {
  var lb = document.getElementById('review-lightbox');
  if (lb) lb.classList.remove('open');
  document.body.style.overflow = '';
}

// Карусель на главной
function initReviewsCarousel(containerId, opts) {
  opts = opts || {};
  var root = opts.root || '';
  var max = opts.max || 10;
  var container = document.getElementById(containerId);
  if (!container || !reviews.length) return;
  var avg = getAverageRating();
  var count = reviews.length;
  var shown = reviews.slice(0, max);
  var html = '<div class="section-head">' +
      '<div>' +
        '<h2 class="section-title">Отзывы <span>покупателей</span></h2>' +
        '<div class="reviews-overall" style="margin-top:10px">' +
          '<span class="reviews-overall-num">'+avg+'</span>' +
          '<span class="reviews-overall-stars">'+starsHtml(5, 18)+'</span>' +
          '<span class="reviews-overall-count">'+count+' отзывов</span>' +
        '</div>' +
      '</div>' +
      '<a href="'+root+'pages/reviews.html" class="link-more">Все отзывы</a>' +
    '</div>' +
    '<div class="reviews-carousel">' +
      '<button class="carousel-btn carousel-prev" id="rev-prev" aria-label="Назад">' +
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>' +
      '</button>' +
      '<div class="reviews-track" id="rev-track">';
  for (var i = 0; i < shown.length; i++) {
    html += reviewCardSmall(shown[i], root);
  }
  html += '</div>' +
      '<button class="carousel-btn carousel-next" id="rev-next" aria-label="Вперёд">' +
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>' +
      '</button>' +
    '</div>';
  container.innerHTML = html;
  var track = document.getElementById('rev-track');
  var prevBtn = document.getElementById('rev-prev');
  var nextBtn = document.getElementById('rev-next');
  if (track && prevBtn && nextBtn) {
    var scrollAmt = function() { var c = track.querySelector('.review-card'); return c ? c.offsetWidth + 16 : 300; };
    prevBtn.addEventListener('click', function() { track.scrollBy({left: -scrollAmt(), behavior: 'smooth'}); });
    nextBtn.addEventListener('click', function() { track.scrollBy({left: scrollAmt(), behavior: 'smooth'}); });
  }
}
