<template>
  <div class="container_word">
    <header class="word">
      <h2>
        {{this.$props.Word}}
      </h2>
    </header>
    <section class="grid-container ">
      <div class="definition">
        <i>
          <strong>
            definition
          </strong>
        </i>
        <p v-if="this.$props.definition" v-html="this.$props.definition">

        </p>
        <p v-else>
            no definition available
        </p>
      </div>



      <div class="synonyms">
        <i>
          <strong>
            synonyms
          </strong>
        </i>
        <p v-if="this.$props.Synonyms" v-html="this.$props.Synonyms">

        </p>
        <p v-else>
            no Synonyms available
        </p>
      </div>
            <div class="origine">
        <i>
          <strong>
            origine
          </strong>
        </i>
        <p v-if="this.$props.Origin" v-html="this.$props.Origin">

        </p>
        <p v-else>
            no data available
        </p>
      </div>

      <div class="willaya">
        <i>
          <strong>
            willaya
          </strong>
        </i>
        <p v-if="this.$props.Willaya" v-html="this.$props.Willaya">

        </p>
        <p v-else>
            no Synonyms available
        </p>
      </div>
      <div class="exampl">
        <i>
          <strong>
            examples
          </strong>
        </i>
        <p v-if="this.$props.Synonyms" v-html="this.$props.Synonyms">

        </p>
        <p v-else>
            no Synonyms available
        </p>
      </div>

    </section>
  </div>
</template>

<script>
export default {
  name: "word",
  props :{
          Word :  String,
          Origin :String,
          definition :String,
          Synonyms :String,
          Willaya :String,
  },
  // props: ['data'],
  data() {
      return {
          // definition : '',
          // origine :'',
          // synonyms :'',
          // examples :'',
          // data1 : ''

      }
  },
  mounted(){


  },
};
</script>

<style></style>
