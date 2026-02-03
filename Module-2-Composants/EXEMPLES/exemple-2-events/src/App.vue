<template>
  <div>
    <h1>🔢 Compteurs avec Événements</h1>
    <p style="text-align: center; color: #7f8c8d;">
      Communication Enfant → Parent via événements personnalisés
    </p>

    <div class="total-display">Total : {{ total }}</div>

    <div class="compteurs-container">
      <CompteurComponent
        nom="Compteur A"
        :valeur-initiale="10"
        @increment="gererIncrement"
        @decrement="gererDecrement"
        @reset="gererReset"
      />
      <CompteurComponent
        nom="Compteur B"
        :valeur-initiale="5"
        @increment="gererIncrement"
        @decrement="gererDecrement"
        @reset="gererReset"
      />
    </div>

    <div class="historique">
      <h3>📜 Historique</h3>
      <div
        v-for="(action, index) in historique"
        :key="index"
        class="historique-item"
      >
        {{ action }}
      </div>
      <p v-if="historique.length === 0" style="text-align: center; color: #7f8c8d;">
        Aucune action pour le moment
      </p>
    </div>
  </div>
</template>

<script>
import CompteurComponent from './components/CompteurComponent.vue'

export default {
  name: 'App',

  components: {
    CompteurComponent
  },

  data() {
    return {
      total: 15,
      historique: []
    }
  },

  methods: {
    gererIncrement(data) {
      this.total++
      this.ajouterHistorique(`➕ ${data.nom} incrémenté à ${data.valeur}`)
    },
    gererDecrement(data) {
      this.total--
      this.ajouterHistorique(`➖ ${data.nom} décrémenté à ${data.valeur}`)
    },
    gererReset(data) {
      this.ajouterHistorique(`🔄 ${data.nom} réinitialisé à ${data.valeur}`)
    },
    ajouterHistorique(message) {
      const timestamp = new Date().toLocaleTimeString('fr-FR')
      this.historique.unshift(`[${timestamp}] ${message}`)
      if (this.historique.length > 10) {
        this.historique.pop()
      }
    }
  }
}
</script>
