<template>
  <div class="success_msg" v-if="success && !feedback">
    <p>
      {{ this.success }}
    </p>
  </div>
  <div class="error_msg" v-if="feedback">
    <p>
      {{ this.feedback }}
    </p>
  </div>
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
  <div class="footer">
    <button @submit.prevent v-on:click="addColection" id="button" type="submit">
      submit
    </button>
  </div>
</template>

<script>
import db from "../../firebase/init";
import firebase from "firebase/app";
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default {
  name: "Form",
  components: {
    ckeditor: CKEditor.component,
  },
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
      editor: ClassicEditor,
      editorData: "<p>Content of the editor.</p>",
      editorConfig: {
        // The configuration of the editor.
        toolbar: [
          "heading",
          "bold",
          "italic",
          "|",
          "numberedList",
          "blockQuote",
          "|",
          "undo",
        ],
        //   colors: [{ color: 'red' }],
        // },
        // style: [],
      },
    };
  },
  methods: {
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
  },
};
</script>

<style scoped>
.footer {
  position: absolute !important;
  bottom: 0;
}
sup {
  color: red;
}
.error_msg {
  width: 60vw;
  height: 60px;
  margin: 2em auto;
  display: flex;
  justify-content: center;
  align-content: center;
  align-content: center;
  background-color: #f8d7da;
  color: #721c24;
  border-radius: 4px;
  font-size: 18px;
  line-height: 24px;
}
.success_msg {
  width: 60vw;
  height: 60px;
  margin: 2em auto;
  display: flex;
  justify-content: center;
  align-content: center;
  align-content: center;
  background-color: #d4edda;
  color: #155724;
  border-radius: 4px;
  font-size: 16px;
  line-height: 24px;
}

.form_btn {
  position: relative;
}
</style>
