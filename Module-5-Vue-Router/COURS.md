# Module 5 : Vue Router - Navigation et Routage

## 🎯 Objectifs du module

À la fin de ce module, vous serez capable de :
- Configurer Vue Router dans une application
- Créer des routes et naviguer entre les pages
- Utiliser les routes dynamiques et les paramètres
- Implémenter des guards de navigation
- Gérer les routes imbriquées

---

## 1. Installation et Configuration

### 1.1 Installation

```bash
# Avec npm
npm install vue-router@4

# Avec le CLI Vue
npm create vue@latest
# Sélectionner "Vue Router"
```

### 1.2 Configuration de base

**router/index.js :**
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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
```

**main.js :**
```javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App)
  .use(router)
  .mount('#app')
```

**App.vue :**
```vue
<template>
  <nav>
    <router-link to="/">Accueil</router-link>
    <router-link to="/about">À propos</router-link>
  </nav>
  
  <!-- Le composant de la route s'affiche ici -->
  <router-view />
</template>
```

---

## 2. Navigation

### 2.1 router-link

```vue
<template>
  <!-- Navigation déclarative -->
  <router-link to="/">Accueil</router-link>
  <router-link to="/about">À propos</router-link>
  
  <!-- Avec objet -->
  <router-link :to="{ name: 'home' }">Accueil</router-link>
  <router-link :to="{ path: '/about' }">À propos</router-link>
  
  <!-- Avec classe active -->
  <router-link to="/" active-class="active">Accueil</router-link>
</template>
```

### 2.2 Navigation programmatique

```vue
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// Push (ajoute à l'historique)
const goToAbout = () => {
  router.push('/about')
  // OU
  router.push({ name: 'about' })
}

// Replace (remplace dans l'historique)
const replaceRoute = () => {
  router.replace('/about')
}

// Go (navigation relative)
const goBack = () => {
  router.go(-1) // Équivalent à router.back()
}

const goForward = () => {
  router.go(1) // Équivalent à router.forward()
}
</script>
```

---

## 3. Routes Dynamiques

### 3.1 Paramètres de route

```javascript
// router/index.js
const routes = [
  {
    path: '/user/:id',
    name: 'user',
    component: User
  }
]
```

**Composant User.vue :**
```vue
<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

// Accéder au paramètre
console.log(route.params.id)
</script>

<template>
  <div>
    <h1>Utilisateur #{{ route.params.id }}</h1>
  </div>
</template>
```

**Navigation :**
```vue
<router-link :to="`/user/${userId}`">Voir profil</router-link>
<!-- OU -->
<router-link :to="{ name: 'user', params: { id: userId } }">
  Voir profil
</router-link>
```

### 3.2 Props de route

```javascript
// Passer les params en props
const routes = [
  {
    path: '/user/:id',
    component: User,
    props: true // Active le passage en props
  }
]
```

```vue
<script setup>
// Recevoir comme props au lieu d'utiliser route.params
defineProps({
  id: String
})
</script>

<template>
  <h1>Utilisateur #{{ id }}</h1>
</template>
```

---

## 4. Query Parameters et Hash

### 4.1 Query Parameters

```vue
<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

// URL: /search?q=vue&category=tutorial
console.log(route.query.q) // "vue"
console.log(route.query.category) // "tutorial"
</script>
```

**Navigation avec query :**
```javascript
router.push({ 
  path: '/search', 
  query: { q: 'vue', category: 'tutorial' } 
})
```

### 4.2 Hash

```javascript
// URL: /page#section
router.push({ path: '/page', hash: '#section' })
```

---

## 5. Routes Imbriquées

```javascript
const routes = [
  {
    path: '/user/:id',
    component: User,
    children: [
      {
        path: '', // /user/:id
        component: UserHome
      },
      {
        path: 'profile', // /user/:id/profile
        component: UserProfile
      },
      {
        path: 'posts', // /user/:id/posts
        component: UserPosts
      }
    ]
  }
]
```

**User.vue :**
```vue
<template>
  <div>
    <h1>Utilisateur {{ $route.params.id }}</h1>
    <nav>
      <router-link :to="`/user/${$route.params.id}`">Accueil</router-link>
      <router-link :to="`/user/${$route.params.id}/profile`">Profil</router-link>
      <router-link :to="`/user/${$route.params.id}/posts`">Posts</router-link>
    </nav>
    
    <!-- Les routes enfants s'affichent ici -->
    <router-view />
  </div>
</template>
```

---

## 6. Guards de Navigation

### 6.1 Guard Global (beforeEach)

```javascript
// router/index.js
router.beforeEach((to, from, next) => {
  // Vérifier l'authentification
  const isAuthenticated = localStorage.getItem('token')
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    // Rediriger vers login
    next('/login')
  } else {
    next() // Continuer
  }
})
```

### 6.2 Meta Fields

```javascript
const routes = [
  {
    path: '/dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin',
    component: Admin,
    meta: { requiresAuth: true, requiresAdmin: true }
  }
]
```

### 6.3 Guard par Route

```javascript
const routes = [
  {
    path: '/admin',
    component: Admin,
    beforeEnter: (to, from, next) => {
      const isAdmin = checkIfAdmin()
      if (isAdmin) {
        next()
      } else {
        next('/') // Rediriger
      }
    }
  }
]
```

### 6.4 Guard dans le Composant

```vue
<script setup>
import { onBeforeRouteEnter, onBeforeRouteUpdate, onBeforeRouteLeave } from 'vue-router'

onBeforeRouteEnter((to, from) => {
  // Avant d'entrer dans la route
})

onBeforeRouteUpdate((to, from) => {
  // Quand la route change mais le composant est réutilisé
})

onBeforeRouteLeave((to, from) => {
  // Avant de quitter la route
  const answer = window.confirm('Voulez-vous vraiment quitter ?')
  if (!answer) return false
})
</script>
```

---

## 7. Lazy Loading (Chargement Différé)

```javascript
const routes = [
  {
    path: '/',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/about',
    // Chargement différé avec nom de chunk
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]
```

---

## 8. Exemple Complet

**router/index.js :**
```javascript
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('../views/Products.vue')
  },
  {
    path: '/product/:id',
    name: 'product-detail',
    component: () => import('../views/ProductDetail.vue'),
    props: true
  },
  {
    path: '/dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'dashboard-home',
        component: () => import('../views/DashboardHome.vue')
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('../views/Profile.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
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
  const isAuthenticated = !!localStorage.getItem('token')
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
```

---

## 📝 Résumé du Module 5

Vous avez appris :
- ✅ Installation et configuration de Vue Router
- ✅ Navigation avec router-link et navigation programmatique
- ✅ Routes dynamiques et paramètres
- ✅ Routes imbriquées
- ✅ Guards de navigation pour sécuriser les routes
- ✅ Lazy loading pour optimiser les performances

## 🎯 Prochaines étapes

Module 6 : Pinia pour la gestion d'état globale

---

**Passez aux exemples et exercices pratiques !** 🚀
