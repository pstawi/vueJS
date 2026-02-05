<template>
  <li class="todo-item">
    <span
      :class="{ complete: todo.complete }"
      @click="handleToggle"
    >
      {{ todo.texte }}
    </span>
    <button @click="handleDelete">Supprimer</button>
  </li>
</template>

<script>
export default {
  name: 'TodoItem',

  props: {
    todo: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
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
    handleToggle() {
      this.onToggle(this.index)
    },
    handleDelete() {
      this.onDelete(this.index)
    }
  }
}
</script>

<style scoped>
.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
  border-bottom: 1px solid #eeeeee;
}
span {
  cursor: pointer;
}
span.complete {
  text-decoration: line-through;
  color: #888888;
}
button {
  padding: 4px 8px;
  border: 1px solid #cccccc;
  border-radius: 3px;
  background-color: #ffffff;
  cursor: pointer;
  font-size: 12px;
}
</style>

