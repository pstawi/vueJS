# Module 3 : Directives et Événements

## 🎯 Objectifs du module

À la fin de ce module, vous serez capable de :
- Utiliser les directives conditionnelles (v-if, v-else-if, v-else, v-show)
- Créer des boucles avec v-for
- Gérer les événements avec v-on (@)
- Utiliser le binding bidirectionnel avec v-model
- Appliquer les modificateurs d'événements et de v-model
- Maîtriser les classes et styles dynamiques

---

## 0. Prérequis et mise en place du projet (build Vite)

**Ce module s’appuie sur un projet Vue avec build (Vite)** et des **Single File Components** (`.vue`), comme le Module 2.

### 0.1 Prérequis

- **Node.js** (version 16 ou 18+) et **npm**
- Avoir suivi les modules 1 (bases Vue, CDN) et 2 (composants, Vite)

### 0.2 Utiliser un projet existant ou en créer un nouveau

Vous pouvez :
- **Réutiliser** le projet créé pour le Module 2 (`npm run dev` dans ce projet), ou
- **Créer** un nouveau projet avec `npm create vue@latest` (même configuration que Module 2 : pas de TypeScript, JSX, Router, Pinia).

### 0.3 Exemple du module

L’exemple **« Gestion de Boutique »** (directives, v-model, filtres, formulaire) est fourni sous forme de **projet Vite** dans le dossier :

`EXEMPLES/exemple-complet/`

Pour le lancer :

```bash
cd Module-3-Directives/EXEMPLES/exemple-complet
npm install
npm run dev
```

Ouvrez l’URL affichée (souvent `http://localhost:5173`) dans votre navigateur.

---

## 1. Directives Conditionnelles

### 1.1 v-if, v-else-if, v-else

Les directives conditionnelles permettent d'afficher ou non des éléments selon une condition.

```vue
<template>
  <div>
    <!-- v-if : Affiche si la condition est vraie -->
    <p v-if="score >= 90">Excellent ! 🎉</p>
    
    <!-- v-else-if : Condition alternative -->
    <p v-else-if="score >= 70">Bien ! 👍</p>
    <p v-else-if="score >= 50">Passable 😐</p>
    
    <!-- v-else : Sinon -->
    <p v-else>Insuffisant 😞</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      score: 85
    }
  }
}
</script>
```

**Important** : Les éléments avec v-if sont **ajoutés/supprimés du DOM**.

### 1.2 v-show

```vue
<template>
  <div>
    <!-- v-show : Utilise CSS display: none -->
    <p v-show="estVisible">Ce texte peut être caché</p>
    
    <button @click="estVisible = !estVisible">
      {{ estVisible ? 'Cacher' : 'Afficher' }}
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      estVisible: true
    }
  }
}
</script>
```

### 1.3 v-if vs v-show

| Critère | v-if | v-show |
|---------|------|--------|
| **DOM** | Ajoute/supprime l'élément | Garde l'élément (display: none) |
| **Coût initial** | Plus élevé | Plus faible |
| **Toggle** | Plus coûteux | Moins coûteux |
| **Utilisation** | Condition rare | Toggle fréquent |

**Règle générale :**
- ✅ Utilisez `v-if` si la condition change rarement
- ✅ Utilisez `v-show` pour des toggles fréquents
- ✅ `v-if` pour des blocs lourds qui ne s'affichent qu'occasionnellement

### 1.4 Utilisation avec <template>

```vue
<template>
  <div>
    <!-- Grouper plusieurs éléments sans div wrapper -->
    <template v-if="estConnecte">
      <h2>Bienvenue !</h2>
      <p>Vous êtes connecté</p>
      <button>Se déconnecter</button>
    </template>
    
    <template v-else>
      <h2>Connexion</h2>
      <button>Se connecter</button>
    </template>
  </div>
</template>
```

---

## 2. Boucles avec v-for

### 2.1 Itérer sur un tableau

```vue
<template>
  <div>
    <ul>
      <!-- Syntaxe : item in items -->
      <li v-for="fruit in fruits">{{ fruit }}</li>
    </ul>
    
    <!-- Avec index -->
    <ul>
      <li v-for="(fruit, index) in fruits">
        {{ index + 1 }}. {{ fruit }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fruits: ['Pomme', 'Banane', 'Orange', 'Fraise']
    }
  }
}
</script>
```

### 2.2 L'attribut :key (OBLIGATOIRE)

```vue
<template>
  <!-- ❌ MAUVAIS : Pas de key -->
  <li v-for="user in users">{{ user.nom }}</li>
  
  <!-- ✅ BON : Avec key unique -->
  <li v-for="user in users" :key="user.id">
    {{ user.nom }}
  </li>
</template>
```

**Pourquoi :key est important ?**
- ✅ Permet à Vue d'identifier chaque élément de manière unique
- ✅ Optimise les mises à jour du DOM
- ✅ Préserve l'état des composants
- ❌ Sans key, des bugs peuvent apparaître

**Règles pour :key :**
- ✅ Utilisez un ID unique (préférable)
- ✅ Peut être l'index si la liste est statique
- ❌ Évitez l'index si la liste peut changer (ajout/suppression)

### 2.3 Itérer sur un objet

```vue
<template>
  <div>
    <!-- Valeur seulement -->
    <p v-for="valeur in utilisateur" :key="valeur">
      {{ valeur }}
    </p>
    
    <!-- Valeur et clé -->
    <p v-for="(valeur, cle) in utilisateur" :key="cle">
      {{ cle }}: {{ valeur }}
    </p>
    
    <!-- Valeur, clé et index -->
    <p v-for="(valeur, cle, index) in utilisateur" :key="cle">
      {{ index }}. {{ cle }}: {{ valeur }}
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      utilisateur: {
        nom: 'Dupont',
        prenom: 'Jean',
        age: 30,
        email: 'jean@example.com'
      }
    }
  }
}
</script>
```

### 2.4 v-for avec un nombre

```vue
<template>
  <!-- Génère les nombres de 1 à 10 -->
  <span v-for="n in 10" :key="n">{{ n }} </span>
</template>
```

### 2.5 v-for avec v-if (Attention !)

```vue
<!-- ❌ MAUVAIS : v-if et v-for sur le même élément -->
<li v-for="user in users" v-if="user.actif" :key="user.id">
  {{ user.nom }}
</li>

<!-- ✅ BON : Utiliser computed ou <template> -->
<li v-for="user in utilisateursActifs" :key="user.id">
  {{ user.nom }}
</li>

<!-- OU -->
<template v-for="user in users" :key="user.id">
  <li v-if="user.actif">
    {{ user.nom }}
  </li>
</template>
```

```javascript
computed: {
  utilisateursActifs() {
    return this.users.filter(u => u.actif);
  }
}
```

---

## 3. Gestion des Événements (v-on / @)

### 3.1 Syntaxe de base

```vue
<template>
  <div>
    <!-- Syntaxe complète -->
    <button v-on:click="compteur++">Clic : {{ compteur }}</button>
    
    <!-- Raccourci (recommandé) -->
    <button @click="compteur++">Clic : {{ compteur }}</button>
    
    <!-- Appeler une méthode -->
    <button @click="incrementer">Incrémenter</button>
    
    <!-- Appeler avec paramètres -->
    <button @click="incrementer(5)">+5</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      compteur: 0
    }
  },
  methods: {
    incrementer(montant = 1) {
      this.compteur += montant;
    }
  }
}
</script>
```

### 3.2 Événements courants

```vue
<template>
  <div>
    <!-- Clic -->
    <button @click="cliquer">Cliquer</button>
    
    <!-- Double-clic -->
    <button @dblclick="doubleCliquer">Double-clic</button>
    
    <!-- Survol -->
    <div @mouseenter="entrer" @mouseleave="sortir">Survolez-moi</div>
    
    <!-- Clavier -->
    <input @keyup="frapperTouche" @keydown="toucheAppuyee">
    
    <!-- Focus -->
    <input @focus="auFocus" @blur="perteFocus">
    
    <!-- Formulaire -->
    <form @submit="soumettre">
      <input @input="saisie" @change="changement">
    </form>
  </div>
</template>
```

### 3.3 Objet événement ($event)

```vue
<template>
  <div>
    <!-- Accéder à l'événement natif -->
    <button @click="gererClic($event)">Cliquer</button>
    
    <!-- Avec paramètres personnalisés + événement -->
    <button @click="gererClic2('info', $event)">Cliquer</button>
    
    <!-- Événement inline -->
    <input @input="texte = $event.target.value">
  </div>
</template>

<script>
export default {
  data() {
    return {
      texte: ''
    }
  },
  methods: {
    gererClic(event) {
      console.log('Type:', event.type);
      console.log('Élément:', event.target);
      console.log('Position:', event.clientX, event.clientY);
    },
    gererClic2(message, event) {
      console.log(message, event);
    }
  }
}
</script>
```

### 3.4 Modificateurs d'événements

```vue
<template>
  <div>
    <!-- .stop : stopPropagation() -->
    <div @click="parent">
      Parent
      <button @click.stop="enfant">Enfant (ne propage pas)</button>
    </div>
    
    <!-- .prevent : preventDefault() -->
    <form @submit.prevent="soumettre">
      <button>Soumettre (sans rechargement)</button>
    </form>
    
    <!-- .capture : Mode capture -->
    <div @click.capture="capturer">Capture</div>
    
    <!-- .self : Seulement si target === currentTarget -->
    <div @click.self="seulement">Seulement ce div</div>
    
    <!-- .once : Déclenché une seule fois -->
    <button @click.once="uneFois">Une seule fois</button>
    
    <!-- .passive : Améliore les performances du scroll -->
    <div @scroll.passive="defiler">Scroll</div>
    
    <!-- Chaîner les modificateurs -->
    <form @submit.prevent.stop="soumettre">Submit</form>
  </div>
</template>
```

### 3.5 Modificateurs de touches

```vue
<template>
  <div>
    <!-- Touches spéciales -->
    <input @keyup.enter="soumettre">
    <input @keyup.tab="suivant">
    <input @keyup.delete="supprimer">
    <input @keyup.esc="annuler">
    <input @keyup.space="espace">
    <input @keyup.up="haut">
    <input @keyup.down="bas">
    <input @keyup.left="gauche">
    <input @keyup.right="droite">
    
    <!-- Touches système -->
    <input @keyup.ctrl="avecCtrl">
    <input @keyup.alt="avecAlt">
    <input @keyup.shift="avecShift">
    <input @keyup.meta="avecMeta"> <!-- Cmd/Windows -->
    
    <!-- Combinaisons -->
    <input @keyup.ctrl.enter="ctrlEnter">
    <input @keyup.shift.delete="shiftSuppr">
    
    <!-- Touche spécifique (code clavier) -->
    <input @keyup.a="toucheA">
    
    <!-- .exact : Uniquement ces touches -->
    <button @click.ctrl.exact="ctrlUniquement">Ctrl seulement</button>
  </div>
</template>
```

### 3.6 Modificateurs de souris

```vue
<template>
  <div>
    <!-- Boutons de souris -->
    <button @click.left="clicGauche">Clic gauche</button>
    <button @click.right="clicDroit">Clic droit</button>
    <button @click.middle="clicMolette">Clic molette</button>
  </div>
</template>
```

---

## 4. Binding Bidirectionnel : v-model

### 4.1 Principe de v-model

`v-model` crée un binding bidirectionnel entre un input et une donnée.

```vue
<template>
  <div>
    <!-- Sans v-model (verbeux) -->
    <input 
      :value="texte" 
      @input="texte = $event.target.value"
    >
    
    <!-- Avec v-model -->
    <input v-model="texte">
    
    <p>Texte : {{ texte }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      texte: ''
    }
  }
}
</script>
```

### 4.2 v-model avec différents inputs

```vue
<template>
  <div>
    <!-- Text / Textarea -->
    <input v-model="message" type="text">
    <textarea v-model="description"></textarea>
    
    <!-- Checkbox (booléen) -->
    <input v-model="accepte" type="checkbox">
    <p>Accepté : {{ accepte }}</p>
    
    <!-- Checkbox multiple (tableau) -->
    <input v-model="hobbies" type="checkbox" value="Sport"> Sport
    <input v-model="hobbies" type="checkbox" value="Lecture"> Lecture
    <input v-model="hobbies" type="checkbox" value="Musique"> Musique
    <p>Hobbies : {{ hobbies }}</p>
    
    <!-- Radio -->
    <input v-model="genre" type="radio" value="H"> Homme
    <input v-model="genre" type="radio" value="F"> Femme
    <p>Genre : {{ genre }}</p>
    
    <!-- Select -->
    <select v-model="pays">
      <option disabled value="">Choisir un pays</option>
      <option value="FR">France</option>
      <option value="BE">Belgique</option>
      <option value="CH">Suisse</option>
    </select>
    <p>Pays : {{ pays }}</p>
    
    <!-- Select multiple -->
    <select v-model="langues" multiple>
      <option value="JS">JavaScript</option>
      <option value="PY">Python</option>
      <option value="PHP">PHP</option>
    </select>
    <p>Langues : {{ langues }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      description: '',
      accepte: false,
      hobbies: [],
      genre: '',
      pays: '',
      langues: []
    }
  }
}
</script>
```

### 4.3 Modificateurs de v-model

```vue
<template>
  <div>
    <!-- .lazy : Synchronise sur 'change' au lieu de 'input' -->
    <input v-model.lazy="texte">
    
    <!-- .number : Convertit en nombre -->
    <input v-model.number="age" type="number">
    <p>Type : {{ typeof age }}</p>
    
    <!-- .trim : Supprime les espaces -->
    <input v-model.trim="nom">
    
    <!-- Combiner les modificateurs -->
    <input v-model.trim.lazy="description">
  </div>
</template>
```

### 4.4 v-model personnalisé (Composant)

```vue
<!-- Composant CustomInput -->
<template>
  <input 
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  >
</template>

<script>
export default {
  props: ['modelValue'],
  emits: ['update:modelValue']
}
</script>

<!-- Utilisation -->
<template>
  <CustomInput v-model="texte" />
</template>
```

---

## 5. Classes et Styles Dynamiques

### 5.1 Binding de classes (Objet)

```vue
<template>
  <div>
    <!-- Syntaxe objet -->
    <div :class="{ active: estActif, 'text-danger': aErreur }">
      Contenu
    </div>
    
    <!-- Depuis une propriété computed -->
    <div :class="classesCalculees">Contenu</div>
    
    <!-- Combiner statique et dynamique -->
    <div class="statique" :class="{ dynamique: condition }">
      Contenu
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      estActif: true,
      aErreur: false
    }
  },
  computed: {
    classesCalculees() {
      return {
        active: this.estActif,
        'text-danger': this.aErreur,
        disabled: !this.estActif
      }
    }
  }
}
</script>
```

### 5.2 Binding de classes (Tableau)

```vue
<template>
  <div>
    <!-- Tableau de classes -->
    <div :class="[classeA, classeB]">Contenu</div>
    
    <!-- Conditionnel dans tableau -->
    <div :class="[estActif ? 'active' : '', classeErreur]">
      Contenu
    </div>
    
    <!-- Objet dans tableau -->
    <div :class="[{ active: estActif }, classeErreur]">
      Contenu
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      classeA: 'classe-a',
      classeB: 'classe-b',
      estActif: true,
      classeErreur: 'erreur'
    }
  }
}
</script>
```

### 5.3 Binding de styles inline

```vue
<template>
  <div>
    <!-- Objet de styles -->
    <div :style="{ color: couleur, fontSize: taille + 'px' }">
      Texte stylé
    </div>
    
    <!-- Depuis une propriété computed -->
    <div :style="stylesCalcules">Texte</div>
    
    <!-- Tableau de styles (merge) -->
    <div :style="[styleBase, styleSupplementaire]">
      Texte
    </div>
    
    <!-- Préfixes automatiques -->
    <div :style="{ transform: 'rotate(45deg)' }">
      Rotation (préfixe auto ajouté si nécessaire)
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      couleur: 'red',
      taille: 16,
      styleBase: {
        color: 'blue',
        fontWeight: 'bold'
      },
      styleSupplementaire: {
        fontSize: '20px'
      }
    }
  },
  computed: {
    stylesCalcules() {
      return {
        color: this.couleur,
        fontSize: this.taille + 'px',
        backgroundColor: this.estActif ? 'green' : 'gray'
      }
    }
  }
}
</script>
```

---

## 6. Bonnes Pratiques

### 6.1 Directives conditionnelles

```javascript
// ✅ BON : Utiliser computed pour logique complexe
computed: {
  afficherElement() {
    return this.user && this.user.actif && this.user.premium;
  }
}

// ❌ MAUVAIS : Logique complexe dans le template
<div v-if="user && user.actif && user.premium">...</div>
```

### 6.2 v-for

```javascript
// ✅ BON : Utiliser computed pour filtrage/tri
computed: {
  produitsActifs() {
    return this.produits.filter(p => p.actif);
  }
}

// ❌ MAUVAIS : v-if avec v-for
<li v-for="p in produits" v-if="p.actif">
```

### 6.3 Événements

```javascript
// ✅ BON : Logique dans les méthodes
methods: {
  soumettre(event) {
    event.preventDefault();
    // Logique...
  }
}

// ✅ MIEUX : Utiliser modificateurs
<form @submit.prevent="soumettre">
```

---

## 📝 Résumé du Module 3

Vous avez appris :
- ✅ Utilisation d’un projet Vue avec Vite pour ce module (SFC)
- ✅ Directives conditionnelles (v-if, v-else, v-show)
- ✅ Boucles avec v-for et importance de :key
- ✅ Gestion des événements avec @ et modificateurs
- ✅ Binding bidirectionnel avec v-model
- ✅ Classes et styles dynamiques

## 🎯 Prochaines étapes

Dans le Module 4, vous apprendrez :
- Composition API (setup, ref, reactive)
- Hooks de cycle de vie avec Composition API
- Composables réutilisables
- Intégration avec APIs REST

---

**Passez maintenant aux exemples et exercices pratiques !** 🚀
