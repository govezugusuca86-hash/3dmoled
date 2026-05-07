// ===== REVIEWS DATA =====
// Чтобы добавить новый отзыв:
// 1. Положи avatar и photo в img/reviews/
// 2. Добавь объект в массив ниже
// Поля: name, city, date, rating (1-5), text, avatar, photo (опционально), verified (true/false)

const reviews = [
  {
    id: 'r1',
    name: 'Сергей К.',
    city: 'Бузулук',
    date: '2025-03-12',
    rating: 5,
    text: 'Долго думали, решили, и не зря, печатает с коробки, программное обеспечение всё есть, рекомендую! Это первый принтер, но всё понятно, порадовала система AMS, хотим взять ещё одну на 4 катушки! Продавцу огромное спасибо!!!!',
    avatar: 'img/reviews/avatar1.jpg',
    photo: 'img/reviews/photo1.jpg',
    verified: true
  },
  {
    id: 'r2',
    name: 'Алексей М.',
    city: 'Оренбург',
    date: '2025-05-02',
    rating: 5,
    text: 'Заказывал Bambu Lab P1S с доставкой в Оренбург. Пришёл за 3 дня, всё упаковано идеально. Принтер настроился за 15 минут, первая печать — просто огонь. Качество слоёв на 0.2 мм уже отличное, а на 0.08 вообще как заводская деталь. Магазин рекомендую!',
    avatar: null,
    photo: null,
    verified: true
  },
  {
    id: 'r3',
    name: 'Дмитрий В.',
    city: 'Самара',
    date: '2025-01-28',
    rating: 5,
    text: 'Третий принтер беру именно тут. Сначала был Ender-3, потом Elegoo Mars, теперь вот Bambu A1 Combo. Каждый раз консультировали по телефону, помогали с выбором. Цены на уровне маркетплейсов, зато гарантия нормальная и можно спросить если что-то не понятно.',
    avatar: null,
    photo: null,
    verified: true
  },
  {
    id: 'r4',
    name: 'Наталья Р.',
    city: 'Бузулук',
    date: '2025-04-15',
    rating: 5,
    text: 'Покупала мужу на день рождения Creality K1C. Ничего не понимаю в 3D принтерах, но в магазине всё объяснили, помогли выбрать. Муж в восторге, печатает каждый день! Спасибо за терпение и подробные ответы на все мои вопросы.',
    avatar: null,
    photo: null,
    verified: true
  },
  {
    id: 'r5',
    name: 'Игорь Л.',
    city: 'Бугуруслан',
    date: '2025-02-19',
    rating: 5,
    text: 'Взял Elegoo Saturn для печати миниатюр. Детализация потрясающая — каждый элемент чёткий. Доставили быстро, всё было в наличии. Отдельное спасибо за бонусом положенную смолу — приятный сюрприз!',
    avatar: null,
    photo: null,
    verified: true
  },
  {
    id: 'r6',
    name: 'Андрей Ш.',
    city: 'Новотроицк',
    date: '2025-06-01',
    rating: 5,
    text: 'Брал расходники — PLA и PETG пластик. Цены нормальные, выбор хороший. Что удобно — можно заказать по телефону и забрать самовывозом. Буду покупать ещё, когда пластик закончится.',
    avatar: null,
    photo: null,
    verified: false
  }
];

// Средний рейтинг
function getAverageRating() {
  if (!reviews.length) return 0;
  return (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
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

// Генерация аватара (фото или инициал)
function reviewAvatar(r, size) {
  size = size || 48;
  if (r.avatar) {
    return '<img src="' + r.avatar + '" alt="' + r.name + '" class="review-avatar" style="width:'+size+'px;height:'+size+'px;">';
  }
  var initial = r.name.charAt(0).toUpperCase();
  return '<div class="review-avatar-placeholder" style="width:'+size+'px;height:'+size+'px;font-size:'+Math.round(size*0.42)+'px;">'+initial+'</div>';
}

// Карточка отзыва для главной (компактная)
function reviewCardSmall(r, root) {
  root = root || '';
  var avatarSrc = r.avatar ? root + r.avatar : '';
  var photoHtml = r.photo ? '<div class="review-photo-wrap"><img src="'+root+r.photo+'" alt="Фото от '+r.name+'" class="review-photo-thumb" onclick="openReviewPhoto(this.src)"></div>' : '';
  var verified = r.verified ? '<span class="review-verified"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> Подтверждённый отзыв</span>' : '';
  // Fix avatar path
  var avatarHtml;
  if (r.avatar) {
    avatarHtml = '<img src="'+root+r.avatar+'" alt="'+r.name+'" class="review-avatar" style="width:48px;height:48px;">';
  } else {
    avatarHtml = '<div class="review-avatar-placeholder" style="width:48px;height:48px;font-size:20px;">'+r.name.charAt(0)+'</div>';
  }
  return '<div class="review-card">' +
    '<div class="review-card-header">' +
      avatarHtml +
      '<div class="review-card-author">' +
        '<div class="review-card-name">'+r.name+'</div>' +
        '<div class="review-card-meta">'+r.city+' · '+formatReviewDate(r.date)+'</div>' +
      '</div>' +
    '</div>' +
    '<div class="review-card-stars">'+starsHtml(r.rating)+'</div>' +
    '<div class="review-card-text">'+r.text+'</div>' +
    photoHtml +
    verified +
  '</div>';
}

// Карточка отзыва для страницы отзывов (полная)
function reviewCardFull(r, root) {
  root = root || '../';
  var avatarHtml;
  if (r.avatar) {
    avatarHtml = '<img src="'+root+r.avatar+'" alt="'+r.name+'" class="review-avatar" style="width:56px;height:56px;">';
  } else {
    avatarHtml = '<div class="review-avatar-placeholder" style="width:56px;height:56px;font-size:23px;">'+r.name.charAt(0)+'</div>';
  }
  var photoHtml = r.photo ? '<div class="review-photo-wrap-full"><img src="'+root+r.photo+'" alt="Фото от '+r.name+'" class="review-photo-full" onclick="openReviewPhoto(this.src)"></div>' : '';
  var verified = r.verified ? '<span class="review-verified"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> Подтверждённый отзыв</span>' : '';
  return '<div class="review-card review-card--full">' +
    '<div class="review-card-header">' +
      avatarHtml +
      '<div class="review-card-author">' +
        '<div class="review-card-name">'+r.name+'</div>' +
        '<div class="review-card-meta">'+r.city+' · '+formatReviewDate(r.date)+'</div>' +
      '</div>' +
      '<div class="review-card-stars-right">'+starsHtml(r.rating, 16)+'</div>' +
    '</div>' +
    '<div class="review-card-text-full">'+r.text+'</div>' +
    photoHtml +
    verified +
  '</div>';
}

// Блок рейтинга для карточки товара (звёзды + ссылка)
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

// Лайтбокс для фото отзыва
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

// ===== CAROUSEL FOR HOMEPAGE =====
// Usage: initReviewsCarousel('reviews-home', { root: '', max: 6 })
function initReviewsCarousel(containerId, opts) {
  opts = opts || {};
  var root = opts.root || '';
  var max = opts.max || 6;
  var container = document.getElementById(containerId);
  if (!container || !reviews.length) return;

  var avg = getAverageRating();
  var count = reviews.length;
  var shown = reviews.slice(0, max);

  var html = '' +
    '<div class="section-head">' +
      '<div>' +
        '<h2 class="section-title">Отзывы <span>покупателей</span></h2>' +
        '<div class="reviews-overall" style="margin-top:10px">' +
          '<span class="reviews-overall-num">' + avg + '</span>' +
          '<span class="reviews-overall-stars">' + starsHtml(5, 18) + '</span>' +
          '<span class="reviews-overall-count">' + count + ' отзывов</span>' +
        '</div>' +
      '</div>' +
      '<a href="' + root + 'pages/reviews.html" class="link-more">Все отзывы</a>' +
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

  // Carousel scroll buttons
  var track = document.getElementById('rev-track');
  var prevBtn = document.getElementById('rev-prev');
  var nextBtn = document.getElementById('rev-next');
  if (track && prevBtn && nextBtn) {
    var scrollAmount = function() {
      var card = track.querySelector('.review-card');
      return card ? card.offsetWidth + 16 : 300;
    };
    prevBtn.addEventListener('click', function() { track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' }); });
    nextBtn.addEventListener('click', function() { track.scrollBy({ left: scrollAmount(), behavior: 'smooth' }); });
  }
}
