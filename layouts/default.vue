<template>
  <div>
      <Header/>
    <Nuxt />
    <Footer/>
  </div>
</template>

<script>
import Footer from '../components/default/Footer.vue';
import Header from '../components/default/Header.vue';
export default {
  components: { Header, Footer },};
</script>

<style>
</style>