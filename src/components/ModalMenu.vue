<template>
  <Overlay class="overlay-main">
    <div class="container">
      <header class="escape">
        <button class="button" @click="$emit('active', false)">x</button>
      </header>
      <section class="menu">
        <router-link
          :to="{ name: 'Home' }"
          @click.native="$emit('active', false)"
        >
          <mark>home</mark>
        </router-link>
        <router-link
          :to="{ name: 'Home' }"
          @click.native="$emit('active', false)"
        >
          <mark>register</mark>
        </router-link>
        <router-link
          :to="{ name: 'About' }"
          @click.native="$emit('active', false)"
        >
          <mark>about</mark>
        </router-link>
        <router-link
          :to="{ name: 'Faq' }"
          @click.native="$emit('active', false)"
        >
          <mark>faq</mark>
        </router-link>
      </section>
      <footer class="footer">
        <a :href="teleLink" class="img-link">
          <img src="@/assets/Telegram - active.svg" class="img-link-active" />
          <img src="@/assets/Telegram - inactive.svg" />
        </a>
        <a :href="instaLink" class="img-link">
          <img src="@/assets/Instagram - active.svg" class="img-link-active" />
          <img src="@/assets/Instagram - inactive.svg" />
        </a>
      </footer>
    </div>
  </Overlay>
</template>

<script lang="ts">
import Vue from 'vue'
import Overlay from '@/components/Overlay.vue'
import { ActionType, GetterType } from '@/store/types'
import { mapGetters } from 'vuex'

export default Vue.extend({
  name: 'ModalMenu',
  components: {
    Overlay,
  },
  computed: {
    ...mapGetters({
      teleLink: GetterType.TELE_LINK,
      instaLink: GetterType.INSTA_LINK,
    }),
  },
  mounted() {
    this.$store.dispatch(ActionType.FETCH_LINKS)
  },
})
</script>

<style scoped>
.overlay-main {
  display: flex;
  justify-content: center;
}
.container {
  background-color: white;
  margin-top: 45px;
  height: 25%;
  display: block;
  padding: 0;
  block-size: fit-content;
  border-radius: 0.5rem;
  box-shadow: 4px 6px 4px rgba(0, 0, 0, 0.25);
}

.escape {
  display: flex;
  justify-content: flex-end;
  margin: 0.125rem 0.125rem 0 0;
}

.button {
  display: block;
  background-color: white;
  border: none;
  font-size: 1rem;
  color: rgb(105, 105, 105);
  transition: 0.2ms ease-in-out;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  cursor: pointer;
}
.button:hover,
.button:active {
  color: black;
}

.menu {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: Pacifico, 'Open Sans', 'Courier New', Courier, monospace;
  font-size: 1.5rem;
  padding: 0 6.25rem 1.25rem 6.25rem;
}
.router-link-active {
  display: block;
}
mark {
  display: inline-block;
  align-self: baseline;
  text-decoration: none;
  line-height: 0;
  padding: 0 0.25rem 0.75rem 0;
  background-color: white;
  transition: 0.2s ease-in-out;
  color: black;
}

mark:hover,
mark:active {
  background-color: var(--highlight-yellow);
}

.footer {
  padding-bottom: 0.25rem;
  display: flex;
  justify-content: center;
}
.img-link {
  display: inline-block;
  padding-left: 20px;
  padding-right: 20px;
}
.img-link img {
  height: 1.5rem;
}
.img-link-active {
  opacity: 0;
  position: absolute;
  transition: 0.2s ease-in-out;
}
.img-link-active:hover,
.img-link-active:active {
  opacity: 1;
}
</style>
