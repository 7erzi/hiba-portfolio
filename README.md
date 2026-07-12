# Portfolio — Hiba

Site + petit serveur qui affiche tes projets automatiquement à partir d'un seul fichier de données. Tu n'as jamais besoin de toucher au HTML/CSS pour ajouter un projet.

## Lancer le site en local

```bash
npm install
npm start
```

Puis ouvre `http://localhost:3000`.

## Ajouter un nouveau projet (le seul fichier à toucher)

Ouvre `data/projects.json` et ajoute un objet dans la liste, par exemple :

```json
{
  "id": "logo-cafe-atlas",
  "title": "Identité — Café Atlas",
  "type": "branding",
  "software": ["ai", "id"],
  "year": 2026,
  "dimensions": "Logo + charte · 12 pages",
  "description": "Logotype, palette et déclinaisons pour un café à Casablanca.",
  "image": "images/projects/cafe-atlas.jpg",
  "link": "",
  "featured": false,
  "order": 11
}
```

Dépose l'image correspondante dans `public/images/projects/`. Recharge la page : le projet apparaît directement dans la grille, avec les bonnes proportions, les bons filtres, les bons points de couleur par logiciel — sans rien redessiner. Si tu laisses `"image": ""`, une vignette de remplacement colorée (couleur du logiciel principal) s'affiche à la place, donc rien n'est jamais cassé même sans visuel.

**Champs :**
- `type` : un des types déjà utilisés (`branding`, `print`, `web`, `3d`, `motion`, `audio`, `dev`) ou un nouveau — il apparaîtra automatiquement comme filtre.
- `software` : liste des codes utilisés (`ai`, `ps`, `id`, `ae`, `au`, `max`, `eclipse`, `phpmyadmin`, `vscode`).
- `order` : sert juste à départager l'affichage entre projets de la même année (plus grand = affiché avant).

## Ajouter un nouvel outil (pas juste un projet)

Si tu utilises un logiciel qui n'est pas encore dans la liste, ouvre `public/js/main.js`, objet `SOFTWARE` en haut du fichier, et ajoute une ligne avec un nom, une couleur (ajoute la couleur correspondante dans `public/css/style.css`, section `:root`) et une description d'usage. Il apparaîtra automatiquement dans les filtres, dans les points de couleur des cartes et dans la section "Outils".

## Mettre en ligne

Le site est un petit serveur Node/Express classique, donc il tourne sur n'importe quel hébergeur qui supporte Node (Render, Railway, Vercel avec adaptation, un VPS...). Étapes générales :
1. Pousse le dossier sur GitHub.
2. Connecte le repo à l'hébergeur choisi.
3. Commande de démarrage : `npm start`.

Comme tout est lu depuis `data/projects.json` à chaque requête, tu peux aussi modifier ce fichier directement sur GitHub (ou via un accès FTP/SSH) sans avoir à redéployer le code — juste le fichier de données.

## À compléter avant de partager le lien

- Remplace `hello@example.com` et les liens LinkedIn/Behance/Instagram dans `public/index.html` (section `<footer>`).
- Remplace les projets d'exemple dans `data/projects.json` par tes vrais projets et visuels.
- Le favicon et une image de partage (Open Graph) manquent encore — utile si tu veux un aperçu propre quand tu partages le lien.
