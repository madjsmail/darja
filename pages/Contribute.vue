<template>
  <form class="parent" action="">
    <div class="div1">
      <label for="word"></label>
      <input class="search" type="text" name="word" id="" />
    </div>
    <div class="div2">
      <label for="definition"></label>
      <input class="search" type="text" name="definition" id="" />
    </div>
    <div class="div3">
      <label for="description"></label>
      <textarea class="search" name="" id="" cols="80" rows="80"></textarea>
      <button class="btn" type="submit">SUBMIT</button>
    </div>
  </form>
</template>

<script>
export default {};
</script>

<style>

.parent {
  width: 80vw;
  height: 80vh;
  margin: 5em auto;
display: flex;
flex-wrap: wrap;

}
.div{
  width: 100%;
  max-height:250px ;
}

</style>