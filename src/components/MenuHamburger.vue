<template>
  <a
    class="menu-pop"
    :class="{ active: isActive }"
    @click="
      isActive = !isActive
      $emit('active', isActive)
    "
  >
    <span class="container top-bar">
      <span class="left-side"></span>
      <span class="right-side"></span>
    </span>
    <span class="container mid-bar">
      <span class="left-side"></span>
      <span class="right-side"></span>
    </span>
    <span class="container bot-bar">
      <span class="left-side"></span>
      <span class="right-side"></span>
    </span>
  </a>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'MenuPop',
  props: {
    isActive: {
      type: Boolean,
      required: true,
    },
  },
})
</script>

<style scoped>
.menu-pop {
  cursor: pointer;
}

.container {
  display: flex;
}

.container span {
  width: 12px;
  height: 2px;
  background-color: #b1b1b1;
  display: inline-block;
  margin: 0;
  transition: all 0.4s ease-in-out;
}

.container:not(:last-child) {
  margin-bottom: 4px;
}

/* https://codepen.io/bousahla-mounir/pen/LYxLKyG */
.menu-pop.active .top-bar .left-side {
  transform: translate(10px, 10px) rotate(45deg);
}

.menu-pop.active .top-bar .right-side {
  transform: translate(-10px, 10px) rotate(-45deg);
}

.menu-pop.active .mid-bar .left-side {
  opacity: 0;
  transform: translateX(-20px);
}

.menu-pop.active .mid-bar .right-side {
  opacity: 0;
  transform: translateX(20px);
}

.menu-pop.active .bot-bar .left-side {
  transform: translate(10px, -10px) rotate(-45deg);
}

.menu-pop.active .bot-bar .right-side {
  transform: translate(-10px, -10px) rotate(45deg);
}
</style>
