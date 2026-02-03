# Guide Pratique : Pinia

## 🚀 Installation et Configuration

### 1. Installation

```bash
npm install pinia
```

### 2. Configuration dans main.js

```javascript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')
```

---

## 📁 Structure des Stores

```
src/
├── stores/
│   ├── auth.js          # Authentification
│   ├── cart.js          # Panier
│   ├── products.js      # Produits
│   └── counter.js       # Exemple simple
```

---

## 🏪 Créer un Store

### Option 1 : Options API Style

```javascript
// stores/counter.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  // State
  state: () => ({
    count: 0,
    name: 'Mon Compteur'
  }),
  
  // Getters
  getters: {
    doubleCount: (state) => state.count * 2,
    
    // Getter avec paramètre
    countPlusN: (state) => {
      return (n) => state.count + n
    },
    
    // Accès à d'autres getters
    quadrupleCount() {
      return this.doubleCount * 2
    }
  },
  
  // Actions
  actions: {
    increment() {
      this.count++
    },
    
    decrement() {
      this.count--
    },
    
    incrementBy(amount) {
      this.count += amount
    },
    
    async fetchCount() {
      const response = await fetch('/api/count')
      const data = await response.json()
      this.count = data.count
    }
  }
})
```

### Option 2 : Composition API Style (Setup)

```javascript
// stores/counter.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  // State = ref()
  const count = ref(0)
  const name = ref('Mon Compteur')
  
  // Getters = computed()
  const doubleCount = computed(() => count.value * 2)
  
  // Actions = functions
  function increment() {
    count.value++
  }
  
  function decrement() {
    count.value--
  }
  
  async function fetchCount() {
    const response = await fetch('/api/count')
    const data = await response.json()
    count.value = data.count
  }
  
  return {
    count,
    name,
    doubleCount,
    increment,
    decrement,
    fetchCount
  }
})
```

---

## 🎯 Utiliser un Store dans un Composant

### Sans Destructuration

```vue
<template>
  <div>
    <p>Count: {{ counter.count }}</p>
    <p>Double: {{ counter.doubleCount }}</p>
    <button @click="counter.increment">+</button>
    <button @click="counter.decrement">-</button>
  </div>
</template>

<script setup>
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()

// Modification directe (possible mais pas recommandé pour logique complexe)
// counter.count++

// Préférer les actions
// counter.increment()
</script>
```

### Avec Destructuration (storeToRefs)

```vue
<script setup>
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()

// ❌ Perd la réactivité
// const { count, doubleCount } = counter

// ✅ Garde la réactivité pour state et getters
const { count, doubleCount } = storeToRefs(counter)

// Actions ne perdent pas la réactivité (pas besoin de storeToRefs)
const { increment, decrement } = counter
</script>

<template>
  <div>
    <p>{{ count }}</p>
    <button @click="increment">+</button>
  </div>
</template>
```

---

## 📦 Exemples de Stores Pratiques

### Store d'Authentification

```javascript
// stores/auth.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null)
  
  const isAuthenticated = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.role === 'admin')
  
  async function login(email, password) {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      
      const data = await response.json()
      
      token.value = data.token
      user.value = data.user
      localStorage.setItem('token', data.token)
      
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
  
  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
  }
  
  async function checkAuth() {
    if (!token.value) return
    
    try {
      const response = await fetch('/api/me', {
        headers: { Authorization: `Bearer ${token.value}` }
      })
      user.value = await response.json()
    } catch (error) {
      logout()
    }
  }
  
  return {
    user,
    token,
    isAuthenticated,
    isAdmin,
    login,
    logout,
    checkAuth
  }
})
```

**Utilisation :**
```vue
<script setup>
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { user, isAuthenticated } = storeToRefs(authStore)
const { login, logout } = authStore
</script>

<template>
  <div v-if="isAuthenticated">
    <p>Bonjour {{ user.name }}</p>
    <button @click="logout">Déconnexion</button>
  </div>
  <button v-else @click="showLoginForm">Connexion</button>
</template>
```

### Store de Panier

```javascript
// stores/cart.js
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),
  
  getters: {
    totalItems: (state) => {
      return state.items.reduce((sum, item) => sum + item.quantity, 0)
    },
    
    totalPrice: (state) => {
      return state.items.reduce((sum, item) => 
        sum + (item.price * item.quantity), 0
      )
    },
    
    cartEmpty: (state) => state.items.length === 0
  },
  
  actions: {
    addToCart(product) {
      const existingItem = this.items.find(item => item.id === product.id)
      
      if (existingItem) {
        existingItem.quantity++
      } else {
        this.items.push({
          ...product,
          quantity: 1
        })
      }
    },
    
    removeFromCart(productId) {
      this.items = this.items.filter(item => item.id !== productId)
    },
    
    updateQuantity(productId, quantity) {
      const item = this.items.find(item => item.id === productId)
      if (item) {
        item.quantity = quantity
        if (item.quantity <= 0) {
          this.removeFromCart(productId)
        }
      }
    },
    
    clearCart() {
      this.items = []
    }
  }
})
```

### Store de Produits avec API

```javascript
// stores/products.js
import { defineStore } from 'pinia'

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [],
    loading: false,
    error: null
  }),
  
  getters: {
    productById: (state) => {
      return (id) => state.products.find(p => p.id === id)
    },
    
    categories: (state) => {
      return [...new Set(state.products.map(p => p.category))]
    }
  },
  
  actions: {
    async fetchProducts() {
      this.loading = true
      this.error = null
      
      try {
        const response = await fetch('/api/products')
        this.products = await response.json()
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },
    
    async createProduct(product) {
      try {
        const response = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(product)
        })
        const newProduct = await response.json()
        this.products.push(newProduct)
        return { success: true }
      } catch (error) {
        return { success: false, error: error.message }
      }
    }
  }
})
```

---

## 🔄 Utiliser Plusieurs Stores

```vue
<script setup>
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import { useProductsStore } from '@/stores/products'

const auth = useAuthStore()
const cart = useCartStore()
const products = useProductsStore()

// Un store peut appeler un autre store
const addToCartWithCheck = (product) => {
  if (!auth.isAuthenticated) {
    alert('Veuillez vous connecter')
    return
  }
  cart.addToCart(product)
}
</script>
```

---

## 💾 Persistance des Données

### Avec pinia-plugin-persistedstate

```bash
npm install pinia-plugin-persistedstate
```

**Configuration :**
```javascript
// main.js
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
```

**Utilisation :**
```javascript
export const useAuthStore = defineStore('auth', {
  state: () => ({ token: null, user: null }),
  
  // Persiste automatiquement dans localStorage
  persist: true
})

// Configuration avancée
export const useCartStore = defineStore('cart', {
  state: () => ({ items: [], lastUpdate: null }),
  
  persist: {
    key: 'shopping-cart',        // Clé localStorage
    storage: sessionStorage,      // Utiliser sessionStorage
    paths: ['items']              // Persister seulement items
  }
})
```

---

## 🛠️ Bonnes Pratiques

### 1. Organisation

```javascript
// ✅ Un store par domaine métier
stores/
  ├── auth.js       // Authentification
  ├── cart.js       // Panier
  ├── products.js   // Produits
  └── ui.js         // État UI (modals, toasts, etc.)
```

### 2. Nommage

```javascript
// ✅ Préfixe use + nom du domaine + Store
export const useAuthStore = defineStore('auth', ...)
export const useCartStore = defineStore('cart', ...)
```

### 3. Actions vs Mutations directes

```javascript
// ❌ Éviter (sauf pour des changements très simples)
cart.items.push(product)

// ✅ Préférer (traçabilité, logique métier)
cart.addToCart(product)
```

### 4. Getters pour calculs

```javascript
// ✅ Utiliser getters pour valeurs dérivées
getters: {
  totalPrice: (state) => {
    return state.items.reduce((sum, item) => sum + item.price, 0)
  }
}

// ❌ Éviter de calculer dans le template
<p>Total: {{ items.reduce((sum, item) => sum + item.price, 0) }}</p>
```

---

## 📚 Récapitulatif

### Concepts Clés

- **Store** : Source unique de vérité pour un domaine
- **State** : Données réactives
- **Getters** : Valeurs calculées (comme computed)
- **Actions** : Méthodes (sync ou async)

### API Principales

```javascript
defineStore()           // Créer un store
storeToRefs()          // Destructurer avec réactivité
$patch()               // Mettre à jour plusieurs propriétés
$reset()               // Réinitialiser le state
$subscribe()           // Observer les changements
```

---

Pinia est plus simple et moderne que Vuex ! 🎉
