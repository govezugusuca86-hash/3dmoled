/* ============================================================
   HERO LAYER BUILD ANIMATION — 3Dxob
   Абстрактная 3D-модель, собирающаяся послойно на фоне баннера.
   Vanilla JS + Canvas 2D, без библиотек.
   ============================================================ */
(function () {
  'use strict';

  // ---------- НАСТРАИВАЕМЫЕ ПАРАМЕТРЫ ----------
  const CONFIG = {
    LAYERS_DESKTOP: 36,          // количество слоёв на desktop
    LAYERS_MOBILE: 22,           // количество слоёв на мобильных
    BUILD_DURATION: 6000,        // длительность построения объекта (мс)
    HOLD_DURATION: 1500,         // пауза после завершения построения (мс)
    DISSOLVE_DURATION: 1200,     // длительность растворения (мс)
    PARTICLES: 2,                // количество "сопел" экструдера
    OBJECT_SCALE_DESKTOP: 0.55,  // доля ширины hero, которую занимает объект
    OBJECT_SCALE_MOBILE: 0.85,   // доля ширины hero на мобильных
    OBJECT_OFFSET_X: 0.22,       // смещение объекта вправо от центра (доля ширины)
    OBJECT_OFFSET_X_MOBILE: 0,   // на мобильных — по центру
    OPACITY_BASE: 0.10,          // прозрачность построенных слоёв
    OPACITY_GHOST: 0.04,         // прозрачность будущих (ещё непостроенных) слоёв
    OPACITY_ACTIVE: 0.32,        // прозрачность активного слоя
    OPACITY_MOBILE_MULT: 0.7,    // множитель прозрачности на мобильных
    HOVER_RADIUS: 160,           // радиус реакции hover (px)
    HOVER_BOOST: 0.25,           // насколько ярче становятся слои в зоне hover
    GREEN: '22, 163, 74',        // акцентный цвет (rgb)
    PERSPECTIVE_SKEW: 0.18       // степень перспективного скоса (0 — плоско, 0.3 — сильно)
  };

  // ---------- СОСТОЯНИЕ ----------
  const hero = document.querySelector('.hero-section');
  if (!hero) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover: none)').matches;

  let canvas, ctx;
  let w = 0, h = 0, dpr = 1;
  let layers = [];        // массив слоёв объекта
  let particles = [];     // "сопла" экструдера
  let mouse = { x: -9999, y: -9999, active: false };
  let startTime = 0;
  let rafId = null;

  // ---------- ИНИЦИАЛИЗАЦИЯ ----------
  function init() {
    canvas = document.createElement('canvas');
    canvas.className = 'hero-canvas';
    hero.insertBefore(canvas, hero.firstChild);
    ctx = canvas.getContext('2d');

    resize();
    buildLayers();
    buildParticles();

    if (!isTouch) {
      hero.addEventListener('mousemove', onMouseMove, { passive: true });
      hero.addEventListener('mouseleave', onMouseLeave, { passive: true });
    }
    window.addEventListener('resize', debounce(onResize, 150));

    startTime = performance.now();

    if (prefersReducedMotion) {
      // Один кадр в "полностью построенном" виде, без анимации
      drawStatic();
    } else {
      loop();
    }
  }

  // ---------- РАЗМЕРЫ ----------
  function resize() {
    const rect = hero.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2); // ограничим dpr для перфа
    w = rect.width;
    h = rect.height;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function onResize() {
    resize();
    buildLayers();
    buildParticles();
  }

  // ---------- ПОСТРОЕНИЕ ОБЪЕКТА ----------
  // Объект — абстрактная фигура: низ шире, талия уже, верх чуть расширяется.
  // Каждый слой — замкнутая ломаная (эллипс с лёгкой неровностью), скошенная по перспективе.

  function isMobile() {
    return w < 768;
  }

  function buildLayers() {
    const mobile = isMobile();
    const count = mobile ? CONFIG.LAYERS_MOBILE : CONFIG.LAYERS_DESKTOP;
    const scale = mobile ? CONFIG.OBJECT_SCALE_MOBILE : CONFIG.OBJECT_SCALE_DESKTOP;
    const offsetX = mobile ? CONFIG.OBJECT_OFFSET_X_MOBILE : CONFIG.OBJECT_OFFSET_X;

    const objW = w * scale;
    const objH = h * 0.78;
    const cx = w / 2 + w * offsetX;
    const cyTop = h * 0.11;        // верхняя граница объекта
    const cyBot = cyTop + objH;     // нижняя граница

    layers = [];
    for (let i = 0; i < count; i++) {
      const t = i / (count - 1); // 0..1 снизу вверх (0 = нижний слой)
      const tNorm = 1 - t;        // 1 снизу, 0 сверху для удобства формулы

      // Профиль ширины: низ широкий, талия в середине, верх чуть расширяется
      // ширина = base * silhouette(t)
      const silhouette = profileWidth(t);
      const radiusX = (objW / 2) * silhouette;
      const radiusY = radiusX * 0.22; // эллипс — приплюснутый, имитация перспективного вида сверху

      const y = cyBot - t * objH; // по высоте: t=0 → низ, t=1 → верх

      // Точки слоя — замкнутая ломаная с лёгким шумом
      const points = [];
      const SEG = mobile ? 36 : 48;
      const noiseSeed = i * 13.37;
      for (let s = 0; s <= SEG; s++) {
        const a = (s / SEG) * Math.PI * 2;
        const noise = Math.sin(a * 3 + noiseSeed) * 0.015 + Math.cos(a * 5 + noiseSeed * 0.7) * 0.01;
        const rx = radiusX * (1 + noise);
        const ry = radiusY * (1 + noise);
        const px = cx + Math.cos(a) * rx;
        // Перспективный скос: задние точки слоя (большой sin(a)) сдвигаем вверх
        const skew = Math.sin(a) * ry * CONFIG.PERSPECTIVE_SKEW;
        const py = y + Math.sin(a) * ry - skew;
        points.push({ x: px, y: py });
      }

      layers.push({
        y,
        cx,
        radiusX,
        radiusY,
        points,
        t,           // позиция слоя 0..1 снизу вверх
        index: i
      });
    }
  }

  // Профиль ширины объекта по высоте t (0=низ, 1=верх).
  // Можно менять формулу, чтобы получить другую форму.
  function profileWidth(t) {
    // Гладкий профиль: широкий низ → талия около 0.55 → расширение к верху
    const base = 0.55 + 0.45 * Math.cos(t * Math.PI * 1.1);
    const waist = 1 - Math.pow(Math.sin(t * Math.PI), 2) * 0.25;
    return Math.max(0.18, base * waist * (0.85 + 0.15 * Math.sin(t * Math.PI * 2)));
  }

  // ---------- ЧАСТИЦЫ (СОПЛО ЭКСТРУДЕРА) ----------
  function buildParticles() {
    particles = [];
    for (let i = 0; i < CONFIG.PARTICLES; i++) {
      particles.push({
        angle: (i / CONFIG.PARTICLES) * Math.PI * 2,
        speed: 0.6 + Math.random() * 0.4, // оборотов в секунду
        offsetX: 0,
        offsetY: 0
      });
    }
  }

  // ---------- ОБРАБОТЧИКИ КУРСОРА ----------
  function onMouseMove(e) {
    const rect = hero.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
  }

  function onMouseLeave() {
    mouse.active = false;
    mouse.x = -9999;
    mouse.y = -9999;
  }

  // ---------- ОСНОВНОЙ ЦИКЛ ----------
  function loop() {
    rafId = requestAnimationFrame(loop);
    const now = performance.now();
    const elapsed = now - startTime;
    const cycleLen = CONFIG.BUILD_DURATION + CONFIG.HOLD_DURATION + CONFIG.DISSOLVE_DURATION;
    const cyclePos = elapsed % cycleLen;

    // Фаза цикла: build → hold → dissolve
    let buildProgress = 0;   // 0..1 — какая доля объекта построена
    let dissolveAlpha = 1;   // 1..0 — глобальный множитель альфы при растворении

    if (cyclePos < CONFIG.BUILD_DURATION) {
      buildProgress = easeInOutCubic(cyclePos / CONFIG.BUILD_DURATION);
    } else if (cyclePos < CONFIG.BUILD_DURATION + CONFIG.HOLD_DURATION) {
      buildProgress = 1;
    } else {
      const dt = (cyclePos - CONFIG.BUILD_DURATION - CONFIG.HOLD_DURATION) / CONFIG.DISSOLVE_DURATION;
      buildProgress = 1;
      dissolveAlpha = 1 - easeInOutCubic(dt);
    }

    draw(buildProgress, dissolveAlpha, now);
  }

  // ---------- ОТРИСОВКА ----------
  function draw(buildProgress, dissolveAlpha, now) {
    ctx.clearRect(0, 0, w, h);

    const mobile = isMobile();
    const opacityMult = mobile ? CONFIG.OPACITY_MOBILE_MULT : 1;

    // Индекс активного слоя — тот, который "печатается" прямо сейчас
    const activeIndex = Math.floor(buildProgress * (layers.length - 1));
    // Прогресс именно активного слоя (для эффекта "рисования по слою")
    const activeLocal = (buildProgress * (layers.length - 1)) - activeIndex;

    // === 1. Призрачные контуры будущих слоёв (то, что ещё не построено) ===
    if (dissolveAlpha > 0.05) {
      const ghostAlpha = CONFIG.OPACITY_GHOST * opacityMult * dissolveAlpha;
      ctx.strokeStyle = `rgba(${CONFIG.GREEN}, ${ghostAlpha})`;
      ctx.lineWidth = 0.6;
      for (let i = activeIndex + 1; i < layers.length; i++) {
        // показываем призрак не сразу всех слоёв, а только ближайших к активному
        const distFromActive = (i - activeIndex) / layers.length;
        if (distFromActive > 0.6) continue;
        drawLayer(layers[i], 1);
      }
    }

    // === 2. Построенные слои ===
    for (let i = 0; i <= activeIndex && i < layers.length; i++) {
      const layer = layers[i];
      let alpha = CONFIG.OPACITY_BASE * opacityMult * dissolveAlpha;

      // Hover-усиление: если курсор близок к центру слоя
      if (mouse.active && !isTouch) {
        const dx = mouse.x - layer.cx;
        const dy = mouse.y - layer.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONFIG.HOVER_RADIUS) {
          const k = 1 - dist / CONFIG.HOVER_RADIUS;
          alpha += CONFIG.HOVER_BOOST * k * dissolveAlpha;
        }
      }

      // Активный слой светится сильнее
      const isActive = (i === activeIndex);
      if (isActive && buildProgress < 1) {
        alpha = CONFIG.OPACITY_ACTIVE * opacityMult * dissolveAlpha;
      }

      ctx.strokeStyle = `rgba(${CONFIG.GREEN}, ${alpha})`;
      ctx.lineWidth = isActive ? 1.2 : 0.8;

      // Активный слой рисуется не целиком, а частично — как "печать в процессе"
      const drawPortion = isActive && buildProgress < 1 ? activeLocal : 1;
      drawLayer(layer, drawPortion);
    }

    // === 3. Свечение активного слоя (мягкий ореол) ===
    if (buildProgress < 1 && dissolveAlpha > 0.5) {
      const layer = layers[activeIndex];
      if (layer) {
        const glowAlpha = 0.06 * opacityMult * dissolveAlpha;
        ctx.strokeStyle = `rgba(${CONFIG.GREEN}, ${glowAlpha})`;
        ctx.lineWidth = 6;
        drawLayer(layer, activeLocal);
      }
    }

    // === 4. Частицы экструдера на активном слое ===
    if (buildProgress < 1 && buildProgress > 0.02 && dissolveAlpha > 0.5) {
      const layer = layers[activeIndex];
      if (layer) {
        const tSec = now / 1000;
        for (const p of particles) {
          const a = p.angle + tSec * p.speed * Math.PI * 2;
          // Позиция точки на эллипсе активного слоя с учётом скоса
          let px = layer.cx + Math.cos(a) * layer.radiusX;
          const skew = Math.sin(a) * layer.radiusY * CONFIG.PERSPECTIVE_SKEW;
          let py = layer.y + Math.sin(a) * layer.radiusY - skew;

          // Лёгкое притяжение к курсору
          if (mouse.active && !isTouch) {
            const dx = mouse.x - px;
            const dy = mouse.y - py;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < CONFIG.HOVER_RADIUS) {
              const pull = (1 - dist / CONFIG.HOVER_RADIUS) * 0.25;
              px += dx * pull;
              py += dy * pull;
            }
          }

          // Точка с мягким ореолом
          ctx.beginPath();
          ctx.arc(px, py, 6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${CONFIG.GREEN}, ${0.12 * dissolveAlpha})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(px, py, 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${CONFIG.GREEN}, ${0.5 * dissolveAlpha})`;
          ctx.fill();
        }
      }
    }
  }

  // Отрисовка одного слоя (часть его контура — от 0 до 1)
  function drawLayer(layer, portion) {
    if (portion <= 0) return;
    const pts = layer.points;
    const last = Math.floor((pts.length - 1) * portion);
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i <= last; i++) {
      ctx.lineTo(pts[i].x, pts[i].y);
    }
    // Если portion = 1 — замыкаем
    if (portion >= 0.999) {
      ctx.closePath();
    }
    ctx.stroke();
  }

  // Статичный кадр для prefers-reduced-motion
  function drawStatic() {
    ctx.clearRect(0, 0, w, h);
    const opacityMult = isMobile() ? CONFIG.OPACITY_MOBILE_MULT : 1;
    ctx.strokeStyle = `rgba(${CONFIG.GREEN}, ${CONFIG.OPACITY_BASE * opacityMult})`;
    ctx.lineWidth = 0.8;
    for (const layer of layers) {
      drawLayer(layer, 1);
    }
  }

  // ---------- УТИЛИТЫ ----------
  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function debounce(fn, delay) {
    let timer = null;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, arguments), delay);
    };
  }

  // ---------- СТАРТ ----------
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
