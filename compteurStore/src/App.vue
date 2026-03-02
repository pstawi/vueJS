<template>

  <div>
    <h1>compteur</h1>

    <p>Valeur compteur : {{ count }}</p>

    <br>
   <CompteurView />

    <p>
      valeur double : {{ doubleCount }}
    </p>

    <br>

    <button @click="increment"> +1 </button>
    <button @click="reset"> reset</button>

  </div>
  </template>

  <script setup>
  
  import { useCounterStore } from './stores/counter'
  import { storeToRefs } from 'pinia';
  import CompteurView from './components/CompteurView.vue'

  // instance store
  const counterStore = useCounterStore();
  // réactivité du store
  const {count, doubleCount} = storeToRefs(counterStore)
  // action du store
  const { increment, reset} = counterStore

  </script>