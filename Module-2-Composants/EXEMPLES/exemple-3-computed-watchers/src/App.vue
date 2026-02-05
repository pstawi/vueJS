<template>
  <div>
    <h1>Panier d'achat - Computed & Watchers</h1>

    <!-- Section 1 : Recherche et filtrage (computed) -->
    <div class="section">
      <h2>Recherche de produits</h2>
      <input
        v-model="recherche"
        type="text"
        placeholder="Rechercher un produit..."
      >
      <p>{{ produitsFiltres.length }} produit(s) trouvé(s)</p>

      <div
        v-for="produit in produitsFiltres"
        :key="produit.id"
        class="produit-item"
      >
        <div class="produit-info">
          <div class="produit-nom">{{ produit.nom }}</div>
          <div class="produit-prix">{{ produit.prix }} € × {{ produit.quantite }}</div>
        </div>
        <div class="produit-quantite">Qté: {{ produit.quantite }}</div>
      </div>
    </div>

    <!-- Section 2 : Statistiques (computed) -->
    <div class="section">
      <h2>Statistiques du panier</h2>

      <div class="stats">
        <div class="stat-box">
          <div class="stat-valeur">{{ nombreProduits }}</div>
          <div class="stat-label">Produits</div>
        </div>
        <div class="stat-box">
          <div class="stat-valeur">{{ quantiteTotale }}</div>
          <div class="stat-label">Articles</div>
        </div>
        <div class="stat-box">
          <div class="stat-valeur">{{ totalHT.toFixed(2) }} €</div>
          <div class="stat-label">Total HT</div>
        </div>
        <div class="stat-box">
          <div class="stat-valeur">{{ totalTTC.toFixed(2) }} €</div>
          <div class="stat-label">Total TTC</div>
        </div>
      </div>

      <div style="text-align: center; margin-top: 20px;">
        <div>
          <span
            v-for="cat in categoriesPresentes"
            :key="cat"
            class="badge"
          >{{ cat }}</span>
        </div>
        <p style="margin-top: 15px; color: #7f8c8d;">
          {{ messageRemise }}
        </p>
      </div>
    </div>

    <!-- Section 3 : Watcher simple -->
    <div class="section">
      <h2>Watcher sur le total TTC</h2>
      <p style="color: #7f8c8d; font-size: 14px;">
        Le message ci-dessous est mis à jour automatiquement quand le total TTC change.
      </p>

      <p><strong>Message :</strong> {{ alerteMessage }}</p>

      <button @click="ajouterProduitAleatoire">
        Ajouter un produit aléatoire
      </button>
      <button @click="viderPanier">
        Vider le panier
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',

  data() {
    return {
      recherche: '',
      tauxTVA: 0.20,
      alerteMessage: '',
      produits: [
        { id: 1, nom: 'MacBook Pro', prix: 1999, quantite: 1, categorie: 'Informatique' },
        { id: 2, nom: 'iPhone 15', prix: 999, quantite: 2, categorie: 'Téléphonie' },
        { id: 3, nom: 'AirPods Pro', prix: 279, quantite: 1, categorie: 'Audio' },
        { id: 4, nom: 'iPad Air', prix: 699, quantite: 1, categorie: 'Tablette' },
        { id: 5, nom: 'Apple Watch', prix: 449, quantite: 1, categorie: 'Montre' }
      ],
      produitsDisponibles: [
        { nom: 'Magic Mouse', prix: 89, categorie: 'Accessoire' },
        { nom: 'HomePod', prix: 329, categorie: 'Audio' },
        { nom: 'Apple TV', prix: 179, categorie: 'Multimédia' }
      ]
    }
  },

  computed: {
    // Propriété computed : retourne la liste des produits filtrés
    // en fonction du texte saisi dans le champ "recherche".
    // Elle est recalculée automatiquement quand `recherche` ou `produits` changent.
    produitsFiltres() {
      if (!this.recherche) return this.produits
      const terme = this.recherche.toLowerCase()
      return this.produits.filter(
        p =>
          p.nom.toLowerCase().includes(terme) ||
          p.categorie.toLowerCase().includes(terme)
      )
    },
    // Nombre de lignes dans le panier
    nombreProduits() {
      return this.produits.length
    },
    // Somme des quantités de tous les produits
    quantiteTotale() {
      return this.produits.reduce((sum, p) => sum + p.quantite, 0)
    },
    // Total hors taxes (HT)
    totalHT() {
      return this.produits.reduce((sum, p) => sum + p.prix * p.quantite, 0)
    },
    // Total toutes taxes comprises (TTC), dérivé de totalHT
    totalTTC() {
      return this.totalHT * (1 + this.tauxTVA)
    },
    // Liste des catégories différentes présentes dans le panier
    categoriesPresentes() {
      return [...new Set(this.produits.map(p => p.categorie))]
    },
    // Message affiché en fonction du montant total TTC
    messageRemise() {
      if (this.totalTTC >= 5000) {
        return 'Vous bénéficiez de 20 % de remise.'
      }
      if (this.totalTTC >= 3000) {
        return 'Vous bénéficiez de 10 % de remise.'
      }
      if (this.totalTTC >= 1000) {
        return 'Livraison gratuite.'
      }
      return `Encore ${(1000 - this.totalTTC).toFixed(2)} € pour la livraison gratuite.`
    }
  },

  watch: {
    // Watcher : exécute ce code à chaque fois que `totalTTC` change.
    // Ici, on ne retourne PAS de valeur, on met à jour `alerteMessage`
    // (effet de bord déclenché par le changement de `totalTTC`).
    totalTTC(nouveau) {
      if (nouveau === 0) {
        this.alerteMessage = 'Votre panier est vide.'
      } else if (nouveau < 100) {
        this.alerteMessage = 'Petit panier.'
      } else if (nouveau < 500) {
        this.alerteMessage = 'Panier moyen.'
      } else {
        this.alerteMessage = 'Panier important.'
      }
    }
  },

  methods: {
    ajouterProduitAleatoire() {
      const produitAleatoire =
        this.produitsDisponibles[
          Math.floor(Math.random() * this.produitsDisponibles.length)
        ]
      this.produits.push({
        id: Date.now(),
        nom: produitAleatoire.nom,
        prix: produitAleatoire.prix,
        quantite: 1,
        categorie: produitAleatoire.categorie
      })
    },
    viderPanier() {
      this.produits = []
    }
  }
}
</script>
