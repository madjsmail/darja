<template>
    <section class="dectionary">
      <DectionarySearch/>
    </section>
</template>

<script class="move">
import DectionarySearch from '../components/Dectionary/dectionarySearch.vue';

export default {
  components: { DectionarySearch }};
  
</script>

<style  scoped>
.dectionary{
  width: 100%;
  height: 100%;
  min-height: 25rem;
  display: flex;
justify-content: center;
}
</style>
