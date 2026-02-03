<template>
  <div class="admin-page">
    <h1>👑 Administration</h1>
    
    <!-- Stats -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-value">{{ totalProducts }}</div>
        <div class="stat-label">Produits</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ categories.length }}</div>
        <div class="stat-label">Catégories</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ productsInStock.length }}</div>
        <div class="stat-label">En stock</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ averagePrice }} €</div>
        <div class="stat-label">Prix moyen</div>
      </div>
    </div>
    
    <!-- Gestion des produits -->
    <div class="products-management card">
      <h2>📦 Gestion des Produits</h2>
      
      <div class="products-table">
        <div class="table-header">
          <div>ID</div>
          <div>Nom</div>
          <div>Prix</div>
          <div>Catégorie</div>
          <div>Stock</div>
          <div>Actions</div>
        </div>
        
        <div 
          v-for="product in products"
          :key="product.id"
          class="table-row"
        >
          <div>{{ product.id }}</div>
          <div><strong>{{ product.name }}</strong></div>
          <div>{{ product.price }} €</div>
          <div>
            <span class="category-tag">{{ product.category }}</span>
          </div>
          <div :class="{ 'low-stock': product.stock <= 5 }">
            {{ product.stock }}
          </div>
          <div class="actions">
            <button 
              @click="editProduct(product)" 
              class="btn-icon"
              title="Modifier"
            >
              ✏️
            </button>
            <button 
              @click="deleteProduct(product.id)" 
              class="btn-icon danger"
              title="Supprimer"
            >
              🗑️
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Info -->
    <div class="info-card">
      <h3>ℹ️ Informations</h3>
      <p>
        Cette page démontre l'utilisation de Pinia pour gérer l'état global.
        Le store <code>productsStore</code> contient tous les produits et les
        getters calculent automatiquement les statistiques affichées ci-dessus.
      </p>
      <p style="margin-top: 10px;">
        Les actions de modification et suppression sont simulées dans cet exemple pédagogique.
      </p>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useProductsStore } from '../stores/products'

const productsStore = useProductsStore()

// Utiliser storeToRefs pour garder la réactivité
const { 
  products,
  categories,
  totalProducts,
  productsInStock,
  averagePrice
} = storeToRefs(productsStore)

// Actions (pas besoin de storeToRefs)
const { deleteProduct: deleteProductAction } = productsStore

const editProduct = (product) => {
  alert(`Édition de "${product.name}" (fonctionnalité simulée)\n\nDans une vraie app, vous ouvririez un formulaire de modification.`)
}

const deleteProduct = (id) => {
  const product = productsStore.productById(id)
  if (confirm(`Êtes-vous sûr de vouloir supprimer "${product.name}" ?`)) {
    deleteProductAction(id)
    alert('✅ Produit supprimé')
  }
}
</script>

<style scoped>
.admin-page {
  padding: 20px 0;
}

h1 {
  font-size: 36px;
  margin-bottom: 30px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.stat-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px;
  border-radius: 12px;
  text-align: center;
}

.stat-value {
  font-size: 42px;
  font-weight: bold;
}

.stat-label {
  font-size: 14px;
  opacity: 0.9;
  margin-top: 5px;
}

.products-management {
  margin-bottom: 30px;
}

.products-management h2 {
  margin-bottom: 25px;
}

.products-table {
  overflow-x: auto;
}

.table-header,
.table-row {
  display: grid;
  grid-template-columns: 60px 2fr 120px 150px 80px 100px;
  gap: 15px;
  padding: 15px;
  align-items: center;
}

.table-header {
  background: #f8f9fa;
  font-weight: bold;
  color: #2c3e50;
  border-radius: 8px;
}

.table-row {
  border-bottom: 1px solid #e9ecef;
  transition: background 0.2s;
}

.table-row:hover {
  background: #f8f9fa;
}

.category-tag {
  display: inline-block;
  padding: 4px 12px;
  background: #667eea;
  color: white;
  border-radius: 12px;
  font-size: 12px;
}

.low-stock {
  color: #e74c3c;
  font-weight: bold;
}

.actions {
  display: flex;
  gap: 8px;
}

.btn-icon {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  transition: background 0.2s;
}

.btn-icon:hover {
  background: #e9ecef;
}

.btn-icon.danger:hover {
  background: #ffe5e5;
}

.info-card {
  background: #d1ecf1;
  border-left: 4px solid #3498db;
  padding: 20px;
  border-radius: 8px;
}

.info-card h3 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.info-card p {
  color: #7f8c8d;
  line-height: 1.6;
}

code {
  background: #fff;
  padding: 2px 6px;
  border-radius: 4px;
  color: #667eea;
  font-family: monospace;
}

@media (max-width: 968px) {
  .table-header,
  .table-row {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  
  .table-header {
    display: none;
  }
}
</style>
