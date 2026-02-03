# Exemple 2 : Événements personnalisés (enfant → parent)

Projet Vite + Vue 3 pour le Module 2. Démonstration des **événements personnalisés** (`$emit`) et de l’écoute dans le parent (`@increment`, `@decrement`, `@reset`).

## Lancer le projet

```bash
npm install
npm run dev
```

Ouvrez l’URL affichée (souvent `http://localhost:5173`) dans votre navigateur.

## Structure

- `src/App.vue` : composant parent (total, historique, écoute des événements)
- `src/components/CompteurComponent.vue` : composant enfant (compteur, `$emit`)

## Commandes

- `npm run dev` : serveur de développement
- `npm run build` : build de production
- `npm run preview` : prévisualisation du build
