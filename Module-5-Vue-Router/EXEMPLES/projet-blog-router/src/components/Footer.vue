<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3>📝 Mon Blog</h3>
        <p>Un blog sur Vue.js et le développement web moderne.</p>
      </div>
      
      <div class="footer-section">
        <h4>Navigation</h4>
        <ul>
          <li><router-link to="/">Accueil</router-link></li>
          <li><router-link to="/articles">Articles</router-link></li>
          <li><router-link to="/about">À propos</router-link></li>
        </ul>
      </div>
      
      <div class="footer-section">
        <h4>Ressources</h4>
        <ul>
          <li><a href="https://vuejs.org" target="_blank">Vue.js</a></li>
          <li><a href="https://router.vuejs.org" target="_blank">Vue Router</a></li>
          <li><a href="https://pinia.vuejs.org" target="_blank">Pinia</a></li>
        </ul>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p>&copy; 2024 Mon Blog. Projet pédagogique Vue Router.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #2c3e50;
  color: white;
  margin-top: 60px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
}

.footer-section h3 {
  margin-bottom: 15px;
  color: #667eea;
}

.footer-section h4 {
  margin-bottom: 15px;
  color: #ecf0f1;
}

.footer-section p {
  color: #bdc3c7;
  line-height: 1.6;
}

.footer-section ul {
  list-style: none;
}

.footer-section li {
  margin-bottom: 10px;
}

.footer-section a {
  color: #bdc3c7;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-section a:hover {
  color: #667eea;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 20px;
  text-align: center;
  color: #95a5a6;
}
</style>
