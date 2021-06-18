<template>
  <div>
    <div class="loading" v-if="isLoading">
      <p class="main-header">verifying...</p>
      <div class="wrapper">
        <span class="circle circle-1"></span>
        <span class="circle circle-2"></span>
        <span class="circle circle-3"></span>
        <span class="circle circle-4"></span>
        <span class="circle circle-5"></span>
        <span class="circle circle-6"></span>
        <span class="circle circle-7"></span>
        <span class="circle circle-8"></span>
      </div>
    </div>
    <div v-else>
      <div v-if="res == 'FAILURE'">
        <div class="main-header">we couldn't find you...</div>
        <p class="main-text">
          Please visit
          <a href="https://telegram.me/getbooked_bot">@getbooked_bot</a> and
          enter /register e0xxxxxx to try again
        </p>
      </div>
      <div v-else>
        <div class="main-header" style="margin-top: 40px">
          Welcome to Get Booked!
        </div>
        <img
          src="@/assets/approved.svg"
          alt="Success Image"
          class="success-img"
        />
        <p class="main-text">
          Click
          <router-link :to="{ name: 'Home' }" class="link">here</router-link> to
          browse books
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ActionType } from '@/store/types'
import Vue from 'vue'
export default Vue.extend({
  name: 'Verify',
  props: {
    code: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isLoading: true,
      res: null,
    }
  },
  async created() {
    this.res = await this.$store.dispatch(ActionType.REGISTER_USER, this.code)
    this.isLoading = false
  },
})
</script>

<style scoped>
.main-header {
  margin-top: 10vh;
  font-family: Pacifico, 'Open Sans', 'Courier New', Courier, monospace;
  font-size: 2rem;
  letter-spacing: 0.05rem;
}
.main-text {
  font-size: 1.2rem;
  padding: 0 20px;
}
.success-img {
  padding: 30px;
  height: 20vw;
}
.link {
  font-weight: bold;
  font-style: italic;
  color: black;
  transition: 0.2s ease-in-out;
  position: relative;
}
/* https://codepen.io/ahmadbassamemran/pen/zQKqba */
.wrapper {
  position: absolute;
  top: 36%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.circle {
  display: inline-block;
  width: 15px;
  height: 15px;
  background-color: var(--primary-orange);
  border-radius: 50%;
  animation: loading 1.5s cubic-bezier(0.8, 0.5, 0.2, 1.4) infinite;
  transform-origin: bottom center;
  position: relative;
}
@keyframes loading {
  0% {
    transform: translateY(0px);
    background-color: var(--primary-orange);
  }
  50% {
    transform: translateY(50px);
    background-color: var(--primary-blue);
    /* background-color: #ef584a; */
  }
  100% {
    transform: translateY(0px);
    background-color: var(--primary-orange);
  }
}
.circle-1 {
  animation-delay: 0.1s;
}
.circle-2 {
  animation-delay: 0.2s;
}
.circle-3 {
  animation-delay: 0.3s;
}
.circle-4 {
  animation-delay: 0.4s;
}
.circle-5 {
  animation-delay: 0.5s;
}
.circle-6 {
  animation-delay: 0.6s;
}
.circle-7 {
  animation-delay: 0.7s;
}
.circle-8 {
  animation-delay: 0.8s;
}
</style>
