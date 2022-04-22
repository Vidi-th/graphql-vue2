<template>
    <div class="Todo">
      <div class="form">
        <input type="text" v-model= "search" placeholder="todo-search" >
        <!-- <button @click="OnSearch"> Search Todo </button> -->
      </div>
      <div v-for="todo in todoList_by_pk" :key="todo.id">
        {{ todo.title }}
      </div>
    </div>
</template>

<script>
import gql from 'graphql-tag'
export default {
  apollo:{
    todoList_by_pk:{
      query: gql`query MyQuery4($id: Int!) {
        todoList_by_pk(id: $id) {
          title
        }
      }`,

      variables() {
        return {id: this.search}
      },
      
      update(data){
        return data
      }
    }, 
  },
  
  data: () => ({
    search: "",
  }),

}
</script>

<style scoped>
/* input{
  display: block;
  margin: auto;
  border-top-style: hidden;
  border-right-style: hidden;
  border-left-style: hidden;
  border-bottom-style: groove;
  outline: none;
  font-size: 1.3em;
  padding: 15px 0;
  text-align: center
}
.todo-form{
  margin-top: 30px;
}
.todo{
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
button {
  margin-top: 10px;
  padding:10px;
  background-color: rgb(180, 199, 211);
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-weight: bold;
  outline: none;
}

h3{
  margin: 0px;
  padding: 0px;
}
li{
  list-style-type: none;
  width: 50%;
  margin: auto;
  padding: 15px 0;
  background-color: rgb(216, 216, 216)
}
.content{
  flex:1;
}
i{
  cursor: pointer;
  color: red;
} */
</style>