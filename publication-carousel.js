(() => {
  'use strict';

  const carousel = document.querySelector('[data-paper-carousel]');
  if (!carousel) return;

  const stage = carousel.querySelector('[data-paper-stage]');
  const slides = [...carousel.querySelectorAll('[data-paper-slide]')];
  const details = [...carousel.querySelectorAll('[data-paper-detail]')];
  const previous = carousel.querySelector('[data-paper-previous]');
  const next = carousel.querySelector('[data-paper-next]');
  const counter = carousel.querySelector('[data-paper-counter]');
  const dots = carousel.querySelector('[data-paper-dots]');
  const toggle = carousel.querySelector('[data-paper-toggle]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const intervalDuration = 7600;
  let activeIndex = 0;
  let timer = 0;
  let userPaused = reduceMotion;
  let pointerInside = false;
  let focusInside = false;
  let dragStart = null;

  if (!stage || slides.length === 0 || slides.length !== details.length) return;

  const shortestOffset = (index) => {
    let offset = index - activeIndex;
    const midpoint = slides.length / 2;
    if (offset > midpoint) offset -= slides.length;
    if (offset < -midpoint) offset += slides.length;
    return offset;
  };

  const stopTimer = () => {
    if (!timer) return;
    window.clearInterval(timer);
    timer = 0;
  };

  const startTimer = () => {
    stopTimer();
    if (userPaused || pointerInside || focusInside || document.hidden || reduceMotion) return;
    timer = window.setInterval(() => select(activeIndex + 1, false), intervalDuration);
  };

  const render = (announce = true) => {
    slides.forEach((slide, index) => {
      const offset = shortestOffset(index);
      const link = slide.querySelector('a');
      slide.dataset.paperOffset = Math.abs(offset) <= 2 ? String(offset) : 'hidden';
      slide.setAttribute('aria-hidden', offset === 0 ? 'false' : 'true');
      slide.setAttribute('aria-label', `${index + 1} of ${slides.length}: ${slide.dataset.paperName}`);
      if (link) link.tabIndex = offset === 0 ? 0 : -1;
    });

    details.forEach((detail, index) => {
      const isActive = index === activeIndex;
      detail.classList.toggle('is-active', isActive);
      detail.hidden = !isActive;
    });

    [...dots.children].forEach((dot, index) => {
      const isActive = index === activeIndex;
      dot.setAttribute('aria-current', isActive ? 'true' : 'false');
      dot.tabIndex = isActive ? 0 : -1;
    });

    const current = String(activeIndex + 1).padStart(2, '0');
    const total = String(slides.length).padStart(2, '0');
    counter.textContent = `${current} / ${total}`;
    if (announce) counter.setAttribute('aria-label', `Showing ${slides[activeIndex].dataset.paperName}, manuscript ${activeIndex + 1} of ${slides.length}`);
  };

  function select(index, restart = true) {
    activeIndex = (index + slides.length) % slides.length;
    render();
    if (restart) startTimer();
  }

  slides.forEach((slide, index) => {
    const link = slide.querySelector('a');
    slide.setAttribute('role', 'group');
    slide.setAttribute('aria-roledescription', 'slide');
    if (!link) return;
    link.addEventListener('click', (event) => {
      if (index === activeIndex) return;
      event.preventDefault();
      select(index);
    });
  });

  slides.forEach((slide, index) => {
    const dot = document.createElement('button');
    dot.className = 'paper-dot';
    dot.type = 'button';
    dot.setAttribute('aria-label', `Show ${slide.dataset.paperName}`);
    dot.addEventListener('click', () => select(index));
    dots.appendChild(dot);
  });

  previous.addEventListener('click', () => select(activeIndex - 1));
  next.addEventListener('click', () => select(activeIndex + 1));

  stage.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      select(activeIndex - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      select(activeIndex + 1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      select(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      select(slides.length - 1);
    }
  });

  stage.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    dragStart = { x: event.clientX, y: event.clientY };
  });

  stage.addEventListener('pointerup', (event) => {
    if (!dragStart) return;
    const deltaX = event.clientX - dragStart.x;
    const deltaY = event.clientY - dragStart.y;
    dragStart = null;
    if (Math.abs(deltaX) < 42 || Math.abs(deltaX) < Math.abs(deltaY)) return;
    select(activeIndex + (deltaX < 0 ? 1 : -1));
  });

  stage.addEventListener('pointercancel', () => { dragStart = null; });

  carousel.addEventListener('pointerenter', () => {
    pointerInside = true;
    stopTimer();
  });
  carousel.addEventListener('pointerleave', () => {
    pointerInside = false;
    startTimer();
  });
  carousel.addEventListener('focusin', () => {
    focusInside = true;
    stopTimer();
  });
  carousel.addEventListener('focusout', (event) => {
    if (carousel.contains(event.relatedTarget)) return;
    focusInside = false;
    startTimer();
  });

  toggle.addEventListener('click', () => {
    userPaused = !userPaused;
    toggle.setAttribute('aria-pressed', userPaused ? 'true' : 'false');
    toggle.textContent = userPaused ? 'Resume rotation' : 'Pause rotation';
    if (userPaused) stopTimer();
    else startTimer();
  });

  document.addEventListener('visibilitychange', startTimer);
  render(false);
  startTimer();
})();
