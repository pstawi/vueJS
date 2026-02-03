import { defineStore } from 'pinia'
import { useProductsStore } from './products'

/**
 * Store du Panier
 * Gère les articles ajoutés au panier
 */
export const useCartStore = defineStore('cart', {
  // ==========================================
  // STATE
  // ==========================================
  
  state: () => ({
    items: []  // [{ productId, quantity }]
  }),
  
  // ==========================================
  // GETTERS
  // ==========================================
  
  getters: {
    /**
     * Items du panier avec infos produits complètes
     */
    cartItems: (state) => {
      const productsStore = useProductsStore()
      
      return state.items.map(item => {
        const product = productsStore.productById(item.productId)
        return {
          ...item,
          product
        }
      })
    },
    
    /**
     * Nombre total d'articles
     */
    totalItems: (state) => {
      return state.items.reduce((sum, item) => sum + item.quantity, 0)
    },
    
    /**
     * Sous-total Hors Taxes
     */
    subtotal() {
      return this.cartItems.reduce((sum, item) => {
        return sum + (item.product.price * item.quantity)
      }, 0)
    },
    
    /**
     * Montant TVA (20%)
     */
    taxAmount() {
      return this.subtotal * 0.20
    },
    
    /**
     * Total TTC
     */
    total() {
      return this.subtotal + this.taxAmount
    },
    
    /**
     * Le panier est-il vide ?
     */
    isEmpty: (state) => state.items.length === 0,
    
    /**
     * Nombre de produits différents
     */
    uniqueProducts: (state) => state.items.length,
    
    /**
     * Vérifie si un produit est dans le panier
     */
    isInCart: (state) => {
      return (productId) => {
        return state.items.some(item => item.productId === productId)
      }
    },
    
    /**
     * Quantité d'un produit dans le panier
     */
    getQuantity: (state) => {
      return (productId) => {
        const item = state.items.find(item => item.productId === productId)
        return item ? item.quantity : 0
      }
    }
  },
  
  // ==========================================
  // ACTIONS
  // ==========================================
  
  actions: {
    /**
     * Ajouter un produit au panier
     */
    addToCart(productId) {
      const existingItem = this.items.find(item => item.productId === productId)
      
      if (existingItem) {
        // Augmenter la quantité
        existingItem.quantity++
      } else {
        // Ajouter nouveau
        this.items.push({
          productId,
          quantity: 1
        })
      }
      
      const productsStore = useProductsStore()
      const product = productsStore.productById(productId)
      console.log('🛒 Ajouté au panier:', product?.name)
    },
    
    /**
     * Retirer un produit du panier
     */
    removeFromCart(productId) {
      const index = this.items.findIndex(item => item.productId === productId)
      if (index !== -1) {
        this.items.splice(index, 1)
        console.log('🗑️ Retiré du panier')
      }
    },
    
    /**
     * Mettre à jour la quantité
     */
    updateQuantity(productId, quantity) {
      const item = this.items.find(item => item.productId === productId)
      
      if (item) {
        if (quantity <= 0) {
          this.removeFromCart(productId)
        } else {
          item.quantity = quantity
          console.log('🔢 Quantité mise à jour:', quantity)
        }
      }
    },
    
    /**
     * Incrémenter la quantité
     */
    incrementQuantity(productId) {
      const item = this.items.find(item => item.productId === productId)
      if (item) {
        item.quantity++
      }
    },
    
    /**
     * Décrémenter la quantité
     */
    decrementQuantity(productId) {
      const item = this.items.find(item => item.productId === productId)
      if (item) {
        if (item.quantity > 1) {
          item.quantity--
        } else {
          this.removeFromCart(productId)
        }
      }
    },
    
    /**
     * Vider le panier
     */
    clearCart() {
      this.items = []
      console.log('🗑️ Panier vidé')
    },
    
    /**
     * Finaliser la commande
     */
    async checkout() {
      if (this.isEmpty) {
        return { success: false, error: 'Le panier est vide' }
      }
      
      try {
        // Simulation d'un appel API
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Mettre à jour les stocks
        const productsStore = useProductsStore()
        this.items.forEach(item => {
          productsStore.updateStock(item.productId, item.quantity)
        })
        
        // Vider le panier
        this.clearCart()
        
        console.log('✅ Commande validée')
        return { success: true }
        
      } catch (error) {
        return { success: false, error: error.message }
      }
    }
  },
  
  // ==========================================
  // PERSIST (optionnel - nécessite plugin)
  // ==========================================
  
  // Si vous avez installé pinia-plugin-persistedstate :
  // persist: true
})
