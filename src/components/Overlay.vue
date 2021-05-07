<template>
  <div class="overlay-container" :style="{ top: `${topOffset || 75}px` }">
    <slot />
    <div class="overlay" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Overlay',
  props: {
    topOffset: {
      type: Number,
    },
  },
})
</script>

<style scoped>
.overlay-container {
  position: fixed;
  right: 0px;
  bottom: 0px;
  left: 0px;
  z-index: 9;
}
.overlay {
  position: absolute;
  background: linear-gradient(#c0f1f8, #f3d5d5);
  width: 100%;
  height: 100%;
  top: 0;
  z-index: -1;
  opacity: 75%;
}
</style>
