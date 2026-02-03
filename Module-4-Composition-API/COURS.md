# Module 4 : Composition API et Lifecycle

## 🎯 Objectifs du module

À la fin de ce module, vous serez capable de :
- Comprendre la différence entre Options API et Composition API
- Utiliser `setup()`, `ref()` et `reactive()`
- Créer des composables réutilisables
- Gérer le cycle de vie avec les hooks Composition API
- Intégrer des APIs REST dans vos composants

---

## 1. Introduction à la Composition API

### 1.1 Options API vs Composition API

**Options API (vue jusqu'ici) :**
```javascript
export default {
  data() {
    return { count: 0 }
  },
  computed: {
    double() {
      return this.count * 2
    }
  },
  methods: {
    increment() {
      this.count++
    }
  },
  mounted() {
    console.log('Monté')
  }
}
```

**Composition API (nouveau) :**
```javascript
import { ref, computed, onMounted } from 'vue'

export default {
  setup() {
    const count = ref(0)
    
    const double = computed(() => count.value * 2)
    
    const increment = () => {
      count.value++
    }
    
    onMounted(() => {
      console.log('Monté')
    })
    
    return { count, double, increment }
  }
}
```

### 1.2 Avantages de la Composition API

- ✅ **Meilleure organisation du code** : Regrouper la logique par fonctionnalité
- ✅ **Réutilisabilité** : Créer des composables
- ✅ **TypeScript** : Support natif amélioré
- ✅ **Flexibilité** : Composition de logiques
- ✅ **Pas de `this`** : Moins de confusion

---

## 2. Réactivité avec ref() et reactive()

### 2.1 ref() pour les valeurs primitives

```vue
<script setup>
import { ref } from 'vue'

// Créer une référence réactive
const count = ref(0)
const message = ref('Hello')
const isActive = ref(true)

// Accès : .value dans le script
console.log(count.value) // 0
count.value++
console.log(count.value) // 1

// Pas besoin de .value dans le template
</script>

<template>
  <div>
    <p>{{ count }}</p> <!-- Pas de .value -->
    <button @click="count++">+1</button>
  </div>
</template>
```

### 2.2 reactive() pour les objets

```vue
<script setup>
import { reactive } from 'vue'

// Créer un objet réactif
const user = reactive({
  nom: 'Dupont',
  prenom: 'Jean',
  age: 30
})

// Accès direct (pas de .value)
console.log(user.nom)
user.age++
</script>

<template>
  <div>
    <p>{{ user.nom }} {{ user.prenom }}</p>
    <p>{{ user.age }} ans</p>
  </div>
</template>
```

### 2.3 ref() vs reactive()

```javascript
// ✅ ref() : Pour primitives ET objets
const count = ref(0)
const user = ref({ nom: 'Jean' })
// Accès : count.value, user.value.nom

// ✅ reactive() : Pour objets et tableaux uniquement
const state = reactive({
  count: 0,
  user: { nom: 'Jean' }
})
// Accès : state.count, state.user.nom

// ❌ Ne fonctionne pas
const count = reactive(0) // Erreur !
```

### 2.4 toRefs() - Destructuration

```vue
<script setup>
import { reactive, toRefs } from 'vue'

const state = reactive({
  count: 0,
  message: 'Hello'
})

// ❌ Perd la réactivité
const { count, message } = state

// ✅ Garde la réactivité
const { count, message } = toRefs(state)
</script>
```

---

## 3. Script Setup (Syntaxe Recommandée)

### 3.1 Avant : setup()

```vue
<script>
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)
    
    const increment = () => {
      count.value++
    }
    
    // Retourner ce qui doit être accessible dans le template
    return {
      count,
      increment
    }
  }
}
</script>
```

### 3.2 Après : <script setup>

```vue
<script setup>
import { ref } from 'vue'

// Tout est automatiquement exposé au template
const count = ref(0)

const increment = () => {
  count.value++
}
</script>

<template>
  <div>
    <p>{{ count }}</p>
    <button @click="increment">+1</button>
  </div>
</template>
```

### 3.3 Props et Emits avec <script setup>

```vue
<script setup>
import { defineProps, defineEmits } from 'vue'

// Définir les props
const props = defineProps({
  titre: String,
  count: {
    type: Number,
    default: 0
  }
})

// Définir les événements
const emit = defineEmits(['update', 'delete'])

// Utiliser
console.log(props.titre)
emit('update', props.count + 1)
</script>
```

---

## 4. Computed et Watch

### 4.1 Computed Properties

```vue
<script setup>
import { ref, computed } from 'vue'

const prenom = ref('Jean')
const nom = ref('Dupont')

// Computed en lecture seule
const nomComplet = computed(() => {
  return `${prenom.value} ${nom.value}`
})

// Computed avec getter et setter
const nomComplet2 = computed({
  get() {
    return `${prenom.value} ${nom.value}`
  },
  set(valeur) {
    [prenom.value, nom.value] = valeur.split(' ')
  }
})
</script>
```

### 4.2 Watchers

```vue
<script setup>
import { ref, watch, watchEffect } from 'vue'

const count = ref(0)
const user = ref({ nom: 'Jean', age: 30 })

// Watch une ref
watch(count, (nouveau, ancien) => {
  console.log(`Count: ${ancien} → ${nouveau}`)
})

// Watch multiple sources
watch([count, user], ([newCount, newUser], [oldCount, oldUser]) => {
  console.log('Changement détecté')
})

// Watch propriété d'un objet
watch(() => user.value.age, (newAge) => {
  console.log('Âge changé:', newAge)
})

// Watch deep (observe les modifications profondes)
watch(user, (newUser) => {
  console.log('User modifié')
}, { deep: true })

// watchEffect : Exécute immédiatement et observe automatiquement
watchEffect(() => {
  console.log(`Le count est ${count.value}`)
  // Réexécuté automatiquement quand count change
})
</script>
```

---

## 5. Lifecycle Hooks

### 5.1 Hooks disponibles

```vue
<script setup>
import { 
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted
} from 'vue'

onBeforeMount(() => {
  console.log('Avant le montage')
})

onMounted(() => {
  console.log('Composant monté')
  // ✅ Bon moment pour fetch des données
  // ✅ Accès au DOM
})

onBeforeUpdate(() => {
  console.log('Avant la mise à jour')
})

onUpdated(() => {
  console.log('Composant mis à jour')
})

onBeforeUnmount(() => {
  console.log('Avant le démontage')
})

onUnmounted(() => {
  console.log('Composant démonté')
  // ✅ Nettoyage (timers, listeners, etc.)
})
</script>
```

### 5.2 Exemple pratique

```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const time = ref(new Date().toLocaleTimeString())
let timer = null

onMounted(() => {
  // Démarrer un intervalle
  timer = setInterval(() => {
    time.value = new Date().toLocaleTimeString()
  }, 1000)
})

onUnmounted(() => {
  // Nettoyer l'intervalle
  if (timer) {
    clearInterval(timer)
  }
})
</script>

<template>
  <div>{{ time }}</div>
</template>
```

---

## 6. Composables (Logique Réutilisable)

### 6.1 Créer un Composable

```javascript
// composables/useCounter.js
import { ref, computed } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  
  const double = computed(() => count.value * 2)
  
  const increment = () => {
    count.value++
  }
  
  const decrement = () => {
    count.value--
  }
  
  const reset = () => {
    count.value = initialValue
  }
  
  return {
    count,
    double,
    increment,
    decrement,
    reset
  }
}
```

### 6.2 Utiliser un Composable

```vue
<script setup>
import { useCounter } from './composables/useCounter'

// Utiliser le composable
const { count, double, increment, decrement, reset } = useCounter(10)

// Réutiliser plusieurs fois
const counter1 = useCounter(0)
const counter2 = useCounter(100)
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Double: {{ double }}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="reset">Reset</button>
  </div>
</template>
```

### 6.3 Composable avec API

```javascript
// composables/useFetch.js
import { ref } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)
  
  const fetchData = async () => {
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch(url)
      data.value = await response.json()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }
  
  // Fetch au montage
  fetchData()
  
  return {
    data,
    error,
    loading,
    refetch: fetchData
  }
}
```

**Utilisation :**
```vue
<script setup>
import { useFetch } from './composables/useFetch'

const { data, error, loading, refetch } = useFetch('https://api.example.com/users')
</script>

<template>
  <div>
    <div v-if="loading">Chargement...</div>
    <div v-else-if="error">Erreur: {{ error }}</div>
    <div v-else>
      <ul>
        <li v-for="user in data" :key="user.id">
          {{ user.name }}
        </li>
      </ul>
      <button @click="refetch">Recharger</button>
    </div>
  </div>
</template>
```

---

## 7. Intégration avec APIs REST

### 7.1 Fetch simple

```vue
<script setup>
import { ref, onMounted } from 'vue'

const users = ref([])
const loading = ref(false)
const error = ref(null)

const fetchUsers = async () => {
  loading.value = true
  error.value = null
  
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    if (!response.ok) throw new Error('Erreur réseau')
    users.value = await response.json()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchUsers()
})
</script>

<template>
  <div>
    <div v-if="loading">Chargement...</div>
    <div v-else-if="error">{{ error }}</div>
    <ul v-else>
      <li v-for="user in users" :key="user.id">
        {{ user.name }}
      </li>
    </ul>
  </div>
</template>
```

### 7.2 Avec Axios

```bash
npm install axios
```

```vue
<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const posts = ref([])
const loading = ref(false)

const fetchPosts = async () => {
  loading.value = true
  try {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts')
    posts.value = data
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

const createPost = async (post) => {
  try {
    const { data } = await axios.post('https://jsonplaceholder.typicode.com/posts', post)
    posts.value.push(data)
  } catch (error) {
    console.error(error)
  }
}

onMounted(fetchPosts)
</script>
```

---

## 📝 Résumé du Module 4

Vous avez appris :
- ✅ Composition API vs Options API
- ✅ ref() et reactive() pour la réactivité
- ✅ <script setup> pour une syntaxe moderne
- ✅ Lifecycle hooks avec Composition API
- ✅ Composables pour réutiliser la logique
- ✅ Intégration d'APIs REST

## 🎯 Prochaines étapes

Module 5 : Vue Router pour la navigation entre pages

---

**Passez aux exemples et exercices pratiques !** 🚀
