# 🎓 Guide d'Utilisation en Cours - Projet E-Commerce Pinia

## 📝 Vue d'Ensemble

Ce projet e-commerce démontre **toutes les fonctionnalités de Pinia** :

✅ Création de stores (auth, products, cart)  
✅ State réactif partagé  
✅ Getters pour calculs dérivés  
✅ Actions synchrones et asynchrones  
✅ Communication entre stores  
✅ storeToRefs pour destructuration  
✅ Intégration avec Vue Router  
✅ Persistance des données  

---

## 🎯 Scénario de Démonstration

### Phase 1 : Découverte des Stores (20 min)

**Ce que vous montrez :**

1. **Structure des stores**
   ```
   stores/
   ├── auth.js      → Authentification
   ├── products.js  → Catalogue
   └── cart.js      → Panier
   ```

2. **Ouvrir `stores/products.js`**
   - Montrer la structure : `state`, `getters`, `actions`
   - Expliquer le concept de "source unique de vérité"

**Code à projeter :**

```javascript
// stores/products.js
export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [],     // ← État partagé
    selectedCategory: 'all'
  }),
  
  getters: {
    categories: (state) => {  // ← Comme computed
      return [...new Set(state.products.map(p => p.category))]
    }
  },
  
  actions: {
    setCategory(cat) {  // ← Méthode pour modifier le state
      this.selectedCategory = cat
    }
  }
})
```

### Phase 2 : Utiliser un Store (15 min)

**Ce que vous montrez :**

1. **Page Products** - Ouvrir `views/Products.vue`

```vue
<script setup>
import { storeToRefs } from 'pinia'
import { useProductsStore } from '../stores/products'

const productsStore = useProductsStore()

// ✅ Destructurer avec storeToRefs (garde la réactivité)
const { filteredProducts, categories } = storeToRefs(productsStore)

// ❌ Sans storeToRefs, perd la réactivité
// const { filteredProducts } = productsStore
</script>

<template>
  <!-- Les données se mettent à jour automatiquement -->
  <div v-for="product in filteredProducts" :key="product.id">
    {{ product.name }}
  </div>
</template>
```

2. **Démontrer la réactivité**
   - Cliquer sur les filtres de catégorie
   - Observer : la liste se filtre automatiquement
   - **Point clé** : Le getter `filteredProducts` se recalcule auto

### Phase 3 : Communication entre Composants (20 min)

**Démonstration :**

1. **Ajouter au panier depuis ProductCard**
   - Ouvrir `components/ProductCard.vue`
   - Montrer l'appel à `cartStore.addToCart()`

2. **Observer le badge du panier**
   - Dans `Navigation.vue`
   - Le badge se met à jour automatiquement
   - **Point clé** : Données partagées sans props !

**Code à montrer :**

```vue
<!-- ProductCard.vue -->
<script setup>
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()

const addToCart = () => {
  cartStore.addToCart(props.product.id)
  // ← Le state du panier change
}
</script>

<!-- Navigation.vue -->
<script setup>
import { storeToRefs } from 'pinia'
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()
const { totalItems } = storeToRefs(cartStore)
// ← Se met à jour automatiquement !
</script>

<template>
  <span class="badge">{{ totalItems }}</span>
</template>
```

### Phase 4 : Getters et Calculs (15 min)

**Ce que vous montrez :**

1. **Ouvrir `stores/cart.js`**
   - Montrer tous les getters

```javascript
getters: {
  // Nombre total d'articles
  totalItems: (state) => {
    return state.items.reduce((sum, item) => sum + item.quantity, 0)
  },
  
  // Total du panier
  subtotal() {
    return this.cartItems.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity)
    }, 0)
  },
  
  // TVA
  taxAmount() {
    return this.subtotal * 0.20  // ← Utilise un autre getter !
  },
  
  // Total TTC
  total() {
    return this.subtotal + this.taxAmount
  }
}
```

2. **Dans Cart.vue**
   - Montrer comment utiliser ces getters
   - Observer : tous les totaux se calculent automatiquement

### Phase 5 : Communication entre Stores (15 min)

**Ce que vous montrer :**

1. **Store cart utilise store products**

```javascript
// stores/cart.js
import { useProductsStore } from './products'

getters: {
  cartItems: (state) => {
    const productsStore = useProductsStore()  // ← Appeler un autre store
    
    return state.items.map(item => {
      const product = productsStore.productById(item.productId)
      return { ...item, product }
    })
  }
}
```

2. **Démonstration pratique**
   - Ajouter au panier
   - Aller sur `/cart`
   - Voir les infos produits complètes
   - **Point clé** : cart ne stocke que l'ID, récupère les infos via productsStore

### Phase 6 : Actions et DevTools (20 min)

**Ce que vous montrez :**

1. **Ouvrir les Vue DevTools**
   - Onglet "Pinia"
   - Montrer les 3 stores
   - Inspecter le state en temps réel

2. **Effectuer des actions**
   - Ajouter un produit au panier
   - Observer dans DevTools : l'action apparaît
   - Voir le state se modifier

3. **Timeline**
   - Montrer l'historique des actions
   - Possibilité de "time-travel"

4. **Éditer le state**
   - Modifier directement dans DevTools
   - Observer les changements dans l'UI

---

## 💡 Points Clés à Insister

### 1. State Centralisé

```
Sans Pinia :                Avec Pinia :
                           
Component A ─┐              Component A ──┐
Component B ─┤ Props/Events               │
Component C ─┘              Component B ──┤→ Store (source unique)
                           Component C ──┘
❌ Props drilling          ✅ Accès direct
❌ Events complexes        ✅ État partagé
```

### 2. Getters = Computed

```javascript
// Au lieu de calculer partout
component1: {{ items.reduce((sum, i) => sum + i.price, 0) }}
component2: {{ items.reduce((sum, i) => sum + i.price, 0) }}

// ✅ Un seul calcul dans le getter
getters: {
  total: (state) => state.items.reduce((sum, i) => sum + i.price, 0)
}

// Réutilisable partout
{{ cartStore.total }}
```

### 3. storeToRefs

```javascript
// ❌ Perd la réactivité
const { count } = store

// ✅ Garde la réactivité
const { count } = storeToRefs(store)

// ℹ️ Les actions ne perdent pas la réactivité
const { increment } = store  // OK
```

---

## 🎬 Exercices pour les Étudiants

### Exercice 1 : Ajouter un Getter

"Ajoutez un getter `expensiveProducts` qui retourne les produits > 500€"

**Solution :**
```javascript
getters: {
  expensiveProducts: (state) => {
    return state.products.filter(p => p.price > 500)
  }
}
```

### Exercice 2 : Wishlist Store

"Créez un nouveau store `wishlist.js` pour gérer une liste de souhaits"

**Indice :** Structure similaire au cart

### Exercice 3 : Persistance

"Ajoutez la persistance du panier avec localStorage"

**Solution manuelle :**
```javascript
actions: {
  addToCart(id) {
    // ... ajouter l'item
    localStorage.setItem('cart', JSON.stringify(this.items))
  }
}

// Dans main.js ou App.vue
onMounted(() => {
  const saved = localStorage.getItem('cart')
  if (saved) {
    cartStore.items = JSON.parse(saved)
  }
})
```

---

## 📊 Comparaison Options vs Setup Stores

### Options Style (comme dans le cours)

```javascript
export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  getters: {
    double: (state) => state.count * 2
  },
  actions: {
    increment() { this.count++ }
  }
})
```

### Setup Style (alternatif)

```javascript
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const double = computed(() => count.value * 2)
  const increment = () => { count.value++ }
  
  return { count, double, increment }
})
```

**Les deux sont valides !** Options est plus structuré, Setup plus flexible.

---

## 🔍 Points de Debug Courants

### Problème 1 : Perte de Réactivité

```javascript
// ❌ Ne fonctionne pas
const { count } = store

// ✅ Fonctionne
const { count } = storeToRefs(store)
```

### Problème 2 : Store Non Trouvé

```javascript
// ❌ Créer le store avant le router
const router = createRouter(...)
const pinia = createPinia()
app.use(router)
app.use(pinia)

// ✅ Pinia AVANT router
const pinia = createPinia()
const router = createRouter(...)
app.use(pinia)
app.use(router)
```

### Problème 3 : Getter avec Paramètre

```javascript
// ✅ Retourner une fonction
getters: {
  productById: (state) => {
    return (id) => state.products.find(p => p.id === id)
  }
}

// Utilisation
const product = store.productById(1)
```

---

## ✅ Checklist Démonstration

Avant le cours :
- [ ] Projet installé et fonctionnel
- [ ] Tester tous les scénarios (ajout panier, login, etc.)
- [ ] Vue DevTools installé
- [ ] Code projeté lisiblement

Pendant le cours :
- [ ] Montrer la structure des stores
- [ ] Démontrer state, getters, actions
- [ ] Utiliser storeToRefs
- [ ] Montrer les DevTools Pinia
- [ ] Faire des exercices pratiques

---

## 🎯 Points à Absolument Couvrir

1. ✅ Pourquoi Pinia ? (vs props/events partout)
2. ✅ Créer un store basique
3. ✅ State, getters, actions
4. ✅ Utiliser dans un composant
5. ✅ storeToRefs (réactivité)
6. ✅ Communication entre stores
7. ✅ DevTools

---

Bon cours ! 👨‍🏫🚀
