<template>
  <div>
    <h1>🛒 Panier d'Achat - Computed & Watchers</h1>

    <!-- Section 1 : Recherche et Filtrage (Computed) -->
    <div class="section">
      <h2>🔍 Recherche de Produits</h2>
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

    <!-- Section 2 : Statistiques (Computed) -->
    <div class="section">
      <h2>📊 Statistiques du Panier</h2>

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

    <!-- Section 3 : Observateur (Watcher) -->
    <div class="section">
      <h2>👁️ Surveillance des Prix (Watcher)</h2>
      <p>
        <label>Seuil d'alerte : </label>
        <input
          v-model.number="seuilAlerte"
          type="number"
          style="width: 100px;"
        > €
      </p>
      <p style="color: #7f8c8d; font-size: 14px;">
        Vous serez alerté si le total TTC dépasse ce montant
      </p>

      <div class="log">
        <div
          v-for="(log, index) in logs"
          :key="index"
          class="log-item"
        >
          {{ log }}
        </div>
      </div>

      <button @click="ajouterProduitAleatoire">
        ➕ Ajouter un produit aléatoire
      </button>
      <button @click="viderPanier">
        🗑️ Vider le panier
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
      seuilAlerte: 100,
      tauxTVA: 0.20,
      logs: ['📝 Système de surveillance initialisé'],
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
    produitsFiltres() {
      if (!this.recherche) return this.produits
      const terme = this.recherche.toLowerCase()
      return this.produits.filter(
        p =>
          p.nom.toLowerCase().includes(terme) ||
          p.categorie.toLowerCase().includes(terme)
      )
    },
    nombreProduits() {
      return this.produits.length
    },
    quantiteTotale() {
      return this.produits.reduce((sum, p) => sum + p.quantite, 0)
    },
    totalHT() {
      return this.produits.reduce((sum, p) => sum + p.prix * p.quantite, 0)
    },
    totalTTC() {
      return this.totalHT * (1 + this.tauxTVA)
    },
    categoriesPresentes() {
      return [...new Set(this.produits.map(p => p.categorie))]
    },
    messageRemise() {
      if (this.totalTTC >= 5000) {
        return '🎉 Félicitations ! Vous bénéficiez de 20% de remise !'
      }
      if (this.totalTTC >= 3000) {
        return '✨ Vous bénéficiez de 10% de remise !'
      }
      if (this.totalTTC >= 1000) {
        return '👍 Livraison gratuite !'
      }
      return `Encore ${(1000 - this.totalTTC).toFixed(2)} € pour la livraison gratuite`
    }
  },

  watch: {
    totalTTC: {
      handler(nouveau, ancien) {
        const timestamp = new Date().toLocaleTimeString('fr-FR')

        if (ancien !== undefined) {
          this.logs.unshift(
            `[${timestamp}] Total TTC: ${ancien.toFixed(2)} € → ${nouveau.toFixed(2)} €`
          )
        }

        if (nouveau > this.seuilAlerte && ancien <= this.seuilAlerte) {
          this.logs.unshift(
            `[${timestamp}] ⚠️ ALERTE : Seuil de ${this.seuilAlerte} € dépassé !`
          )
          alert(
            `⚠️ Attention ! Le montant total (${nouveau.toFixed(2)} €) dépasse le seuil d'alerte (${this.seuilAlerte} €)`
          )
        }

        if (this.logs.length > 20) {
          this.logs.pop()
        }
      },
      immediate: false
    },
    seuilAlerte(nouveau) {
      const timestamp = new Date().toLocaleTimeString('fr-FR')
      this.logs.unshift(`[${timestamp}] 🔔 Seuil d'alerte modifié : ${nouveau} €`)
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
      if (confirm('Êtes-vous sûr de vouloir vider le panier ?')) {
        this.produits = []
        const timestamp = new Date().toLocaleTimeString('fr-FR')
        this.logs.unshift(`[${timestamp}] 🗑️ Panier vidé`)
      }
    }
  }
}
</script>
