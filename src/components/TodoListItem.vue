<template>
  <div class="todoItem">
    <label v-if="!editMode">
        {{ data.title }}
    </label>
    <label v-if="editMode">
       <ApolloMutation
      :mutation="gql => gql`
        mutation MyMutation3($id: Int!, $title: String!) {
          update_todoList_by_pk(pk_columns: {id: $id}, _set: {title: $title}) {
            title
          }
        }
      `"
      :variables="{
        id: index,
        title: inputEdit
      }"
    >
      <template v-slot="{ mutate, error}">
      <!-- Error -->
      <div v-if="error" class="error apollo">An error occurred
        {{ error }}
      </div>

      <!-- Mutate -->
      <input v-model="inputEdit" />
      <button v-if="editMode" @click="mutate()  && editList()">Input Edit</button>
    </template>
    </ApolloMutation>
        
    </label>

    <ApolloMutation
      :mutation="gql => gql`
        mutation MyDelete($id: Int!) {
          delete_todoList_by_pk(id: $id) {
            title
            id
          }
        }
      `"
      :variables="{
        id: index
      }"
    >
      <template v-slot="{ mutate, error}">
      <!-- Error -->
      <div v-if="error" class="error apollo">An error occurred
        {{ error }}
      </div>

      <!-- Mutate -->
      <button @click="mutate()" class="tab">Hapus</button>
    </template>
    </ApolloMutation>
    
    <button v-if="!editMode" class="tab" @click="editList">Edit</button>

  </div>
</template>

<script>
export default {
  name: "TodoListItem",
  data() {
    return {
      inputEdit: "",
      inputEdited: "",
      editMode: false,
    };
  },
  props: {
    data: Object,
    index: Number,
  },
  methods: {
    hapusList(index) {
      this.$emit("hapus-todo", index);
    },

    editList() {
       this.editMode = !this.editMode;
    },

    editListBaru(index) {
      this.$emit("edit-list-baru", index, this.inputEdit);
      this.editList();
    },
  },
  computed:{
    
  }
};
</script>

<style>
.todoItem{
  display: flex;
}

button{
  tab-size: 2;
}

/* Style the tab */
.tab {
  overflow: hidden;
  border: 1px solid #ccc;
  background-color: #f1f1f1;
}

/* Style the buttons that are used to open the tab content */
.tab button {
  background-color: inherit;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;
}
</style>