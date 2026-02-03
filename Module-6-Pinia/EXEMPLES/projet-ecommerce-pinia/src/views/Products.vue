<template>
  <div class="products-page">
    <div class="page-header">
      <h1>🛍️ Nos Produits</h1>
      <p>Découvrez notre sélection de produits</p>
    </div>
    
    <!-- Filtres par catégorie -->
    <div class="filters">
      <button 
        @click="productsStore.setCategory('all')"
        :class="['filter-btn', { active: selectedCategory === 'all' }]"
      >
        Tous ({{ totalProducts }})
      </button>
      <button 
        v-for="cat in categories"
        :key="cat"
        @click="productsStore.setCategory(cat)"
        :class="['filter-btn', { active: selectedCategory === cat }]"
      >
        {{ cat }}
      </button>
    </div>
    
    <!-- Statistiques -->
    <div class="stats">
      <div class="stat-card">
        <div class="stat-value">{{ filteredProducts.length }}</div>
        <div class="stat-label">Produits affichés</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ totalItems }}</div>
        <div class="stat-label">Dans le panier</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ cartTotal.toFixed(2) }} €</div>
        <div class="stat-label">Total panier</div>
      </div>
    </div>
    
    <!-- Grille de produits -->
    <div class="products-grid">
      <ProductCard 
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
      />
    </div>
    
    <!-- Message si aucun produit -->
    <div v-if="filteredProducts.length === 0" class="empty-state">
      <p>Aucun produit dans cette catégorie</p>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import ProductCard from '../components/ProductCard.vue'
import { useProductsStore } from '../stores/products'
import { useCartStore } from '../stores/cart'

// Stores
const productsStore = useProductsStore()
const cartStore = useCartStore()

// State et getters avec réactivité
const { 
  selectedCategory, 
  categories, 
  filteredProducts, 
  totalProducts 
} = storeToRefs(productsStore)

const { totalItems, total: cartTotal } = storeToRefs(cartStore)
</script>

<style scoped>
.products-page {
  padding: 20px 0;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
}

.page-header h1 {
  font-size: 42px;
  margin-bottom: 10px;
}

.page-header p {
  font-size: 18px;
  color: #7f8c8d;
}

.filters {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 30px;
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

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.stat-card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.stat-value {
  font-size: 36px;
  font-weight: bold;
  color: #667eea;
}

.stat-label {
  font-size: 14px;
  color: #7f8c8d;
  margin-top: 5px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

.empty-state {
  text-align: center;
  padding: 80px 20px;
  color: #95a5a6;
  font-size: 18px;
}

@media (max-width: 768px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>
