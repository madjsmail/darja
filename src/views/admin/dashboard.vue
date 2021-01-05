<template>
  <div>
    <header>
      <button @click="getWords" class="btn">
        get Words
      </button>
    </header>

    <main class="search">
      <!-- <div v-if="feedback_search">
        <div class="feedback" v-if="filterWord.length == 0">
          <p>no results found</p>
        </div>
        <div class="feedback" v-if="filterWord.length != 0">
          <p>
            {{ filterWord.length }}
            results found
          </p>
        </div>
      </div> -->

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
  name: "dashboard",
  data() {
    return {
      words: Array,
      filterWord: Array,
    };
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

    this.words = Words;
  },
  methods: {
    getWords() {
      this.filterWord = this.words;
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  width: 50vw;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  .btn {
    position: relative;
  }
}
</style>
