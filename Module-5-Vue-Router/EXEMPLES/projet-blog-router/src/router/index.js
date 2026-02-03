import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: 'Accueil'
    }
  },
  {
    path: '/articles',
    name: 'articles',
    // Lazy loading : le composant est chargé seulement quand la route est visitée
    component: () => import('../views/Articles.vue'),
    meta: {
      title: 'Articles'
    }
  },
  {
    path: '/article/:id',
    name: 'article-detail',
    component: () => import('../views/ArticleDetail.vue'),
    // Les params sont passés en props au composant
    props: true,
    meta: {
      title: 'Détail de l\'article'
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue'),
    meta: {
      title: 'À propos'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    meta: {
      title: 'Connexion'
    }
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/Admin.vue'),
    // Route protégée : nécessite authentification
    meta: {
      requiresAuth: true,
      title: 'Administration'
    }
  },
  {
    // Route 404 : attrape toutes les routes non définies
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFound.vue'),
    meta: {
      title: '404 - Page non trouvée'
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // Comportement du scroll lors de la navigation
  scrollBehavior(to, from, savedPosition) {
    // Si position sauvegardée (retour arrière), restaurer
    if (savedPosition) {
      return savedPosition
    }
    // Sinon, scroll en haut de page
    return { top: 0 }
  }
})

// ==========================================
// GUARD GLOBAL : Navigation Guard
// ==========================================
router.beforeEach((to, from, next) => {
  // Vérifier si l'utilisateur est connecté
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  
  // Log pour le débogage (à retirer en production)
  console.log(`Navigation: ${from.name || 'null'} → ${to.name}`)
  
  // Mettre à jour le titre de la page
  document.title = to.meta.title ? `${to.meta.title} | Mon Blog` : 'Mon Blog'
  
  // Si la route nécessite authentification
  if (to.meta.requiresAuth && !isAuthenticated) {
    // Rediriger vers login avec l'URL de destination
    next({
      name: 'login',
      query: { redirect: to.fullPath }
    })
  } else if (to.name === 'login' && isAuthenticated) {
    // Si déjà connecté et on va vers login, rediriger vers home
    next({ name: 'home' })
  } else {
    // Sinon, laisser passer
    next()
  }
})

// Guard après navigation (optionnel)
router.afterEach((to, from) => {
  // Exemple : analytics
  console.log(`Navigation terminée vers: ${to.name}`)
})

export default router
