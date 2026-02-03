# 🛒 Projet E-Commerce avec Pinia

## 🚀 Installation Rapide

```bash
# 1. Créer un nouveau projet Vue avec Vite
npm create vue@latest ecommerce-pinia

# Sélectionner :
# ✅ Vue Router
# ✅ Pinia
# ❌ TypeScript
# ✅ ESLint (recommandé)

# 2. Aller dans le dossier
cd ecommerce-pinia

# 3. Installer les dépendances
npm install

# 4. Copier les fichiers de cet exemple dans src/

# 5. Lancer le serveur de développement
npm run dev
```

## 📁 Structure du Projet

```
src/
├── stores/             # Stores Pinia
│   ├── auth.js        # Authentification
│   ├── products.js    # Produits
│   └── cart.js        # Panier
├── views/             # Pages
│   ├── Home.vue
│   ├── Products.vue
│   ├── Cart.vue
│   ├── Login.vue
│   └── Admin.vue
├── components/        # Composants
│   ├── Navigation.vue
│   ├── ProductCard.vue
│   └── CartItem.vue
├── router/
│   └── index.js
├── App.vue
└── main.js
```

## 🎯 Fonctionnalités Démontrées

### Stores Pinia
- ✅ **authStore** : Gestion de l'authentification
- ✅ **productsStore** : Gestion des produits
- ✅ **cartStore** : Gestion du panier

### State Management
- ✅ State réactif partagé entre composants
- ✅ Getters pour valeurs calculées
- ✅ Actions synchrones et asynchrones
- ✅ Communication entre stores

### Fonctionnalités
- ✅ Catalogue de produits
- ✅ Filtrage par catégorie
- ✅ Ajout/retrait du panier
- ✅ Calculs automatiques (total, TVA, etc.)
- ✅ Authentification simulée
- ✅ Page admin protégée
- ✅ Persistance du panier

## 🔐 Comptes de Test

**Admin :**
- Email : `admin@shop.com`
- Mot de passe : `admin`

**Utilisateur :**
- Email : `user@shop.com`
- Mot de passe : `user`

## 🎓 Pour le Formateur

### Points à Démontrer

1. **Store de base** : Comment créer et structurer un store
2. **State** : Données réactives partagées
3. **Getters** : Calculs dérivés (comme computed)
4. **Actions** : Modifications du state (sync et async)
5. **Communication** : Un store utilise un autre store
6. **storeToRefs** : Destructurer avec réactivité
7. **DevTools** : Inspecter les stores

### Scénario de Demo

1. Afficher les produits (productsStore)
2. Ajouter au panier (cartStore)
3. Observer le badge du panier se mettre à jour
4. Voir le total calculé automatiquement (getters)
5. Se connecter (authStore)
6. Persister les données (refresh la page)

## 📝 Notes

- Données mock intégrées (pas de backend)
- Authentification simulée (localStorage)
- Projet pédagogique complet
- Tous les concepts Pinia démontrés
