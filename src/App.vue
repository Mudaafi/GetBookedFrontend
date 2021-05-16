<template>
  <div id="app">
    <HeaderBar />
    <router-view />
    <FooterBar />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HeaderBar from '@/components/HeaderBar.vue'
import FooterBar from '@/components/FooterBar.vue'
export default Vue.extend({
  components: {
    HeaderBar,
    FooterBar,
  },
})
</script>

<style>
:root {
  --background-main: #f5f8ff;
  --primary-orange: #ffc5a5;
  --text-shadow: #adb095;
  --highlight-yellow: #f2d366;
  --primary-blue: #c0f1f8;
  --highlight-blue: #c0f1f8;
  --success-light: #7ec69b;
  --info-light: #61b4ed;
  --error-light: #de8e92;
  --pending-light: #e4c450;
}

#app {
  font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  min-height: 100vh;
  margin: 0;
  flex-direction: column;
}

body {
  background-color: var(--background-main);
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
