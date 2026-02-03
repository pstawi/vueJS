# 📝 Projet Blog avec Vue Router

## 🚀 Installation Rapide

```bash
# 1. Créer un nouveau projet Vue avec Vite
npm create vue@latest blog-router

# Sélectionner :
# ✅ Vue Router
# ❌ Pinia (pas pour cet exemple)
# ❌ TypeScript
# ✅ ESLint (recommandé)

# 2. Aller dans le dossier
cd blog-router

# 3. Installer les dépendances
npm install

# 4. Copier les fichiers de cet exemple dans src/

# 5. Lancer le serveur de développement
npm run dev
```

## 📁 Structure du Projet

```
src/
├── views/              # Pages/Routes
│   ├── Home.vue
│   ├── Articles.vue
│   ├── ArticleDetail.vue
│   ├── About.vue
│   ├── Login.vue
│   ├── Admin.vue
│   └── NotFound.vue
├── components/         # Composants
│   ├── Navigation.vue
│   ├── ArticleCard.vue
│   └── Footer.vue
├── router/
│   └── index.js       # Configuration routes
├── data/
│   └── articles.js    # Données mock
├── App.vue
└── main.js
```

## 🎯 Fonctionnalités Démontrées

### Navigation
- ✅ `<router-link>` avec classe active
- ✅ Navigation programmatique (`router.push`)
- ✅ Retour arrière (`router.back()`)

### Routes
- ✅ Routes simples (`/`, `/about`)
- ✅ Routes dynamiques (`/article/:id`)
- ✅ Routes avec props
- ✅ Lazy loading des composants

### Guards
- ✅ Guard global (`beforeEach`)
- ✅ Protection de route admin
- ✅ Redirection après login
- ✅ Meta fields (`requiresAuth`)

### Autres
- ✅ Page 404 personnalisée
- ✅ Query parameters
- ✅ Navigation conditionnelle
- ✅ Données mock pour simulation

## 🎓 Pour le Formateur

### Points à Démontrer en Cours

1. **Navigation de base** : Montrer comment créer des liens avec `<router-link>`
2. **Routes dynamiques** : Cliquer sur un article et voir l'URL changer
3. **Guards** : Essayer d'accéder à `/admin` sans être connecté
4. **Navigation programmatique** : Voir le bouton de connexion qui redirige
5. **404** : Taper une URL inexistante

### Modifications Suggérées pour les TP

- Ajouter une page de contact
- Créer des catégories d'articles avec routes imbriquées
- Ajouter une pagination
- Implémenter une barre de recherche avec query params

## 🔐 Comptes de Test

**Admin :**
- Email : `admin@blog.com`
- Mot de passe : `admin`

**Utilisateur :**
- Email : `user@blog.com`
- Mot de passe : `user`

## 📝 Notes

- Les données sont stockées en mémoire (pas de backend)
- L'authentification est simulée (localStorage)
- Projet pédagogique, ne pas utiliser en production tel quel
