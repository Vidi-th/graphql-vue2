<template>
  <div>
    <h1>My Todo List</h1>
    <todo-list/>
    
  </div>
</template>

<script>
import TodoList from '@/components/TodoList.vue'

export default {
  name : "Todo",
  components : {
    TodoList
  },
}
</script>

<style>
/* body {
  padding-top: 1em;
  padding-bottom: 1em;
} */
</style>

