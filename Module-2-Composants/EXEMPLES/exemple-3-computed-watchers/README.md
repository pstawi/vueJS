# Exemple 3 : Computed et Watchers

Projet Vite + Vue 3 pour le Module 2. Démonstration des **propriétés computed** (calculs dérivés, filtrage) et des **watchers** (surveillance du total TTC, seuil d’alerte).

## Lancer le projet

```bash
npm install
npm run dev
```

Ouvrez l’URL affichée (souvent `http://localhost:5173`) dans votre navigateur.

## Contenu

- **Computed** : `produitsFiltres`, `totalHT`, `totalTTC`, `categoriesPresentes`, `messageRemise`
- **Watch** : `totalTTC` (logs + alerte si dépassement du seuil), `seuilAlerte`

## Commandes

- `npm run dev` : serveur de développement
- `npm run build` : build de production
- `npm run preview` : prévisualisation du build
