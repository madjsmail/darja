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
    <div class="success_msg" v-if="feedback">
    <p>
      {{ this.feedback }}
    </p>
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
      <button @click="approveWord" class="btn approve">
        approve
      </button>
      <button class="btn edite">
        edite
      </button>
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
      feedback : ''
    };
  },
  mounted() {
      this.feedback = '' ;
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
    deleteWord() {
        const T = this
      db.collection("Words")
        .doc(this.Word.toLowerCase())
        .delete()
        .then(function() {
            T.feedback = 'Document successfully deleted!'
         
        })
        .catch(function(error) {
          console.error("Error removing document: ", error);
        });
    },
    approveWord() {
        const T = this

      db.collection("Words")
        .doc(this.Word.toLowerCase())
        .update({
            statu : 'Approved'
        })
        .then(function() {
            T.feedback = 'Document successfully updated!'

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
  width: 100%;
  display: flex;
  position: relative;
  justify-content: space-between;

  .btn {
    position: relative;
  }
  .approve {
    color: #00c896;
    max-width: 160px;
    background-color: transparent;
    width: 100%;
    border: 0 solid #00c896;
    box-shadow: inset 0 0 20px #00c896;
    outline: 1px solid;
    outline-color: #00c896;
    outline-offset: 0px;
    text-shadow: none;
    transition: all 1250ms cubic-bezier(0.19, 1, 0.22, 1);

    &:hover {
      border: 1px solid #00c896;
      box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.5),
        0 0 20px rgba(255, 255, 255, 0.2);
      outline-color: rgba(255, 255, 255, 0);
      outline-offset: 10px;
      text-shadow: 1px 1px 2px #00c896;
    }
  }
  .edite {
    color: #f9f871;
    max-width: 160px;
    background-color: transparent;
    width: 100%;
    border: 0 solid #f9f871;
    box-shadow: inset 0 0 20px #f9f871;
    outline: 1px solid;
    outline-color: #f9f871;
    outline-offset: 0px;
    text-shadow: none;
    transition: all 1250ms cubic-bezier(0.19, 1, 0.22, 1);

    &:hover {
      border: 1px solid #f9f871;
      box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.5),
        0 0 20px rgba(255, 255, 255, 0.2);
      outline-color: rgba(255, 255, 255, 0);
      outline-offset: 10px;
      text-shadow: 1px 1px 2px #f9f871;
    }
  }
  .delete {
    color: #d47e6c;
    max-width: 160px;
    background-color: transparent;
    width: 100%;
    border: 0 solid #d47e6c;
    box-shadow: inset 0 0 20px #d47e6c;
    outline: 1px solid;
    outline-color: #d47e6c;
    outline-offset: 0px;
    text-shadow: none;
    transition: all 1250ms cubic-bezier(0.19, 1, 0.22, 1);

    &:hover {
      border: 1px solid #d47e6c;
      box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.5),
        0 0 20px rgba(255, 255, 255, 0.2);
      outline-color: rgba(255, 255, 255, 0);
      outline-offset: 10px;
      text-shadow: 1px 1px 2px #d47e6c;
    }
  }
}
</style>
