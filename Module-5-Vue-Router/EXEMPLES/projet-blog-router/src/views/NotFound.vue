<template>
  <div class="not-found-page">
    <div class="not-found-content">
      <div class="error-code">404</div>
      <h1>😕 Page non trouvée</h1>
      <p>La page que vous recherchez n'existe pas ou a été déplacée.</p>
      
      <div class="actions">
        <button @click="goHome" class="btn btn-primary">
          🏠 Retour à l'accueil
        </button>
        <button @click="goBack" class="btn btn-secondary">
          ← Page précédente
        </button>
      </div>
      
      <div class="suggestions">
        <h3>Suggestions :</h3>
        <ul>
          <li>
            <router-link to="/">Accueil</router-link>
          </li>
          <li>
            <router-link to="/articles">Tous les articles</router-link>
          </li>
          <li>
            <router-link to="/about">À propos</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}

const goBack = () => {
  router.back()
}
</script>

<style scoped>
.not-found-page {
  min-height: calc(100vh - 300px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.not-found-content {
  text-align: center;
  max-width: 600px;
}

.error-code {
  font-size: 120px;
  font-weight: bold;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 20px;
}

h1 {
  font-size: 42px;
  color: #2c3e50;
  margin-bottom: 15px;
}

p {
  font-size: 18px;
  color: #7f8c8d;
  margin-bottom: 40px;
}

.actions {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-bottom: 60px;
  flex-wrap: wrap;
}

.suggestions {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.suggestions h3 {
  color: #2c3e50;
  margin-bottom: 20px;
}

.suggestions ul {
  list-style: none;
}

.suggestions li {
  margin: 12px 0;
}

.suggestions a {
  color: #667eea;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  transition: color 0.3s;
}

.suggestions a:hover {
  color: #764ba2;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .error-code {
    font-size: 80px;
  }
  
  h1 {
    font-size: 32px;
  }
  
  .actions {
    flex-direction: column;
  }
}
</style>
