const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5500;
const DATA_FILE = path.join(__dirname, 'data', 'projects.json');
const IMAGES_ROOT = path.join(__dirname, 'public', 'images', 'projects');

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);

function scanProjectImages(folder) {
  const dirPath = path.join(IMAGES_ROOT, folder);
  if (!fs.existsSync(dirPath)) return null;

  try {
    const files = fs.readdirSync(dirPath)
      .filter(f => IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

    if (files.length === 0) return null;

    return files.map(f =>
      `images/projects/${folder}/${f}`.split('/').map(encodeURIComponent).join('/')
    );
  } catch (err) {
    console.error(`Could not scan folder ${dirPath}:`, err.message);
    return null;
  }
}

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/projects', (req, res) => {
  fs.readFile(DATA_FILE, 'utf8', (err, raw) => {
    if (err) {
      console.error('Could not read projects.json:', err.message);
      return res.status(500).json({ error: 'Impossible de lire projects.json' });
    }
    try {
      const projects = JSON.parse(raw);

      const enriched = projects.map(p => {
        const folder = p.imageFolder || p.id;
        const scanned = scanProjectImages(folder);
        return scanned ? { ...p, images: scanned } : p;
      });

      enriched.sort((a, b) => (b.year - a.year) || (b.order || 0) - (a.order || 0));
      res.json(enriched);
    } catch (parseErr) {
      console.error('Invalid JSON in projects.json:', parseErr.message);
      res.status(500).json({ error: 'projects.json contient une erreur de syntaxe JSON' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Portfolio running at http://localhost:${PORT}`);
});