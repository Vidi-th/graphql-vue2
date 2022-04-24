<template>
    <div class="Todo">
      <div class="form">
        <input type="text" v-model= "search" placeholder="todo-search" >
        <!-- <button @click="OnSearch"> Search Todo </button> -->
      </div>
      <!-- <div v-for="todo in todoList_by_pk" :key="todo.id">
        {{ todo.title }}
      </div> -->

      <ApolloQuery 
      :query="search!=''?(gql => gql`
        query MyQuery4($id: Int!) {
          todoList_by_pk(id: $id) {
            title
            id
          }
        }
      `) : (gql =>gql`query list{
          todoList{
            title
            id
          }
        }`)"
      
      :variables="searchComputed"
      >
      <template v-slot="{ result: { loading, error, data } }">
        <!-- Loading -->
        <div v-if="loading" class="loading apollo">Loading...</div>

        <!-- Error -->
        <div v-else-if="error" class="error apollo">An error occurred
          {{ error }}
        </div>

        <!-- Result -->
        <div v-else-if="data" class="result apollo">
          <div v-if="data.todoList_by_pk">{{ data.todoList_by_pk.title }}</div>
          <div v-else-if="data.todoList_by_pk == null && !data.todoList">{{ "Belum ada todo" }}</div>
          <div v-if="data.todoList">
            <div v-for="todo in data.todoList" :key="todo.id">
              {{ todo.title }}
            </div>
          </div>
        </div>

        <!-- No result -->
        <div v-else class="no-result apollo">No result :(</div>
      </template>
    </ApolloQuery>

      <!-- <div v-for="todo in todoListComputed" :key="todo.id">
        {{ todo.title }}
      </div> -->
      <hr>

      <ApolloMutation
        :mutation="gql => gql`
          mutation MyMutation($objects: [todoList_insert_input!] = {}) {
             insert_todoList(objects: $objects) {
               returning {
                 title
               }
             }
           }
        `"
        :variables="{
          objects: [{
            is_done: isDone,
            title: add,
            user_id: userId
          }]
        }"
      >
        <template v-slot="{ mutate, loading, error }">
          <div class="form2">
            <input type="text" v-model= "add" placeholder="todo-title" ><br>
            <select v-model="isDone" id="isDone">
              <option value="False">False</option>
              <option value="True">True</option>
            </select><br>
            <input type="text" v-model= "userId" placeholder="todo-user" ><br>
            <button :disabled="loading" @click="mutate()" value="tambah"> Add Todo </button>
          </div>
          
          <p v-if="error">An error occurred: {{ error }}</p>
        </template>
      </ApolloMutation>

    </div>
</template>

<script>
//import gql from 'graphql-tag'

export default {
  // apollo:{
  //   todoList_by_pk:{
  //     query: gql`query MyQuery4($id: Int!) {
  //       todoList_by_pk(id: $id) {
  //         title
  //       }
  //     }`,

  //     variables() {
  //       return {id: this.search}
  //     },
      
  //     update(data){
  //       return data
  //     }
  //   },
    
  //   todoList: gql`query list{
  //     todoList{
  //       title
  //     }
  //   }`,
  // },
  
  data: () => ({
    search: "",
    add: "",
    todoList: {},
    isDone:false,
    userId:"",
  }),

  methods:{
      // async onAdd() {
      //   const data = await this.$apollo.mutate({
      //     mutation: gql`
      //     mutation MyMutation($objects: [todoList_insert_input!] = {}) {
      //       insert_todoList(objects: $objects) {
      //         returning {
      //           title
      //         }
      //       }
      //     }`,

      //     variables: [{
      //         "is_done": true,
      //         "title": "Belajar IoT",
      //         "user_id": 1
      //       }],
      //   });
      // }
  },
  computed:{
    todoListComputed(){
      
      console.log(this.todoList_by_pk, "apa");
      if(this.search == "" || this.todoList_by_pk == null){
        return this.todoList;
      }
        return this.todoList_by_pk;
    },
    searchComputed(){
      console.log("Search computed :", this.search);
      if(this.search !== ""){
        return {id: this.search};
      }
      return {};
    }
  },
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