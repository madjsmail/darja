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

  <div v-if="Admin" class="footer">
    <button
      @submit.prevent
      v-on:click="addColection"
      id=""
      class="btn edite"
      type="submit"
    >
      edite
    </button>
    <button
      @submit.prevent
      v-on:click="approve"
      id=""
      class=" btn approve"
      type="submit"
    >
      approve
    </button>
    <button
      @submit.prevent
      v-on:click="addColection"
      id=""
      class="btn delete"
      type="submit"
    >
      delete
    </button>
  </div>
</template>

<script>
import firebase from "firebase/app";
import db from "../firebase/init";
import router from "../router";
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
      Admin: false,
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
      this.louading = false;
    },
    approve() {
      alert(this.Word.toLowerCase())
      var Word = db.collection("Words").doc(this.Word.toLowerCase());

      // Set the "capital" field of the city 'DC'
      return Word
        .update({
          statu: 'approved',
        })
        .then(function() {
          console.log("Document successfully updated!");
        })
        .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
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

.footer {
  width: 60%;
  margin: 1em auto;
  display: flex;
  justify-content: space-between;
  position: relative;
  .btn {
    position: relative;
  }
  .edite {
    color: #f9f871 !important;
    background-color: transparent !important;
    outline: 1px solid #f9f871;
    &:hover {
      border: 1px solid #f9f871;
      box-shadow: inset 0 0 20px #f9f871;
    }
  }
  .delete {
    color: #ff0055 !important;
    background-color: transparent !important;
    outline: 1px solid #ff0055;
    &:hover {
      border: 1px solid #ff0055;
      box-shadow: inset 0 0 20px #ff0055;
    }
  }
  .approve {
    color: #00c896 !important;
    background-color: transparent !important;
    outline: 1px solid #00c896;
    &:hover {
      border: 1px solid #00c896;
      box-shadow: inset 0 0 20px #00c896;
    }
  }
}
</style>
