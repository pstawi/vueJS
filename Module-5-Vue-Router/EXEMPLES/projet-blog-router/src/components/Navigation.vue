<template>
  <nav class="navbar">
    <div class="nav-container">
      <!-- Logo -->
      <router-link to="/" class="logo">
        📝 Mon Blog
      </router-link>
      
      <!-- Menu de navigation -->
      <div class="nav-links">
        <router-link to="/" class="nav-link">
          Accueil
        </router-link>
        <router-link to="/articles" class="nav-link">
          Articles
        </router-link>
        <router-link to="/about" class="nav-link">
          À propos
        </router-link>
        
        <!-- Si connecté, afficher Admin -->
        <router-link 
          v-if="isAuthenticated" 
          to="/admin" 
          class="nav-link"
        >
          Admin
        </router-link>
      </div>
      
      <!-- Bouton connexion/déconnexion -->
      <div class="nav-actions">
        <button 
          v-if="!isAuthenticated"
          @click="goToLogin"
          class="btn btn-primary"
        >
          Connexion
        </button>
        <div v-else class="user-menu">
          <span class="user-name">👤 {{ userName }}</span>
          <button 
            @click="logout"
            class="btn btn-secondary"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// État d'authentification
const isAuthenticated = ref(false)
const userName = ref('')

// Vérifier l'authentification au montage
onMounted(() => {
  checkAuth()
})

// Vérifier si l'utilisateur est connecté
const checkAuth = () => {
  isAuthenticated.value = localStorage.getItem('isAuthenticated') === 'true'
  userName.value = localStorage.getItem('userName') || ''
}

// Navigation programmatique vers login
const goToLogin = () => {
  router.push('/login')
}

// Déconnexion
const logout = () => {
  localStorage.removeItem('isAuthenticated')
  localStorage.removeItem('userName')
  localStorage.removeItem('userRole')
  isAuthenticated.value = false
  userName.value = ''
  router.push('/')
}
</script>

<style scoped>
.navbar {
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
  color: #2c3e50;
  transition: color 0.3s;
}

.logo:hover {
  color: #667eea;
}

.nav-links {
  display: flex;
  gap: 30px;
  flex: 1;
  justify-content: center;
}

.nav-link {
  text-decoration: none;
  color: #2c3e50;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 6px;
  transition: all 0.3s;
  position: relative;
}

.nav-link:hover {
  color: #667eea;
  background: #f5f7fa;
}

/* Classe active automatique de Vue Router */
.nav-link.router-link-active {
  color: #667eea;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
}

.nav-link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 16px;
  right: 16px;
  height: 2px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 15px;
}

.user-name {
  color: #2c3e50;
  font-weight: 500;
}

/* Responsive */
@media (max-width: 768px) {
  .nav-container {
    flex-wrap: wrap;
  }
  
  .nav-links {
    order: 3;
    width: 100%;
    justify-content: space-around;
    padding-top: 15px;
    border-top: 1px solid #e9ecef;
  }
  
  .nav-link {
    padding: 6px 12px;
    font-size: 14px;
  }
  
  .user-name {
    display: none;
  }
}
</style>
