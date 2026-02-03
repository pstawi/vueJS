import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

/**
 * Store d'Authentification
 * Gère la connexion, déconnexion et informations utilisateur
 */
export const useAuthStore = defineStore('auth', () => {
  // ==========================================
  // STATE (avec ref)
  // ==========================================
  
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null)
  
  // ==========================================
  // GETTERS (avec computed)
  // ==========================================
  
  // Vérifie si l'utilisateur est connecté
  const isAuthenticated = computed(() => !!token.value && !!user.value)
  
  // Vérifie si l'utilisateur est admin
  const isAdmin = computed(() => user.value?.role === 'admin')
  
  // Nom d'affichage
  const displayName = computed(() => user.value?.name || 'Invité')
  
  // Email de l'utilisateur
  const userEmail = computed(() => user.value?.email || '')
  
  // ==========================================
  // ACTIONS (fonctions)
  // ==========================================
  
  /**
   * Connexion utilisateur
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise<{success: boolean, error?: string}>}
   */
  async function login(email, password) {
    try {
      // Simulation d'un appel API (délai)
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Vérification des identifiants (mock)
      if (email === 'admin@shop.com' && password === 'admin') {
        user.value = {
          id: 1,
          name: 'Administrateur',
          email: 'admin@shop.com',
          role: 'admin'
        }
        token.value = 'fake-admin-token-' + Date.now()
      } else if (email === 'user@shop.com' && password === 'user') {
        user.value = {
          id: 2,
          name: 'Utilisateur',
          email: 'user@shop.com',
          role: 'user'
        }
        token.value = 'fake-user-token-' + Date.now()
      } else {
        throw new Error('Email ou mot de passe incorrect')
      }
      
      // Sauvegarder dans localStorage
      localStorage.setItem('token', token.value)
      localStorage.setItem('user', JSON.stringify(user.value))
      
      console.log('✅ Connexion réussie:', user.value.name)
      
      return { success: true }
      
    } catch (error) {
      return { 
        success: false, 
        error: error.message 
      }
    }
  }
  
  /**
   * Déconnexion
   */
  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    
    console.log('👋 Déconnexion')
  }
  
  /**
   * Vérifier l'authentification au chargement
   */
  function checkAuth() {
    const savedToken = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    
    if (savedToken && savedUser) {
      token.value = savedToken
      user.value = JSON.parse(savedUser)
      console.log('🔄 Session restaurée:', user.value.name)
    }
  }
  
  /**
   * Inscription (simulation)
   */
  async function register(userData) {
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      
      user.value = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        role: 'user'
      }
      token.value = 'fake-token-' + Date.now()
      
      localStorage.setItem('token', token.value)
      localStorage.setItem('user', JSON.stringify(user.value))
      
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
  
  // ==========================================
  // RETURN (exposer au reste de l'app)
  // ==========================================
  
  return {
    // State
    user,
    token,
    
    // Getters
    isAuthenticated,
    isAdmin,
    displayName,
    userEmail,
    
    // Actions
    login,
    logout,
    checkAuth,
    register
  }
})
