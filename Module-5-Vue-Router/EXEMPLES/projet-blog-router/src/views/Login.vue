<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-header">
        <h1>🔐 Connexion</h1>
        <p>Connectez-vous pour accéder à l'administration</p>
      </div>
      
      <!-- Message d'erreur -->
      <div v-if="error" class="alert alert-error">
        {{ error }}
      </div>
      
      <!-- Formulaire -->
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input 
            id="email"
            v-model="email"
            type="email" 
            placeholder="votre@email.com"
            required
          >
        </div>
        
        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input 
            id="password"
            v-model="password"
            type="password" 
            placeholder="••••••••"
            required
          >
        </div>
        
        <button 
          type="submit" 
          class="btn btn-primary btn-block"
          :disabled="loading"
        >
          {{ loading ? 'Connexion...' : 'Se connecter' }}
        </button>
      </form>
      
      <!-- Comptes de test -->
      <div class="test-accounts">
        <h3>Comptes de test :</h3>
        <div class="accounts-grid">
          <div class="account-card">
            <strong>👤 Utilisateur</strong>
            <p>Email : user@blog.com</p>
            <p>Mot de passe : user</p>
          </div>
          <div class="account-card">
            <strong>👑 Administrateur</strong>
            <p>Email : admin@blog.com</p>
            <p>Mot de passe : admin</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// État du formulaire
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

// Gestion de la connexion
const handleLogin = async () => {
  loading.value = true
  error.value = ''
  
  // Simulation d'un délai d'API
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Vérifier les identifiants (simulation)
  if (email.value === 'admin@blog.com' && password.value === 'admin') {
    // Connexion admin
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('userName', 'Admin')
    localStorage.setItem('userRole', 'admin')
    
    // Rediriger vers la page demandée ou vers home
    const redirect = route.query.redirect || '/'
    router.push(redirect)
    
  } else if (email.value === 'user@blog.com' && password.value === 'user') {
    // Connexion utilisateur
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('userName', 'Utilisateur')
    localStorage.setItem('userRole', 'user')
    
    const redirect = route.query.redirect || '/'
    router.push(redirect)
    
  } else {
    // Erreur
    error.value = 'Email ou mot de passe incorrect'
  }
  
  loading.value = false
}
</script>

<style scoped>
.login-page {
  min-height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.login-container {
  background: white;
  border-radius: 20px;
  padding: 40px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-header h1 {
  font-size: 36px;
  color: #2c3e50;
  margin-bottom: 10px;
}

.login-header p {
  color: #7f8c8d;
}

.alert {
  padding: 15px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.alert-error {
  background: #ffe5e5;
  color: #c0392b;
  border-left: 4px solid #e74c3c;
}

.login-form {
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #2c3e50;
}

.form-group input {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.btn-block {
  width: 100%;
  padding: 15px;
  font-size: 16px;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.test-accounts {
  padding-top: 30px;
  border-top: 2px solid #e9ecef;
}

.test-accounts h3 {
  font-size: 18px;
  color: #2c3e50;
  margin-bottom: 20px;
  text-align: center;
}

.accounts-grid {
  display: grid;
  gap: 15px;
}

.account-card {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  font-size: 14px;
}

.account-card strong {
  display: block;
  margin-bottom: 10px;
  color: #2c3e50;
}

.account-card p {
  margin: 5px 0;
  color: #7f8c8d;
}

@media (max-width: 768px) {
  .login-container {
    padding: 25px;
  }
}
</style>
