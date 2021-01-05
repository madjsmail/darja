<template>
  <div>
    <div v-if="louading">
      <spinner />
    </div>
    <div class="success_msg" v-if="feedback">
      <p>
        {{ this.feedback }}
      </p>
    </div>
    <div v-if="done" style="position: relative; display: flex;">
      <router-link id="button" to="/Search">Search</router-link>
    </div>
    <div v-if="!louading && !done" class="container_word">
      <header class="word">
        <h2>
          {{ this.Word }}
        </h2>
        <span> Add by {{ user }} </span>
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
      <div v-if="Admin" class="footer">
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
  </div>
</template>

<script>
import spinner from "@/components/spinner";
import db from "@/firebase/init";
import router from "@/router";
import firebase from "firebase/app";
export default {
  name: "word",
  props: {},
  components: {
    spinner,
  },
  data() {
    return {
      Word: this.$route.query.word.toLowerCase(),
      Origin: null,
      definition: null,
      Synonyms: null,
      Willaya: null,
      user: null,
      louading: true,
      Admin: false,
      feedback: null,
      done: false,
      arabic: null,
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

    this.isAdmin();
  },
  methods: {
    setData(object) {
      this.Origin = object.Origin;
      this.definition = object.definition;
      this.Willaya = object.Willaya;
      this.Synonyms = object.Synonyms;
      this.user = object.user;
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
          T.done = true;
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
          T.done = true;
        });
    },
    isAdmin() {
      const T = this;

      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          firebase
            .auth()
            .currentUser.getIdTokenResult()
            .then((idTokenResult) => {
              // Confirm the user is an Admin.
              // eslint-disable-next-line no-extra-boolean-cast
              if (!!idTokenResult.claims.admin) {
                // Show admin UI.
                T.Admin = true;
              } else {
                // Show regular user UI.
                T.Admin = false;
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          // No user is signed in.
          T.Admin = false;
        }
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
