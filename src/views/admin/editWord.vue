<template>
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
  <div v-if="!louading" class="container_word">
    <header class="word">
      <h2>
        {{ this.Word }}
      </h2>
    </header>
    <section class="grid-container">
      <div class="definition">
        <header>
          <i>
            <strong> definition </strong>
          </i>
          <i>
            <strong> تعريف </strong>
          </i>
        </header>
        <p v-if="definition" v-html="definition"></p>
        <p v-else>no definition available</p>
      </div>

      <div class="synonyms">
        <header>
          <i>
            <strong> synonyms </strong>
          </i>
          <i>
            <strong> المرادفات </strong>
          </i>
        </header>
        <p v-if="Synonyms" v-html="Synonyms"></p>
        <p v-else>no Synonyms available</p>
      </div>
      <div class="origine">
        <header>
          <i>
            <strong> origine </strong>
          </i>
          <i>
            <strong> الأصل </strong>
          </i>
        </header>

        <p v-if="Origin" v-html="Origin"></p>
        <p v-else>no data available</p>
      </div>

      <div class="willaya">
        <header>
          <i>
            <strong> willaya </strong>
          </i>
          <i>
            <strong> ولاية </strong>
          </i>
        </header>
        <p v-if="Willaya" v-html="Willaya"></p>
        <p v-else>no Synonyms available</p>
      </div>
      <!-- <div class="exampl">
        <i>
          <strong> examples </strong>
        </i>
        <p v-if="Synonyms" v-html="Synonyms"></p>
        <p v-else>no Synonyms available</p>
      </div> -->
    </section>
    <div class="footer">
      <button v-if="!statu" @click="approveWord" class="btn approve">
        approve
      </button>
      <router-link
        v-bind:to="{
          name: '_form',
          params: {
            Word: this.Word,
          },
          query: { word: this.Word.toLowerCase().replace(/ /g, '') },
        }"
        class="btn edite"
        type="submit"
      >
        edite
      </router-link>
      <button @click="deleteWord" class="btn delete">
        delete
      </button>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
import router from "@/router";
export default {
  name: "word",
  props: {},
  data() {
    return {
      Word: this.$route.query.word.toLowerCase(),
      Origin: null,
      definition: null,
      Synonyms: null,
      Willaya: null,
      louading: true,
      feedback: "",
    };
  },
  mounted() {
    this.feedback = "";
    var thias = this;
    this.louading = true;

    db.collection("Words")
      .doc(this.Word.toLowerCase())
      .get()
      .then(function(doc) {
        if (doc.exists) {
          if (doc.data().statu == "waiting") {
            thias.setData(doc.data());
          } else {
            thias.feedback = "ata not found";
          }
        } else {
          router.push({
            name: "NotFound",
          });
          // idee feedback no such word
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
  },
  methods: {
    setData(object) {
      this.Origin = object.Origin;
      this.definition = object.definition;
      this.Willaya = object.Willaya;
      this.Synonyms = object.Synonyms;
      this.statu = object.statu == "Approved" ? true : false;
      this.louading = false;
    },
    deleteWord() {
      const T = this;
      db.collection("Words")
        .doc(this.Word.toLowerCase())
        .delete()
        .then(function() {
          T.feedback = "Document successfully deleted!";
        })
        .catch(function(error) {
          console.error("Error removing document: ", error);
        });
    },
    approveWord() {
      const T = this;

      db.collection("Words")
        .doc(this.Word.toLowerCase())
        .update({
          statu: "Approved",
        })
        .then(function() {
          T.feedback = "Document successfully updated!";
        });
    },
  },
};
</script>

<style lang="scss">
.grid-container > div > header {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
