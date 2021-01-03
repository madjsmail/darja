<template>
  <div class="">
    <header>
      <form @submit.prevent class="form-input">
        <button @submit.prevent type="" class="btn" @click="searchedWord">
          SEARCH
        </button>
      </form>
    </header>
    <div class="spinner" v-if="louading">
      <div class="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <main class="search">
      <div v-if="feedback_search">
        <div class="feedback" v-if="filterWord.length == 0">
          <p>no results found</p>
        </div>

        <div class="feedback" v-if="filterWord.length != 0">
          <p>
            {{ filterWord.length }}
            results found
          </p>
        </div>
      </div>

      <div v-for="(word, index) in filterWord" v-bind:key="index" class="card">
        <div class="card_title">
          <h3>{{ word.Word }}</h3>
          <span> {{ word.Synonyms }} </span>
        </div>
        <hr />
        <div class="card_content" v-html="word.definition.slice(0, 100)"></div>
        <router-link
          v-bind:to="{
            name: 'word',
            params: {
              Word: word.Word,
            },
            query: { word: word.Word.toLowerCase().replace(/ /g, '') },
          }"
          >See More</router-link
        >
      </div>
    </main>
  </div>
</template>

<script>
import db from "../../firebase/init";

export default {
  name: "Search",
  components: {},
  data: function() {
    return {
      feedback_search: false,
      SEARCH: "",
      feedback: "",
      AllWords: [],
      filterWord: [],
      louading: null,
    };
  },
  methods: {
    searchedWord() {
      this.louading = true;
      var filterword = [];
      this.AllWords.map((element) => {
        if (
          element.Word.match(this.SEARCH.toLowerCase()) ||
          element.definition.match(this.SEARCH.toLowerCase()) ||
          element.Synonyms.match(this.SEARCH.toLowerCase()) ||
          element.Origin.match(this.SEARCH.toLowerCase())
        ) {
          filterword.push(element);
        }
      });
      this.filterWord = filterword;
      this.feedback_search = true;

      this.louading = false;
    },
  },
  mounted() {
    var Words = [];
    db.collection("Words")
      .where("statu", "==", "waiting")

      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          //console.log(doc.id, " => ", doc.data());
          Words.push({
            Word: doc.data().Word,
            Origin: doc.data().Origin,
            definition: doc.data().definition,
            Synonyms: doc.data().Synonyms,
            Willaya: doc.data().Willaya,
          });
        });
      });
    this.AllWords = Words;
  },
};
</script>

<style scoped lang="scss">
header {
  width: 98vw;
  margin: 0 auto;
  display: flex;

.btn{
  width: 120px;
}
}
.search {
  width: 100vw;
  display: flex;
  flex-direction: column;
  //justify-content: space-between;
  .feedback {
    //margin: 1em auto;
    font-size: 22px;
    text-align: center;
  }
}

</style>
