<template>
  <div>
    <div class="header">
      <h1>🛍️ Gestion de Boutique</h1>
      <p>Directives Vue.js & Gestion d'événements</p>
    </div>

    <!-- Section Formulaire -->
    <div class="section">
      <h2>➕ Ajouter un Produit</h2>

      <div v-if="messageValidation" :class="['alerte', typeMessage]">
        {{ messageValidation }}
      </div>

      <form @submit.prevent="ajouterProduit">
        <div class="form-group">
          <label>Nom du produit *</label>
          <input
            v-model.trim="nouveauProduit.nom"
            type="text"
            placeholder="Ex: Ordinateur Portable"
            @keyup.esc="reinitialiserFormulaire"
          >
        </div>

        <div class="form-group">
          <label>Prix (€) *</label>
          <input
            v-model.number="nouveauProduit.prix"
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
          >
        </div>

        <div class="form-group">
          <label>Catégorie *</label>
          <select v-model="nouveauProduit.categorie">
            <option value="">Choisir une catégorie</option>
            <option value="Informatique">Informatique</option>
            <option value="Téléphonie">Téléphonie</option>
            <option value="Audio">Audio</option>
            <option value="Accessoires">Accessoires</option>
          </select>
        </div>

        <div class="form-group">
          <label>
            <input v-model="nouveauProduit.enStock" type="checkbox">
            En stock
          </label>
        </div>

        <button type="submit" :disabled="!formulaireValide">
          ➕ Ajouter le produit
        </button>
        <button
          type="button"
          style="margin-left: 10px; background: #95a5a6;"
          @click="reinitialiserFormulaire"
        >
          🔄 Réinitialiser
        </button>
      </form>
    </div>

    <!-- Section Filtres -->
    <div class="section">
      <h2>🔍 Filtres</h2>

      <div class="filtres">
        <button
          :class="['filtre-btn', { actif: filtreCategorie === '' }]"
          @click="filtreCategorie = ''"
        >
          Toutes
        </button>
        <button
          v-for="cat in categories"
          :key="cat"
          :class="['filtre-btn', { actif: filtreCategorie === cat }]"
          @click="filtreCategorie = cat"
        >
          {{ cat }}
        </button>
      </div>

      <div class="filtres">
        <button
          :class="['filtre-btn', { actif: filtreStock === 'tous' }]"
          @click="filtreStock = 'tous'"
        >
          Tous les stocks
        </button>
        <button
          :class="['filtre-btn', { actif: filtreStock === 'disponible' }]"
          @click="filtreStock = 'disponible'"
        >
          En stock uniquement
        </button>
        <button
          :class="['filtre-btn', { actif: filtreStock === 'rupture' }]"
          @click="filtreStock = 'rupture'"
        >
          En rupture
        </button>
      </div>
    </div>

    <!-- Section Produits -->
    <div class="section">
      <h2>📦 Catalogue ({{ produitsFiltres.length }} produits)</h2>

      <div v-if="produitsFiltres.length === 0" class="alerte info">
        Aucun produit ne correspond aux critères sélectionnés.
      </div>

      <div v-else class="produits-grid">
        <div
          v-for="(produit, index) in produitsFiltres"
          :key="produit.id"
          :class="['produit-card', produit.enStock ? 'en-stock' : 'rupture']"
        >
          <div class="produit-nom">{{ produit.nom }}</div>
          <div class="produit-prix">{{ produit.prix.toFixed(2) }} €</div>
          <div style="margin: 10px 0;">
            <span :class="['badge', produit.enStock ? 'disponible' : 'rupture']">
              {{ produit.enStock ? '✓ En stock' : '✗ Rupture' }}
            </span>
          </div>
          <div style="font-size: 14px; color: #7f8c8d;">
            {{ produit.categorie }}
          </div>
          <button
            style="margin-top: 10px; background: #e74c3c; font-size: 14px; padding: 8px 16px;"
            @click="supprimerProduit(index)"
          >
            🗑️ Supprimer
          </button>
        </div>
      </div>
    </div>

    <!-- Section Statistiques -->
    <div class="section">
      <h2>📊 Statistiques</h2>

      <div class="stats">
        <div class="stat-box">
          <div class="stat-valeur">{{ nombreProduits }}</div>
          <div class="stat-label">Produits</div>
        </div>
        <div class="stat-box">
          <div class="stat-valeur">{{ nombreEnStock }}</div>
          <div class="stat-label">En stock</div>
        </div>
        <div class="stat-box">
          <div class="stat-valeur">{{ nombreRupture }}</div>
          <div class="stat-label">Rupture</div>
        </div>
        <div class="stat-box">
          <div class="stat-valeur">{{ prixMoyen.toFixed(2) }} €</div>
          <div class="stat-label">Prix moyen</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',

  data() {
    return {
      produits: [
        { id: 1, nom: 'MacBook Pro', prix: 1999, categorie: 'Informatique', enStock: true },
        { id: 2, nom: 'iPhone 15', prix: 999, categorie: 'Téléphonie', enStock: true },
        { id: 3, nom: 'AirPods Pro', prix: 279, categorie: 'Audio', enStock: false },
        { id: 4, nom: 'iPad Air', prix: 699, categorie: 'Informatique', enStock: true }
      ],
      nouveauProduit: {
        nom: '',
        prix: 0,
        categorie: '',
        enStock: true
      },
      filtreCategorie: '',
      filtreStock: 'tous',
      messageValidation: '',
      typeMessage: 'info'
    }
  },

  computed: {
    categories() {
      return [...new Set(this.produits.map(p => p.categorie))]
    },
    produitsFiltres() {
      return this.produits.filter(p => {
        const matchCategorie = !this.filtreCategorie || p.categorie === this.filtreCategorie
        let matchStock = true
        if (this.filtreStock === 'disponible') {
          matchStock = p.enStock
        } else if (this.filtreStock === 'rupture') {
          matchStock = !p.enStock
        }
        return matchCategorie && matchStock
      })
    },
    formulaireValide() {
      return (
        this.nouveauProduit.nom.trim() !== '' &&
        this.nouveauProduit.prix > 0 &&
        this.nouveauProduit.categorie !== ''
      )
    },
    nombreProduits() {
      return this.produits.length
    },
    nombreEnStock() {
      return this.produits.filter(p => p.enStock).length
    },
    nombreRupture() {
      return this.produits.filter(p => !p.enStock).length
    },
    prixMoyen() {
      if (this.produits.length === 0) return 0
      const total = this.produits.reduce((sum, p) => sum + p.prix, 0)
      return total / this.produits.length
    }
  },

  methods: {
    ajouterProduit() {
      if (!this.formulaireValide) {
        this.afficherMessage('Veuillez remplir tous les champs requis', 'erreur')
        return
      }
      this.produits.push({
        id: Date.now(),
        ...this.nouveauProduit
      })
      this.afficherMessage(
        `✓ Produit "${this.nouveauProduit.nom}" ajouté avec succès`,
        'succes'
      )
      this.reinitialiserFormulaire()
    },
    supprimerProduit(index) {
      const produit = this.produitsFiltres[index]
      const indexReel = this.produits.findIndex(p => p.id === produit.id)
      if (confirm(`Supprimer "${produit.nom}" ?`)) {
        this.produits.splice(indexReel, 1)
        this.afficherMessage('✓ Produit supprimé', 'info')
      }
    },
    reinitialiserFormulaire() {
      this.nouveauProduit = {
        nom: '',
        prix: 0,
        categorie: '',
        enStock: true
      }
      this.messageValidation = ''
    },
    afficherMessage(message, type) {
      this.messageValidation = message
      this.typeMessage = type
      setTimeout(() => {
        this.messageValidation = ''
      }, 3000)
    }
  }
}
</script>
