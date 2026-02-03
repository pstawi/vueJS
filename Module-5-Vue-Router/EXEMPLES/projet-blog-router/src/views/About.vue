<template>
  <div class="about-page">
    <div class="about-hero">
      <h1>À propos de Mon Blog</h1>
      <p>Découvrez l'histoire et la mission de notre blog</p>
    </div>
    
    <div class="about-content">
      <section class="section">
        <h2>📖 Notre Mission</h2>
        <p>
          Mon Blog est un projet pédagogique créé pour démontrer les capacités de Vue Router
          dans une application Vue.js 3. Notre mission est de partager des connaissances sur
          le développement web moderne, particulièrement sur l'écosystème Vue.js.
        </p>
      </section>
      
      <section class="section">
        <h2>🎯 Objectifs Pédagogiques</h2>
        <ul class="objectives-list">
          <li>
            <strong>Navigation :</strong> Démontrer les différents types de navigation (liens, programmatique)
          </li>
          <li>
            <strong>Routes dynamiques :</strong> Afficher du contenu basé sur les paramètres d'URL
          </li>
          <li>
            <strong>Guards :</strong> Protéger certaines routes avec authentification
          </li>
          <li>
            <strong>Transitions :</strong> Animations fluides entre les pages
          </li>
        </ul>
      </section>
      
      <section class="section">
        <h2>💡 Technologies Utilisées</h2>
        <div class="tech-grid">
          <div class="tech-card">
            <div class="tech-icon">⚡</div>
            <h3>Vue.js 3</h3>
            <p>Framework JavaScript progressif</p>
          </div>
          <div class="tech-card">
            <div class="tech-icon">🛣️</div>
            <h3>Vue Router</h3>
            <p>Routage officiel pour Vue</p>
          </div>
          <div class="tech-card">
            <div class="tech-icon">⚙️</div>
            <h3>Vite</h3>
            <p>Build tool ultra-rapide</p>
          </div>
          <div class="tech-card">
            <div class="tech-icon">🎨</div>
            <h3>CSS3</h3>
            <p>Styles modernes</p>
          </div>
        </div>
      </section>
      
      <section class="section">
        <h2>📧 Contact</h2>
        <p>
          Ce projet est un exemple pédagogique. Pour toute question sur Vue Router,
          consultez la <a href="https://router.vuejs.org/" target="_blank">documentation officielle</a>.
        </p>
        <button @click="goToArticles" class="btn btn-primary">
          Découvrir les articles →
        </button>
      </section>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToArticles = () => {
  router.push('/articles')
}
</script>

<style scoped>
.about-page {
  max-width: 900px;
  margin: 0 auto;
}

.about-hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 60px 40px;
  border-radius: 20px;
  text-align: center;
  margin-bottom: 40px;
}

.about-hero h1 {
  font-size: 42px;
  margin-bottom: 15px;
}

.about-hero p {
  font-size: 20px;
  opacity: 0.95;
}

.about-content {
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.section {
  margin-bottom: 40px;
}

.section:last-child {
  margin-bottom: 0;
}

.section h2 {
  font-size: 28px;
  margin-bottom: 20px;
  color: #2c3e50;
}

.section p {
  font-size: 18px;
  line-height: 1.8;
  color: #7f8c8d;
}

.section a {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
}

.section a:hover {
  text-decoration: underline;
}

.objectives-list {
  list-style: none;
  padding: 0;
}

.objectives-list li {
  padding: 15px 20px;
  margin: 10px 0;
  background: #f8f9fa;
  border-left: 4px solid #667eea;
  border-radius: 6px;
  font-size: 16px;
  line-height: 1.6;
  color: #2c3e50;
}

.objectives-list strong {
  color: #667eea;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.tech-card {
  text-align: center;
  padding: 25px;
  background: #f8f9fa;
  border-radius: 12px;
  transition: all 0.3s;
}

.tech-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.tech-icon {
  font-size: 48px;
  margin-bottom: 15px;
}

.tech-card h3 {
  font-size: 20px;
  color: #2c3e50;
  margin-bottom: 10px;
}

.tech-card p {
  font-size: 14px;
  color: #95a5a6;
}

@media (max-width: 768px) {
  .about-hero h1 {
    font-size: 32px;
  }
  
  .about-content {
    padding: 25px;
  }
  
  .tech-grid {
    grid-template-columns: 1fr;
  }
}
</style>
