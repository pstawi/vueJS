<template>
  <div class="app">
    <h1>Ma Todo List</h1>
    <TodoForm :on-add="ajouterTodo" />

    <TodoList
      :todos="todos"
      :on-toggle="toggleTodoParIndex"
      :on-delete="supprimerTodoParIndex"
    />

  </div>
</template>

<script>
import TodoForm from './components/TodoForm.vue'
import TodoList from './components/TodoList.vue'

export default {
  name: 'App',
  components: { TodoForm, TodoList },

  data() {
    return {
      todos: [
        { id: 1, texte: 'test1', complete: false },
        { id: 2, texte: 'test2', complete: true },
        { id: 3, texte: 'test3', complete: false }
      ]
    }
  },

  methods: {
    getNombreTotal() {
      return this.todos.length
    },
    getNombreCompletes() {
      return this.todos.filter(t => t.complete).length
    },
    getNombreRestantes() {
      return this.todos.filter(t => !t.complete).length
    },
    getPourcentageCompletion() {
      const total = this.getNombreTotal()
      const completes = this.getNombreCompletes()
      if (total === 0) return 0
      return Math.round((completes / total) * 100)
    },

    ajouterTodo(texte) {
      const texteNettoye = texte.trim()
      if (texteNettoye === '') {
        return
      }

      this.todos.push({
        id: Date.now(),
        texte: texteNettoye,
        complete: false
      })
    },

    // Utilisées par TodoList / TodoItem via un index
    toggleTodoParIndex(index) {
      const todo = this.todos[index]
      if (todo) {
        todo.complete = !todo.complete
      }
    },

    supprimerTodoParIndex(index) {
      this.todos.splice(index, 1)
    }
  }
}
</script>

<style scoped>
.app {
  max-width: 500px;
  margin: 24px auto;
  padding: 16px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  font-family: Arial, sans-serif;
}
h1 {
  text-align: center;
  margin-top: 0;
}
.stats {
  margin-top: 16px;
  padding-top: 8px;
  border-top: 1px solid #dddddd;
}
</style>

 