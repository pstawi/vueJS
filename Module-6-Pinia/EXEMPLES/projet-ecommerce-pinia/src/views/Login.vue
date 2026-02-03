<template>
  <div class="login-page">
    <div class="login-container">
      <h1>🔐 Connexion</h1>
      
      <div v-if="error" class="alert error">
        {{ error }}
      </div>
      
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>Email</label>
          <input 
            v-model="email" 
            type="email" 
            placeholder="votre@email.com"
            required
          >
        </div>
        
        <div class="form-group">
          <label>Mot de passe</label>
          <input 
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
      
      <div class="test-accounts">
        <h3>Comptes de test :</h3>
        <p><strong>Admin :</strong> admin@shop.com / admin</p>
        <p><strong>User :</strong> user@shop.com / user</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  error.value = ''
  
  const result = await authStore.login(email.value, password.value)
  
  if (result.success) {
    const redirect = route.query.redirect || '/'
    router.push(redirect)
  } else {
    error.value = result.error
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
  max-width: 450px;
  width: 100%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 32px;
}

.alert {
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.alert.error {
  background: #ffe5e5;
  color: #c0392b;
  border-left: 4px solid #e74c3c;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #2c3e50;
}

input {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 16px;
}

input:focus {
  outline: none;
  border-color: #667eea;
}

.btn-block {
  width: 100%;
  padding: 15px;
  font-size: 16px;
}

.test-accounts {
  margin-top: 30px;
  padding-top: 30px;
  border-top: 2px solid #e9ecef;
  text-align: center;
}

.test-accounts h3 {
  margin-bottom: 15px;
  color: #2c3e50;
}

.test-accounts p {
  color: #7f8c8d;
  font-size: 14px;
  margin: 8px 0;
}
</style>
