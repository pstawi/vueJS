<template>
  <div id="app">
    <h1>Compteur : {{ count }}</h1>
    <button @click="increment">Incrémenter</button>
    <button @click="reset">Réinitialiser</button>
  </div>

</template> 

<script setup>

 import { useCounterStore } from '../stores/counter'
  import { storeToRefs } from 'pinia';

  // instance store
  const counterStore = useCounterStore();
  // réactivité du store
  const {count, doubleCount} = storeToRefs(counterStore)
  // action du store
  const { increment, reset} = counterStore
</script>