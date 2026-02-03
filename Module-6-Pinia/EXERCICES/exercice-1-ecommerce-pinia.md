# Exercice 1 : E-Commerce avec Pinia

## 🎯 Objectif
Créer une application e-commerce complète avec Pinia pour gérer l'état global (authentification, produits, panier).

## 📋 Consignes

Créez une application de boutique en ligne avec 3 stores Pinia :

### 1. Store Auth (Authentification)

**Fichier : `stores/auth.js`**

État à gérer :
```javascript
state: {
  user: null,           // { id, name, email, role }
  token: null,
  isAuthenticated: false
}
```

Getters à créer :
- `isAdmin` : Retourne true si user.role === 'admin'
- `userName` : Retourne le nom de l'utilisateur ou 'Invité'

Actions à implémenter :
- `login(email, password)` : Connexion (mock)
- `logout()` : Déconnexion
- `register(userData)` : Inscription

### 2. Store Products (Produits)

**Fichier : `stores/products.js`**

État à gérer :
```javascript
state: {
  products: [],         // Liste des produits
  loading: false,
  error: null,
  selectedCategory: 'all'
}
```

Getters à créer :
- `categories` : Liste des catégories uniques
- `filteredProducts` : Produits filtrés par catégorie
- `productById(id)` : Retourne un produit par son ID

Actions à implémenter :
- `fetchProducts()` : Charger les produits
- `addProduct(product)` : Ajouter un produit (admin)
- `deleteProduct(id)` : Supprimer un produit (admin)

### 3. Store Cart (Panier)

**Fichier : `stores/cart.js`**

État à gérer :
```javascript
state: {
  items: []  // [{ product, quantity }]
}
```

Getters à créer :
- `totalItems` : Nombre total d'articles
- `totalPrice` : Prix total du panier
- `cartEmpty` : true si le panier est vide

Actions à implémenter :
- `addToCart(product)` : Ajouter au panier
- `removeFromCart(productId)` : Retirer du panier
- `updateQuantity(productId, quantity)` : Modifier la quantité
- `clearCart()` : Vider le panier

## 🎨 Pages à créer

### 1. Page Products

- Afficher tous les produits (depuis le store)
- Filtrer par catégorie
- Bouton "Ajouter au panier"
- Afficher le nombre d'articles dans le panier (badge)

### 2. Page Cart

- Liste des articles du panier
- Modifier les quantités (+/-)
- Supprimer un article
- Afficher le total
- Bouton "Vider le panier"
- Bouton "Commander" (si authentifié)

### 3. Page Admin (protégée)

- Liste des produits avec boutons modifier/supprimer
- Formulaire d'ajout de produit
- Visible uniquement si admin

### 4. Page Login

- Formulaire de connexion
- Redirection après login

## 💡 Structure du Projet

```
src/
├── stores/
│   ├── auth.js
│   ├── products.js
│   └── cart.js
├── views/
│   ├── Products.vue
│   ├── Cart.vue
│   ├── Admin.vue
│   └── Login.vue
├── components/
│   ├── ProductCard.vue
│   ├── CartItem.vue
│   └── Navigation.vue
├── App.vue
└── main.js
```

## 💾 Données Mock (Products)

```javascript
// À utiliser dans le store products
const mockProducts = [
  {
    id: 1,
    name: 'Ordinateur Portable',
    price: 999,
    category: 'Informatique',
    image: 'https://via.placeholder.com/200?text=Laptop'
  },
  {
    id: 2,
    name: 'Souris Gaming',
    price: 49,
    category: 'Accessoires',
    image: 'https://via.placeholder.com/200?text=Mouse'
  },
  {
    id: 3,
    name: 'Clavier Mécanique',
    price: 129,
    category: 'Accessoires',
    image: 'https://via.placeholder.com/200?text=Keyboard'
  },
  {
    id: 4,
    name: 'Écran 27 pouces',
    price: 349,
    category: 'Informatique',
    image: 'https://via.placeholder.com/200?text=Monitor'
  },
  {
    id: 5,
    name: 'Casque Audio',
    price: 79,
    category: 'Audio',
    image: 'https://via.placeholder.com/200?text=Headset'
  }
]
```

## 🔐 Mock Login

```javascript
// Dans le store auth
async login(email, password) {
  // Simulation
  if (email === 'admin@shop.com' && password === 'admin') {
    this.user = {
      id: 1,
      name: 'Admin',
      email: 'admin@shop.com',
      role: 'admin'
    }
    this.token = 'fake-token-admin'
    this.isAuthenticated = true
    localStorage.setItem('token', this.token)
    return { success: true }
  } else if (email === 'user@shop.com' && password === 'user') {
    this.user = {
      id: 2,
      name: 'Utilisateur',
      email: 'user@shop.com',
      role: 'user'
    }
    this.token = 'fake-token-user'
    this.isAuthenticated = true
    localStorage.setItem('token', this.token)
    return { success: true }
  }
  return { success: false, error: 'Identifiants incorrects' }
}
```

## ✅ Critères de réussite

### Stores
- [ ] 3 stores créés et configurés
- [ ] Tous les getters fonctionnent
- [ ] Toutes les actions fonctionnent
- [ ] Communication entre stores (ex: cart utilise auth)

### Fonctionnalités
- [ ] Affichage des produits depuis le store
- [ ] Filtrage par catégorie
- [ ] Ajout/retrait du panier
- [ ] Modification des quantités
- [ ] Calculs du panier corrects
- [ ] Login/Logout fonctionnels
- [ ] Protection de la page admin
- [ ] Badge du panier se met à jour

### Code
- [ ] Utilisation de `storeToRefs` pour destructurer
- [ ] Stores bien organisés (state, getters, actions)
- [ ] Pas d'accès direct au state (utiliser actions)

## 🎨 Bonus

- [ ] Persistance du panier (localStorage)
- [ ] Persistance de l'authentification
- [ ] Animations d'ajout au panier
- [ ] Toast de confirmation
- [ ] Recherche de produits
- [ ] Tri des produits (prix, nom)
- [ ] Page de détail produit
- [ ] Historique des commandes
- [ ] Gestion du stock

## 💡 Indices

**Utiliser plusieurs stores :**
```vue
<script setup>
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'

const auth = useAuthStore()
const cart = useCartStore()

const { isAuthenticated } = storeToRefs(auth)
const { totalItems } = storeToRefs(cart)
</script>
```

**Protection admin :**
```vue
<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

if (!auth.isAdmin) {
  router.push('/')
}
</script>
```

## ⏱️ Temps estimé
4h - 5h

---

**Astuce** : Commencez par créer les stores, puis les pages une par une.

Cet exercice consolide tous les concepts vus précédemment ! 🚀
