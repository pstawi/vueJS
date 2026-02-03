import { defineStore } from 'pinia'

/**
 * Store des Produits
 * Gère le catalogue de produits
 */
export const useProductsStore = defineStore('products', {
  // ==========================================
  // STATE
  // ==========================================
  
  state: () => ({
    products: [
      {
        id: 1,
        name: 'MacBook Pro 16"',
        price: 2499,
        category: 'Ordinateurs',
        stock: 15,
        image: 'https://via.placeholder.com/300x200/667eea/ffffff?text=MacBook+Pro',
        description: 'Ordinateur portable haute performance avec puce M3 Pro'
      },
      {
        id: 2,
        name: 'iPhone 15 Pro',
        price: 1229,
        category: 'Smartphones',
        stock: 25,
        image: 'https://via.placeholder.com/300x200/764ba2/ffffff?text=iPhone+15',
        description: 'Le smartphone le plus avancé avec puce A17 Pro'
      },
      {
        id: 3,
        name: 'iPad Air',
        price: 699,
        category: 'Tablettes',
        stock: 20,
        image: 'https://via.placeholder.com/300x200/2ecc71/ffffff?text=iPad+Air',
        description: 'Tablette puissante et légère avec écran Liquid Retina'
      },
      {
        id: 4,
        name: 'AirPods Pro',
        price: 279,
        category: 'Audio',
        stock: 50,
        image: 'https://via.placeholder.com/300x200/3498db/ffffff?text=AirPods',
        description: 'Écouteurs sans fil avec réduction de bruit active'
      },
      {
        id: 5,
        name: 'Apple Watch Series 9',
        price: 449,
        category: 'Montres',
        stock: 30,
        image: 'https://via.placeholder.com/300x200/e74c3c/ffffff?text=Watch',
        description: 'Montre connectée avec capteurs santé avancés'
      },
      {
        id: 6,
        name: 'Magic Keyboard',
        price: 149,
        category: 'Accessoires',
        stock: 40,
        image: 'https://via.placeholder.com/300x200/f39c12/ffffff?text=Keyboard',
        description: 'Clavier sans fil avec pavé numérique'
      },
      {
        id: 7,
        name: 'Magic Mouse',
        price: 89,
        category: 'Accessoires',
        stock: 45,
        image: 'https://via.placeholder.com/300x200/9b59b6/ffffff?text=Mouse',
        description: 'Souris sans fil avec surface tactile Multi-Touch'
      },
      {
        id: 8,
        name: 'HomePod',
        price: 329,
        category: 'Audio',
        stock: 12,
        image: 'https://via.placeholder.com/300x200/1abc9c/ffffff?text=HomePod',
        description: 'Enceinte intelligente avec son haute fidélité'
      }
    ],
    loading: false,
    error: null,
    selectedCategory: 'all'
  }),
  
  // ==========================================
  // GETTERS
  // ==========================================
  
  getters: {
    /**
     * Toutes les catégories uniques
     */
    categories: (state) => {
      return [...new Set(state.products.map(p => p.category))]
    },
    
    /**
     * Produits filtrés par catégorie sélectionnée
     */
    filteredProducts: (state) => {
      if (state.selectedCategory === 'all') {
        return state.products
      }
      return state.products.filter(p => p.category === state.selectedCategory)
    },
    
    /**
     * Trouver un produit par ID (retourne une fonction)
     */
    productById: (state) => {
      return (id) => state.products.find(p => p.id === id)
    },
    
    /**
     * Nombre total de produits
     */
    totalProducts: (state) => state.products.length,
    
    /**
     * Produits en stock
     */
    productsInStock: (state) => {
      return state.products.filter(p => p.stock > 0)
    },
    
    /**
     * Produits en rupture
     */
    productsOutOfStock: (state) => {
      return state.products.filter(p => p.stock === 0)
    },
    
    /**
     * Prix moyen des produits
     */
    averagePrice: (state) => {
      if (state.products.length === 0) return 0
      const total = state.products.reduce((sum, p) => sum + p.price, 0)
      return Math.round(total / state.products.length)
    }
  },
  
  // ==========================================
  // ACTIONS
  // ==========================================
  
  actions: {
    /**
     * Charger les produits (simulation API)
     */
    async fetchProducts() {
      this.loading = true
      this.error = null
      
      try {
        // Simulation d'un appel API
        await new Promise(resolve => setTimeout(resolve, 500))
        
        console.log('✅ Produits chargés:', this.products.length)
      } catch (error) {
        this.error = error.message
        console.error('❌ Erreur chargement produits:', error)
      } finally {
        this.loading = false
      }
    },
    
    /**
     * Définir la catégorie filtrée
     */
    setCategory(category) {
      this.selectedCategory = category
      console.log('🔍 Catégorie sélectionnée:', category)
    },
    
    /**
     * Ajouter un produit (admin)
     */
    addProduct(product) {
      const newProduct = {
        id: Date.now(),
        ...product,
        stock: product.stock || 0
      }
      this.products.push(newProduct)
      console.log('➕ Produit ajouté:', newProduct.name)
    },
    
    /**
     * Supprimer un produit (admin)
     */
    deleteProduct(id) {
      const index = this.products.findIndex(p => p.id === id)
      if (index !== -1) {
        const product = this.products[index]
        this.products.splice(index, 1)
        console.log('🗑️ Produit supprimé:', product.name)
      }
    },
    
    /**
     * Mettre à jour le stock
     */
    updateStock(productId, quantity) {
      const product = this.products.find(p => p.id === productId)
      if (product) {
        product.stock -= quantity
        console.log(`📦 Stock mis à jour pour ${product.name}: ${product.stock}`)
      }
    }
  }
})
