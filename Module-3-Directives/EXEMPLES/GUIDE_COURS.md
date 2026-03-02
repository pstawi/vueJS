# 🎓 Guide d'Utilisation en Cours - Gestion de Boutique (Module 3)

## 📝 Vue d'Ensemble du Projet

Ce projet **Gestion de Boutique** démontre **toutes les notions** du Module 3 (Directives et Événements) dans un contexte concret :

✅ Directives conditionnelles (`v-if`, `v-else`)  
✅ Boucles avec `v-for` et `:key`  
✅ Gestion des événements (`@click`, `@submit.prevent`, `@keyup.esc`)  
✅ Binding bidirectionnel `v-model` (texte, nombre, select, checkbox)  
✅ Modificateurs de v-model (`.trim`, `.number`)  
✅ Classes dynamiques (`:class` avec objet et tableau)  
✅ Propriétés calculées (`computed`) pour filtres et stats  

---

## 🎯 Scénario de Démonstration en Cours

### Phase 1 : Formulaire et v-model (20 min)

**Ce que vous montrez :**

1. **Lancer le projet**
   ```bash
   cd Module-3-Directives/EXEMPLES/exemple-complet
   npm install
   npm run dev
   ```

2. **Page d'accueil** (http://localhost:5173/)
   - Présenter les 4 sections : Formulaire, Filtres, Catalogue, Statistiques
   - Montrer le formulaire "Ajouter un Produit"

3. **v-model sur les champs**
   - Remplir le formulaire (nom, prix, catégorie, case "En stock")
   - **Point clé** : Les données sont liées en temps réel
   - Montrer les modificateurs `.trim` et `.number` dans le code

4. **Validation et @submit.prevent**
   - Tenter de soumettre sans remplir → bouton désactivé (`:disabled="!formulaireValide"`)
   - Remplir correctement et soumettre → pas de rechargement de page grâce à `@submit.prevent`

**Code à montrer :**

```vue
<!-- Champs avec v-model -->
<input v-model.trim="nouveauProduit.nom" type="text" placeholder="Ex: Ordinateur Portable">
<input v-model.number="nouveauProduit.prix" type="number" min="0" step="0.01">
<select v-model="nouveauProduit.categorie">...</select>
<input v-model="nouveauProduit.enStock" type="checkbox"> En stock
```

```vue
<!-- Soumission sans rechargement -->
<form @submit.prevent="ajouterProduit">
  <button type="submit" :disabled="!formulaireValide">➕ Ajouter le produit</button>
</form>
```

```javascript
// computed pour la validation
formulaireValide() {
  return (
    this.nouveauProduit.nom.trim() !== '' &&
    this.nouveauProduit.prix > 0 &&
    this.nouveauProduit.categorie !== ''
  )
}
```

### Phase 2 : Messages conditionnels (v-if) et modificateur clavier (10 min)

**Ce que vous montrez :**

1. **Message de validation**
   - Ajouter un produit → message de succès affiché
   - **Observer** : Le bloc n'existe dans le DOM que quand `messageValidation` est rempli

2. **Ouvrir App.vue**
   - Montrer `v-if="messageValidation"` sur le div d'alerte
   - Expliquer la différence avec `v-show` (ici v-if convient car condition peu fréquente)

3. **Modificateur @keyup.esc**
   - Focus dans le champ "Nom", taper du texte, appuyer sur **Echap**
   - **Observer** : Le formulaire se réinitialise

**Code à montrer :**

```vue
<div v-if="messageValidation" :class="['alerte', typeMessage]">
  {{ messageValidation }}
</div>
```

```vue
<input
  v-model.trim="nouveauProduit.nom"
  @keyup.esc="reinitialiserFormulaire"
>
```

### Phase 3 : Filtres et classes dynamiques (15 min)

**Ce que vous montrez :**

1. **Boutons de filtre par catégorie**
   - Cliquer sur "Informatique", "Téléphonie", etc.
   - **Observer** : La liste des produits se met à jour, le bouton actif change de style

2. **v-for sur les catégories**
   - Les catégories sont déduites des produits existants via un `computed`
   - Montrer `v-for="cat in categories"` avec `:key="cat"`

3. **Classes dynamiques**
   - Montrer `:class="['filtre-btn', { actif: filtreCategorie === cat }]"`
   - Expliquer : classe fixe + classe conditionnelle (objet)

4. **Filtre par stock**
   - "En stock uniquement" / "En rupture" → même principe avec `filtreStock`

**Code à montrer :**

```vue
<button
  v-for="cat in categories"
  :key="cat"
  :class="['filtre-btn', { actif: filtreCategorie === cat }]"
  @click="filtreCategorie = cat"
>
  {{ cat }}
</button>
```

```javascript
computed: {
  categories() {
    return [...new Set(this.produits.map(p => p.categorie))]
  },
  produitsFiltres() {
    return this.produits.filter(p => {
      const matchCategorie = !this.filtreCategorie || p.categorie === this.filtreCategorie
      let matchStock = true
      if (this.filtreStock === 'disponible') matchStock = p.enStock
      else if (this.filtreStock === 'rupture') matchStock = !p.enStock
      return matchCategorie && matchStock
    })
  }
}
```

### Phase 4 : Liste des produits (v-for, :key, v-if / v-else) (15 min)

**Ce que vous montrez :**

1. **Catalogue vide**
   - Activer un filtre qui ne correspond à aucun produit (ex. "En rupture" si tous en stock)
   - **Observer** : Message "Aucun produit ne correspond aux critères" (v-else)

2. **Cartes produits**
   - Montrer `v-for="(produit, index) in produitsFiltres"` avec `:key="produit.id"`
   - **Insister** : Toujours utiliser une `:key` unique (id), pas l'index quand la liste change

3. **Classes selon le stock**
   - `:class="['produit-card', produit.enStock ? 'en-stock' : 'rupture']"`
   - Badge vert "En stock" / rouge "Rupture"

4. **Suppression avec @click**
   - Bouton "Supprimer" → `@click="supprimerProduit(index)"`
   - Rappeler l'usage de `confirm()` et la modification réactive du tableau

**Code à montrer :**

```vue
<div v-if="produitsFiltres.length === 0" class="alerte info">
  Aucun produit ne correspond aux critères sélectionnés.
</div>
<div v-else class="produits-grid">
  <div
    v-for="(produit, index) in produitsFiltres"
    :key="produit.id"
    :class="['produit-card', produit.enStock ? 'en-stock' : 'rupture']"
  >
    <span :class="['badge', produit.enStock ? 'disponible' : 'rupture']">
      {{ produit.enStock ? '✓ En stock' : '✗ Rupture' }}
    </span>
    <button @click="supprimerProduit(index)">🗑️ Supprimer</button>
  </div>
</div>
```

### Phase 5 : Statistiques (computed) (10 min)

**Ce que vous montrez :**

1. **Bloc Statistiques**
   - Nombre de produits, en stock, en rupture, prix moyen
   - Tous calculés via des **computed** qui se mettent à jour automatiquement

2. **Lien avec les données**
   - Ajouter ou supprimer un produit → les stats se mettent à jour sans code supplémentaire
   - Montrer `nombreProduits`, `nombreEnStock`, `prixMoyen` dans le script

**Code à montrer :**

```javascript
computed: {
  nombreProduits() {
    return this.produits.length
  },
  nombreEnStock() {
    return this.produits.filter(p => p.enStock).length
  },
  prixMoyen() {
    if (this.produits.length === 0) return 0
    return this.produits.reduce((sum, p) => sum + p.prix, 0) / this.produits.length
  }
}
```

---

## 🔍 Points à Approfondir

### 1. v-if vs v-show

**Rappel :**
- `v-if` : élément ajouté/supprimé du DOM (ici pour le message d'alerte)
- `v-show` : élément toujours dans le DOM, affiché avec `display: none` si faux

**Quand utiliser quoi dans ce projet ?**  
Le message de validation est éphémère → `v-if` évite de garder un nœud inutile.

### 2. Pourquoi :key avec un id et pas l'index ?

```vue
<!-- ✅ BON -->
<div v-for="(produit, index) in produitsFiltres" :key="produit.id">

<!-- ❌ Risqué si on supprime/ réordonne -->
<div v-for="(produit, index) in produitsFiltres" :key="index">
```

Avec un `id` stable, Vue réutilise correctement les nœuds et évite les bugs d’affichage ou d’état.

### 3. Modificateurs v-model

| Modificateur | Effet |
|--------------|--------|
| `.trim` | Supprime les espaces en début/fin |
| `.number` | Convertit la valeur en nombre |
| `.lazy` | Synchronise sur `change` au lieu de `input` |

Ici : `.trim` sur le nom, `.number` sur le prix pour éviter des chaînes "1999" au lieu de 1999.

### 4. Modificateurs d’événements utilisés

- `@submit.prevent` : empêche le rechargement du formulaire
- `@keyup.esc` : réinitialise au touche Echap

On pourrait ajouter `.stop` sur un bouton dans un formulaire si on ne voulait pas déclencher le submit.

---

## 💡 Exercices à Proposer aux Étudiants

### Exercice 1 : Champ recherche

"Ajoutez un champ de recherche par nom de produit qui filtre la liste en temps réel."

**Indice :**
- Ajouter `recherche: ''` dans `data`
- `v-model="recherche"` sur un `<input>`
- Dans `produitsFiltres`, ajouter un filtre sur `p.nom` (includes ou toLowerCase).

### Exercice 2 : Tri des produits

"Ajoutez des boutons pour trier par nom, par prix (croissant/décroissant)."

**Indice :**
```javascript
// data
ordreTri: 'nom', // ou 'prix'
sens: 'asc'     // ou 'desc'

// Dans produitsFiltres ou un nouveau computed produitsTries
return [...filtered].sort((a, b) => { ... })
```

### Exercice 3 : v-show pour les stats

"Utilisez v-show pour masquer le bloc Statistiques quand il n’y a aucun produit, au lieu de ne pas l’afficher du tout."

**Indice :** Comparer avec v-if et expliquer l’impact sur le DOM (inspecter l’élément).

### Exercice 4 : Modificateur .once

"Ajoutez un bouton 'Cacher le formulaire' qui ne peut être cliqué qu’une fois (puis désactivé)."

**Indice :** `@click.once="formulaireVisible = false"` et `v-show="formulaireVisible"` sur la section formulaire.

---

## 🎬 Déroulé de Cours Suggéré

### Introduction (10 min)
- Contexte : petite application de gestion de boutique
- Parcours rapide de l’interface (formulaire, filtres, catalogue, stats)
- Structure du projet (un seul composant App.vue pour ce module)

### Démonstration (45 min)
- Phase 1 : Formulaire et v-model (20 min)
- Phase 2 : v-if et @keyup.esc (10 min)
- Phase 3 : Filtres et :class (15 min)

### Pause (10 min)

### Suite Démonstration (25 min)
- Phase 4 : v-for, :key, v-if/v-else (15 min)
- Phase 5 : Statistiques et computed (10 min)

### Pratique Guidée (1h)
- Les étudiants modifient le projet (recherche, tri, petits ajouts)
- Exercices ci-dessus
- Support individuel

### Récapitulatif (10 min)
- v-if / v-else / v-show, v-for + :key, v-model, @ et modificateurs, :class
- Exercice à faire chez soi (ex. formulaire d’inscription du module)

**Durée totale : 2h10**

---

## 🔑 Concepts Clés à Insister

1. **v-model** = liaison bidirectionnelle (value + @input) ; utiliser les modificateurs selon le type de champ.
2. **v-if / v-else** pour afficher un bloc ou un autre selon une condition.
3. **v-for** toujours avec **:key** unique (id de préférence).
4. **computed** pour dériver des données (filtres, stats) et garder le template lisible.
5. **@submit.prevent** pour les formulaires sans rechargement.
6. **:class** avec tableau + objet pour combiner classes fixes et conditionnelles.

---

## 📊 Checklist Avant le Cours

- [ ] Projet testé et fonctionnel (`npm run dev`)
- [ ] Node.js installé (version 16+)
- [ ] Connexion internet disponible (pour npm install)
- [ ] Backup du projet sur clé USB
- [ ] Code projeté lisiblement
- [ ] Exemples de code (snippets) préparés pour chaque phase

---

## 🚀 Variantes pour Aller Plus Loin

### Variante 1 : Décomposition en composants
Extraire `FormulaireProduit.vue`, `ListeProduits.vue`, `Statistiques.vue` et faire remonter les données (props / emit) — transition vers le Module 2.

### Variante 2 : Persistance
Sauvegarder `produits` dans `localStorage` et le recharger au démarrage.

### Variante 3 : Édition d’un produit
Ajouter un bouton "Modifier" qui pré-remplit le formulaire et remplace le produit à la soumission.

---

Bon cours ! 👨‍🏫
