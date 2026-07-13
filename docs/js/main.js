// ---------------------------------------------------------------------
// Single source of truth for every tool: name, color tag (filter chips,
// card dots), icon (tools panel) and usage description. Add a new tool
// here and it automatically appears in filters + the tools panel.
// ---------------------------------------------------------------------
const SOFTWARE = {
  ai:         { name: 'Illustrator',  color: 'var(--ai)',        icon: 'images/projects/logos/AI_Logo__Adobe_Illustrator____Design_Week___Logobutik-removebg-preview.png',    use: 'Identité visuelle, vectoriel', level: 90 },
  ps:         { name: 'Photoshop',    color: 'var(--ps)',        icon: 'images/projects/photoshop/Lexique__PS_-removebg-preview.png',                                        use: 'Retouche, compositing',        level: 50 },
  id:         { name: 'InDesign',     color: 'var(--id)',        icon: 'images/projects/ind/Adobe_InDesign_Logo-removebg-preview.png',                                       use: 'Mise en page, rapports, catalogues', level: 85 },
  ae:         { name: 'After Effects',color: 'var(--ae)',        icon: 'images/projects/videos/ae%20icon.png',                                                                use: 'Motion design, animation',     level: 70 },
  au:         { name: 'Audition',     color: 'var(--au)',        icon: 'images/projects/videos/au%20icon.png',                                                                use: 'Habillage sonore, mixage',      level: 60 },
  max:        { name: '3ds Max',      color: 'var(--max)',       icon: 'images/projects/3d/3ds%20max%20icon.png',                                                            use: 'Modélisation, rendu 3D',        level: 80 },
  eclipse:    { name: 'Eclipse',      color: 'var(--eclipse)',   icon: 'images/projects/eclipse/Eclipse_Logo_PNG_Vector__SVG__Free_Download-removebg-preview.png',            use: 'Développement Java',            level: 55 },
  phpmyadmin: { name: 'phpMyAdmin',   color: 'var(--phpmyadmin)',icon: 'img/tools/phpmyadmin.svg', use: 'Bases de données MySQL',        level: 70 },
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

async function loadProjects() {
  try {
    const res = await fetch('data/projects.json');
    state.projects = await res.json();
  } catch (err) {
    console.error('Impossible de charger les projets :', err);
    state.projects = [];
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

// A project can define either:
//   "image": "path.jpg"                    -> single visual
//   "images": ["a.jpg", "b.jpg", "c.jpg"]   -> carousel (used when >1)
//   "video": "path.mp4"                     -> click-to-play video, no carousel
function getProjectImages(p) {
  if (Array.isArray(p.images) && p.images.length) return p.images;
  if (p.image) return [p.image];
  return [];
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

    // Video project: play-icon thumb, no carousel — clicking opens the video full-screen
   if (p.video) {
    return `
    <article class="card" style="animation-delay:${Math.min(i * 45,400)}ms">

        <div class="card__thumb card__thumb-video"
             data-video-src="${p.video}">

            <img
                src="${p.thumbnail || ''}"
                alt="${p.title}"
                loading="lazy"
            >

            <div class="video-overlay"></div>

            <div class="video-play-icon">
                <svg viewBox="0 0 24 24" width="30" height="30">
                    <path d="M8 5v14l11-7z" fill="currentColor"/>
                </svg>
            </div>

            <span class="card__thumb-tag">
                ${TYPES[p.type] || p.type}
            </span>

        </div>

        <div class="card__body">
            <h3 class="card__title">${p.title}</h3>
            <p class="card__desc">${p.description || ''}</p>

            <div class="card__footer">
                <span>${p.dimensions} · ${p.year}</span>
                <div class="card__tools">
                    ${toolDots}
                </div>
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
        <img src="${src}" alt="${p.title}" loading="lazy">
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
}

// ---------------------------------------------------------------------
// Lightbox — click any project thumbnail (image or video) to see it
// large, with a smooth pop-in. Images fade+scale in; videos autoplay.
// ---------------------------------------------------------------------
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

// Single delegated click handler for the whole grid: video thumbs,
// carousel dots/arrows, and opening the lightbox on a plain image click.
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