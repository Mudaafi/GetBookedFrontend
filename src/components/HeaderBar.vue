<template>
  <header class="header">
    <router-link :to="{ name: 'Home' }" class="link">
      <span class="logo-text">Get Booked!</span>
    </router-link>
    <span class="menu" v-if="!isMobile">
      <router-link :to="{ name: 'Home' }" class="link">register</router-link>
      <router-link :to="{ name: 'About' }" class="link">about</router-link>
      <router-link :to="{ name: 'Home' }" class="link">faq</router-link>
      <a href="" class="link">
        <img src="@/assets/Telegram - active.svg" class="hover-link" />
        <img src="@/assets/Telegram - inactive.svg" />
      </a>
      <a href="" class="link">
        <img src="@/assets/Instagram - active.svg" class="hover-link" />
        <img src="@/assets/Instagram - inactive.svg" />
      </a>
    </span>
    <MenuHamburger
      v-if="isMobile"
      :isActive="showModalMenu"
      @active="showModalMenu = !showModalMenu"
    />
    <transition name="fade">
      <ModalMenu v-show="showModalMenu" @active="showModalMenu = false" />
    </transition>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'
import MenuHamburger from '@/components/MenuHamburger.vue'
import ModalMenu from '@/components/ModalMenu.vue'
import { isMobileDevice } from '@/utilities'
export default Vue.extend({
  name: 'HeaderBar',
  components: {
    MenuHamburger,
    ModalMenu,
  },
  data() {
    return {
      hover: {
        tele: false,
        insta: false,
      },
      showModalMenu: false,
    }
  },
  computed: {
    isMobile() {
      return isMobileDevice()
    },
  },
})
</script>

<style scoped>
.header {
  padding: 10px 42px 12px 36px;
  background-color: var(--primary-orange);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.menu {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Pacifico, 'Open Sans', 'Courier New', Courier, monospace;
  font-size: 1.875rem;
}
.menu .link:not(:last-child) {
  margin-right: 1.5rem;
}
.menu .link:nth-child(3) {
  margin-right: 2.3125rem;
}

.link {
  text-decoration: none;
  color: rgb(105, 105, 105);
  display: flex;
  transition: 0.2s ease-in-out;
  position: relative;
  z-index: 2;
}
.link:hover,
.link:active {
  color: black;
}
.menu .link:nth-child(-n + 3)::before {
  content: '';
  display: block;
  position: absolute;
  height: 8px;
  bottom: 11px;
  z-index: -1;
  left: 0;
  right: -2px;
}
.menu .link:nth-child(-n + 3):hover::before,
.menu .link:nth-child(-n + 3):active::before {
  background: var(--highlight-yellow);
}
.link img {
  align-items: center;
  margin-bottom: -8px;
}
.hover-link {
  opacity: 0;
  position: absolute;
  transition: 0.2s ease-in-out;
}
.hover-link:hover,
.hover-link:active {
  opacity: 1;
}

.logo-text {
  color: white;
  font-family: Pacifico, Avenir, Helvetica, Arial, sans-serif;
  text-shadow: 0.35rem 0 var(--text-shadow);
  font-size: 2.8125rem;
}

@media screen and (max-width: 1000px) {
  .header {
    padding: 10px 22px 12px 16px;
  }
  .logo-text {
    font-size: 1.875rem;
    text-shadow: 0.203125rem 0 var(--text-shadow);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
