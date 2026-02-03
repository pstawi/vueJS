<template>
  <div class="product-card">
    <div class="product-image">
      <img :src="product.image" :alt="product.name">
      <span v-if="product.stock <= 5 && product.stock > 0" class="stock-badge low">
        Dernières pièces
      </span>
      <span v-else-if="product.stock === 0" class="stock-badge out">
        Rupture de stock
      </span>
    </div>
    
    <div class="product-info">
      <div class="product-category">{{ product.category }}</div>
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-description">{{ product.description }}</p>
      
      <div class="product-footer">
        <div class="product-price">{{ product.price }} €</div>
        
        <!-- Bouton selon état -->
        <button 
          v-if="!isInCart"
          @click="addToCart"
          :disabled="product.stock === 0"
          class="btn btn-primary"
        >
          {{ product.stock === 0 ? 'Indisponible' : 'Ajouter' }}
        </button>
        <button 
          v-else
          @click="goToCart"
          class="btn btn-secondary"
        >
          ✓ Dans le panier
        </button>
      </div>
      
      <div class="product-stock">
        Stock : {{ product.stock }} unité{{ product.stock > 1 ? 's' : '' }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const router = useRouter()
const cartStore = useCartStore()

// Vérifier si le produit est dans le panier
const isInCart = computed(() => {
  return cartStore.isInCart(props.product.id)
})

// Ajouter au panier
const addToCart = () => {
  cartStore.addToCart(props.product.id)
}

// Aller au panier
const goToCart = () => {
  router.push('/cart')
}
</script>

<style scoped>
.product-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.product-image {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: #f8f9fa;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.stock-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  color: white;
}

.stock-badge.low {
  background: #f39c12;
}

.stock-badge.out {
  background: #e74c3c;
}

.product-info {
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.product-category {
  font-size: 12px;
  color: #667eea;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.product-name {
  font-size: 20px;
  color: #2c3e50;
  margin-bottom: 10px;
}

.product-description {
  font-size: 14px;
  color: #7f8c8d;
  line-height: 1.5;
  margin-bottom: 15px;
  flex: 1;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.product-price {
  font-size: 28px;
  font-weight: bold;
  color: #27ae60;
}

.product-stock {
  font-size: 12px;
  color: #95a5a6;
  text-align: center;
}
</style>
