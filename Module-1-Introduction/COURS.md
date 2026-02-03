# Module 1 : Introduction et Fondamentaux de VueJS

## 🎯 Objectifs du module

À la fin de ce module, vous serez capable de :
- Comprendre ce qu'est VueJS et son écosystème
- Créer une application VueJS via CDN (sans installation)
- Utiliser la syntaxe de template de base dans une page HTML
- Maîtriser l'interpolation et les expressions
- Comprendre la réactivité de base (data, methods)

---

## 1. Qu'est-ce que VueJS ?

### 1.1 Présentation

**VueJS** est un framework JavaScript progressif pour construire des interfaces utilisateur. Créé par Evan You en 2014, Vue est conçu pour être adopté de manière incrémentale.

#### Caractéristiques principales :

- ✅ **Progressif** : Peut être utilisé pour une partie d'une page ou une application complète
- ✅ **Réactif** : Les données et le DOM sont liés automatiquement
- ✅ **Composants** : Architecture basée sur des composants réutilisables
- ✅ **Performant** : Virtual DOM et optimisations automatiques
- ✅ **Accessible** : Courbe d'apprentissage douce
- ✅ **Écosystème riche** : Router, state management, devtools, etc.

### 1.2 Comparaison avec d'autres frameworks

| Critère | Vue.js | React | Angular |
|---------|--------|-------|---------|
| Courbe d'apprentissage | 🟢 Facile | 🟡 Moyenne | 🔴 Difficile |
| Taille du bundle | ~30 KB | ~40 KB | ~140 KB |
| Type | Framework progressif | Bibliothèque | Framework complet |
| Template | HTML-based | JSX | HTML + TypeScript |
| Philosophie | Flexible | Libraire UI | Opinionné |

### 1.3 VueJS 3 - Nouveautés

Vue 3 (sorti en 2020) apporte des améliorations majeures :

- **Composition API** : Nouvelle façon d'organiser la logique
- **Performance améliorée** : Virtual DOM réécrit, bundle plus petit
- **TypeScript** : Support natif amélioré
- **Fragments** : Multiple root elements
- **Teleport** : Rendu de contenu hors du composant parent
- **Suspense** : Gestion du chargement asynchrone

---

## 2. Installation et Configuration

### 2.1 Prérequis (utilisation CDN)

Avec l’**utilisation via CDN**, aucun outil n’est à installer sur votre machine :

- Un **navigateur** moderne (Chrome, Firefox, Edge, Safari)
- Un **éditeur de code** (VS Code, etc.)
- Éventuellement un serveur local pour ouvrir les fichiers (ou ouvrir le `.html` directement)

Aucune installation de Node.js ni npm n’est nécessaire pour ce module.

### 2.2 Utilisation via CDN (méthode recommandée pour ce module)

**Vue.js via CDN** permet de démarrer immédiatement : une seule balise `<script>` charge Vue, et vous écrivez votre application dans une page HTML.

#### Avantages du CDN pour l’apprentissage

- Démarrage immédiat, sans `npm install` ni build
- Un seul fichier HTML à créer et à ouvrir dans le navigateur
- Compréhension claire du lien entre template, données et DOM
- Idéal pour des exercices, des prototypes et des petits projets

#### Script Vue à inclure

```html
<!-- Version développement (messages d'aide en console) -->
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<!-- Version production (optimisée, plus légère) -->
<script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
```

#### Exemple minimal : première app Vue avec CDN

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ma première app Vue</title>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
</head>
<body>
    <div id="app">{{ message }}</div>

    <script>
        const { createApp } = Vue;
        
        createApp({
            data() {
                return {
                    message: 'Bonjour VueJS !'
                }
            }
        }).mount('#app');
    </script>
</body>
</html>
```

**À retenir :**

1. Le script Vue doit être chargé **avant** votre code (dans `<head>` ou avant votre `<script>`).
2. `createApp({ ... })` reçoit l’objet qui décrit votre application (data, methods, etc.).
3. `.mount('#app')` attache l’application à l’élément dont l’id est `app`.

### 2.3 Structure d’un projet avec CDN

Pour ce module, une structure simple suffit :

```
mon-projet-vue-cdn/
├── index.html          # Page principale avec Vue (script CDN + votre code)
├── style.css           # (optionnel) Feuille de style
└── autres-pages.html   # (optionnel) Autres démos
```

Tout le code Vue (data, methods, etc.) se trouve dans des balises `<script>` au sein du HTML.

### 2.4 Alternative : projet avec Vite (pour aller plus loin)

Quand vous voudrez structurer une **vraie application** (composants `.vue`, build, Router, etc.), vous pourrez utiliser **Vite** :

```bash
# Prérequis : Node.js 16+ et npm
node --version
npm --version

# Créer un projet Vue avec Vite
npm create vue@latest
cd mon-projet-vue
npm install
npm run dev
```

Pour le Module 1, nous restons sur le **CDN** pour se concentrer sur les bases de Vue sans outillage.

---

## 3. Première Application VueJS (avec CDN)

### 3.1 Anatomie d’une application Vue avec CDN

Avec le CDN, Vue est exposé globalement sous l’objet `Vue`. Une application se crée ainsi :

```html
<!-- 1. Charger Vue -->
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<!-- 2. Point d’ancrage dans le HTML -->
<div id="app">{{ message }}</div>

<!-- 3. Créer et monter l’application -->
<script>
const { createApp } = Vue;

createApp({
  data() {
    return {
      message: 'Bonjour VueJS !'
    };
  }
}).mount('#app');
</script>
```

**En résumé :**

- `const { createApp } = Vue` : récupération de la fonction `createApp` depuis le script CDN.
- `createApp({ ... })` : on passe un objet avec `data()`, `methods`, etc. (options de l’application).
- `.mount('#app')` : on attache cette instance à l’élément dont l’id est `app`.

### 3.2 Structure du code avec CDN

En CDN, tout se trouve dans une page HTML :

1. **Template** : le HTML à l’intérieur de `<div id="app">` (interpolation `{{ }}`, directives, etc.).
2. **Logique** : l’objet passé à `createApp()` avec `data()`, `methods`, etc.
3. **Styles** : balise `<style>` ou fichier CSS externe.

Exemple un peu plus complet :

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Mon app Vue</title>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <style>
    .container { padding: 20px; background: #f0f0f0; }
  </style>
</head>
<body>
  <div id="app">
    <div class="container">
      <h1>{{ titre }}</h1>
      <p>{{ description }}</p>
    </div>
  </div>

  <script>
  const { createApp } = Vue;

  createApp({
    data() {
      return {
        titre: 'Mon premier composant',
        description: 'Ceci est la description'
      };
    }
  }).mount('#app');
  </script>
</body>
</html>
```

Plus tard (Module 2 et suivants), vous verrez les **Single File Components** (fichiers `.vue`) avec Vite ; pour ce module, on reste sur cette structure HTML + script.

---

## 4. Template Syntax

### 4.1 Interpolation de texte (Mustache)

La syntaxe `{{ }}` permet d'afficher des données dans le template (à l’intérieur de `#app`) :

```html
<div id="app">
  <p>{{ message }}</p>
  <p>{{ nombre * 2 }}</p>
  <p>{{ estActif ? 'Actif' : 'Inactif' }}</p>
  <p>{{ utilisateur.nom.toUpperCase() }}</p>
</div>

<script>
const { createApp } = Vue;
createApp({
  data() {
    return {
      message: 'Bonjour !',
      nombre: 21,
      estActif: true,
      utilisateur: { nom: 'Dupont' }
    };
  }
}).mount('#app');
</script>
```

**Note importante** : Les expressions dans `{{ }}` sont évaluées en tant que JavaScript.

### 4.2 HTML brut avec v-html

⚠️ **Attention** : Utiliser avec précaution (risque XSS)

```html
<div id="app">
  <!-- Échappe le HTML (affiché comme texte) -->
  <p>{{ htmlBrut }}</p>
  <!-- Rend le HTML -->
  <p v-html="htmlBrut"></p>
</div>

<script>
const { createApp } = Vue;
createApp({
  data() {
    return {
      htmlBrut: '<strong>Texte en gras</strong>'
    };
  }
}).mount('#app');
</script>
```

### 4.3 Binding d'attributs avec v-bind

Pour lier des données à des attributs HTML, on utilise `v-bind:` ou le raccourci `:` :

```html
<div id="app">
  <!-- Syntaxe complète -->
  <img v-bind:src="imageUrl" v-bind:alt="imageAlt">
  <!-- Raccourci (recommandé) -->
  <img :src="imageUrl" :alt="imageAlt">
  <!-- Binding de classes -->
  <div :class="classeActive"></div>
  <!-- Binding de styles -->
  <div :style="{ color: couleur, fontSize: taille + 'px' }"></div>
  <!-- Binding d'attributs booléens -->
  <button :disabled="estDesactive">Cliquer</button>
</div>

<script>
const { createApp } = Vue;
createApp({
  data() {
    return {
      imageUrl: 'https://via.placeholder.com/150',
      imageAlt: 'Image de placeholder',
      classeActive: 'active',
      couleur: 'blue',
      taille: 16,
      estDesactive: false
    };
  }
}).mount('#app');
</script>
```

### 4.4 Expressions JavaScript

Vue supporte les expressions JavaScript dans les templates (à l’intérieur de `#app`) :

```html
<div id="app">
  <p>{{ nombre + 10 }}</p>
  <p>{{ prix * quantite }}</p>
  <p>{{ age >= 18 ? 'Majeur' : 'Mineur' }}</p>
  <p>{{ nom.toUpperCase() }}</p>
  <p>{{ message.split('').reverse().join('') }}</p>
  <p>{{ `Bonjour ${prenom} ${nom}` }}</p>
</div>
```

*(Les variables `nombre`, `prix`, `quantite`, `age`, `nom`, `message`, `prenom` doivent être définies dans `data()` de votre `createApp()`.)*

**Limitations** :
- ❌ Pas de déclarations (if, for, while...)
- ❌ Pas de création de variables
- ✅ Uniquement des expressions qui retournent une valeur

---

## 5. Réactivité de Base

### 5.1 Le système de réactivité

Vue suit automatiquement les dépendances et met à jour le DOM quand les données changent :

```html
<div id="app">
  <p>Compteur : {{ compteur }}</p>
  <button @click="incrementer">+1</button>
</div>

<script>
const { createApp } = Vue;
createApp({
  data() {
    return { compteur: 0 };
  },
  methods: {
    incrementer() {
      this.compteur++; // Vue détecte le changement et met à jour le DOM
    }
  }
}).mount('#app');
</script>
```

### 5.2 La fonction data()

`data()` doit **retourner un objet** contenant les propriétés réactives :

```javascript
createApp({
  data() {
    return {
      // ✅ Bon
      message: 'Hello',
      nombre: 42,
      tableau: [1, 2, 3],
      objet: { nom: 'Vue' }
    };
  }
}).mount('#app');
```

**Pourquoi une fonction ?**
Pour que chaque instance ait ses propres données (isolation).

### 5.3 Accès aux données avec `this`

Dans les méthodes et hooks, on accède aux données via `this` :

```javascript
createApp({
  data() {
    return {
      prenom: 'Jean',
      nom: 'Dupont'
    };
  },
  methods: {
    afficherNomComplet() {
      console.log(this.prenom + ' ' + this.nom);
    }
  }
}).mount('#app');
```

---

## 6. DevTools Vue.js

Les Vue DevTools fonctionnent aussi avec des applications chargées via CDN : une fois l’extension installée, ouvrez une page qui utilise Vue et l’onglet Vue apparaît dans les outils de développement.

### 6.1 Installation

Les Vue DevTools sont essentiels pour le développement :

- **Chrome** : [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- **Firefox** : [Vue.js devtools](https://addons.mozilla.org/fr/firefox/addon/vue-js-devtools/)

### 6.2 Fonctionnalités

- 🔍 **Inspecteur de composants** : Visualiser la hiérarchie et les props
- 📊 **Données réactives** : Observer les changements en temps réel
- ⚡ **Events** : Tracer les événements émis
- 🗂️ **Vuex/Pinia** : Inspecter le state global
- 🔧 **Performance** : Analyser les performances de rendu

---

## 7. Bonnes Pratiques

### 7.1 Conventions de nommage

```javascript
// ✅ Variables et propriétés data : camelCase
const userName = 'John';
const isActive = true;

// ✅ Constantes : UPPER_SNAKE_CASE
const API_URL = 'https://api.example.com';
```

### 7.2 Organisation du code (avec CDN)

Dans l’objet passé à `createApp()`, on organise les options ainsi :

```javascript
createApp({
  // 1. Data (état réactif)
  data() { return {} },
  // 2. Computed (propriétés dérivées)
  computed: {},
  // 3. Methods (fonctions)
  methods: {},
  // 4. Lifecycle hooks
  mounted() {},
  created() {}
}).mount('#app');
```

### 7.3 Conseils

- ✅ Incluez le script Vue (CDN) avant votre propre script
- ✅ Utilisez le raccourci `v-bind` (`:`) pour les attributs
- ✅ Utilisez le raccourci `v-on` (`@`) pour les événements
- ✅ Gardez un seul élément racine `#app` pour votre application
- ✅ Utilisez les Vue DevTools pour déboguer

---

## 📝 Résumé du Module 1

Vous avez appris :
- ✅ Ce qu'est VueJS et ses avantages
- ✅ Utiliser Vue via CDN (sans Node.js ni build)
- ✅ La structure d'une page HTML avec Vue (template dans `#app`, `createApp().mount()`)
- ✅ La syntaxe de template et l'interpolation `{{ }}`
- ✅ Le binding d'attributs avec `v-bind` / `:`
- ✅ Les bases de la réactivité (data, methods)

## 🎯 Prochaines étapes

Dans le Module 2, vous apprendrez :
- Les composants en profondeur
- La communication entre composants (props et events)
- Les propriétés computed et watchers
- La réactivité avancée

---

## 📚 Ressources complémentaires

- [Documentation officielle Vue 3](https://vuejs.org/guide/introduction.html)
- [Vue School - Free Courses](https://vueschool.io/courses)
- [Vue Mastery - Intro to Vue 3](https://www.vuemastery.com/courses/intro-to-vue-3)

**Passez maintenant aux exemples et exercices pratiques !** 🚀
