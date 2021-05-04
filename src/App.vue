<template>
  <div id="app">
    <HeaderBar />
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HeaderBar from '@/components/HeaderBar.vue'
export default Vue.extend({
  components: {
    HeaderBar,
  },
})
</script>

<style>
:root {
  --primary-orange: #ffc5a5;
  --text-shadow: #adb095;
  --highlight-yellow: #f2d366;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
