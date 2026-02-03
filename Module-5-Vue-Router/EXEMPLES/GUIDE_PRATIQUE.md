# Guide Pratique : Vue Router

## 🚀 Mise en place d'un projet avec Vue Router

### 1. Créer un projet Vue avec Vite

```bash
npm create vue@latest mon-app-router
```

Sélectionner :
- ✅ Vue Router
- ❌ Pinia (pour l'instant)
- ✅ ESLint

```bash
cd mon-app-router
npm install
npm run dev
```

---

## 📁 Structure du projet

```
mon-app-router/
├── src/
│   ├── views/           # Pages/Vues
│   │   ├── Home.vue
│   │   ├── About.vue
│   │   └── Contact.vue
│   ├── components/      # Composants réutilisables
│   │   └── Navigation.vue
│   ├── router/
│   │   └── index.js    # Configuration des routes
│   ├── App.vue
│   └── main.js
```

---

## 🛣️ Configuration des Routes

### router/index.js

```javascript
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/contact',
    name: 'contact',
    // Lazy loading
    component: () => import('../views/Contact.vue')
  },
  {
    // Route dynamique avec paramètre
    path: '/user/:id',
    name: 'user-profile',
    component: () => import('../views/UserProfile.vue'),
    props: true // Passe :id en props
  },
  {
    // Route 404
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guard global
router.beforeEach((to, from, next) => {
  console.log(`Navigation: ${from.name} → ${to.name}`)
  next()
})

export default router
```

---

## 📄 Exemple de Vue (Page)

### views/Home.vue

```vue
<template>
  <div class="home">
    <h1>🏠 Accueil</h1>
    <p>Bienvenue sur mon application Vue Router</p>
    
    <!-- Navigation avec router-link -->
    <nav>
      <router-link to="/">Accueil</router-link>
      <router-link to="/about">À propos</router-link>
      <router-link to="/contact">Contact</router-link>
      <router-link :to="{ name: 'user-profile', params: { id: 1 } }">
        Profil Utilisateur 1
      </router-link>
    </nav>
    
    <!-- Navigation programmatique -->
    <button @click="goToAbout">Aller à About (JS)</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToAbout = () => {
  router.push('/about')
  // ou
  // router.push({ name: 'about' })
}
</script>

<style scoped>
.home {
  padding: 20px;
}
nav {
  display: flex;
  gap: 15px;
  margin: 20px 0;
}
a {
  color: #42b983;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 4px;
}
a.router-link-active {
  background: #42b983;
  color: white;
}
</style>
```

### views/UserProfile.vue (Route dynamique)

```vue
<template>
  <div class="profile">
    <h1>👤 Profil Utilisateur</h1>
    <p>ID : {{ id }}</p>
    <button @click="router.back()">← Retour</button>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'

// Props depuis la route
const props = defineProps({
  id: String
})

const router = useRouter()
const route = useRoute()

// Ou accès via route.params
console.log('ID depuis route:', route.params.id)
</script>
```

---

## 🔐 Guards de Navigation

### Protection de routes (Auth)

```javascript
// router/index.js
const routes = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/Admin.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  }
]

// Guard global
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token')
  const isAdmin = localStorage.getItem('role') === 'admin'
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' })
  } else if (to.meta.requiresAdmin && !isAdmin) {
    next({ name: 'home' })
  } else {
    next()
  }
})
```

---

## 🔀 Routes Imbriquées

```javascript
const routes = [
  {
    path: '/user/:id',
    component: UserLayout,
    children: [
      {
        path: '',
        component: UserHome
      },
      {
        path: 'profile',
        component: UserProfile
      },
      {
        path: 'posts',
        component: UserPosts
      }
    ]
  }
]
```

**UserLayout.vue :**
```vue
<template>
  <div>
    <h1>User {{ $route.params.id }}</h1>
    <nav>
      <router-link :to="`/user/${$route.params.id}`">Home</router-link>
      <router-link :to="`/user/${$route.params.id}/profile`">Profile</router-link>
      <router-link :to="`/user/${$route.params.id}/posts`">Posts</router-link>
    </nav>
    
    <!-- Les routes enfants s'affichent ici -->
    <router-view />
  </div>
</template>
```

---

## 🎯 Cas d'Usage Pratiques

### 1. Redirection après login

```javascript
// Login.vue
const login = async () => {
  // ... appel API
  localStorage.setItem('token', token)
  router.push({ name: 'dashboard' })
}
```

### 2. Confirmation avant quitter

```vue
<script setup>
import { onBeforeRouteLeave } from 'vue-router'

onBeforeRouteLeave((to, from) => {
  if (hasUnsavedChanges.value) {
    const answer = window.confirm('Vous avez des modifications non sauvegardées. Quitter ?')
    if (!answer) return false
  }
})
</script>
```

### 3. Query Parameters

```javascript
// Naviguer avec query
router.push({ 
  name: 'search', 
  query: { q: 'vue', category: 'tutorial' } 
})
// URL: /search?q=vue&category=tutorial

// Lire les query
const route = useRoute()
console.log(route.query.q) // 'vue'
console.log(route.query.category) // 'tutorial'
```

---

## 📚 Récapitulatif

### Composants Vue Router

- `<router-link>` : Navigation déclarative
- `<router-view>` : Affiche le composant de la route

### Composables

- `useRouter()` : Navigation programmatique
- `useRoute()` : Accès aux infos de la route

### Méthodes de navigation

```javascript
router.push('/about')        // Ajoute à l'historique
router.replace('/about')     // Remplace dans l'historique
router.go(-1)                // router.back()
router.go(1)                 // router.forward()
```

### Guards

```javascript
router.beforeEach()          // Global, avant chaque route
router.beforeResolve()       // Global, après guards in-component
router.afterEach()           // Global, après navigation
```

---

## 🎓 Pour aller plus loin

- **Scroll Behavior** : Contrôler le scroll lors de la navigation
- **Navigation Failures** : Gérer les échecs de navigation
- **Dynamic Routing** : Ajouter des routes dynamiquement
- **Route Transitions** : Animations entre les routes

Consultez la [documentation officielle](https://router.vuejs.org/) pour plus de détails !
