# 🎓 Guide d'Utilisation en Cours - Projet Blog Router

## 📝 Vue d'Ensemble du Projet

Ce projet blog démontre **toutes les fonctionnalités** de Vue Router dans un contexte réel :

✅ Navigation basique avec `<router-link>`  
✅ Navigation programmatique avec `useRouter()`  
✅ Routes dynamiques (`:id`)  
✅ Routes protégées (guards)  
✅ Lazy loading des composants  
✅ Page 404 personnalisée  
✅ Query parameters  
✅ Props de route  
✅ Transitions entre pages  

---

## 🎯 Scénario de Démonstration en Cours

### Phase 1 : Navigation de Base (15 min)

**Ce que vous montrez :**

1. **Lancer le projet**
   ```bash
   npm run dev
   ```

2. **Page d'accueil** (http://localhost:5173/)
   - Expliquer la structure
   - Montrer le composant `<router-view>` dans `App.vue`
   - Cliquer sur "Découvrir les articles"
   - **Point clé** : L'URL change sans rechargement de page

3. **Navigation avec router-link**
   - Ouvrir `Navigation.vue`
   - Montrer la syntaxe `<router-link to="/">`
   - Expliquer la classe `.router-link-active` automatique
   - Cliquer dans le menu et observer l'URL

**Code à montrer :**

```vue
<!-- Dans Navigation.vue -->
<router-link to="/articles" class="nav-link">
  Articles
</router-link>
```

```javascript
// Dans router/index.js
{
  path: '/articles',
  name: 'articles',
  component: () => import('../views/Articles.vue')
}
```

### Phase 2 : Routes Dynamiques (20 min)

**Ce que vous montrez :**

1. **Page Articles** (http://localhost:5173/articles)
   - Cliquer sur "Lire la suite" d'un article
   - **Observer** : URL devient `/article/1`, `/article/2`, etc.

2. **Paramètres de route**
   - Ouvrir `router/index.js`
   - Montrer la route : `path: '/article/:id'`
   - Expliquer le paramètre dynamique `:id`

3. **Récupérer le paramètre**
   - Ouvrir `ArticleDetail.vue`
   - Montrer `props: { id: String }`
   - Montrer `props: true` dans la route
   - Alternative : `useRoute().params.id`

**Code à montrer :**

```javascript
// router/index.js
{
  path: '/article/:id',
  name: 'article-detail',
  component: () => import('../views/ArticleDetail.vue'),
  props: true  // ← Passe :id en props
}
```

```vue
<!-- ArticleDetail.vue -->
<script setup>
const props = defineProps({
  id: String  // ← Reçoit l'id de la route
})

const article = computed(() => getArticleById(props.id))
</script>
```

### Phase 3 : Navigation Programmatique (15 min)

**Ce que vous montrez :**

1. **Bouton de retour**
   - Dans ArticleDetail.vue, montrer le bouton "← Retour"
   - Expliquer `router.back()`

2. **Redirection après action**
   - Dans Login.vue, montrer la redirection après connexion
   - Expliquer `router.push()`

**Code à montrer :**

```vue
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.back()  // Retour arrière
}

const goToArticles = () => {
  router.push('/articles')  // Navigation vers une route
}

const goToArticleDetail = (id) => {
  router.push({ name: 'article-detail', params: { id } })  // Avec params
}
</script>
```

### Phase 4 : Guards de Navigation (20 min)

**Ce que vous montrez :**

1. **Tenter d'accéder à Admin sans connexion**
   - Aller sur http://localhost:5173/admin
   - **Observer** : Redirection automatique vers `/login`
   - **Point clé** : URL montre `?redirect=/admin`

2. **Se connecter**
   - Utiliser : admin@blog.com / admin
   - **Observer** : Redirection vers `/admin`

3. **Expliquer le guard**
   - Ouvrir `router/index.js`
   - Montrer `router.beforeEach()`
   - Expliquer `meta: { requiresAuth: true }`

**Code à montrer :**

```javascript
// router/index.js
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    // Rediriger vers login avec la page de destination
    next({
      name: 'login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()  // Laisser passer
  }
})
```

```javascript
// Dans Login.vue - Après connexion
const redirect = route.query.redirect || '/'
router.push(redirect)
```

### Phase 5 : Page 404 (10 min)

**Ce que vous montrez :**

1. **Taper une URL inexistante**
   - http://localhost:5173/page-qui-nexiste-pas
   - **Observer** : Page 404 personnalisée

2. **Explication**
   - Route catch-all : `path: '/:pathMatch(.*)*'`
   - Doit être en dernier dans la liste des routes

**Code à montrer :**

```javascript
{
  path: '/:pathMatch(.*)*',  // Attrape tout
  name: 'not-found',
  component: () => import('../views/NotFound.vue')
}
```

---

## 🔍 Points à Approfondir

### 1. Lazy Loading

**Pourquoi ?** Charge les composants seulement quand nécessaire.

```javascript
// ❌ Import direct (tout chargé au démarrage)
import Home from '../views/Home.vue'

// ✅ Lazy loading (chargé à la demande)
component: () => import('../views/Articles.vue')
```

**Démonstration :**
- Ouvrir les DevTools → Network
- Rafraîchir la page d'accueil
- Observer les fichiers chargés
- Naviguer vers /articles
- Observer le nouveau chunk chargé

### 2. Transitions

Montrer dans `App.vue` :

```vue
<router-view v-slot="{ Component }">
  <transition name="fade" mode="out-in">
    <component :is="Component" />
  </transition>
</router-view>
```

### 3. Meta Fields

Expliquer les usages :

```javascript
meta: {
  requiresAuth: true,      // Pour les guards
  title: 'Mon titre',      // Pour le titre de page
  breadcrumb: 'Accueil'    // Pour fil d'ariane
}
```

---

## 💡 Exercices à Proposer aux Étudiants

### Exercice 1 : Ajouter une Page

"Ajoutez une page `/contact` avec un formulaire"

**Solution :**
1. Créer `views/Contact.vue`
2. Ajouter la route dans `router/index.js`
3. Ajouter le lien dans `Navigation.vue`

### Exercice 2 : Route avec Query

"Ajoutez un filtre par auteur avec query parameters"

**Indice :**
```javascript
// Navigation
router.push({ path: '/articles', query: { auteur: 'Marie' } })

// Récupération
const route = useRoute()
console.log(route.query.auteur)
```

### Exercice 3 : Confirmation avant Quitter

"Ajoutez une confirmation avant de quitter la page admin"

**Indice :**
```vue
<script setup>
import { onBeforeRouteLeave } from 'vue-router'

onBeforeRouteLeave(() => {
  return confirm('Quitter la page ?')
})
</script>
```

---

## 🎬 Déroulé de Cours Suggéré

### Introduction (10 min)
- Expliquer le contexte : Blog multi-pages
- Montrer la demo complète
- Expliquer la structure du projet

### Démonstration (45 min)
- Phase 1 : Navigation (15 min)
- Phase 2 : Routes dynamiques (20 min)
- Phase 3 : Navigation programmatique (10 min)

### Pause (10 min)

### Suite Démonstration (35 min)
- Phase 4 : Guards (20 min)
- Phase 5 : 404 et divers (15 min)

### Pratique Guidée (1h)
- Les étudiants modifient le projet
- Exercices suggérés ci-dessus
- Support individuel

### Récapitulatif (10 min)
- Questions/Réponses
- Exercice à faire chez soi

**Durée totale : 2h30**

---

## 🔑 Concepts Clés à Insister

1. **Flux de données unidirectionnel** avec les routes
2. **Séparation des responsabilités** (views vs components)
3. **Guards pour la sécurité** (même si c'est du front)
4. **Lazy loading pour les performances**
5. **Props de route pour la réutilisabilité**

---

## 📊 Checklist Avant le Cours

- [ ] Projet testé et fonctionnel
- [ ] Node.js installé sur les machines (version 16+)
- [ ] Connexion internet disponible (pour npm install)
- [ ] Backup du projet sur clé USB
- [ ] DevTools installés sur les navigateurs
- [ ] Code projeté lisiblement
- [ ] Exemples de code préparés

---

## 🚀 Variantes pour Aller Plus Loin

### Variante 1 : Ajouter Pinia
Intégrer un store pour gérer les articles globalement

### Variante 2 : API Réelle
Connecter à JSONPlaceholder au lieu de données mock

### Variante 3 : Catégories Imbriquées
Routes imbriquées : `/category/:name/articles`

---

Bon cours ! 👨‍🏫
