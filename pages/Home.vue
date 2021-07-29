<template>
  <div class="containe">
    <DectionarySearch />
    <Wizard />
  </div>
</template>

<script>
import DectionarySearch from '../components/Dectionary/dectionarySearch.vue';

import Wizard from "../components/home/Wizard.vue";
export default {
  components: { Wizard, DectionarySearch },
};
</script>

<style>
.search-form{
  width: 50%;
}
.clone2{
  width: 50%;
}

</style>