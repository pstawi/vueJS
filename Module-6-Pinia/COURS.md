# Module 6 : Pinia - Gestion d'État Globale

## 🎯 Objectifs du module

À la fin de ce module, vous serez capable de :
- Comprendre pourquoi utiliser un gestionnaire d'état
- Installer et configurer Pinia
- Créer et utiliser des stores
- Gérer le state, les getters et les actions
- Utiliser Pinia avec la Composition API

---

## 1. Introduction à la Gestion d'État

### 1.1 Pourquoi Pinia ?

**Problèmes sans gestionnaire d'état :**
- 🔴 Données partagées difficiles à gérer
- 🔴 Props drilling (passer des props sur plusieurs niveaux)
- 🔴 Communication complexe entre composants éloignés
- 🔴 Duplication de données

**Avantages de Pinia :**
- ✅ **État centralisé** : Source unique de vérité
- ✅ **Réactivité** : Mises à jour automatiques
- ✅ **DevTools** : Débogage facilité
- ✅ **TypeScript** : Support natif
- ✅ **Léger** : ~1kb
- ✅ **Simple** : Plus simple que Vuex

### 1.2 Quand utiliser Pinia ?

✅ **Utiliser Pinia quand :**
- Plusieurs composants ont besoin des mêmes données
- Données utilisateur globales (auth, profil)
- Configuration application
- Cache de données API
- État partagé complexe

❌ **Ne pas utiliser Pinia pour :**
- État local d'un composant
- Props simples parent-enfant
- Petites applications

---

## 2. Installation et Configuration

### 2.1 Installation

```bash
npm install pinia
```

### 2.2 Configuration

**main.js :**
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

## 3. Créer un Store

### 3.1 Store de base (Options API Style)

**stores/counter.js :**
```javascript
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  // State : Données réactives
  state: () => ({
    count: 0,
    name: 'Mon Compteur'
  }),
  
  // Getters : Propriétés calculées
  getters: {
    doubleCount: (state) => state.count * 2,
    
    // Getter avec paramètre
    countPlusN: (state) => {
      return (n) => state.count + n
    }
  },
  
  // Actions : Méthodes (peuvent être async)
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

### 3.2 Utiliser le Store dans un Composant

```vue
<script setup>
import { useCounterStore } from '@/stores/counter'

// Instancier le store
const counter = useCounterStore()

// Accéder au state
console.log(counter.count)

// Accéder aux getters
console.log(counter.doubleCount)

// Appeler des actions
counter.increment()
counter.incrementBy(5)
</script>

<template>
  <div>
    <p>Count: {{ counter.count }}</p>
    <p>Double: {{ counter.doubleCount }}</p>
    <button @click="counter.increment">+1</button>
    <button @click="counter.decrement">-1</button>
  </div>
</template>
```

### 3.3 Store avec Setup (Composition API Style)

```javascript
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

## 4. State

### 4.1 Accéder au State

```vue
<script setup>
import { useCounterStore } from '@/stores/counter'

const store = useCounterStore()

// Accès direct
console.log(store.count)

// Modification directe (possible mais pas recommandé pour les actions complexes)
store.count++
</script>
```

### 4.2 Réinitialiser le State

```vue
<script setup>
import { useCounterStore } from '@/stores/counter'

const store = useCounterStore()

// Réinitialiser à l'état initial
store.$reset()
</script>
```

### 4.3 Remplacer tout le State

```javascript
store.$patch({
  count: 10,
  name: 'Nouveau nom'
})

// Ou avec une fonction
store.$patch((state) => {
  state.count += 10
  state.name = 'Nouveau nom'
})
```

### 4.4 Destructuration avec storeToRefs

```vue
<script setup>
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/counter'

const store = useCounterStore()

// ❌ Perd la réactivité
const { count, name } = store

// ✅ Garde la réactivité pour state et getters
const { count, name, doubleCount } = storeToRefs(store)

// Actions ne perdent pas la réactivité
const { increment, decrement } = store
</script>
```

---

## 5. Getters

### 5.1 Getters simples

```javascript
export const useUserStore = defineStore('user', {
  state: () => ({
    firstName: 'Jean',
    lastName: 'Dupont',
    age: 30
  }),
  
  getters: {
    // Getter basique
    fullName: (state) => `${state.firstName} ${state.lastName}`,
    
    // Accéder à d'autres getters
    greeting() {
      return `Bonjour ${this.fullName}!`
    },
    
    // Getter avec paramètre
    isOlderThan: (state) => {
      return (age) => state.age > age
    }
  }
})
```

### 5.2 Getters d'autres Stores

```javascript
import { useOtherStore } from './other'

export const useMyStore = defineStore('myStore', {
  getters: {
    otherGetter() {
      const otherStore = useOtherStore()
      return otherStore.someData
    }
  }
})
```

---

## 6. Actions

### 6.1 Actions synchrones

```javascript
export const useTodoStore = defineStore('todos', {
  state: () => ({
    todos: []
  }),
  
  actions: {
    addTodo(text) {
      this.todos.push({
        id: Date.now(),
        text,
        done: false
      })
    },
    
    toggleTodo(id) {
      const todo = this.todos.find(t => t.id === id)
      if (todo) {
        todo.done = !todo.done
      }
    },
    
    deleteTodo(id) {
      this.todos = this.todos.filter(t => t.id !== id)
    }
  }
})
```

### 6.2 Actions asynchrones

```javascript
export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    loading: false,
    error: null
  }),
  
  actions: {
    async fetchUser(id) {
      this.loading = true
      this.error = null
      
      try {
        const response = await fetch(`/api/users/${id}`)
        if (!response.ok) throw new Error('Erreur réseau')
        
        this.user = await response.json()
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },
    
    async updateUser(userData) {
      try {
        const response = await fetch(`/api/users/${this.user.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData)
        })
        
        this.user = await response.json()
      } catch (error) {
        this.error = error.message
      }
    }
  }
})
```

---

## 7. Exemples Pratiques

### 7.1 Store d'Authentification

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

async function handleLogin() {
  const result = await login('user@example.com', 'password')
  if (result.success) {
    // Rediriger
  }
}
</script>

<template>
  <div>
    <div v-if="isAuthenticated">
      <p>Bonjour {{ user.name }}</p>
      <button @click="logout">Se déconnecter</button>
    </div>
    <div v-else>
      <button @click="handleLogin">Se connecter</button>
    </div>
  </div>
</template>
```

### 7.2 Store de Panier

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

---

## 8. Plugins et Persistance

### 8.1 Plugin de Persistance

```bash
npm install pinia-plugin-persistedstate
```

```javascript
// main.js
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
```

**Utilisation :**
```javascript
export const useUserStore = defineStore('user', {
  state: () => ({
    name: 'Jean',
    preferences: {}
  }),
  
  // Persiste automatiquement dans localStorage
  persist: true
})

// Configuration avancée
export const useAuthStore = defineStore('auth', {
  state: () => ({ token: null, user: null }),
  
  persist: {
    key: 'auth', // Clé localStorage
    storage: sessionStorage, // Utiliser sessionStorage
    paths: ['token'] // Persister seulement token
  }
})
```

---

## 9. DevTools

Pinia s'intègre automatiquement aux Vue DevTools :

- 🔍 **Inspecter le state** des stores
- 📊 **Timeline** des mutations
- ⏮️ **Time-travel debugging**
- 📝 **Éditer le state** en direct

---

## 📝 Résumé du Module 6

Vous avez appris :
- ✅ Pourquoi utiliser un gestionnaire d'état
- ✅ Installation et configuration de Pinia
- ✅ Créer des stores (Options et Composition API)
- ✅ State, getters et actions
- ✅ Stores pratiques (auth, panier)
- ✅ Persistance des données

## 🎯 Projet Final

Vous êtes maintenant prêt à développer une application Vue.js complète avec :
- Composants réutilisables
- Routage avec Vue Router
- Gestion d'état avec Pinia
- Intégration d'APIs
- Composition API

---

## 📚 Ressources Complémentaires

- [Documentation Pinia](https://pinia.vuejs.org/)
- [Pinia Cheat Sheet](https://pinia.vuejs.org/cookbook/)
- [Exemples Pinia](https://github.com/vuejs/pinia/tree/v2/packages/playground)

**Félicitations ! Vous avez terminé la formation Vue.js !** 🎉🚀
