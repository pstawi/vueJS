<template>
  <div class="compteur">
    <div class="compteur-nom">{{ nom }}</div>
    <div class="compteur-valeur">{{ compteur }}</div>
    <div class="compteur-boutons">
      <button @click="decrementer" class="btn-decrement">-</button>
      <button @click="incrementer" class="btn-increment">+</button>
    </div>
    <button @click="reinitialiser" class="btn-reset">Réinitialiser</button>
  </div>
</template>

<script>
export default {
  name: 'CompteurComponent',

  props: {
    nom: {
      type: String,
      required: true
    },
    valeurInitiale: {
      type: Number,
      default: 0
    }
  },

  emits: ['update'],

  data() {
    return {
      compteur: this.valeurInitiale
    }
  },

  methods: {
    incrementer() {
      this.compteur++
      this.$emit('update', this.compteur)
    },
    decrementer() {
      this.compteur--
      this.$emit('update', this.compteur)
    },
    reinitialiser() {
      this.compteur = this.valeurInitiale
      this.$emit('update', this.compteur)
    }
  }
}
</script>

<style scoped>
.compteur {
  border: 1px solid #dddddd;
  border-radius: 4px;
  padding: 16px;
  text-align: center;
  background-color: #f9f9f9;
  color: #333333;
  max-width: 220px;
}

.compteur-nom {
  font-size: 16px;
  margin-bottom: 8px;
}

.compteur-valeur {
  font-size: 28px;
  font-weight: bold;
  margin: 12px 0;
}

.compteur-boutons {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-bottom: 8px;
}

button {
  padding: 6px 12px;
  border-radius: 3px;
  border: 1px solid #cccccc;
  font-size: 14px;
  cursor: pointer;
  background-color: #ffffff;
}

.btn-reset {
  width: 100%;
  margin-top: 4px;
}
</style>
