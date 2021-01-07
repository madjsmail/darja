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
    <div class="error_msg" v-if="feedback">
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
      <div
        class="footer"
        style="position: absolute;"
      >
        <button
          @submit.prevent
          v-on:click="updateColection"
          id="button"
          type="submit"
        >
          UPDATE
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
      Word: this.$route.query.word.toLowerCase(),
      Willaya: "",
      Synonyms: "",
      Origin: "",
      definition: "",
      success: "",
      feedback: "",
      louading: "",
      updated: false,
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
          //   router.push({
          //     name: "NotFound",
          //   });
          // idee feedback no such word
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });

    //this.isAdmin();
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
    updateColection() {
      if (this.Word != "" && (this.Synonyms != "" || this.definition != "")) {
        db.collection("Words")
          .doc(
            this.Word.toLowerCase()
              .split(" ")
              .join("")
          )
          .update({
            Origin: this.Origin.toLowerCase(),
            Synonyms: this.Synonyms.toLowerCase(),
            definition: this.definition.toLowerCase(),
            Willaya: this.Willaya.toLowerCase(),
          })
          .then(function() {})
          .catch(function(error) {
            console.error("Error writing document: ", error);
          });
        this.feedback = "";
        this.Word = "";
        this.Origin = "";
        this.Synonyms = "";
        this.definition = "";
        this.Willaya = "";
        this.updated = true;
        this.success = "data updated  ✔  ";
      } else {
        this.feedback = " ⛔ you need to fille the inputs ";
      }
    },
  },
};
</script>

<style></style>
