const fs = require('fs');
const path = require('path');

const SOURCE_FILE = path.join(__dirname, 'data', 'projects.json');
const OUTPUT_FILE = path.join(__dirname, 'docs', 'data', 'projects.json');
const IMAGES_ROOT = path.join(__dirname, 'docs', 'images', 'projects');

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);

function scanProjectImages(folder) {
  const dirPath = path.join(IMAGES_ROOT, folder);
  if (!fs.existsSync(dirPath)) return null;

  const files = fs.readdirSync(dirPath)
    .filter(f => IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

  if (files.length === 0) return null;

  return files.map(f =>
    `images/projects/${folder}/${f}`.split('/').map(encodeURIComponent).join('/')
  );
}

const raw = fs.readFileSync(SOURCE_FILE, 'utf8');
const projects = JSON.parse(raw);

const enriched = projects.map(p => {
  const folder = p.imageFolder || p.id;
  const scanned = scanProjectImages(folder);
  return scanned ? { ...p, images: scanned } : p;
});

enriched.sort((a, b) => (b.year - a.year) || (b.order || 0) - (a.order || 0));

fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(enriched, null, 2), 'utf8');

console.log(`✓ ${enriched.length} projets écrits dans docs/data/projects.json`);