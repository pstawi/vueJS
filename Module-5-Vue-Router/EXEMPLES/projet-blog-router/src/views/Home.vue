<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1>Bienvenue sur Mon Blog 📝</h1>
        <p class="hero-subtitle">
          Découvrez des articles sur Vue.js, Vue Router et le développement web moderne
        </p>
        <router-link to="/articles" class="btn btn-primary btn-large">
          Découvrir les articles →
        </router-link>
      </div>
    </section>
    
    <!-- Articles récents -->
    <section class="recent-articles">
      <h2>📰 Articles Récents</h2>
      <div class="articles-grid">
        <ArticleCard 
          v-for="article in recentArticles" 
          :key="article.id"
          :article="article"
        />
      </div>
      
      <div class="text-center">
        <router-link to="/articles" class="btn btn-secondary">
          Voir tous les articles →
        </router-link>
      </div>
    </section>
    
    <!-- Stats -->
    <section class="stats">
      <div class="stat-card">
        <div class="stat-number">{{ articles.length }}</div>
        <div class="stat-label">Articles</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">{{ totalCategories }}</div>
        <div class="stat-label">Catégories</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">{{ totalVues }}</div>
        <div class="stat-label">Vues</div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import ArticleCard from '../components/ArticleCard.vue'
import { articles, getCategories } from '../data/articles'

// 3 articles les plus récents
const recentArticles = computed(() => {
  return articles.slice(0, 3)
})

// Nombre de catégories
const totalCategories = computed(() => {
  return getCategories().length
})

// Total des vues
const totalVues = computed(() => {
  return articles.reduce((sum, article) => sum + article.vues, 0)
})
</script>

<style scoped>
.home {
  padding-bottom: 40px;
}

.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 80px 20px;
  border-radius: 20px;
  text-align: center;
  margin-bottom: 60px;
}

.hero-content h1 {
  font-size: 48px;
  margin-bottom: 20px;
}

.hero-subtitle {
  font-size: 20px;
  margin-bottom: 30px;
  opacity: 0.95;
}

.btn-large {
  padding: 15px 40px;
  font-size: 18px;
}

.recent-articles {
  margin-bottom: 60px;
}

.recent-articles h2 {
  font-size: 32px;
  margin-bottom: 30px;
  text-align: center;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.text-center {
  text-align: center;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  margin-top: 40px;
}

.stat-card {
  background: white;
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.stat-number {
  font-size: 48px;
  font-weight: bold;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  font-size: 16px;
  color: #7f8c8d;
  margin-top: 10px;
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 32px;
  }
  
  .hero-subtitle {
    font-size: 16px;
  }
  
  .articles-grid {
    grid-template-columns: 1fr;
  }
}
</style>
