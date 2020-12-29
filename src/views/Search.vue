<template>
  <div class="">
    <header>
      <form @submit.prevent class="form-input">
        <label> seach your word</label>
        <input type="text" name="search" id="" required v-model="SEARCH" />

        <button @submit.prevent type="" class="btn" @click="searchedWord">
          SEARCH
        </button>
      </form>
    </header>
    <main class="search">
      <div v-for="(word, index) in filterWord" v-bind:key="index" class="card">
        <div class="card_title">
          <h3>{{ word.Word }}</h3>
           <span> {{ word.Synonyms }} </span>   
        </div>
        <hr>
        <div class="card_content" v-html="word.definition.slice(0,100)">
            
        </div>
        <router-link  v-bind:to="{name:'word' ,
         params:{
          Word :  word.Word,
          Origin :word.Origin,
          definition :word.definition,
          Synonyms :word.Synonyms,
          Willaya :word.Willaya,
           
           
           }}">See More</router-link>
      </div>
    </main>
  </div>
</template>

<script>

import  db from "../firebase/init";

export default {
  name: "Search",
  data : function() {
return {

      SEARCH : '' ,
      AllWords : [],
      filterWord : []

};
},
  methods: {
    searchedWord(){

var filterword = []
 this.AllWords.map(element => {

  if (element.Word.match(this.SEARCH) ||element.definition.match(this.SEARCH) || element.Synonyms.match(this.SEARCH) || element.Origin.match(this.SEARCH)) {
    filterword.push(element)
  }
  
});
this.filterWord = filterword ;
    }
 

    
  },
  mounted() {
    var Words = []
    db.collection("Words").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
        Words.push({
          'Word' :  doc.data().Word,
          'Origin' :doc.data().Origin,
          'definition' :doc.data().definition,
          'Synonyms' :doc.data().Synonyms,
          'Willaya' :doc.data().Willaya,
        })

    });
});
this.AllWords = Words
  },




  
}
</script>

<style scoped lang="scss">
header {
  width: 98vw;
  margin: 0 auto;
  display: flex;

  .form-input {
    display: flex;
    position: relative;
    flex-direction: column;
    margin: 3em auto;

    input {
      background-color: #ffffff00;
      border: none;
      border-bottom: 2px solid rgb(236, 236, 236);
      width: 18em;
      height: 46px;
      color: white;
      font-size: 1.5em;

      &:focus {
        offset: none;
        outline: none;
      }
    }
  }
}

.search {
  width: 100vw;
  display: flex;
  flex-direction: column;

  .card {
    font-weight: 500;
    margin: 1em auto;
    // background-color: #7c052d;
    background-color: #181818;
    color: #ffffff;
    padding: 1em;
    height: 190px;
    overflow: hidden;
    width: 70vw;
    border-radius: 5px;
    transition: 0.4s;
    box-shadow: 3px 3px 5px 2px #292929a8;

    &:hover {
      transform: scale(1.1, 1.1);
    }

    .card_content {
      width: 80%;
    }
  }
}
</style>
