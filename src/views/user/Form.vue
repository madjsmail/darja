<template>
  <div>
    <div v-if="louading">
      <spinner />
    </div>
    <div class="success_msg" v-if="success && !feedback">
      <p>
        {{ this.success }}
      </p>
    </div>
   <div class="error_msg" v-else-if="feedback">
    <p>
      {{ this.feedback }}
    </p>
  </div>
    <div v-if="updated" style="position: relative; display: flex;">
      <router-link id="button" to="/Search">Search</router-link>
    </div>
    <div class="" v-if="!louading && !updated">
      <div @submit.prevent class="form_container">
        <div class="input">
          <label for="Word">New Word <sup>*</sup></label>
          <input type="text" name="Word" v-model="Word" id="Word" />
        </div>
        <div class="input">
          <label for="Origin">Origin</label>
          <input type="text" name="Origin" v-model="Origin" id="Origin" />
        </div>
        <div class="input">
          <label for="synonyms">Synonyms <sup>*</sup></label>
          <input type="text" name="synonyms" v-model="Synonyms" id="Synonyms" />
        </div>
        <div class="input">
          <label for="Willaya">Willaya </label>
          <input type="text" name="Willaya" v-model="Willaya" id="Willaya" />
        </div>
        <div class="input input_definition ">
          <label for="definition">definition</label>
          <ckeditor
            :editor="editor"
            v-model="definition"
            :config="editorConfig"
          ></ckeditor>
          <!-- <textarea name="definition" id="" rows="10" cols="" v-model="definition">
      </textarea> -->
        </div>
      </div>
      <div class="footer" style="position: absolute;">
        <button
          @submit.prevent
          v-on:click="addColection"
          id="button"
          type="submit"
        >
          submit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import spinner from "../../components/spinner.vue";
import db from "../../firebase/init";
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import firebase from "firebase/app";
//import router from "../../router";
//import firebase from "firebase/app";
export default {
  components: {
    spinner,

    ckeditor: CKEditor.component,
  },
  name: "_form",
  data() {
    return {
      user: firebase.auth().currentUser.displayName.toLowerCase(),
      photoUrl: firebase.auth().currentUser.photoURL,
      isAdmin: false,
      Word: "",
      success: "",
      Origin: "",
      Synonyms: "",
      definition: "",
      Willaya: "",
      feedback: "",
      louading: "",
      updated: false,
      editor: ClassicEditor,
      editorData: "<p>Content of the editor.</p>",
      editorConfig: {
        // The configuration of the editor.
        toolbar: [
          "bold",
          "italic",
          "link",
          "undo",
          "redo",
          "numberedList",
          "bulletedList",
        ],
        //   colors: [{ color: 'red' }],
        // },
        // style: [],
      },
    };
  },
  mounted() {
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
              T.isAdmin = true;
            } else {
              // Show regular user UI.
              T.isAdmin = false;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        // No user is signed in.
        T.isAdmin = false;
      }
    });
  },
  methods: {
    setData(object) {
      this.Origin = object.Origin;
      this.definition = object.definition;
      this.Willaya = object.Willaya;
      this.Synonyms = object.Synonyms;
      this.statu = object.statu;
      this.louading = false;
    },
    addColection() {
      var statu = this.isAdmin ? "waiting" : "Approved";

      if (this.Word != "" && (this.Synonyms != "" || this.definition != "")) {
        db.collection("Words")
          .doc(
            this.Word.toLowerCase()
              .split(" ")
              .join("")
          )
          .set({
            Word: this.Word.toLowerCase()
              .split(" ")
              .join(""),
            Origin: this.Origin.toLowerCase(),
            Synonyms: this.Synonyms.toLowerCase(),
            definition: this.definition.toLowerCase(),
            Willaya: this.Willaya.toLowerCase(),
            user: this.user,
            statu: statu,
          })
          .then(function() {})
          .catch(function(error) {
            console.error("Error writing document: ", error);
          });

        const increment = firebase.firestore.FieldValue.increment(1);
        // const decrement = firebase.firestore.FieldValue.increment(-1);

        const userCount = db.collection("Users").doc(this.user);
        userCount.update({ contribution: increment });

        //  userCount.set({word: [this.Word]} ,  { merge: true })
        userCount.update({
          word: firebase.firestore.FieldValue.arrayUnion(this.Word),
        });

        this.feedback = "";

        this.Word = "";
        this.Origin = "";
        this.Synonyms = "";
        this.definition = "";
        this.Willaya = "";
        this.success = "data saved ✔ , thank you for contributing ";
      } else {
        this.feedback = " ⛔ you need to fille the inputs ";
      }
    },
  },
};
</script>

<style></style>
