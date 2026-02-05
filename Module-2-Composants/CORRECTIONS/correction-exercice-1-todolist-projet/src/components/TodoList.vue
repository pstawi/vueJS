<template>
  <ul class="todo-list">
    <TodoItem
      :todo="todo0()"
      :index="0"
      :on-toggle="onToggle"
      :on-delete="onDelete"
    />
    <TodoItem
      :todo="todo1()"
      :index="1"
      :on-toggle="onToggle"
      :on-delete="onDelete"
    />
    <TodoItem
      :todo="todo2()"
      :index="2"
      :on-toggle="onToggle"
      :on-delete="onDelete"
    />
  </ul>
</template>

<script>
import TodoItem from './TodoItem.vue'

export default {
  name: 'TodoList',
  components: { TodoItem },

  props: {
    todos: {
      type: Array,
      required: true
    },
    onToggle: {
      type: Function,
      required: true
    },
    onDelete: {
      type: Function,
      required: true
    }
  },

  methods: {
    todo0() {
      return this.todos[0] || { texte: '', complete: false }
    },
    todo1() {
      return this.todos[1] || { texte: '', complete: false }
    },
    todo2() {
      return this.todos[2] || { texte: '', complete: false }
    }
  }
}
</script>

<style scoped>
.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>