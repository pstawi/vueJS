<template>
  <div class="compteur">
    <div class="compteur-nom">{{ nom }}</div>
    <div class="compteur-valeur">{{ compteur }}</div>
    <div class="compteur-boutons">
      <button @click="decrementer" class="btn-decrement">➖</button>
      <button @click="incrementer" class="btn-increment">➕</button>
    </div>
    <button @click="reinitialiser" class="btn-reset">🔄 Réinitialiser</button>
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

  emits: ['increment', 'decrement', 'reset'],

  data() {
    return {
      compteur: this.valeurInitiale
    }
  },

  methods: {
    incrementer() {
      this.compteur++
      this.$emit('increment', {
        nom: this.nom,
        valeur: this.compteur
      })
    },
    decrementer() {
      this.compteur--
      this.$emit('decrement', {
        nom: this.nom,
        valeur: this.compteur
      })
    },
    reinitialiser() {
      this.compteur = this.valeurInitiale
      this.$emit('reset', {
        nom: this.nom,
        valeur: this.compteur
      })
    }
  }
}
</script>

<style scoped>
.compteur {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
  padding: 30px;
  text-align: center;
  color: white;
  min-width: 200px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.compteur-nom {
  font-size: 18px;
  margin-bottom: 15px;
  opacity: 0.9;
}

.compteur-valeur {
  font-size: 42px;
  font-weight: bold;
  margin: 20px 0;
}

.compteur-boutons {
  display: flex;
  gap: 10px;
  justify-content: center;
}

button {
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: bold;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.btn-increment {
  background-color: #2ecc71;
  color: white;
}

.btn-decrement {
  background-color: #e74c3c;
  color: white;
}

.btn-reset {
  background-color: #95a5a6;
  color: white;
  width: 100%;
  margin-top: 10px;
}
</style>
