<template>
  <div>
    <h1>Exemple 2 – Événements</h1>
    <p style="text-align: center; color: #7f8c8d;">
      Un composant enfant informe le parent de la nouvelle valeur du compteur.
    </p>

    <div class="total-display">Valeur du compteur : {{ valeurCompteur }}</div>

    <div class="compteurs-container">
      <CompteurComponent
        nom="Compteur principal"
        :valeur-initiale="0"
        @update="mettreAJourValeur"
      />
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
      valeurCompteur: 0
    }
  },

  methods: {
    mettreAJourValeur(nouvelleValeur) {
      this.valeurCompteur = nouvelleValeur
    }
  }
}
</script>
