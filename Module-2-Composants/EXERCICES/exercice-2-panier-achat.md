# Exercice 2 : Panier d'Achat avec Computed

## 🎯 Objectif
Créer un panier d'achat avec calculs automatiques utilisant les propriétés computed.

## 🛠️ Contexte (projet build)
Réalisez cet exercice dans un **projet Vue avec Vite** (voir section 0 du cours). Vous pouvez étendre le projet du module 2 ou en créer un nouveau. Utilisez des Single File Components (`.vue`) dans `src/components/` si vous découpez en composants (ex. ProductCard, CartItem), ou tout dans `App.vue` pour une première version.

## 📋 Consignes

Créez une application de panier d'achat avec :

### Fonctionnalités principales :

1. **Liste de produits disponibles**
   - Affichage des produits avec nom, prix, image
   - Bouton "Ajouter au panier"

2. **Panier**
   - Affichage des produits ajoutés
   - Quantité modifiable (+ / -)
   - Bouton de suppression
   - Calculs automatiques (sous-total, TVA, total)

3. **Statistiques (Computed)**
   - Nombre d'articles dans le panier
   - Sous-total HT
   - Montant de la TVA (20%)
   - Total TTC
   - Prix moyen par article

### Structure de données :

```javascript
data() {
  return {
    produitsCatalogue: [
      { id: 1, nom: 'Ordinateur Portable', prix: 999, image: 'url' },
      { id: 2, nom: 'Souris Sans Fil', prix: 29, image: 'url' },
      { id: 3, nom: 'Clavier Mécanique', prix: 149, image: 'url' },
      { id: 4, nom: 'Écran 27 pouces', prix: 349, image: 'url' }
    ],
    panier: [
      // { produit: {...}, quantite: 2 }
    ],
    tauxTVA: 0.20
  }
}
```

### Propriétés Computed à créer :

```javascript
computed: {
  // Nombre total d'articles
  nombreArticles() {
    // Somme des quantités
  },
  
  // Sous-total HT
  sousTotal() {
    // Somme de (prix × quantité) pour chaque produit
  },
  
  // Montant TVA
  montantTVA() {
    // sousTotal × tauxTVA
  },
  
  // Total TTC
  totalTTC() {
    // sousTotal + montantTVA
  },
  
  // Prix moyen
  prixMoyen() {
    // totalTTC / nombreArticles
  },
  
  // Le panier est vide ?
  panierVide() {
    // panier.length === 0
  }
}
```

### Méthodes à implémenter :

```javascript
methods: {
  ajouterAuPanier(produit) {
    // Vérifier si le produit est déjà dans le panier
    // Si oui, augmenter la quantité
    // Sinon, l'ajouter avec quantité = 1
  },
  
  augmenterQuantite(index) {
    // Incrémenter la quantité
  },
  
  diminuerQuantite(index) {
    // Décrémenter la quantité
    // Si quantité = 0, supprimer du panier
  },
  
  supprimerDuPanier(index) {
    // Retirer le produit du panier
  },
  
  viderPanier() {
    // Vider complètement le panier
  }
}
```

## 💡 Indices

**Ajouter au panier :**
```javascript
ajouterAuPanier(produit) {
  const existe = this.panier.find(item => item.produit.id === produit.id);
  if (existe) {
    existe.quantite++;
  } else {
    this.panier.push({
      produit: { ...produit },
      quantite: 1
    });
  }
}
```

**Sous-total :**
```javascript
sousTotal() {
  return this.panier.reduce((sum, item) => {
    return sum + (item.produit.prix * item.quantite);
  }, 0);
}
```

## ✅ Critères de réussite

- [ ] Affichage du catalogue de produits
- [ ] Ajout au panier fonctionne
- [ ] Modification des quantités fonctionne (+ / -)
- [ ] Suppression d'un produit fonctionne
- [ ] Tous les calculs (computed) sont corrects
- [ ] Le panier se vide complètement
- [ ] Style professionnel et responsive
- [ ] (Bonus) Badge avec nombre d'articles sur l'icône panier
- [ ] (Bonus) Animation lors de l'ajout au panier
- [ ] (Bonus) Message si le panier est vide
- [ ] (Bonus) Remise automatique si total > 500€

## 📝 Exemple de résultat attendu

```
┌──────────────────────────────────────┐
│      🛍️ Boutique en Ligne            │
├──────────────────────────────────────┤
│ CATALOGUE                            │
│ ┌───────────┬───────────┬────────┐  │
│ │ Produit 1 │ Produit 2 │ Prod 3 │  │
│ │ 999 €     │ 29 €      │ 149 €  │  │
│ │ [Ajouter] │ [Ajouter] │ [Add]  │  │
│ └───────────┴───────────┴────────┘  │
├──────────────────────────────────────┤
│ 🛒 PANIER (3 articles)               │
│                                      │
│ Ordinateur × 1 ..... 999.00 €       │
│        [−] [+] [🗑️]                  │
│                                      │
│ Souris × 2 ........... 58.00 €      │
│        [−] [+] [🗑️]                  │
├──────────────────────────────────────┤
│ Sous-total HT ...... 1057.00 €      │
│ TVA (20%) ........... 211.40 €      │
│ ───────────────────────────────      │
│ TOTAL TTC .......... 1268.40 €      │
│                                      │
│ [Vider le panier]                    │
└──────────────────────────────────────┘
```

## ⏱️ Temps estimé
2h - 2h30

---

**Challenge** : Essayez de rendre l'interface vraiment belle et intuitive !

Une fois terminé, consultez le fichier de correction pour comparer votre solution.
