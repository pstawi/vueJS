<template>
  <div class="home">
    <section class="hero">
      <h1>Bienvenue sur Shop Vue 🛒</h1>
      <p>Découvrez notre sélection de produits Apple</p>
      <router-link to="/products" class="btn btn-primary btn-large">
        Voir le catalogue →
      </router-link>
    </section>
    
    <section class="features">
      <div class="feature-card">
        <div class="feature-icon">🔒</div>
        <h3>Paiement Sécurisé</h3>
        <p>Vos transactions sont protégées</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">🚚</div>
        <h3>Livraison Rapide</h3>
        <p>Livré en 24-48h</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">↩️</div>
        <h3>Retours Gratuits</h3>
        <p>30 jours pour changer d'avis</p>
      </div>
    </section>
    
    <section class="stats">
      <div class="stat">
        <div class="stat-number">{{ totalProducts }}</div>
        <div class="stat-label">Produits</div>
      </div>
      <div class="stat">
        <div class="stat-number">{{ categories.length }}</div>
        <div class="stat-label">Catégories</div>
      </div>
      <div class="stat">
        <div class="stat-number">{{ totalItems }}</div>
        <div class="stat-label">Dans votre panier</div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useProductsStore } from '../stores/products'
import { useCartStore } from '../stores/cart'

const productsStore = useProductsStore()
const cartStore = useCartStore()

const { totalProducts, categories } = storeToRefs(productsStore)
const { totalItems } = storeToRefs(cartStore)
</script>

<style scoped>
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 100px 40px;
  border-radius: 20px;
  text-align: center;
  margin-bottom: 60px;
}

.hero h1 {
  font-size: 56px;
  margin-bottom: 20px;
}

.hero p {
  font-size: 24px;
  margin-bottom: 40px;
  opacity: 0.95;
}

.btn-large {
  padding: 18px 40px;
  font-size: 18px;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
}

.feature-card {
  background: white;
  padding: 40px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 48px;
  margin-bottom: 20px;
}

.feature-card h3 {
  font-size: 22px;
  color: #2c3e50;
  margin-bottom: 10px;
}

.feature-card p {
  color: #7f8c8d;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
}

.stat {
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
}

.stat-label {
  font-size: 16px;
  color: #7f8c8d;
  margin-top: 10px;
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 36px;
  }
  
  .hero p {
    font-size: 18px;
  }
}
</style>
