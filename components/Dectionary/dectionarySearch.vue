<template>
  <form class="search-form">
    <input
      type="text"
      name=""
      v-model="search"
      class="search"
      placeholder="Type an algerian word 🧙‍"
    />
    <ul class="suggestions">
      <li v-if="!filteredList || search ==''">Here you will find all the words our users added</li>
      <li v-else v-for="(word,i) in filteredList" :key="i" > {{word}}</li>
    </ul>
  </form>
</template>

<script>
export default {
   data() {return{
     search:'',
    allwords: [
      'madjid','smail', 'chakib', 'chakib', 'chakib', 'chakib', 'chakib', 'chakib', 'chakib', 'chakib', 'chakib', 'chakib', 'chakib', 'chakib', 'chakib' 

    ],
    word :[],
  }
  }, 
  computed: {
    filteredList() {
      if(!this.search) return []
      return this.allwords.filter(word => word.toString().toLowerCase().includes(this.search.toString().toLowerCase()))
    }
  }

};



</script>

<style>
</style>