<template>
  <div class="admin-page">
    <div class="admin-header">
      <h1>👑 Administration</h1>
      <p>Gérez les articles de votre blog</p>
    </div>
    
    <div class="admin-content">
      <!-- Stats -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-number">{{ articles.length }}</div>
          <div class="stat-label">Articles</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">{{ totalVues }}</div>
          <div class="stat-label">Vues totales</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">{{ totalLikes }}</div>
          <div class="stat-label">Likes totaux</div>
        </div>
      </div>
      
      <!-- Liste des articles -->
      <div class="articles-management">
        <h2>📰 Gestion des Articles</h2>
        
        <div class="articles-table">
          <div class="table-header">
            <div class="col-id">ID</div>
            <div class="col-title">Titre</div>
            <div class="col-category">Catégorie</div>
            <div class="col-stats">Vues</div>
            <div class="col-actions">Actions</div>
          </div>
          
          <div 
            v-for="article in articles"
            :key="article.id"
            class="table-row"
          >
            <div class="col-id">{{ article.id }}</div>
            <div class="col-title">{{ article.titre }}</div>
            <div class="col-category">
              <span class="category-badge">{{ article.categorie }}</span>
            </div>
            <div class="col-stats">{{ article.vues }}</div>
            <div class="col-actions">
              <button 
                @click="viewArticle(article.id)"
                class="btn-icon"
                title="Voir"
              >
                👁️
              </button>
              <button 
                @click="editArticle(article.id)"
                class="btn-icon"
                title="Modifier"
              >
                ✏️
              </button>
              <button 
                @click="deleteArticle(article.id)"
                class="btn-icon btn-danger"
                title="Supprimer"
              >
                🗑️
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Message informatif -->
      <div class="info-box">
        <h3>ℹ️ Note</h3>
        <p>
          Cette page est protégée par un guard de navigation. Seuls les utilisateurs
          connectés peuvent y accéder. Les fonctionnalités d'édition et de suppression
          sont simulées dans cet exemple pédagogique.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { articles } from '../data/articles'

const router = useRouter()

// Stats
const totalVues = computed(() => {
  return articles.reduce((sum, article) => sum + article.vues, 0)
})

const totalLikes = computed(() => {
  return articles.reduce((sum, article) => sum + article.likes, 0)
})

// Actions
const viewArticle = (id) => {
  router.push({ name: 'article-detail', params: { id } })
}

const editArticle = (id) => {
  alert(`Édition de l'article ${id} (fonctionnalité simulée)`)
}

const deleteArticle = (id) => {
  if (confirm(`Êtes-vous sûr de vouloir supprimer l'article ${id} ?`)) {
    alert('Article supprimé (fonctionnalité simulée)')
  }
}
</script>

<style scoped>
.admin-page {
  max-width: 1200px;
  margin: 0 auto;
}

.admin-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  margin-bottom: 40px;
}

.admin-header h1 {
  font-size: 36px;
  margin-bottom: 10px;
}

.admin-content {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.stat-card {
  background: #f8f9fa;
  padding: 25px;
  border-radius: 12px;
  text-align: center;
}

.stat-number {
  font-size: 42px;
  font-weight: bold;
  color: #667eea;
}

.stat-label {
  font-size: 14px;
  color: #7f8c8d;
  margin-top: 10px;
}

.articles-management h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #2c3e50;
}

.articles-table {
  border: 2px solid #e9ecef;
  border-radius: 12px;
  overflow: hidden;
}

.table-header,
.table-row {
  display: grid;
  grid-template-columns: 60px 1fr 150px 100px 150px;
  gap: 15px;
  padding: 15px 20px;
  align-items: center;
}

.table-header {
  background: #f8f9fa;
  font-weight: 600;
  color: #2c3e50;
  font-size: 14px;
}

.table-row {
  border-top: 1px solid #e9ecef;
  transition: background 0.2s;
}

.table-row:hover {
  background: #f8f9fa;
}

.col-title {
  font-weight: 500;
  color: #2c3e50;
}

.category-badge {
  display: inline-block;
  padding: 4px 12px;
  background: #667eea;
  color: white;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.col-actions {
  display: flex;
  gap: 8px;
}

.btn-icon {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  padding: 6px 10px;
  border-radius: 6px;
  transition: all 0.2s;
}

.btn-icon:hover {
  background: #e9ecef;
}

.btn-danger:hover {
  background: #ffe5e5;
}

.info-box {
  margin-top: 40px;
  padding: 20px;
  background: #d1ecf1;
  border-left: 4px solid #3498db;
  border-radius: 8px;
}

.info-box h3 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.info-box p {
  color: #7f8c8d;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .table-header,
  .table-row {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  
  .table-header {
    display: none;
  }
  
  .col-actions {
    justify-content: flex-start;
  }
}
</style>
