<template>
  <div class="cart-page">
    <h1>🛒 Mon Panier</h1>
    
    <!-- Panier vide -->
    <div v-if="isEmpty" class="empty-cart">
      <div class="empty-icon">🛒</div>
      <h2>Votre panier est vide</h2>
      <p>Ajoutez des produits pour commencer vos achats</p>
      <router-link to="/products" class="btn btn-primary">
        Découvrir nos produits
      </router-link>
    </div>
    
    <!-- Panier avec articles -->
    <div v-else class="cart-content">
      <div class="cart-items">
        <h2>Articles ({{ totalItems }})</h2>
        
        <div 
          v-for="item in cartItems"
          :key="item.productId"
          class="cart-item"
        >
          <img :src="item.product.image" :alt="item.product.name" class="item-image">
          
          <div class="item-info">
            <h3>{{ item.product.name }}</h3>
            <p>{{ item.product.category }}</p>
            <p class="item-price">{{ item.product.price }} € / unité</p>
          </div>
          
          <div class="item-controls">
            <button 
              @click="decrementQuantity(item.productId)"
              class="btn-qty"
            >
              −
            </button>
            <span class="quantity">{{ item.quantity }}</span>
            <button 
              @click="incrementQuantity(item.productId)"
              class="btn-qty"
            >
              +
            </button>
          </div>
          
          <div class="item-total">
            {{ (item.product.price * item.quantity).toFixed(2) }} €
          </div>
          
          <button 
            @click="removeFromCart(item.productId)"
            class="btn-remove"
          >
            🗑️
          </button>
        </div>
        
        <button 
          @click="handleClearCart"
          class="btn btn-secondary"
          style="margin-top: 20px;"
        >
          Vider le panier
        </button>
      </div>
      
      <!-- Récapitulatif -->
      <div class="cart-summary">
        <h2>Récapitulatif</h2>
        
        <div class="summary-line">
          <span>Sous-total HT :</span>
          <span>{{ subtotal.toFixed(2) }} €</span>
        </div>
        
        <div class="summary-line">
          <span>TVA (20%) :</span>
          <span>{{ taxAmount.toFixed(2) }} €</span>
        </div>
        
        <div class="summary-line total">
          <span>Total TTC :</span>
          <span>{{ total.toFixed(2) }} €</span>
        </div>
        
        <button 
          @click="handleCheckout"
          class="btn btn-primary btn-block"
          :disabled="checkingOut"
        >
          {{ checkingOut ? 'Traitement...' : 'Commander' }}
        </button>
        
        <router-link to="/products" class="continue-shopping">
          ← Continuer mes achats
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const cartStore = useCartStore()
const authStore = useAuthStore()

// State avec réactivité
const { 
  cartItems, 
  totalItems, 
  subtotal, 
  taxAmount, 
  total, 
  isEmpty 
} = storeToRefs(cartStore)

const { isAuthenticated } = storeToRefs(authStore)

// Actions
const { 
  incrementQuantity, 
  decrementQuantity, 
  removeFromCart, 
  clearCart,
  checkout
} = cartStore

// État local
const checkingOut = ref(false)

// Vider le panier avec confirmation
const handleClearCart = () => {
  if (confirm('Êtes-vous sûr de vouloir vider le panier ?')) {
    clearCart()
  }
}

// Finaliser la commande
const handleCheckout = async () => {
  // Vérifier l'authentification
  if (!isAuthenticated.value) {
    if (confirm('Vous devez être connecté pour commander. Se connecter maintenant ?')) {
      router.push({ name: 'login', query: { redirect: '/cart' } })
    }
    return
  }
  
  checkingOut.value = true
  
  const result = await checkout()
  
  if (result.success) {
    alert('✅ Commande validée avec succès !\n\nMerci pour votre achat.')
    router.push('/products')
  } else {
    alert('❌ Erreur lors de la commande : ' + result.error)
  }
  
  checkingOut.value = false
}
</script>

<style scoped>
.cart-page {
  padding: 20px 0;
}

h1 {
  font-size: 36px;
  margin-bottom: 30px;
}

.empty-cart {
  text-align: center;
  padding: 80px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.empty-icon {
  font-size: 80px;
  margin-bottom: 20px;
}

.empty-cart h2 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.empty-cart p {
  color: #7f8c8d;
  margin-bottom: 30px;
}

.cart-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
}

.cart-items,
.cart-summary {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.cart-items h2,
.cart-summary h2 {
  font-size: 24px;
  margin-bottom: 25px;
  color: #2c3e50;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 10px;
  margin-bottom: 15px;
}

.item-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  background: white;
}

.item-info {
  flex: 1;
}

.item-info h3 {
  font-size: 18px;
  color: #2c3e50;
  margin-bottom: 5px;
}

.item-info p {
  font-size: 14px;
  color: #7f8c8d;
}

.item-price {
  color: #27ae60;
  font-weight: 600;
}

.item-controls {
  display: flex;
  align-items: center;
  gap: 15px;
}

.btn-qty {
  width: 35px;
  height: 35px;
  border: 2px solid #667eea;
  background: white;
  color: #667eea;
  border-radius: 50%;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  transition: all 0.3s;
}

.btn-qty:hover {
  background: #667eea;
  color: white;
}

.quantity {
  font-size: 18px;
  font-weight: bold;
  min-width: 30px;
  text-align: center;
}

.item-total {
  font-size: 20px;
  font-weight: bold;
  color: #2c3e50;
  min-width: 100px;
  text-align: right;
}

.btn-remove {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-remove:hover {
  background: #c0392b;
}

.cart-summary {
  position: sticky;
  top: 100px;
  height: fit-content;
}

.summary-line {
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 1px solid #e9ecef;
  font-size: 16px;
}

.summary-line.total {
  border-bottom: none;
  border-top: 2px solid #2c3e50;
  font-size: 24px;
  font-weight: bold;
  color: #2c3e50;
  margin-top: 10px;
  padding-top: 20px;
}

.btn-block {
  width: 100%;
  padding: 15px;
  font-size: 16px;
  margin-top: 20px;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.continue-shopping {
  display: block;
  text-align: center;
  margin-top: 15px;
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
}

.continue-shopping:hover {
  text-decoration: underline;
}

@media (max-width: 968px) {
  .cart-content {
    grid-template-columns: 1fr;
  }
  
  .cart-summary {
    position: static;
  }
  
  .cart-item {
    flex-wrap: wrap;
  }
}
</style>
