<template>
  <div class="article-card">
    <div class="article-image">
      <img :src="article.image" :alt="article.titre">
      <span class="article-categorie">{{ article.categorie }}</span>
    </div>
    
    <div class="article-content">
      <h3 class="article-titre">{{ article.titre }}</h3>
      <p class="article-resume">{{ article.resume }}</p>
      
      <div class="article-meta">
        <span class="meta-item">
          👤 {{ article.auteur }}
        </span>
        <span class="meta-item">
          📅 {{ formatDate(article.date) }}
        </span>
        <span class="meta-item">
          👁️ {{ article.vues }}
        </span>
        <span class="meta-item">
          ❤️ {{ article.likes }}
        </span>
      </div>
      
      <router-link 
        :to="{ name: 'article-detail', params: { id: article.id } }"
        class="btn btn-primary"
      >
        Lire la suite →
      </router-link>
    </div>
  </div>
</template>

<script setup>
// Props
defineProps({
  article: {
    type: Object,
    required: true
  }
})

// Formater la date
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.article-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

.article-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.article-image {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.article-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.article-card:hover .article-image img {
  transform: scale(1.05);
}

.article-categorie {
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(255, 255, 255, 0.95);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: #667eea;
}

.article-content {
  padding: 20px;
}

.article-titre {
  font-size: 22px;
  margin-bottom: 12px;
  color: #2c3e50;
  line-height: 1.3;
}

.article-resume {
  color: #7f8c8d;
  line-height: 1.6;
  margin-bottom: 15px;
}

.article-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 15px;
  font-size: 14px;
  color: #95a5a6;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 5px;
}
</style>
