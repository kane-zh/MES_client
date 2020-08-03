<template>
  <div>
     <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'APP',
  mounted () {
    window.addEventListener('unload', this.saveState)
  },
  methods: {
    saveState () {
      sessionStorage.setItem('state', JSON.stringify(this.$store.state))
    }

  }
}
</script>

<style>
</style>
