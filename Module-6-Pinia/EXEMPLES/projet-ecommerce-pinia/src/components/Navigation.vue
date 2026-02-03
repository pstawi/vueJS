<template>
  <nav class="navbar">
    <div class="nav-container">
      <router-link to="/" class="logo">
        🛒 Shop Vue
      </router-link>
      
      <div class="nav-links">
        <router-link to="/" class="nav-link">Accueil</router-link>
        <router-link to="/products" class="nav-link">Produits</router-link>
        
        <router-link 
          v-if="isAdmin" 
          to="/admin" 
          class="nav-link"
        >
          Admin
        </router-link>
      </div>
      
      <div class="nav-actions">
        <!-- Badge Panier -->
        <router-link to="/cart" class="cart-link">
          🛒 Panier
          <span v-if="totalItems > 0" class="cart-badge">
            {{ totalItems }}
          </span>
        </router-link>
        
        <!-- Connexion/Déconnexion -->
        <button 
          v-if="!isAuthenticated"
          @click="goToLogin"
          class="btn btn-primary btn-sm"
        >
          Connexion
        </button>
        <div v-else class="user-menu">
          <span class="user-name">👤 {{ displayName }}</span>
          <button 
            @click="handleLogout"
            class="btn btn-secondary btn-sm"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useCartStore } from '../stores/cart'

const router = useRouter()
const authStore = useAuthStore()
const cartStore = useCartStore()

// Destructuration avec réactivité
const { isAuthenticated, isAdmin, displayName } = storeToRefs(authStore)
const { totalItems } = storeToRefs(cartStore)

// Actions (pas besoin de storeToRefs)
const { logout } = authStore

const goToLogin = () => {
  router.push('/login')
}

const handleLogout = () => {
  logout()
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
  max-width: 1400px;
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
}

.nav-link:hover {
  color: #667eea;
  background: #f5f7fa;
}

.nav-link.router-link-active {
  color: #667eea;
  background: rgba(102, 126, 234, 0.1);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.cart-link {
  position: relative;
  text-decoration: none;
  color: #2c3e50;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 6px;
  transition: all 0.3s;
}

.cart-link:hover {
  background: #f5f7fa;
}

.cart-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #e74c3c;
  color: white;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
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

.btn-sm {
  padding: 8px 16px;
  font-size: 14px;
}

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
  
  .user-name {
    display: none;
  }
}
</style>
