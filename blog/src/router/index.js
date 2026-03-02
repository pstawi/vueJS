import Home from '../views/Home.vue'
import ArticleDetail from '../views/Details.vue'
import Admin from '../views/Admin.vue'
import Login from '../views/Login.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/article/:id',
    name: 'Article',
    component: ArticleDetail
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => Admin,
    meta : { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = localStorage.getItem('isAdmin') !== "true"

  if (requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
