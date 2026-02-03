# Module 2 : Composants et Réactivité

## 🎯 Objectifs du module

À la fin de ce module, vous serez capable de :
- Créer et structurer des composants Vue (Single File Components)
- Utiliser les props pour la communication parent-enfant
- Émettre des événements personnalisés (child vers parent)
- Maîtriser les propriétés computed
- Utiliser les watchers pour observer les changements
- Comprendre la réactivité en profondeur

---

## 0. Prérequis et mise en place du projet (build Vite)

**Ce module utilise un projet Vue avec build (Vite).** Vous quittez le simple fichier HTML + CDN du Module 1 pour travailler avec des **Single File Components** (`.vue`), un outil de build et une structure de dossiers.

### 0.1 Prérequis

- **Node.js** (version 16 ou 18+) et **npm** installés sur votre machine
- Avoir suivi le Module 1 (bases de Vue : data, methods, interpolation)

### 0.2 Créer un nouveau projet Vue avec Vite

Dans un terminal, à l’emplacement de votre choix :

```bash
npm create vue@latest
```

Répondez aux questions (recommandations pour ce module) :

- **Project name** : `module2-composants` (ou un nom de votre choix)
- **Add TypeScript?** : No
- **Add JSX Support?** : No
- **Add Vue Router?** : No
- **Add Pinia?** : No
- **Add Vitest?** : No
- **Add ESLint?** : Oui (optionnel)

Puis :

```bash
cd module2-composants
npm install
npm run dev
```

Ouvrez l’URL affichée (souvent `http://localhost:5173`) dans votre navigateur.

### 0.3 Structure du projet

Vite génère une structure du type :

```
module2-composants/
├── node_modules/       # Dépendances (ne pas modifier)
├── public/             # Fichiers statiques
├── src/
│   ├── assets/        # Images, CSS globaux
│   ├── components/    # Vos composants .vue
│   ├── App.vue         # Composant racine
│   └── main.js         # Point d'entrée (createApp, mount)
├── index.html          # Page HTML principale
├── package.json        # Scripts et dépendances
└── vite.config.js      # Configuration Vite
```

**À retenir :**

- Chaque composant est un fichier **`.vue`** avec `<template>`, `<script>` et éventuellement `<style scoped>`.
- Le **parent** est monté dans `main.js` via `createApp(App).mount('#app')`.
- Les composants sont **importés** dans d’autres composants avec `import MonComposant from './components/MonComposant.vue'` puis enregistrés dans `components: { MonComposant }`.

Les exemples du module (dans `EXEMPLES/exemple-1-props`, etc.) sont fournis sous forme de **projets Vite** : ouvrez le dossier, lancez `npm install` puis `npm run dev` pour les lancer.

---

## 1. Anatomie d'un Composant Vue

### 1.1 Structure d'un Single File Component (SFC)

Un fichier `.vue` est divisé en trois sections principales :

```vue
<template>
  <!-- 1. TEMPLATE : Structure HTML du composant -->
  <div class="mon-composant">
    <h2>{{ titre }}</h2>
    <p>{{ description }}</p>
  </div>
</template>

<script>
// 2. SCRIPT : Logique JavaScript
export default {
  name: 'MonComposant',
  
  // Options du composant
  data() {
    return {
      titre: 'Mon titre',
      description: 'Ma description'
    }
  }
}
</script>

<style scoped>
/* 3. STYLE : CSS limité à ce composant */
.mon-composant {
  padding: 20px;
  background-color: #f5f5f5;
}
</style>
```

### 1.2 L'attribut `scoped` dans les styles

```vue
<style scoped>
/* Ces styles s'appliquent UNIQUEMENT à ce composant */
.titre {
  color: blue;
}
</style>

<style>
/* Ces styles sont globaux */
body {
  font-family: Arial;
}
</style>
```

**Avantages de `scoped` :**
- ✅ Évite les conflits de CSS
- ✅ Isolation des styles par composant
- ✅ Meilleure maintenabilité

### 1.3 L'option `name`

```javascript
export default {
  name: 'MonComposant', // Recommandé : PascalCase
  // ...
}
```

**Avantages :**
- Meilleur affichage dans les Vue DevTools
- Utile pour la récursion de composants
- Facilite le débogage

---

## 2. Communication Parent-Enfant : Les Props

### 2.1 Définition des props

Les **props** (properties) permettent de passer des données du parent vers l'enfant.

#### Composant Enfant (UserCard.vue)

```vue
<template>
  <div class="user-card">
    <h3>{{ nom }}</h3>
    <p>{{ age }} ans</p>
    <p>{{ email }}</p>
  </div>
</template>

<script>
export default {
  name: 'UserCard',
  
  // Syntaxe simple (tableau)
  props: ['nom', 'age', 'email']
}
</script>
```

#### Composant Parent (App.vue)

```vue
<template>
  <div>
    <UserCard 
      nom="Jean Dupont" 
      :age="30" 
      email="jean@example.com"
    />
  </div>
</template>

<script>
import UserCard from './components/UserCard.vue';

export default {
  components: {
    UserCard
  }
}
</script>
```

### 2.2 Props avec validation (Syntaxe objet - recommandée)

```javascript
export default {
  props: {
    // Type simple
    nom: String,
    
    // Type avec valeur par défaut
    age: {
      type: Number,
      default: 18
    },
    
    // Required prop
    email: {
      type: String,
      required: true
    },
    
    // Plusieurs types possibles
    id: {
      type: [String, Number]
    },
    
    // Valeur par défaut pour objet/tableau (fonction)
    utilisateur: {
      type: Object,
      default() {
        return { nom: 'Anonyme' }
      }
    },
    
    // Validation personnalisée
    status: {
      type: String,
      validator(value) {
        return ['actif', 'inactif', 'en attente'].includes(value)
      }
    }
  }
}
```

### 2.3 Types disponibles pour les props

- `String`
- `Number`
- `Boolean`
- `Array`
- `Object`
- `Date`
- `Function`
- `Symbol`

### 2.4 Règles importantes des props

⚠️ **Les props sont en lecture seule (one-way data flow)** :

```javascript
// ❌ MAUVAIS : Ne jamais muter une prop directement
this.nom = 'Nouveau nom'; 

// ✅ BON : Utiliser une donnée locale
data() {
  return {
    nomLocal: this.nom
  }
}
```

---

## 3. Communication Enfant-Parent : Événements Personnalisés

### 3.1 Émettre un événement depuis l'enfant

#### Composant Enfant (BoutonCompteur.vue)

```vue
<template>
  <button @click="incrementer">
    Cliqué {{ compteur }} fois
  </button>
</template>

<script>
export default {
  name: 'BoutonCompteur',
  data() {
    return {
      compteur: 0
    }
  },
  methods: {
    incrementer() {
      this.compteur++;
      
      // Émettre un événement personnalisé
      this.$emit('increment', this.compteur);
    }
  }
}
</script>
```

### 3.2 Écouter l'événement dans le parent

```vue
<template>
  <div>
    <h2>Total : {{ total }}</h2>
    <BoutonCompteur @increment="gererIncrement" />
  </div>
</template>

<script>
import BoutonCompteur from './components/BoutonCompteur.vue';

export default {
  components: { BoutonCompteur },
  data() {
    return {
      total: 0
    }
  },
  methods: {
    gererIncrement(valeur) {
      this.total = valeur;
      console.log('Nouvelle valeur:', valeur);
    }
  }
}
</script>
```

### 3.3 Déclaration des événements émis (Vue 3)

**Bonne pratique** : Déclarer explicitement les événements :

```javascript
export default {
  emits: ['increment', 'decrement'],
  
  // Avec validation
  emits: {
    increment: (valeur) => {
      return typeof valeur === 'number';
    }
  }
}
```

---

## 4. Propriétés Computed (Calculées)

### 4.1 Qu'est-ce qu'une propriété computed ?

Les **computed properties** sont des propriétés dérivées qui se calculent automatiquement en fonction d'autres données.

```vue
<template>
  <div>
    <p>Prénom : {{ prenom }}</p>
    <p>Nom : {{ nom }}</p>
    <p>Nom complet : {{ nomComplet }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      prenom: 'Jean',
      nom: 'Dupont'
    }
  },
  computed: {
    // Propriété calculée
    nomComplet() {
      return `${this.prenom} ${this.nom}`;
    }
  }
}
</script>
```

### 4.2 Computed vs Methods

```javascript
export default {
  data() {
    return {
      items: [1, 2, 3, 4, 5]
    }
  },
  
  // ✅ COMPUTED : Mis en cache, recalculé seulement si items change
  computed: {
    total() {
      console.log('Calcul du total');
      return this.items.reduce((sum, item) => sum + item, 0);
    }
  },
  
  // ❌ METHOD : Recalculé à chaque render
  methods: {
    calculerTotal() {
      console.log('Calcul du total');
      return this.items.reduce((sum, item) => sum + item, 0);
    }
  }
}
```

**Quand utiliser computed ?**
- ✅ Calculs dérivés de données réactives
- ✅ Filtrage/transformation de listes
- ✅ Formatage de données
- ✅ Besoin de mise en cache

**Quand utiliser methods ?**
- ✅ Actions avec effets de bord
- ✅ Événements utilisateur
- ✅ Opérations asynchrones

### 4.3 Computed avec setter

```javascript
computed: {
  nomComplet: {
    // Getter
    get() {
      return `${this.prenom} ${this.nom}`;
    },
    
    // Setter
    set(nouveauNom) {
      const parts = nouveauNom.split(' ');
      this.prenom = parts[0];
      this.nom = parts[1];
    }
  }
}
```

### 4.4 Exemples pratiques

```javascript
export default {
  data() {
    return {
      produits: [
        { nom: 'Produit 1', prix: 10, quantite: 2 },
        { nom: 'Produit 2', prix: 20, quantite: 1 }
      ],
      recherche: ''
    }
  },
  
  computed: {
    // Total du panier
    total() {
      return this.produits.reduce((sum, p) => sum + (p.prix * p.quantite), 0);
    },
    
    // Filtrage
    produitsFiltres() {
      return this.produits.filter(p => 
        p.nom.toLowerCase().includes(this.recherche.toLowerCase())
      );
    },
    
    // Tri
    produitsTriesParPrix() {
      return [...this.produits].sort((a, b) => a.prix - b.prix);
    },
    
    // Condition
    aProduits() {
      return this.produits.length > 0;
    }
  }
}
```

---

## 5. Watchers (Observateurs)

### 5.1 Qu'est-ce qu'un watcher ?

Les **watchers** permettent d'exécuter du code en réponse aux changements de données.

```javascript
export default {
  data() {
    return {
      question: '',
      reponse: 'Posez une question...'
    }
  },
  
  watch: {
    // Observer la propriété 'question'
    question(nouveauTexte, ancienTexte) {
      console.log(`Question changée de "${ancienTexte}" à "${nouveauTexte}"`);
      
      if (nouveauTexte.includes('?')) {
        this.obtenirReponse();
      }
    }
  },
  
  methods: {
    obtenirReponse() {
      this.reponse = 'Réflexion...';
      // Appel API, etc.
    }
  }
}
```

### 5.2 Options des watchers

```javascript
watch: {
  // Observer en profondeur (objets/tableaux)
  utilisateur: {
    handler(nouveau, ancien) {
      console.log('Utilisateur modifié');
    },
    deep: true, // Observer les propriétés imbriquées
    immediate: true // Exécuter immédiatement au montage
  },
  
  // Observer une propriété imbriquée
  'utilisateur.nom'(nouveau, ancien) {
    console.log('Nom modifié');
  }
}
```

### 5.3 Computed vs Watch

**Computed** : Pour des calculs synchrones dérivés
```javascript
computed: {
  nomComplet() {
    return `${this.prenom} ${this.nom}`;
  }
}
```

**Watch** : Pour des effets de bord (API, localStorage, etc.)
```javascript
watch: {
  question(nouveau) {
    // Appel API asynchrone
    this.fetchReponse(nouveau);
  }
}
```

### 5.4 Cas d'usage pratiques

```javascript
export default {
  data() {
    return {
      recherche: '',
      resultats: [],
      parametre: 'valeur'
    }
  },
  
  watch: {
    // Debouncing pour recherche
    recherche(nouveau) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.effectuerRecherche(nouveau);
      }, 300);
    },
    
    // Synchroniser avec localStorage
    parametre(nouveau) {
      localStorage.setItem('parametre', nouveau);
    }
  },
  
  methods: {
    effectuerRecherche(terme) {
      // Appel API
      fetch(`/api/search?q=${terme}`)
        .then(r => r.json())
        .then(data => this.resultats = data);
    }
  }
}
```

---

## 6. Réactivité en Profondeur

### 6.1 Comment fonctionne la réactivité ?

Vue 3 utilise les **Proxies JavaScript** pour détecter les changements :

```javascript
// Vue observe automatiquement ces changements
this.message = 'Nouveau message'; // ✅ Réactif
this.compteur++; // ✅ Réactif
this.items.push('nouveau'); // ✅ Réactif
this.user.nom = 'Nouveau nom'; // ✅ Réactif
```

### 6.2 Réactivité des tableaux

```javascript
export default {
  data() {
    return {
      items: [1, 2, 3]
    }
  },
  methods: {
    manipulerTableau() {
      // ✅ Méthodes réactives
      this.items.push(4);
      this.items.pop();
      this.items.shift();
      this.items.unshift(0);
      this.items.splice(1, 1);
      this.items.sort();
      this.items.reverse();
      
      // ✅ Remplacement du tableau
      this.items = this.items.filter(item => item > 2);
      this.items = [...this.items, 5, 6];
      
      // ⚠️ Modification par index (réactif en Vue 3)
      this.items[0] = 99; // ✅ Réactif en Vue 3
    }
  }
}
```

### 6.3 Réactivité des objets

```javascript
export default {
  data() {
    return {
      utilisateur: {
        nom: 'Jean',
        age: 30
      }
    }
  },
  methods: {
    manipulerObjet() {
      // ✅ Modifier une propriété existante
      this.utilisateur.nom = 'Marie';
      
      // ✅ Ajouter une nouvelle propriété (Vue 3)
      this.utilisateur.email = 'marie@example.com';
      
      // ✅ Supprimer une propriété
      delete this.utilisateur.age;
      
      // ✅ Remplacer l'objet
      this.utilisateur = {
        ...this.utilisateur,
        ville: 'Paris'
      };
    }
  }
}
```

### 6.4 nextTick : Attendre la mise à jour du DOM

```javascript
export default {
  methods: {
    async mettreAJourEtScroller() {
      this.message = 'Nouveau message';
      
      // Le DOM n'est pas encore mis à jour ici
      
      await this.$nextTick();
      
      // Maintenant le DOM est mis à jour
      this.$refs.messageElement.scrollIntoView();
    }
  }
}
```

---

## 7. Lifecycle Hooks (Cycle de Vie)

### 7.1 Les hooks principaux

```javascript
export default {
  // 1. Création
  beforeCreate() {
    // Avant la réactivité
    console.log('beforeCreate');
  },
  
  created() {
    // Après la réactivité, avant le montage
    // ✅ Bon moment pour fetch des données
    console.log('created');
  },
  
  // 2. Montage
  beforeMount() {
    // Avant le rendu initial
    console.log('beforeMount');
  },
  
  mounted() {
    // Après le rendu dans le DOM
    // ✅ Accès au DOM, initialisation de bibliothèques
    console.log('mounted');
    console.log(this.$el); // Élément DOM
  },
  
  // 3. Mise à jour
  beforeUpdate() {
    // Avant la re-rendu
    console.log('beforeUpdate');
  },
  
  updated() {
    // Après le re-rendu
    console.log('updated');
  },
  
  // 4. Démontage
  beforeUnmount() {
    // Avant la suppression
    console.log('beforeUnmount');
  },
  
  unmounted() {
    // Après la suppression
    // ✅ Nettoyage (event listeners, timers, etc.)
    console.log('unmounted');
  }
}
```

### 7.2 Schéma du cycle de vie

```
Création → Montage → Mise à jour → Démontage
   ↓         ↓           ↓            ↓
created   mounted    updated     unmounted
```

### 7.3 Cas d'usage pratiques

```javascript
export default {
  data() {
    return {
      users: [],
      intervalId: null
    }
  },
  
  created() {
    // Charger les données
    this.fetchUsers();
  },
  
  mounted() {
    // Initialiser un timer
    this.intervalId = setInterval(() => {
      this.fetchUsers();
    }, 5000);
    
    // Initialiser une bibliothèque externe
    this.initChart();
  },
  
  unmounted() {
    // Nettoyer
    clearInterval(this.intervalId);
  },
  
  methods: {
    fetchUsers() {
      fetch('/api/users')
        .then(r => r.json())
        .then(data => this.users = data);
    },
    
    initChart() {
      // Chart.js, etc.
    }
  }
}
```

---

## 8. Bonnes Pratiques

### 8.1 Organisation des composants

```
src/
├── components/
│   ├── common/           # Composants réutilisables
│   │   ├── Button.vue
│   │   └── Input.vue
│   ├── layout/           # Mise en page
│   │   ├── Header.vue
│   │   └── Footer.vue
│   └── features/         # Fonctionnalités métier
│       └── UserProfile.vue
```

### 8.2 Nommage

```javascript
// ✅ Composants : PascalCase
MonComposant.vue
UserProfile.vue

// ✅ Props : camelCase
props: ['userName', 'isActive']

// ✅ Événements : kebab-case
this.$emit('update-user');
this.$emit('delete-item');
```

### 8.3 Props vs Data

```javascript
// ❌ MAUVAIS
props: ['user'],
methods: {
  updateUser() {
    this.user.name = 'Nouveau nom'; // Mute la prop !
  }
}

// ✅ BON
props: ['user'],
data() {
  return {
    localUser: { ...this.user } // Copie locale
  }
},
methods: {
  updateUser() {
    this.localUser.name = 'Nouveau nom';
    this.$emit('update', this.localUser);
  }
}
```

---

## 📝 Résumé du Module 2

Vous avez appris :
- ✅ Mise en place d’un projet Vue avec Vite (build, SFC)
- ✅ Structure et anatomie des composants Vue (fichiers `.vue`)
- ✅ Communication parent-enfant avec props
- ✅ Communication enfant-parent avec événements (`$emit`, `@event`)
- ✅ Propriétés computed pour calculs dérivés
- ✅ Watchers pour observer les changements
- ✅ Système de réactivité de Vue
- ✅ Cycle de vie des composants

## 🎯 Prochaines étapes

Dans le Module 3, vous apprendrez :
- Directives conditionnelles (v-if, v-show)
- Boucles avec v-for
- Gestion avancée des événements
- Binding bidirectionnel avec v-model

---

## 📚 Ressources complémentaires

- [Documentation Props](https://vuejs.org/guide/components/props.html)
- [Documentation Events](https://vuejs.org/guide/components/events.html)
- [Documentation Computed](https://vuejs.org/guide/essentials/computed.html)
- [Documentation Watchers](https://vuejs.org/guide/essentials/watchers.html)

**Passez maintenant aux exemples et exercices pratiques !** 🚀
