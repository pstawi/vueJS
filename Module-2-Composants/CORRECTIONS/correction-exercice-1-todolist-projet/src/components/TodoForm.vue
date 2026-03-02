<template>
  <form @submit.prevent="soumettre" class="todo-form">
    <input
      v-model="nouveauTodo"
      type="text"
      placeholder="Ajouter une tâche"
    >
    <button type="submit">Ajouter</button>
  </form>
</template>

<script>
export default {
  name: 'TodoForm',

  props: {
    onAdd: {
      type: Function,
      required: true
    }
  },

  data() {
    return {
      nouveauTodo: ''
    }
  },

  methods: {
    soumettre() {
      const texte = this.nouveauTodo.trim()
      if (texte === '') {
        return
      }
      this.onAdd(texte)
      this.nouveauTodo = ''
    }
  }
}
</script>

<style scoped>
.todo-form {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}
input {
  flex: 1;
  padding: 6px;
  border: 1px solid #cccccc;
  border-radius: 3px;
  font-size: 14px;
}
button {
  padding: 6px 12px;
  border: 1px solid #cccccc;
  border-radius: 3px;
  background-color: #ffffff;
  cursor: pointer;
  font-size: 14px;
}
</style>

