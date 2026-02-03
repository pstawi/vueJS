# Exercice 1 : Blog avec Vue Router

## 🎯 Objectif
Créer une application de blog multi-pages avec Vue Router, navigation, routes dynamiques et guards.

## 📋 Consignes

Créez une application de blog avec les pages et fonctionnalités suivantes :

### Pages à créer :

1. **Home** (`/`)
   - Liste de tous les articles
   - Liens vers le détail de chaque article
   - Bouton "Nouvel article" (si admin)

2. **Article Detail** (`/article/:id`)
   - Affiche un article complet
   - Paramètre dynamique `:id`
   - Bouton retour
   - Boutons Modifier/Supprimer (si admin)

3. **About** (`/about`)
   - Page À propos du blog
   - Informations sur l'auteur

4. **Admin Dashboard** (`/admin`)
   - Page protégée (guard)
   - Liste des articles avec actions
   - Formulaire de création

5. **Login** (`/login`)
   - Formulaire de connexion
   - Redirection après login

6. **404 Not Found**
   - Page d'erreur pour routes inexistantes

### Fonctionnalités à implémenter :

#### 1. Configuration des Routes

```javascript
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/article/:id',
    name: 'article-detail',
    component: ArticleDetail,
    props: true
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound
  }
]
```

#### 2. Navigation

- Menu de navigation présent sur toutes les pages
- Utiliser `<router-link>` avec classe active
- Navigation programmatique après actions

#### 3. Routes Dynamiques

- Route `/article/:id` pour afficher un article
- Passer l'ID en props au composant
- Gérer le cas où l'article n'existe pas

#### 4. Guards de Navigation

```javascript
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAdmin') === 'true'
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})
```

#### 5. Données (Mock)

```javascript
// Utilisez des données en dur
const articles = ref([
  {
    id: 1,
    titre: 'Introduction à Vue.js',
    contenu: 'Vue.js est un framework progressif...',
    auteur: 'Jean Dupont',
    date: '2024-01-15'
  },
  {
    id: 2,
    titre: 'Vue Router expliqué',
    contenu: 'Le routage avec Vue Router permet...',
    auteur: 'Marie Martin',
    date: '2024-01-20'
  }
  // ... autres articles
])
```

## 💡 Structure Suggérée

```
src/
├── views/
│   ├── Home.vue
│   ├── ArticleDetail.vue
│   ├── About.vue
│   ├── Admin.vue
│   ├── Login.vue
│   └── NotFound.vue
├── components/
│   ├── Navigation.vue
│   ├── ArticleCard.vue
│   └── ArticleForm.vue
├── router/
│   └── index.js
├── App.vue
└── main.js
```

## ✅ Critères de réussite

- [ ] Toutes les pages sont créées et accessibles
- [ ] La navigation fonctionne (liens + boutons)
- [ ] Les routes dynamiques fonctionnent
- [ ] Le guard protège la page admin
- [ ] Redirection après login vers page demandée
- [ ] Page 404 pour routes inexistantes
- [ ] Menu de navigation avec classe active
- [ ] Navigation programmatique après actions
- [ ] Props passées aux routes dynamiques
- [ ] Design cohérent entre les pages

## 🎨 Bonus

- [ ] Transitions entre les pages
- [ ] Fil d'Ariane (breadcrumb)
- [ ] Pagination des articles
- [ ] Recherche d'articles
- [ ] Catégories avec routes imbriquées
- [ ] Confirmation avant suppression
- [ ] LocalStorage pour persister articles
- [ ] Scroll to top sur changement de route

## 💡 Indices

**Login simple :**
```javascript
const login = () => {
  // Simulation login
  if (email.value === 'admin@blog.com' && password.value === 'admin') {
    localStorage.setItem('isAdmin', 'true')
    
    // Redirection vers page demandée ou home
    const redirect = route.query.redirect || '/'
    router.push(redirect)
  }
}
```

**Trouver un article :**
```javascript
const article = computed(() => {
  return articles.value.find(a => a.id === parseInt(props.id))
})
```

## ⏱️ Temps estimé
3h - 4h

---

**Important** : Cet exercice nécessite un projet Vite (pas de CDN). Utilisez le guide pratique fourni pour la mise en place !

Une fois terminé, comparez votre solution avec les bonnes pratiques du guide.
