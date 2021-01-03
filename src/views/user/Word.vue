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
  <div v-else class="container_word">
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
    };
  },
  mounted() {
    var thias = this;
    this.louading = true;

    db.collection("Words")
      .doc(this.Word.toLowerCase())
      .get()
      .then(function(doc) {
        if (doc.exists) {
          thias.setData(doc.data());
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
      this.louading = false;

    },
  },
};
</script>

<style>
.grid-container > div > header {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

</style>
