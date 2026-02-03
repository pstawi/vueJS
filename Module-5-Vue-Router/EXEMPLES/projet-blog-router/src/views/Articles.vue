<template>
  <div class="articles-page">
    <h1>📰 Tous les Articles</h1>
    
    <!-- Filtres -->
    <div class="filters">
      <button 
        @click="selectedCategorie = 'all'"
        :class="['filter-btn', { active: selectedCategorie === 'all' }]"
      >
        Tous
      </button>
      <button 
        v-for="cat in categories"
        :key="cat"
        @click="selectedCategorie = cat"
        :class="['filter-btn', { active: selectedCategorie === cat }]"
      >
        {{ cat }}
      </button>
    </div>
    
    <!-- Liste des articles -->
    <div class="articles-grid">
      <ArticleCard 
        v-for="article in filteredArticles" 
        :key="article.id"
        :article="article"
      />
    </div>
    
    <!-- Message si aucun article -->
    <div v-if="filteredArticles.length === 0" class="empty-state">
      <p>Aucun article dans cette catégorie pour le moment.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ArticleCard from '../components/ArticleCard.vue'
import { articles, getCategories, getArticlesByCategorie } from '../data/articles'

// Catégorie sélectionnée
const selectedCategorie = ref('all')

// Toutes les catégories
const categories = computed(() => getCategories())

// Articles filtrés
const filteredArticles = computed(() => {
  return getArticlesByCategorie(selectedCategorie.value)
})
</script>

<style scoped>
.articles-page {
  padding: 20px 0;
}

h1 {
  font-size: 36px;
  margin-bottom: 30px;
  text-align: center;
}

.filters {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 10px 20px;
  background: white;
  color: #2c3e50;
  border: 2px solid #e9ecef;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}

.filter-btn:hover {
  border-color: #667eea;
  color: #667eea;
}

.filter-btn.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-color: #667eea;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 30px;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #7f8c8d;
  font-size: 18px;
}

@media (max-width: 768px) {
  .articles-grid {
    grid-template-columns: 1fr;
  }
}
</style>
