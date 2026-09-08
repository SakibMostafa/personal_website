(() => {
  'use strict';

  document.documentElement.classList.add('has-js');

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const automaticRevealSelector = [
    '.section > .a-section-label',
    '.section > .h1-page',
    '.section > .intro',
    '.nature-item',
    '.pub-group-head',
    '.pub-item',
    '.course',
    '.mentor-card',
    '.award-row',
    '.patent-list > div',
    '.talk-row',
    '.media-row',
    '.reach-card'
  ].join(',');

  document.querySelectorAll(automaticRevealSelector).forEach((item) => item.classList.add('reveal'));
  const revealItems = [...document.querySelectorAll('.reveal')];

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -36px' });

    revealItems.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index % 3, 2) * 70}ms`;
      revealObserver.observe(item);
    });
  }

  const counters = [...document.querySelectorAll('[data-count]')];
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const countObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const node = entry.target;
        const target = Number(node.dataset.count || 0);
        const suffix = node.dataset.suffix || '';
        const started = performance.now();
        const duration = 850;

        const tick = (time) => {
          const progress = Math.min((time - started) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          node.textContent = `${Math.round(target * eased)}${suffix}`;
          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
        observer.unobserve(node);
      });
    }, { threshold: 0.7 });

    counters.forEach((counter) => countObserver.observe(counter));
  }

  const sectionNavLinks = [...document.querySelectorAll('.nav-link[href^="#"]')];
  if (sectionNavLinks.length && 'IntersectionObserver' in window) {
    const sectionLinkMap = new Map(
      sectionNavLinks.map((link) => [document.querySelector(link.getAttribute('href')), link]).filter(([section]) => section)
    );
    const visibleSections = new Map();
    const setCurrentSection = () => {
      const current = [...visibleSections.entries()]
        .filter(([, visible]) => visible)
        .map(([section]) => section)
        .sort((a, b) => Math.abs(a.getBoundingClientRect().top - 120) - Math.abs(b.getBoundingClientRect().top - 120))[0];
      sectionNavLinks.forEach((link) => {
        const isCurrent = sectionLinkMap.get(current) === link;
        link.classList.toggle('is-active', isCurrent);
        if (isCurrent) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    };
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => visibleSections.set(entry.target, entry.isIntersecting));
      setCurrentSection();
    }, { rootMargin: '-15% 0px -68% 0px', threshold: 0 });
    sectionLinkMap.forEach((link, section) => sectionObserver.observe(section));
  }

  const projectCarousel = document.querySelector('[data-project-carousel]');
  if (projectCarousel) {
    const viewport = projectCarousel.querySelector('[data-carousel-viewport]');
    const track = projectCarousel.querySelector('.project-track');
    const cards = [...projectCarousel.querySelectorAll('.project-card')];
    const previous = projectCarousel.querySelector('[data-carousel-prev]');
    const next = projectCarousel.querySelector('[data-carousel-next]');
    const dots = projectCarousel.querySelector('[data-carousel-dots]');
    const toggle = projectCarousel.querySelector('[data-carousel-toggle]');
    const status = projectCarousel.querySelector('[data-carousel-status]');
    let activeIndex = 0;
    let lastStartIndex = cards.length - 1;
    let userPaused = false;
    let pointerInside = false;
    let focusInside = false;
    let carouselVisible = true;
    let scrollFrame = 0;

    cards.forEach((card, index) => {
      card.setAttribute('role', 'group');
      card.setAttribute('aria-roledescription', 'slide');
      card.setAttribute('aria-label', `${index + 1} of ${cards.length}: ${card.dataset.projectName}`);
    });

    const cardOffset = (index) => Math.min(cards[index].offsetLeft, viewport.scrollWidth - viewport.clientWidth);

    const announce = (index) => {
      status.textContent = `Showing ${cards[index].dataset.projectName}, project ${index + 1} of ${cards.length}.`;
    };

    const updateControls = (announceChange = false) => {
      [...dots.children].forEach((dot, index) => {
        if (index === activeIndex) dot.setAttribute('aria-current', 'true');
        else dot.removeAttribute('aria-current');
      });
      if (announceChange) announce(activeIndex);
    };

    const goTo = (index, announceChange = true) => {
      activeIndex = Math.max(0, Math.min(index, lastStartIndex));
      viewport.scrollTo({ left: cardOffset(activeIndex), behavior: reduceMotion ? 'auto' : 'smooth' });
      updateControls(announceChange);
    };

    const rebuildPagination = () => {
      const firstCard = cards[0];
      if (!firstCard) return;
      const trackStyle = window.getComputedStyle(track);
      const gap = parseFloat(trackStyle.columnGap || trackStyle.gap) || 0;
      const visibleCards = Math.max(1, Math.round((viewport.clientWidth + gap) / (firstCard.getBoundingClientRect().width + gap)));
      lastStartIndex = Math.max(0, cards.length - visibleCards);
      activeIndex = Math.min(activeIndex, lastStartIndex);
      dots.replaceChildren();
      for (let index = 0; index <= lastStartIndex; index += 1) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'project-dot';
        dot.setAttribute('aria-label', `Show projects beginning with ${cards[index].dataset.projectName}`);
        dot.addEventListener('click', () => goTo(index));
        dots.append(dot);
      }
      viewport.scrollTo({ left: cardOffset(activeIndex), behavior: 'auto' });
      updateControls();
    };

    const step = (direction) => {
      const target = direction > 0
        ? (activeIndex >= lastStartIndex ? 0 : activeIndex + 1)
        : (activeIndex <= 0 ? lastStartIndex : activeIndex - 1);
      goTo(target);
    };

    previous.addEventListener('click', () => step(-1));
    next.addEventListener('click', () => step(1));
    viewport.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      step(event.key === 'ArrowRight' ? 1 : -1);
    });
    viewport.addEventListener('scroll', () => {
      if (scrollFrame) cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(() => {
        let closest = 0;
        let distance = Number.POSITIVE_INFINITY;
        for (let index = 0; index <= lastStartIndex; index += 1) {
          const candidate = Math.abs(viewport.scrollLeft - cardOffset(index));
          if (candidate < distance) {
            closest = index;
            distance = candidate;
          }
        }
        if (closest !== activeIndex) {
          activeIndex = closest;
          updateControls();
        }
      });
    }, { passive: true });

    projectCarousel.addEventListener('pointerenter', () => { pointerInside = true; });
    projectCarousel.addEventListener('pointerleave', () => { pointerInside = false; });
    projectCarousel.addEventListener('focusin', () => { focusInside = true; });
    projectCarousel.addEventListener('focusout', (event) => {
      if (!projectCarousel.contains(event.relatedTarget)) focusInside = false;
    });

    if (reduceMotion) {
      userPaused = true;
      toggle.textContent = 'Rotation disabled';
      toggle.disabled = true;
    } else {
      toggle.addEventListener('click', () => {
        userPaused = !userPaused;
        toggle.setAttribute('aria-pressed', String(userPaused));
        toggle.textContent = userPaused ? 'Resume rotation' : 'Pause rotation';
      });
      window.setInterval(() => {
        if (!userPaused && !pointerInside && !focusInside && carouselVisible && !document.hidden) step(1);
      }, 6500);
    }

    if ('IntersectionObserver' in window) {
      const carouselObserver = new IntersectionObserver((entries) => {
        carouselVisible = entries[0].isIntersecting;
      }, { threshold: 0.2 });
      carouselObserver.observe(projectCarousel);
    }

    if ('ResizeObserver' in window) {
      const resizeObserver = new ResizeObserver(rebuildPagination);
      resizeObserver.observe(viewport);
    } else {
      window.addEventListener('resize', rebuildPagination, { passive: true });
    }
    rebuildPagination();
  }

  const heroMap = document.querySelector('.hero-map');
  if (heroMap && !reduceMotion && window.matchMedia('(pointer: fine)').matches) {
    const moveMap = (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 12;
      const y = (event.clientY / window.innerHeight - 0.5) * 10;
      heroMap.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    window.addEventListener('pointermove', moveMap, { passive: true });
  }

  const collaboratorExplorer = document.querySelector('[data-collab-explorer]');
  if (collaboratorExplorer) {
    const collaboratorTree = {
      id: 'world',
      label: 'All regions',
      context: 'Selected current and longstanding collaborators',
      children: [
        {
          id: 'usa',
          label: 'United States',
          meta: 'Current biomedical AI collaborations',
          children: [
            {
              id: 'stanford',
              label: 'Stanford',
              place: 'Stanford, California',
              note: 'Current collaborators represented across Dynomap, scVision, knowledge-graph learning, cancer AI, and related biomedical projects.',
              people: [
                ['Md Tauhidul Islam', 'Radiation Oncology'],
                ['Lei Xing', 'Radiation Oncology'],
                ['James Zou', 'Biomedical Data Science'],
                ['Ash A. Alizadeh', 'Medicine · Oncology'],
                ['Maximilian Diehn', 'Radiation Oncology'],
                ['Tarik F. Massoud', 'Neuroradiology'],
                ['Ehsan Adeli', 'Psychiatry and Behavioral Sciences'],
                ['Jiajun Wu', 'Computer Science'],
                ['Joseph Liao', 'Urology'],
                ['Ridvan Yesiloglu', 'scVision collaborator'],
                ['Yuming Jiang', 'Dynomap collaborator'],
                ['Ariana Rahman', 'GenoIntig collaborator']
              ]
            },
            {
              id: 'us-academic',
              label: 'U.S. academic network',
              place: 'United States',
              note: 'Collaborations represented in plant genomics and computational biology publications.',
              people: [
                ['Murukarthick Jayakodi', 'Plant genomics · Texas A&M University']
              ]
            },
            {
              id: 'us-industry',
              label: 'U.S. industry',
              place: 'United States',
              note: 'Selected industrial research relationships.',
              people: [
                ['William Van Der Camp', 'Google']
              ]
            }
          ]
        },
        {
          id: 'canada',
          label: 'Canada',
          meta: 'Academic, government, and translational research',
          children: [
            {
              id: 'saskatchewan',
              label: 'Saskatchewan',
              place: 'Saskatoon, Saskatchewan',
              note: 'Longstanding collaborations in explainable AI, plant phenotyping, genomics, and network-based biomedical learning.',
              people: [
                ['FangXiang Wu', 'University of Saskatchewan'],
                ['Debajyoti Mondal', 'University of Saskatchewan'],
                ['Ian Stavness', 'University of Saskatchewan'],
                ['Leon Kochian', 'University of Saskatchewan'],
                ['Julita Vassileva', 'University of Saskatchewan'],
                ['Amin Elshorbagy', 'University of Saskatchewan'],
                ['Karim Panjvani', 'Plant phenotyping collaborator']
              ]
            },
            {
              id: 'nrc-gifs',
              label: 'NRC & GIFS',
              place: 'Saskatoon, Saskatchewan',
              note: 'Government and institute collaborations in crop genomics and computational phenotyping.',
              people: [
                ['Sateesh Kagale', 'National Research Council Canada'],
                ['Pankaj Bhowmik', 'National Research Council Canada'],
                ['David Konkin', 'Global Institute for Food Security'],
                ['Sampath Perumal', 'Global Institute for Food Security']
              ]
            },
            {
              id: 'manitoba',
              label: 'Manitoba',
              place: 'Winnipeg, Manitoba',
              note: 'Collaborations in plant imaging, model interpretation, and scientific instrumentation.',
              people: [
                ['Christopher Henry', 'University of Manitoba'],
                ['Christopher Bidinosti', 'University of Manitoba'],
                ['Michael Alexander Beck', 'University of Manitoba']
              ]
            },
            {
              id: 'calgary',
              label: 'Calgary',
              place: 'Calgary, Alberta',
              note: 'Plant science and computational biology collaborations.',
              people: [
                ['Marcus Samuel', 'University of Calgary'],
                ['Muhammad Jamshed', 'University of Calgary']
              ]
            },
            {
              id: 'canada-applied',
              label: 'Applied research',
              place: 'Canada',
              note: 'Agriculture, translational research, and Canadian technology collaborations.',
              people: [
                ['Raju Soolanayakanahally', 'Agriculture and Agri-Food Canada'],
                ['Jarin Tasnim', 'Calian AT']
              ]
            }
          ]
        },
        {
          id: 'international',
          label: 'International',
          meta: 'Plant genomics and computational biology',
          children: [
            {
              id: 'bangladesh',
              label: 'Bangladesh',
              place: 'Dhaka, Bangladesh',
              note: 'Academic collaboration in biomedical engineering and artificial intelligence.',
              people: [
                ['Taufiq Hasan', 'Biomedical Engineering · BUET']
              ]
            },
            {
              id: 'australia',
              label: 'Australia',
              place: 'Perth, Australia',
              note: 'International collaboration in crop genomics and biological data science.',
              people: [
                ['Rajeev Varshney', 'Murdoch University']
              ]
            },
            {
              id: 'uk-europe',
              label: 'United Kingdom & Europe',
              place: 'United Kingdom · Spain',
              note: 'Collaborations in plant genomics, population genetics, and computational biology.',
              people: [
                ['Sanu Arora', 'John Innes Centre'],
                ['Laura Botigué', 'CRAG · Barcelona']
              ]
            },
            {
              id: 'global-industry',
              label: 'Global industry',
              place: 'International',
              note: 'Selected cross-sector relationships in genomics and biological data platforms.',
              people: [
                ['Marin Pecar', 'NRGene']
              ]
            }
          ]
        }
      ]
    };

    const breadcrumb = collaboratorExplorer.querySelector('[data-collab-breadcrumb]');
    const backButton = collaboratorExplorer.querySelector('[data-collab-back]');
    const stage = collaboratorExplorer.querySelector('[data-collab-stage]');
    const lines = collaboratorExplorer.querySelector('[data-collab-lines]');
    const nodes = collaboratorExplorer.querySelector('[data-collab-nodes]');
    const context = collaboratorExplorer.querySelector('[data-collab-context]');
    const summary = collaboratorExplorer.querySelector('[data-collab-summary]');
    const detail = collaboratorExplorer.querySelector('[data-collab-detail]');
    const detailClose = collaboratorExplorer.querySelector('[data-collab-detail-close]');
    const detailKicker = collaboratorExplorer.querySelector('[data-collab-detail-kicker]');
    const detailTitle = collaboratorExplorer.querySelector('[data-collab-detail-title]');
    const detailPlace = collaboratorExplorer.querySelector('[data-collab-detail-place]');
    const detailPeople = collaboratorExplorer.querySelector('[data-collab-detail-people]');
    const detailNote = collaboratorExplorer.querySelector('[data-collab-detail-note]');
    const path = [collaboratorTree];

    const countPeople = (node) => {
      if (node.people) return node.people.length;
      return (node.children || []).reduce((total, child) => total + countPeople(child), 0);
    };

    const closeDetail = () => {
      detail.hidden = true;
      nodes.querySelectorAll('.is-selected').forEach((node) => node.classList.remove('is-selected'));
    };

    const showDetail = (item, button) => {
      detailKicker.textContent = 'Collaborator group';
      detailTitle.textContent = item.label;
      detailPlace.textContent = item.place || '';
      detailPeople.replaceChildren();
      item.people.forEach(([name, role]) => {
        const person = document.createElement('li');
        const personName = document.createElement('span');
        const personRole = document.createElement('small');
        personName.textContent = name;
        personRole.textContent = role;
        person.append(personName, personRole);
        detailPeople.append(person);
      });
      detailNote.textContent = item.note || '';
      nodes.querySelectorAll('.is-selected').forEach((node) => node.classList.remove('is-selected'));
      button.classList.add('is-selected');
      detail.hidden = false;
    };

    const nodePosition = (index, total) => {
      if (total === 1) return { x: 50, y: 16 };
      const start = total === 3 ? -90 : -90;
      const angle = (start + (360 / total) * index) * Math.PI / 180;
      return {
        x: 50 + Math.cos(angle) * 35,
        y: 48 + Math.sin(angle) * 35
      };
    };

    const drawLines = () => {
      lines.replaceChildren();
      if (window.matchMedia('(max-width: 700px)').matches) return;
      const stageRect = stage.getBoundingClientRect();
      const originX = stageRect.width * .5;
      const originY = stageRect.height * .48;
      nodes.querySelectorAll('.collab-map-node').forEach((node) => {
        const nodeRect = node.getBoundingClientRect();
        const targetX = nodeRect.left - stageRect.left + nodeRect.width / 2;
        const targetY = nodeRect.top - stageRect.top + nodeRect.height / 2;
        const dx = targetX - originX;
        const dy = targetY - originY;
        const edge = document.createElement('i');
        edge.className = 'collab-edge';
        edge.style.left = `${originX}px`;
        edge.style.top = `${originY}px`;
        edge.style.width = `${Math.hypot(dx, dy)}px`;
        edge.style.transform = `rotate(${Math.atan2(dy, dx)}rad)`;
        lines.append(edge);
      });
    };

    const renderBreadcrumb = () => {
      breadcrumb.replaceChildren();
      path.forEach((item, index) => {
        if (index) {
          const separator = document.createElement('span');
          separator.className = 'collab-breadcrumb-sep';
          separator.textContent = '/';
          breadcrumb.append(separator);
        }
        const crumb = document.createElement('button');
        crumb.type = 'button';
        crumb.textContent = item.label;
        if (index === path.length - 1) crumb.setAttribute('aria-current', 'page');
        else crumb.addEventListener('click', () => {
          path.splice(index + 1);
          render();
        });
        breadcrumb.append(crumb);
      });
    };

    const render = () => {
      const current = path[path.length - 1];
      const items = [...(current.children || [])];
      if (current.id === 'world') {
        const regionOrder = { canada: 0, usa: 1, international: 2 };
        items.sort((left, right) => regionOrder[left.id] - regionOrder[right.id]);
      }
      closeDetail();
      renderBreadcrumb();
      backButton.disabled = path.length === 1;
      context.textContent = current.context || current.label;
      summary.textContent = `${items.length} ${path.length === 1 ? 'regions' : 'groups'} · ${countPeople(current)} named collaborators`;
      stage.classList.add('is-switching');

      window.setTimeout(() => {
        nodes.replaceChildren();
        items.forEach((item, index) => {
          const position = nodePosition(index, items.length);
          const button = document.createElement('button');
          button.type = 'button';
          button.className = `collab-map-node collab-map-node--${item.children ? 'branch' : 'leaf'}`;
          button.style.left = `${position.x}%`;
          button.style.top = `${position.y}%`;
          button.dataset.index = String(index);
          button.setAttribute('aria-label', item.children ? `Open ${item.label}` : `View collaborators in ${item.label}`);

          const type = document.createElement('span');
          type.className = 'collab-node-type';
          type.textContent = item.children ? 'Region' : 'Collaborator group';
          const title = document.createElement('strong');
          title.textContent = item.label;
          const meta = document.createElement('span');
          meta.className = 'collab-node-meta';
          meta.textContent = item.meta || `${item.people.length} named collaborator${item.people.length === 1 ? '' : 's'}`;
          const action = document.createElement('span');
          action.className = 'collab-node-action';
          action.textContent = item.children ? `Open ${item.children.length} groups →` : 'View people +';
          button.append(type, title, meta, action);
          button.addEventListener('click', () => {
            if (item.children) {
              path.push(item);
              render();
            } else showDetail(item, button);
          });
          nodes.append(button);
        });

        stage.classList.remove('is-switching');
        window.requestAnimationFrame(drawLines);
      }, reduceMotion ? 0 : 150);
    };

    backButton.addEventListener('click', () => {
      if (path.length > 1) {
        path.pop();
        render();
      }
    });
    detailClose.addEventListener('click', closeDetail);
    nodes.addEventListener('keydown', (event) => {
      const buttons = [...nodes.querySelectorAll('.collab-map-node')];
      const currentIndex = buttons.indexOf(document.activeElement);
      if (currentIndex < 0) return;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault();
        buttons[(currentIndex + 1) % buttons.length].focus();
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault();
        buttons[(currentIndex - 1 + buttons.length) % buttons.length].focus();
      }
    });
    collaboratorExplorer.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      if (!detail.hidden) closeDetail();
      else if (path.length > 1) {
        path.pop();
        render();
      }
    });
    window.addEventListener('resize', drawLines, { passive: true });
    render();
  }

  const scrollToCurrentHash = () => {
    if (!window.location.hash) return;
    const targetId = decodeURIComponent(window.location.hash.slice(1));
    const target = document.getElementById(targetId);
    if (!target) return;
    const root = document.documentElement;
    const previousBehavior = root.style.scrollBehavior;
    const nav = document.querySelector('.nav');
    root.style.scrollBehavior = 'auto';
    window.scrollTo(0, Math.max(0, target.offsetTop - (nav?.offsetHeight || 0)));
    window.requestAnimationFrame(() => { root.style.scrollBehavior = previousBehavior; });
  };

  scrollToCurrentHash();
  if (document.readyState !== 'complete') {
    window.addEventListener('load', () => {
      scrollToCurrentHash();
      window.setTimeout(scrollToCurrentHash, 180);
    }, { once: true });
  }
  window.addEventListener('hashchange', scrollToCurrentHash);

  document.querySelectorAll('a[href^="#"], a[href*="index.html#"]').forEach((link) => {
    link.addEventListener('click', () => {
      const nav = document.querySelector('.nav');
      if (nav) nav.classList.remove('is-open');
    });
  });
})();
