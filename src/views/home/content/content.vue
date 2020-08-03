<template>
  <div class="public">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'content'
}
</script>
<style scoped>
  .public{
    position: relative;
    top: 0;
    padding: 1%;
    width: 100%;
    height: 100%;
  }
</style>
