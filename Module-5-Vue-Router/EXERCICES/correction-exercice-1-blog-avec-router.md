## 🎓 Correction guidée – Exercice 1 : Blog avec Vue Router

### 📝 Objectif de la correction

Proposer une **implémentation complète mais simple** du blog avec Vue Router, que tu peux :

- expliquer **pas à pas** en cours,
- utiliser comme **référence** pour corriger les étudiants,
- reprendre pour faire du **live-coding partiel** (par ex. seulement la route dynamique + guard).

L’idée est d’avoir :

- un **router** bien configuré,
- des **vues claires** (Home, ArticleDetail, About, Admin, Login, NotFound),
- un **guard** simple basé sur `localStorage`,
- des **données mock** partagées entre Home et ArticleDetail.

---

## Phase 0 – Mise en place du projet (rappel rapide)

Ce que tu peux demander aux étudiants :

```bash
npm create vue@latest blog-router
cd blog-router
npm install
npm install vue-router
npm run dev
```

Dans `main.js`, brancher Vue Router (ils l’ont normalement déjà vu dans le module) :

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.mount('#app')
```

Dans `src/router/index.js`, on ajoutera toute la config plus bas.

Dans `App.vue`, on prépare le layout général :

```vue
<template>
  <div>
    <Navigation />
    <main style="padding: 1.5rem;">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Navigation from './components/Navigation.vue'
</script>
```

---

## Phase 1 – Données mock communes (articles)

Pour éviter de dupliquer le tableau d’articles, on peut créer un petit fichier de données.

### 1.1 `src/data/articles.js`

```javascript
// src/data/articles.js
export const articles = [
  {
    id: 1,
    titre: 'Introduction à Vue.js',
    contenu: 'Vue.js est un framework progressif pour construire des interfaces utilisateur...',
    auteur: 'Jean Dupont',
    date: '2024-01-15'
  },
  {
    id: 2,
    titre: 'Vue Router expliqué',
    contenu: 'Le routage avec Vue Router permet de créer des applications multi-pages en SPA...',
    auteur: 'Marie Martin',
    date: '2024-01-20'
  },
  {
    id: 3,
    titre: 'Bonnes pratiques pour organiser vos composants',
    contenu: 'Découper votre application en composants réutilisables facilite la maintenance...',
    auteur: 'Alex Leroy',
    date: '2024-01-25'
  }
]
```

Message à faire passer :

- On reste **en mémoire**, sans backend.  
- On peut ensuite importer ce tableau dans Home et ArticleDetail.

---

## Phase 2 – Configuration du router et guard

### 2.1 `src/router/index.js`

```javascript
// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ArticleDetail from '../views/ArticleDetail.vue'
import About from '../views/About.vue'
import Admin from '../views/Admin.vue'
import Login from '../views/Login.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/article/:id',
    name: 'article-detail',
    component: ArticleDetail,
    props: true
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guard global
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAdmin') === 'true'

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router
```

Points pédagogiques :

- `meta: { requiresAuth: true }` sert uniquement à **marquer** certaines routes.
- Le guard lit `localStorage` pour savoir si on est admin.
- On passe `redirect: to.fullPath` dans la query pour savoir où renvoyer après login.

---

## Phase 3 – Menu de navigation commun

### 3.1 `src/components/Navigation.vue`

```vue
<template>
  <nav style="display: flex; gap: 1rem; padding: 1rem; background: #f5f5f5;">
    <router-link to="/" class="link" active-class="active" exact-active-class="active">
      Accueil
    </router-link>
    <router-link to="/about" class="link" active-class="active">
      À propos
    </router-link>
    <router-link to="/admin" class="link" active-class="active">
      Admin
    </router-link>
    <router-link to="/login" class="link" active-class="active">
      Login
    </router-link>
  </nav>
</template>

<style scoped>
.link {
  text-decoration: none;
  color: #333;
}
.active {
  font-weight: bold;
  color: #42b983;
}
</style>
```

Ce que tu peux montrer :

- La classe `active` s’applique automatiquement sur le lien de la route courante.
- Le menu est en haut de **toutes** les pages grâce à `App.vue`.

---

## Phase 4 – Page Home (liste des articles)

### 4.1 `src/views/Home.vue`

```vue
<script setup>
import { articles } from '../data/articles'
</script>

<template>
  <section>
    <h1>🏠 Blog – Accueil</h1>
    <p>Liste de tous les articles.</p>

    <div style="margin: 1rem 0;">
      <!-- Ce bouton serait réservé à l'admin dans une vraie app -->
      <router-link to="/admin">
        <button>➕ Nouvel article (admin)</button>
      </router-link>
    </div>

    <ul style="list-style: none; padding: 0;">
      <li
        v-for="article in articles"
        :key="article.id"
        style="margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid #ddd;"
      >
        <h2>{{ article.titre }}</h2>
        <p style="font-size: 0.9rem; color: #777;">
          Par {{ article.auteur }} – {{ article.date }}
        </p>
        <p>{{ article.contenu.slice(0, 80) }}...</p>

        <router-link :to="{ name: 'article-detail', params: { id: article.id } }">
          Lire la suite
        </router-link>
      </li>
    </ul>
  </section>
</template>
```

Points importants :

- Utilisation de `router-link` avec `name` + `params` pour la route dynamique.
- `articles` vient d’un **fichier commun** et non d’un simple tableau local.

---

## Phase 5 – Page ArticleDetail (route dynamique)

### 5.1 `src/views/ArticleDetail.vue`

```vue
<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { articles } from '../data/articles'

// On peut aussi recevoir l'id en props (props: true dans la route)
const route = useRoute()
const router = useRouter()

const article = computed(() => {
  const id = parseInt(route.params.id, 10)
  return articles.find(a => a.id === id)
})

const goBack = () => {
  router.back()
}
</script>

<template>
  <section v-if="article">
    <h1>{{ article.titre }}</h1>
    <p style="font-size: 0.9rem; color: #777;">
      Par {{ article.auteur }} – {{ article.date }}
    </p>
    <p style="margin-top: 1rem;">
      {{ article.contenu }}
    </p>

    <div style="margin-top: 1.5rem;">
      <button @click="goBack">← Retour</button>
      <!-- Boutons admin symboliques -->
      <button style="margin-left: 0.5rem;">Modifier</button>
      <button style="margin-left: 0.5rem; color: #e74c3c;">Supprimer</button>
    </div>
  </section>

  <section v-else>
    <h1>Article introuvable</h1>
    <p>L'article demandé n'existe pas.</p>
    <router-link to="/">Revenir à l'accueil</router-link>
  </section>
</template>
```

Ce que tu peux souligner :

- La **route dynamique** vient de `:id` → `route.params.id`.
- On gère le cas où l’article n’existe pas avec le `v-if / v-else`.
- `router.back()` reproduit un bouton “Retour” très simple.

---

## Phase 6 – Pages simples : About, NotFound

### 6.1 `src/views/About.vue`

```vue
<template>
  <section>
    <h1>À propos du blog</h1>
    <p>Ce petit blog est un exercice pour apprendre Vue Router.</p>
    <p>Vous pouvez y ajouter vos informations, votre bio, etc.</p>
  </section>
</template>
```

### 6.2 `src/views/NotFound.vue`

```vue
<template>
  <section>
    <h1>404 – Page non trouvée</h1>
    <p>La page que vous cherchez n'existe pas.</p>
    <router-link to="/">Retour à l'accueil</router-link>
  </section>
</template>
```

---

## Phase 7 – Login + guard admin

### 7.1 `src/views/Login.vue`

```vue
<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref('')

const route = useRoute()
const router = useRouter()

const login = () => {
  if (email.value === 'admin@blog.com' && password.value === 'admin') {
    localStorage.setItem('isAdmin', 'true')
    error.value = ''

    // Redirection vers la page demandée ou vers home
    const redirect = route.query.redirect || '/'
    router.push(redirect)
  } else {
    error.value = 'Identifiants invalides'
    localStorage.removeItem('isAdmin')
  }
}
</script>

<template>
  <section>
    <h1>Connexion</h1>

    <p v-if="error" style="color: #e74c3c;">{{ error }}</p>

    <div style="display: flex; flex-direction: column; gap: 0.5rem; max-width: 300px;">
      <label>
        Email
        <input v-model="email" type="email" />
      </label>
      <label>
        Mot de passe
        <input v-model="password" type="password" />
      </label>

      <button @click="login">
        Se connecter
      </button>

      <p style="font-size: 0.85rem; color: #777;">
        Identifiants de test : <code>admin@blog.com</code> / <code>admin</code>
      </p>
    </div>
  </section>
</template>
```

Ce que tu peux relier au guard :

- Si on essaie d’aller sur `/admin` sans être connecté, le guard nous renvoie ici avec `?redirect=/admin`.
- Après login réussi, on lit `route.query.redirect` et on renvoie l’utilisateur sur cette page.

---

## Phase 8 – Page Admin (protégée)

### 8.1 `src/views/Admin.vue`

On ne va pas faire un CRUD complet, juste une page qui montre :

- la liste des articles,
- un petit “formulaire” très simple pour en créer un (en local).

```vue
<script setup>
import { ref } from 'vue'
import { articles as initialArticles } from '../data/articles'

// On clone le tableau pour pouvoir le modifier localement
const articles = ref([...initialArticles])

const newTitle = ref('')
const newContent = ref('')

const addArticle = () => {
  if (!newTitle.value || !newContent.value) return

  const newId = articles.value.length
    ? Math.max(...articles.value.map(a => a.id)) + 1
    : 1

  articles.value.push({
    id: newId,
    titre: newTitle.value,
    contenu: newContent.value,
    auteur: 'Admin',
    date: new Date().toISOString().slice(0, 10)
  })

  newTitle.value = ''
  newContent.value = ''
}

const removeArticle = (id) => {
  articles.value = articles.value.filter(a => a.id !== id)
}
</script>

<template>
  <section>
    <h1>Admin – Gestion des articles</h1>

    <h2>Créer un nouvel article</h2>
    <div style="display: flex; flex-direction: column; gap: 0.5rem; max-width: 400px;">
      <input v-model="newTitle" placeholder="Titre" />
      <textarea v-model="newContent" placeholder="Contenu"></textarea>
      <button @click="addArticle">Ajouter</button>
    </div>

    <h2 style="margin-top: 2rem;">Liste des articles</h2>
    <ul style="list-style: none; padding: 0;">
      <li
        v-for="article in articles"
        :key="article.id"
        style="margin-bottom: 0.75rem; border-bottom: 1px solid #ddd; padding-bottom: 0.5rem;"
      >
        <strong>{{ article.titre }}</strong>
        <button
          style="margin-left: 0.5rem; color: #e74c3c;"
          @click="removeArticle(article.id)"
        >
          Supprimer
        </button>
      </li>
    </ul>
  </section>
</template>
```

Remarque à expliciter :

- Ici on manipule une **copie locale** des articles (pas un “vrai” backend), ce qui est suffisant pour un exercice de Router.

---

## Résumé des points-clés (à vérifier chez les étudiants)

- **Routes** : toutes créées, y compris la catch-all pour la 404.
- **Route dynamique** `/article/:id` fonctionnelle et gérant le cas “article introuvable”.
- **Guard** en place sur `/admin` avec redirection vers `/login`.
- **Login** qui met `isAdmin` dans `localStorage` et renvoie sur la bonne page.
- **Menu** présent partout et classes actives visibles.
- **Navigation programmatique** : bouton retour dans `ArticleDetail`, redirection après login.

Cette correction reste volontairement **simple** pour coller à l’exercice et au cours, mais elle couvre l’ensemble des critères de réussite listés dans l’énoncé. Tu peux piocher dedans pour illustrer une partie précise (par ex. seulement le guard + login) sans forcément tout projeter. 

