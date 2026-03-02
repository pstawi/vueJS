
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {

  // donnée du store
  state : () => ({
    count: 0
  }),

  // functionnalités du store
  getters: {
    doubleCount: (state) => state.count * 2
  },

  // actions du store
  actions: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    },
    reset() {
      this.count = 0
    }
  }


})
