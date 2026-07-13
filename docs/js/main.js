// ---------------------------------------------------------------------
// Single source of truth for every tool
// ---------------------------------------------------------------------
const SOFTWARE = {
  ai:         { name: 'Illustrator',  color: 'var(--ai)',        icon: 'images/projects/logos/AI_Logo__Adobe_Illustrator____Design_Week___Logobutik-removebg-preview.png',    use: 'Identité visuelle, vectoriel', level: 90 },
  ps:         { name: 'Photoshop',    color: 'var(--ps)',        icon: 'images/projects/photoshop/Lexique__PS_-removebg-preview.png',                                        use: 'Retouche, compositing',        level: 50 },
  id:         { name: 'InDesign',     color: 'var(--id)',        icon: 'images/projects/ind/Adobe_InDesign_Logo-removebg-preview.png',                                       use: 'Mise en page, rapports, catalogues', level: 85 },
  ae:         { name: 'After Effects',color: 'var(--ae)',        icon: 'images/projects/videos/ae%20icon.png',                                                                use: 'Motion design, animation',     level: 70 },
  au:         { name: 'Audition',     color: 'var(--au)',        icon: 'images/projects/videos/au%20icon.png',                                                                use: 'Habillage sonore, mixage',      level: 60 },
  max:        { name: '3ds Max',      color: 'var(--max)',       icon: 'images/projects/3d/3ds%20max%20icon.png',                                                            use: 'Modélisation, rendu 3D',        level: 80 },
  eclipse:    { name: 'Eclipse',      color: 'var(--eclipse)',   icon: 'images/projects/eclipse/Eclipse_Logo_PNG_Vector__SVG__Free_Download-removebg-preview.png',            use: 'Développement Java',            level: 55 },
  phpmyadmin: { name: 'phpMyAdmin',   color: 'var(--phpmyadmin)',icon: 'images/projects/php.png', use: 'Bases de données MySQL',        level: 70 },
  vscode:     { name: 'VS Code',      color: 'var(--vscode)',    icon: 'images/projects/vs/vs.png',     use: 'Sites web, scripts',             level: 80 },
};

const TYPES = {
  branding: 'Identité',
  print: 'Print',
  web: 'Web',
  '3d': '3D',
  motion: 'Motion',
  audio: 'Audio',
  dev: 'Dev',
};

const state = { projects: [], activeFilters: new Set() };

// Embedded fallback data
const EMBEDDED_PROJECTS = [
  {
    "id": "photoshop-game-flyer",
    "title": "Flyer — Game",
    "type": "print",
    "software": [
      "ps"
    ],
    "year": 2026,
    "dimensions": "A5",
    "description": "Flyer promotionnel pour un événement gaming.",
    "image": "images/projects/photoshop/game.jpeg",
    "link": "",
    "featured": false,
    "order": 20
  },
  {
    "id": "3d-chamber1",
    "title": "Chambre 3D — Scène 1",
    "type": "3d",
    "software": [
      "max"
    ],
    "year": 2026,
    "dimensions": "Rendu 3D",
    "description": "Modélisation et rendu d'un espace intérieur sous 3ds Max.",
    "imageFolder": "3d/chamber1 - room 1",
    "link": "",
    "featured": false,
    "order": 14,
    "images": [
      "images/projects/3d/chamber1%20-%20room%201/finale%201%202.jpg",
      "images/projects/3d/chamber1%20-%20room%201/FINALE%20FINALE%201.jpg",
      "images/projects/3d/chamber1%20-%20room%201/FINALE%20FINALE%202.jpg"
    ]
  },
  {
    "id": "3d-exterieur",
    "title": "Extérieur architectural",
    "type": "3d",
    "software": [
      "max"
    ],
    "year": 2026,
    "dimensions": "Rendu 3D",
    "description": "Rendu extérieur d'un bâtiment, avec variante nocturne.",
    "imageFolder": "3d/exterieur-outside",
    "link": "",
    "featured": false,
    "order": 13,
    "images": [
      "images/projects/3d/exterieur-outside/1%20(1).jpg",
      "images/projects/3d/exterieur-outside/2%20(1).jpg",
      "images/projects/3d/exterieur-outside/4%20(1).jpg",
      "images/projects/3d/exterieur-outside/night.jpg"
    ]
  },
  {
    "id": "architectural-walkthrough",
    "title": "Walkthrough architectural",
    "type": "3d",
    "software": [
      "max",
      "ae"
    ],
    "year": 2026,
    "dimensions": "1920×1080 · rendu 3D",
    "description": "Modélisation et rendu 3D d'un espace intérieur, animation de caméra et composition finale.",
    "imageFolder": "3d/inside",
    "link": "",
    "featured": true,
    "order": 12,
    "images": [
      "images/projects/3d/inside/PHOTO-2026-01-13-22-52-21_1.jpg",
      "images/projects/3d/inside/PHOTO-2026-01-13-22-52-21_2.jpg",
      "images/projects/3d/inside/PHOTO-2026-01-13-22-52-21_3.jpg",
      "images/projects/3d/inside/PHOTO-2026-01-13-22-52-21_4.jpg",
      "images/projects/3d/inside/PHOTO-2026-01-13-22-52-21.jpg"
    ]
  },
  {
    "id": "3d-magasin",
    "title": "Magasin 3D",
    "type": "3d",
    "software": [
      "max"
    ],
    "year": 2026,
    "dimensions": "Rendu 3D",
    "description": "Modélisation et rendu d'un espace commercial.",
    "imageFolder": "3d/magasin-store",
    "link": "",
    "featured": false,
    "order": 11,
    "images": [
      "images/projects/3d/magasin-store/1%20(2).jpg",
      "images/projects/3d/magasin-store/2%20(2).jpg",
      "images/projects/3d/magasin-store/3%20(1).jpg",
      "images/projects/3d/magasin-store/4%20(2).jpg",
      "images/projects/3d/magasin-store/5.jpg"
    ]
  },
  {
    "id": "3d-modeling",
    "title": "Étude de modélisation",
    "type": "3d",
    "software": [
      "max"
    ],
    "year": 2026,
    "dimensions": "Rendu 3D",
    "description": "Étapes de modélisation 3D.",
    "imageFolder": "3d/modeling",
    "link": "",
    "featured": false,
    "order": 10,
    "images": [
      "images/projects/3d/modeling/PHOTO-2026-01-13-22-42-52%20(1).jpg",
      "images/projects/3d/modeling/PHOTO-2026-01-13-22-42-52.jpg"
    ]
  },
  {
    "id": "3d-room2",
    "title": "Chambre 3D — Scène 2",
    "type": "3d",
    "software": [
      "max"
    ],
    "year": 2026,
    "dimensions": "Rendu 3D",
    "description": "Modélisation et rendu d'un second espace intérieur.",
    "imageFolder": "3d/room 2",
    "link": "",
    "featured": false,
    "order": 9,
    "images": [
      "images/projects/3d/room%202/1.jpg",
      "images/projects/3d/room%202/2.jpg",
      "images/projects/3d/room%202/3.jpg",
      "images/projects/3d/room%202/4.jpg"
    ]
  },
  {
    "id": "sgtm-brand-guidelines",
    "title": "Identité visuelle — SGTM",
    "type": "print",
    "software": [
      "id",
      "ai"
    ],
    "year": 2026,
    "dimensions": "A4",
    "description": "Guide de marque façon plan technique pour la Société Générale des Travaux du Maroc.",
    "image": "images/projects/logos/sgtm.png",
    "link": "",
    "featured": true,
    "order": 8,
    "isLogo": true
  },
  {
    "id": "logo-concept-1",
    "title": "Identité visuelle — Concept 1",
    "type": "branding",
    "software": [
      "ai"
    ],
    "year": 2026,
    "dimensions": "Vectoriel",
    "description": "Exploration de concept de logo.",
    "image": "images/projects/logos/Artboard 1.png",
    "link": "",
    "featured": false,
    "order": 7,
    "isLogo": true
  },
  {
    "id": "logo-concept-2",
    "title": "Identité visuelle — Concept 2",
    "type": "branding",
    "software": [
      "ai"
    ],
    "year": 2026,
    "dimensions": "Vectoriel",
    "description": "Exploration de concept de logo.",
    "image": "images/projects/logos/Artboard 2.png",
    "link": "",
    "featured": false,
    "order": 6,
    "isLogo": true
  },
  {
    "id": "logo-concept-2b",
    "title": "Identité visuelle — Concept 2, variante",
    "type": "branding",
    "software": [
      "ai"
    ],
    "year": 2026,
    "dimensions": "Vectoriel",
    "description": "Variante du concept de logo.",
    "image": "images/projects/logos/Artboard 2_1.png",
    "link": "",
    "featured": false,
    "order": 5,
    "isLogo": true
  },
  {
    "id": "logo-ck-horizontal",
    "title": "Identité visuelle — Logo CK (horizontal)",
    "type": "branding",
    "software": [
      "ai"
    ],
    "year": 2026,
    "dimensions": "Vectoriel",
    "description": "Création de logo, version horizontale.",
    "image": "images/projects/logos/logo-ck-horizontale.png",
    "link": "",
    "featured": false,
    "order": 4,
    "isLogo": true
  },
  {
    "id": "logo-ck-photo",
    "title": "Identité visuelle — Rafinity",
    "type": "branding",
    "software": [
      "ai"
    ],
    "year": 2026,
    "dimensions": "Vectoriel",
    "description": "Application du logo en contexte.",
    "image": "images/projects/logos/PHOTO-2026-06-19-17-41-33.jpg",
    "link": "",
    "featured": false,
    "order": 3,
    "isLogo": true
  },
  {
    "id": "motion-chebakia",
    "title": "Animation — Chebakia",
    "type": "motion",
    "software": [
      "ae"
    ],
    "year": 2026,
    "dimensions": "Vidéo",
    "description": "Animation motion design.",
    "thumbnail": "images/projects/videos/ch.png",
    "video": "images/projects/videos/animation%20CHEBAKIA.mp4",
    "link": "",
    "featured": false,
    "order": 2
  },
  {
    "id": "motion-hotel",
    "title": "Animation — Hôtel",
    "type": "motion",
    "software": [
      "ae"
    ],
    "year": 2026,
    "dimensions": "Vidéo",
    "description": "Animation motion design.",
    "thumbnail": "images/projects/videos/am.png",
    "video": "images/projects/videos/amine.mp4",
    "link": "",
    "featured": false,
    "order": 2
  },
  {
    "id": "motion-video-1",
    "title": "Animation — OUELMES",
    "type": "motion",
    "software": [
      "ae"
    ],
    "year": 2026,
    "dimensions": "Vidéo",
    "description": "Composition et animation vidéo.",
    "thumbnail": "images/projects/videos/ou.png",
    "video": "images/projects/videos/VIDEO-2025-11-26-20-38-20.mp4",
    "link": "",
    "featured": false,
    "order": 1
  },
  {
    "id": "photoshop-abribus",
    "title": "Mockup — Abribus",
    "type": "print",
    "software": [
      "ps"
    ],
    "year": 2025,
    "dimensions": "Mockup",
    "description": "Mockup d'abribus publicitaire pour la SGTM.",
    "image": "images/projects/photoshop/abribus.jpg",
    "link": "",
    "featured": false,
    "order": 19
  },
  {
    "id": "photoshop-billboard-final",
    "title": "Panneau — Billboard",
    "type": "print",
    "software": [
      "ps"
    ],
    "year": 2025,
    "dimensions": "4×3 m",
    "description": "Design de panneau publicitaire pour la SGTM.",
    "image": "images/projects/photoshop/billboard-final.jpg",
    "link": "",
    "featured": false,
    "order": 18
  },
  {
    "id": "photoshop-billboard2",
    "title": "Panneau — Billboard 2",
    "type": "print",
    "software": [
      "ps"
    ],
    "year": 2025,
    "dimensions": "4×3 m",
    "description": "Variante de panneau publicitaire pour la SGTM.",
    "image": "images/projects/photoshop/billboard2.jpg",
    "link": "",
    "featured": false,
    "order": 17
  },
  {
    "id": "photoshop-portrait",
    "title": "Portrait — Retouche",
    "type": "print",
    "software": [
      "ps"
    ],
    "year": 2025,
    "dimensions": "A4",
    "description": "Retouche photo et composition portrait.",
    "image": "images/projects/photoshop/portrait.jpg",
    "link": "",
    "featured": false,
    "order": 16
  },
  {
    "id": "photoshop-urban-billboard",
    "title": "Panneau — Urban Billboard",
    "type": "print",
    "software": [
      "ps"
    ],
    "year": 2025,
    "dimensions": "6×4 m",
    "description": "Panneau urbain publicitaire pour la SGTM.",
    "image": "images/projects/photoshop/urban-billboard.jpg",
    "link": "",
    "featured": false,
    "order": 15
  }
];

async function loadProjects() {
  try {
    const res = await fetch('data/projects.json?v=' + Date.now());
    if (!res.ok) throw new Error('HTTP ' + res.status);
    state.projects = await res.json();
  } catch (err) {
    console.warn('Fetch failed, using embedded data:', err.message);
    state.projects = EMBEDDED_PROJECTS;
  }
  renderFilters();
  renderGrid();
  renderTools();
}

function renderFilters() {
  const el = document.getElementById('filters');
  const typesUsed = [...new Set(state.projects.map(p => p.type))];
  const softwareUsed = [...new Set(state.projects.flatMap(p => p.software))];

  const chips = [
    ...typesUsed.map(t => ({ key: `type:${t}`, label: TYPES[t] || t, color: null })),
    ...softwareUsed.map(s => ({ key: `sw:${s}`, label: SOFTWARE[s]?.name || s, color: SOFTWARE[s]?.color })),
  ];

  el.innerHTML = chips.map(c => `
    <button class="chip" data-key="${c.key}" style="${c.color ? `--tag-color:${c.color}` : ''}">
      <span class="chip__swatch"></span>${c.label}
    </button>
  `).join('');

  el.querySelectorAll('.chip').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.key;
      if (state.activeFilters.has(key)) state.activeFilters.delete(key);
      else state.activeFilters.add(key);
      btn.classList.toggle('is-active');
      renderGrid();
    });
  });
}

function projectMatches(project) {
  if (state.activeFilters.size === 0) return true;
  for (const key of state.activeFilters) {
    const [kind, value] = key.split(':');
    if (kind === 'type' && project.type !== value) return false;
    if (kind === 'sw' && !project.software.includes(value)) return false;
  }
  return true;
}

function getProjectImages(p) {
  if (Array.isArray(p.images) && p.images.length) return p.images;
  if (p.image) return [p.image];
  return [];
}

// -------------------------------------------------------------------
// Show More / Show Less — 4 projets aléatoires par lot
// -------------------------------------------------------------------
const BATCH_SIZE = 4;

function shuffleArray(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function attachShowMore(allProjects) {
  const grid = document.getElementById('project-grid');
  let wrap = document.getElementById('show-more-wrap');
  if (wrap) wrap.remove();

  const cards = grid.querySelectorAll('.card');
  if (cards.length <= BATCH_SIZE) return;

  const shuffledIndices = shuffleArray([...Array(cards.length).keys()]);
  cards.forEach(c => c.classList.add('is-hidden'));

  for (let i = 0; i < Math.min(BATCH_SIZE, cards.length); i++) {
    cards[shuffledIndices[i]].classList.remove('is-hidden');
  }

  wrap = document.createElement('div');
  wrap.id = 'show-more-wrap';
  wrap.className = 'show-more-wrap';
  wrap.innerHTML = '<button class="show-more-btn" id="show-more-btn"><span>Voir plus</span><span class="arrow">↓</span></button>';
  grid.parentNode.insertBefore(wrap, grid.nextSibling);

  const btn = wrap.querySelector('.show-more-btn');
  let isOpen = false;

  btn.addEventListener('click', () => {
    if (!isOpen) {
      const hidden = [...cards].filter(c => c.classList.contains('is-hidden'));
      if (hidden.length === 0) return;

      const nextBatch = shuffleArray(hidden).slice(0, BATCH_SIZE);
      nextBatch.forEach(c => {
        c.classList.remove('is-hidden');
        c.style.animation = 'none';
        c.offsetHeight;
        c.style.animation = '';
      });

      const stillHidden = [...cards].filter(c => c.classList.contains('is-hidden'));
      if (stillHidden.length === 0) {
        btn.querySelector('span:first-child').textContent = 'Voir moins';
        btn.querySelector('.arrow').textContent = '↑';
        btn.classList.add('is-open');
        isOpen = true;
      }
    } else {
      cards.forEach(c => c.classList.add('is-hidden'));
      const reshuffled = shuffleArray([...Array(cards.length).keys()]);
      for (let i = 0; i < Math.min(BATCH_SIZE, cards.length); i++) {
        cards[reshuffled[i]].classList.remove('is-hidden');
      }
      btn.querySelector('span:first-child').textContent = 'Voir plus';
      btn.querySelector('.arrow').textContent = '↓';
      btn.classList.remove('is-open');
      isOpen = false;
      document.getElementById('work').scrollIntoView({ behavior: 'smooth' });
    }
  });
}

function renderGrid() {
  const grid = document.getElementById('project-grid');
  const emptyState = document.getElementById('empty-state');
  const visible = state.projects.filter(projectMatches);

  emptyState.hidden = visible.length !== 0;
  grid.hidden = visible.length === 0;

  grid.innerHTML = visible.map((p, i) => {
    const primaryColor = SOFTWARE[p.software[0]]?.color || 'var(--ink)';
    const toolDots = p.software.map(s =>
      `<span style="--dot-color:${SOFTWARE[s]?.color || 'var(--ink-faint)'}" title="${SOFTWARE[s]?.name || s}"></span>`
    ).join('');

    if (p.video) {
      const thumbSrc = p.thumbnail || '';
      const fallbackStyle = thumbSrc ? '' : 'style="display:none"';
      return `
      <article class="card" style="animation-delay:${Math.min(i * 45,400)}ms">
        <div class="card__thumb card__thumb-video" data-video-src="${p.video}">
          <img src="${thumbSrc}" alt="${p.title}" loading="lazy" onerror="this.style.display='none'" ${fallbackStyle}>
          <div class="video-overlay"></div>
          <div class="video-play-icon">
            <svg viewBox="0 0 24 24" width="30" height="30"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>
          </div>
          <span class="card__thumb-tag">${TYPES[p.type] || p.type}</span>
        </div>
        <div class="card__body">
          <h3 class="card__title">${p.title}</h3>
          <p class="card__desc">${p.description || ''}</p>
          <div class="card__footer">
            <span>${p.dimensions} · ${p.year}</span>
            <div class="card__tools">${toolDots}</div>
          </div>
        </div>
      </article>
      `;
    }

    const images = getProjectImages(p);
    const hasCarousel = images.length > 1;
    const logoClass = p.isLogo ? ' card__thumb--logo' : '';

    const slides = images.map(src => `
      <div class="card__thumb-slide">
        <img src="${src}" alt="${p.title}" loading="lazy" onerror="this.style.opacity='0'">
      </div>
    `).join('');

    const dots = hasCarousel ? `
      <div class="card__thumb-dots">
        ${images.map((_, idx) => `<button class="thumb-dot${idx === 0 ? ' is-active' : ''}" data-index="${idx}" aria-label="Vue ${idx + 1}"></button>`).join('')}
      </div>
    ` : '';

    const arrows = hasCarousel ? `
      <button class="thumb-arrow thumb-arrow--prev" data-dir="prev" aria-label="Vue précédente">‹</button>
      <button class="thumb-arrow thumb-arrow--next" data-dir="next" aria-label="Vue suivante">›</button>
    ` : '';

    return `
      <article class="card" style="animation-delay:${Math.min(i * 45, 400)}ms">
        <div class="card__thumb${logoClass}" style="--thumb-color:${primaryColor}">
          ${images.length ? `<div class="card__thumb-track" data-index="0">${slides}</div>` : ''}
          ${arrows}
          ${dots}
          <span class="card__thumb-tag">${TYPES[p.type] || p.type}</span>
        </div>
        <div class="card__body">
          <h3 class="card__title">${p.title}</h3>
          <p class="card__desc">${p.description || ''}</p>
          <div class="card__footer">
            <span>${p.dimensions || ''} · ${p.year || ''}</span>
            <div class="card__tools">${toolDots}</div>
          </div>
        </div>
      </article>
    `;
  }).join('');

  attachShowMore(visible);
}

// -------------------------------------------------------------------
// Lightbox
// -------------------------------------------------------------------
let lightboxEl = null;

function ensureLightbox() {
  if (lightboxEl) return lightboxEl;
  lightboxEl = document.createElement('div');
  lightboxEl.className = 'lightbox-overlay';
  document.body.appendChild(lightboxEl);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
  return lightboxEl;
}

function bindLightboxDismiss(el) {
  el.addEventListener('click', (e) => {
    if (e.target === el || e.target.classList.contains('lightbox-close')) {
      closeLightbox();
    }
  });
}

function openLightbox(src, alt) {
  const el = ensureLightbox();
  el.innerHTML = `
    <button class="lightbox-close" aria-label="Fermer">&times;</button>
    <img class="lightbox-img" src="${src}" alt="${alt || ''}">
  `;
  bindLightboxDismiss(el);
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => el.classList.add('is-open'));
}

function openVideoLightbox(src) {
  const el = ensureLightbox();
  el.innerHTML = `
    <button class="lightbox-close" aria-label="Fermer">&times;</button>
    <video class="lightbox-video" src="${src}" controls autoplay playsinline></video>
  `;
  bindLightboxDismiss(el);
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => el.classList.add('is-open'));
}

function closeLightbox() {
  if (!lightboxEl) return;
  const video = lightboxEl.querySelector('.lightbox-video');
  if (video) video.pause();
  lightboxEl.classList.remove('is-open');
  document.body.style.overflow = '';
}

document.getElementById('project-grid')?.addEventListener('click', (e) => {
  const videoThumb = e.target.closest('.card__thumb-video');
  if (videoThumb) {
    openVideoLightbox(videoThumb.dataset.videoSrc);
    return;
  }

  const dot = e.target.closest('.thumb-dot');
  const arrow = e.target.closest('.thumb-arrow');
  const thumb = e.target.closest('.card__thumb');
  if (!thumb) return;

  const track = thumb.querySelector('.card__thumb-track');
  if (!track) return;

  if (dot || arrow) {
    const slideCount = track.children.length;
    let index = parseInt(track.dataset.index || '0', 10);

    if (dot) {
      index = parseInt(dot.dataset.index, 10);
    } else {
      index = arrow.dataset.dir === 'next'
        ? (index + 1) % slideCount
        : (index - 1 + slideCount) % slideCount;
    }

    track.dataset.index = index;
    track.style.transform = `translateX(-${index * 100}%)`;
    thumb.querySelectorAll('.thumb-dot').forEach((d, i) => d.classList.toggle('is-active', i === index));
    return;
  }

  const index = parseInt(track.dataset.index || '0', 10);
  const activeImg = track.children[index]?.querySelector('img');
  if (activeImg) openLightbox(activeImg.src, activeImg.alt);
});

function renderTools() {
  const el = document.getElementById('tools-grid');
  el.innerHTML = Object.values(SOFTWARE).map(t => `
    <div class="tool-row">
      <span class="tool-row__icon" style="--tag-color:${t.color}">
        <img src="${t.icon}" alt="${t.name}" loading="lazy"
             onerror="this.parentElement.classList.add('tool-row__icon--fallback'); this.remove();">
      </span>
      <div class="tool-row__text">
        <span class="tool-row__name">${t.name}</span>
        <span class="tool-row__use">${t.use}</span>
      </div>
      <span class="tool-row__pct">${t.level}%</span>
    </div>
  `).join('');
}

document.getElementById('reset-filters')?.addEventListener('click', () => {
  state.activeFilters.clear();
  document.querySelectorAll('.chip.is-active').forEach(c => c.classList.remove('is-active'));
  renderGrid();
});

loadProjects();