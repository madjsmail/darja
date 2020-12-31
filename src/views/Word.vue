<template>
  <div class="container_word">
    <header class="word">
      <h2>
        {{ this.Word }}
      </h2>
    </header>
    <section class="grid-container">
      <div class="definition">
        <i>
          <strong> definition </strong>
        </i>
        <p v-if="definition" v-html="definition"></p>
        <p v-else>no definition available</p>
      </div>

      <div class="synonyms">
        <i>
          <strong> synonyms </strong>
        </i>
        <p v-if="Synonyms" v-html="Synonyms"></p>
        <p v-else>no Synonyms available</p>
      </div>
      <div class="origine">
        <i>
          <strong> origine </strong>
        </i>
        <p v-if="Origin" v-html="Origin"></p>
        <p v-else>no data available</p>
      </div>

      <div class="willaya">
        <i>
          <strong> willaya </strong>
        </i>
        <p v-if="Willaya" v-html="Willaya"></p>
        <p v-else>no Synonyms available</p>
      </div>
      <div class="exampl">
        <i>
          <strong> examples </strong>
        </i>
        <p v-if="Synonyms" v-html="Synonyms"></p>
        <p v-else>no Synonyms available</p>
      </div>
    </section>
  </div>
</template>

<script>
import db from "../firebase/init";
import router from "../router";
export default {
  name: "word",
  props: {},
  data() {
    return {
      Word: this.$route.query.word,
      Origin: null,
      definition: null,
      Synonyms: null,
      Willaya: null,
    };
  },
  mounted() {
    var thias = this;
    db.collection("Words")
      .doc(this.Word)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          thias.setData(doc.data());
        } else {
          router.push({
            name: "NotFound",
          });
          // idee feedback no such word
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  },
  methods: {
    setData(object) {
      this.Origin = object.Origin;
      this.definition = object.definition;
      this.Willaya = object.Willaya;
      this.Synonyms = object.Synonyms;
    },
  },
};
</script>

<style></style>
