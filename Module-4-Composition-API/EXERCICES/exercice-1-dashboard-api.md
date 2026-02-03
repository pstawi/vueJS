# Exercice 1 : Dashboard avec Composition API et Intégration d'API

## 🎯 Objectif
Créer un dashboard avec la Composition API pour afficher des articles depuis une API REST.

## 📋 Consignes

Créez une application qui récupère et affiche des articles (posts) depuis l'API JSONPlaceholder avec les fonctionnalités suivantes :

### API à utiliser :
```javascript
// Récupérer tous les posts
GET https://jsonplaceholder.typicode.com/posts

// Récupérer un post spécifique
GET https://jsonplaceholder.typicode.com/posts/{id}

// Récupérer les commentaires d'un post
GET https://jsonplaceholder.typicode.com/posts/{id}/comments
```

### Fonctionnalités à implémenter :

1. **Chargement des articles** :
   - Afficher un état de chargement pendant la requête
   - Gérer les erreurs de réseau
   - Afficher les articles dans une liste

2. **État avec Composition API** :
   - Utiliser `ref()` pour :
     - `posts` (tableau des articles)
     - `loading` (booléen)
     - `error` (message d'erreur)
     - `selectedPost` (article sélectionné)
   
3. **Computed Properties** :
   - `totalPosts` : Nombre total d'articles
   - `postsWithLongTitle` : Articles avec titre > 50 caractères
   - `averageTitleLength` : Longueur moyenne des titres

4. **Méthodes** :
   - `fetchPosts()` : Récupérer tous les posts
   - `selectPost(id)` : Sélectionner un post et charger ses détails
   - `refreshData()` : Recharger les données

5. **Lifecycle** :
   - `onMounted()` : Charger les posts au montage

6. **Watchers** :
   - Observer `selectedPost` pour logger les changements
   - Observer `error` pour afficher une alerte

### Structure suggérée :

```vue
<script>
import { ref, computed, onMounted, watch } from 'vue'

export default {
  setup() {
    // State
    const posts = ref([])
    const loading = ref(false)
    const error = ref(null)
    const selectedPost = ref(null)
    
    // Computed
    const totalPosts = computed(() => {
      // Votre code
    })
    
    // Methods
    const fetchPosts = async () => {
      // Votre code
    }
    
    // Lifecycle
    onMounted(() => {
      fetchPosts()
    })
    
    // Watchers
    watch(selectedPost, (newPost) => {
      // Votre code
    })
    
    return {
      posts,
      loading,
      error,
      selectedPost,
      totalPosts,
      fetchPosts
    }
  }
}
</script>
```

## 💡 Indices

**Fetch avec gestion d'erreur :**
```javascript
const fetchPosts = async () => {
  loading.value = true
  error.value = null
  
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    if (!response.ok) throw new Error('Erreur réseau')
    posts.value = await response.json()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
```

**Computed pour filtrer :**
```javascript
const postsWithLongTitle = computed(() => {
  return posts.value.filter(post => post.title.length > 50)
})
```

## ✅ Critères de réussite

- [ ] Utilisation correcte de `ref()` pour les données réactives
- [ ] Au moins 3 computed properties fonctionnelles
- [ ] Gestion du chargement avec état `loading`
- [ ] Gestion des erreurs avec état `error`
- [ ] `onMounted()` charge les données au démarrage
- [ ] Au moins 1 watcher fonctionnel
- [ ] Affichage conditionnel (loading, error, data)
- [ ] Interface utilisateur claire
- [ ] Bouton pour recharger les données
- [ ] Sélection d'un post pour voir les détails

## 🎨 Bonus

- Pagination des articles (10 par page)
- Barre de recherche pour filtrer par titre
- Afficher les commentaires d'un article sélectionné
- Animation de chargement élégante
- Composable `useFetch()` réutilisable
- Gestion du cache (ne pas recharger si déjà chargé)

## ⏱️ Temps estimé
2h - 2h30

---

**Astuce** : Commencez simple (juste la liste), puis ajoutez progressivement les fonctionnalités !

Une fois terminé, consultez la correction.
