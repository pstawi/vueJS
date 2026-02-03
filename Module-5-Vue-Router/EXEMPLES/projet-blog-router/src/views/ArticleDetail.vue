<template>
  <div class="article-detail">
    <!-- Article trouvé -->
    <article v-if="article" class="article">
      <!-- En-tête -->
      <header class="article-header">
        <span class="categorie-badge">{{ article.categorie }}</span>
        <h1>{{ article.titre }}</h1>
        <div class="article-meta">
          <span>👤 {{ article.auteur }}</span>
          <span>📅 {{ formatDate(article.date) }}</span>
          <span>👁️ {{ article.vues }} vues</span>
          <span>❤️ {{ article.likes }} likes</span>
        </div>
      </header>
      
      <!-- Image -->
      <div class="article-image-full">
        <img :src="article.image" :alt="article.titre">
      </div>
      
      <!-- Contenu -->
      <div class="article-content">
        <p class="lead">{{ article.resume }}</p>
        <div class="article-body">
          {{ article.contenu }}
        </div>
      </div>
      
      <!-- Actions -->
      <div class="article-actions">
        <button @click="goBack" class="btn btn-secondary">
          ← Retour
        </button>
        <button @click="shareArticle" class="btn btn-primary">
          Partager 🔗
        </button>
      </div>
      
      <!-- Articles similaires -->
      <section class="related-articles">
        <h3>Articles similaires</h3>
        <div class="articles-grid-small">
          <ArticleCard 
            v-for="relatedArticle in relatedArticles"
            :key="relatedArticle.id"
            :article="relatedArticle"
          />
        </div>
      </section>
    </article>
    
    <!-- Article non trouvé -->
    <div v-else class="not-found">
      <h1>😕 Article non trouvé</h1>
      <p>L'article que vous recherchez n'existe pas ou a été supprimé.</p>
      <router-link to="/articles" class="btn btn-primary">
        Voir tous les articles
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import ArticleCard from '../components/ArticleCard.vue'
import { getArticleById, articles } from '../data/articles'

// Props (id de l'article depuis la route)
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const router = useRouter()

// Récupérer l'article
const article = computed(() => getArticleById(props.id))

// Articles de la même catégorie (max 3)
const relatedArticles = computed(() => {
  if (!article.value) return []
  
  return articles
    .filter(a => 
      a.categorie === article.value.categorie && 
      a.id !== article.value.id
    )
    .slice(0, 3)
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

// Retour arrière
const goBack = () => {
  router.back()
}

// Partager (simulation)
const shareArticle = () => {
  if (article.value) {
    const url = window.location.href
    navigator.clipboard.writeText(url)
    alert('Lien copié dans le presse-papier !')
  }
}
</script>

<style scoped>
.article-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px 0;
}

.article {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.article-header {
  padding: 40px;
  text-align: center;
}

.categorie-badge {
  display: inline-block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 20px;
}

.article-header h1 {
  font-size: 42px;
  line-height: 1.3;
  margin-bottom: 20px;
  color: #2c3e50;
}

.article-meta {
  display: flex;
  justify-content: center;
  gap: 20px;
  color: #95a5a6;
  font-size: 14px;
  flex-wrap: wrap;
}

.article-image-full {
  width: 100%;
  height: 400px;
  overflow: hidden;
}

.article-image-full img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-content {
  padding: 40px;
}

.lead {
  font-size: 20px;
  line-height: 1.6;
  color: #7f8c8d;
  margin-bottom: 30px;
  padding-bottom: 30px;
  border-bottom: 2px solid #e9ecef;
}

.article-body {
  font-size: 18px;
  line-height: 1.8;
  color: #2c3e50;
  white-space: pre-line;
}

.article-actions {
  display: flex;
  justify-content: space-between;
  padding: 0 40px 40px;
  gap: 15px;
}

.related-articles {
  padding: 40px;
  background: #f8f9fa;
  border-top: 2px solid #e9ecef;
}

.related-articles h3 {
  font-size: 24px;
  margin-bottom: 30px;
}

.articles-grid-small {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.not-found {
  text-align: center;
  padding: 80px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.not-found h1 {
  font-size: 48px;
  margin-bottom: 20px;
}

.not-found p {
  font-size: 18px;
  color: #7f8c8d;
  margin-bottom: 30px;
}

@media (max-width: 768px) {
  .article-header h1 {
    font-size: 28px;
  }
  
  .article-content {
    padding: 20px;
  }
  
  .article-actions {
    flex-direction: column;
    padding: 0 20px 20px;
  }
  
  .articles-grid-small {
    grid-template-columns: 1fr;
  }
}
</style>
