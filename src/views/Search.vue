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
          <h3>
            Most searched word
          </h3>
          <div class="suggestion">
            <ul>
              <li>
                        <router-link
          v-bind:to="{
            name: 'word',
            params: {
              Word: arwah,
            },
            query: { word: 'arwah' },
          }"
          >Arwahhhhhh</router-link>
              </li>
              <li>
                gawri
              </li>
              <li>
                ranak
              </li>
              <li>
                ranak
              </li>
              <li>
                ranak
              </li>
              <li>
                ranak
              </li>
              <li>
                ranak
              </li>
            </ul>
          </div>
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
import db from "../firebase/init";

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
      if (this.SEARCH) {
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
      } else {
        this.feedback_search = false;
      }
      this.louading = false;
    },
  },
  mounted() {
    var Words = [];
    db.collection("Words")
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
  //justify-content: space-between;
  .feedback {
    //margin: 1em auto;
    font-size: 22px;
    text-align: center;
  }

  .card {
    font-weight: 500;
    margin: 1em auto;
    position: relative;
    // background-color: #7c052d;
    background-color: #181818;
    color: #ffffff;
    padding: 0.5em 1em;
    height: 200px;
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

    a {
      color: rgb(117, 117, 117);
      position: absolute;
      bottom: 0.4em;
      text-decoration: underline;
    }
  }
}

.suggestion {
  margin: 1em auto;
  width: 400px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  ul {
    li {
      border: 2px solid #c27e10;
      margin: 0 1em 0.5em 0;
      width: fit-content;
      padding-left: 0.5em;
      padding-right: 0.5em;
      height: 70px;
      line-height: 3em;
      text-align: center;
      box-sizing: border-box;
      outline: 0;
      margin-right: 10px;
      margin-bottom: 10px;
      color: #fff;
      display: inline-block;
      position: relative;
      cursor: pointer;
      text-transform: capitalize;
      transition: 0.4s all ease-in;
      border-radius: 0.625rem;
      letter-spacing: 1.5px;
      -webkit-animation: slide-in-fwd-bottom 0.4s
        cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
      animation: slide-in-fwd-bottom 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)
        both;

      &:hover {
        color: #c27e10;
        background: #fff;
        border: none;
      }
    }
  }
@for $i from 1 through 7 {
  li:nth-child(#{$i}) {
    animation-delay: $i*0.1s;
  }
}
}
@-webkit-keyframes slide-in-fwd-bottom {
  0% {
    -webkit-transform: translateZ(-1400px) translateY(800px);
    transform: translateZ(-1400px) translateY(800px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateZ(0) translateY(0);
    transform: translateZ(0) translateY(0);
    opacity: 1;
  }
}
@keyframes slide-in-fwd-bottom {
  0% {
    -webkit-transform: translateZ(-1400px) translateY(800px);
    transform: translateZ(-1400px) translateY(800px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateZ(0) translateY(0);
    transform: translateZ(0) translateY(0);
    opacity: 1;
  }
}
</style>
