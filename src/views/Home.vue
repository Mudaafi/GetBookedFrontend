<template>
  <div class="home">
    <span class="bg-wave">
      <div v-if="!isMobile">
        <img class="logo" src="../assets/getbooked_logo.png" alt="Logo" />
      </div>
    </span>
    <section class="hero" :class="isMobile ? 'hero-mobile' : 'hero-desktop'">
      <div class="hero-text">
        A chest of endless discoveries and gems along the way,<br />
        through the treasures we call books
      </div>
      <div class="cta-text">
        <mark class="blue-highlight">Keen to contribute?</mark>
      </div>
      <div class="cta-btn-container">
        <a href="" class="cta-btn">
          <img src="@/assets/Contribute - active.svg" class="cta-btn-active" />
          <img src="@/assets/Contribute - inactive.svg" />
        </a>
      </div>
    </section>
    <div v-for="book in books" :key="book.id">
      <h3>{{ book.title }}</h3>
      <img :src="book.imgFrontUrl" :alt="book.isbn" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// @ is an alias to /src
import { ActionType, GetterType } from '@/store/types'
import { mapActions, mapGetters } from 'vuex'
import { isMobileDevice } from '@/utilities'

export default Vue.extend({
  name: 'Home',
  computed: {
    ...mapGetters({
      books: GetterType.GET_BOOKS,
    }),
    isMobile() {
      return isMobileDevice()
    },
  },
  data() {
    return {
      entry: '',
    }
  },
  methods: {
    ...mapActions({
      postData: ActionType.WRITE_DATA,
      fetchData: ActionType.FETCH_BOOKS,
    }),
  },
})
</script>

<style scoped>
.bg-wave {
  background: url('../assets/wave-bg.svg') no-repeat;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding-bottom: 29.5rem;
  z-index: -1;
  display: flex;
}

.bg-wave .logo {
  position: absolute;
  width: 15rem;
  margin-left: 3rem;
  margin-top: 8.5rem;
}

@media screen and (max-width: 1000px) {
  .bg-wave .logo {
    opacity: 0;
  }
  .bg-wave {
    padding-bottom: 27rem;
  }
}

.hero {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  padding-top: 2.75rem;
  padding-bottom: 1.5rem;
}

.hero-desktop {
  font-size: 1.5rem;
}

.hero .cta-text {
  font-weight: 700;
  margin-top: 1.5rem;
}

.hero .cta-btn-container {
  margin-top: 1.5rem;
}

.hero .cta-btn-container .cta-btn {
  width: fit-content;
}

.hero .cta-btn-active {
  opacity: 0;
  position: absolute;
  transition: 0.2s ease-in-out;
}

.hero .cta-btn-active:hover,
.hero .cta-btn-active:active {
  opacity: 1;
}

.hero .cta-text .blue-highlight {
  background-color: var(--highlight-blue);
  line-height: 0;
  padding: 0.2rem 0.25rem 0.85rem 0.125rem;
  display: inline-block;
}

/* Mobile styles */
@media screen and (max-width: 600px) {
  .bg-wave {
    padding-bottom: 20rem;
  }
}
.hero-mobile {
  font-size: 0.75rem;
  font-weight: light;
  padding: 1rem 0;
}
.hero.hero-mobile .cta-text {
  font-size: 0.875rem;
  margin-top: 1.25rem;
}
.hero.hero-mobile .cta-btn-container {
  margin-top: 0.875rem;
}
.hero.hero-mobile .cta-btn img {
  width: 4.75rem;
}
.hero.hero-mobile .cta-text .blue-highlight {
  padding-bottom: 0.575rem;
  padding-top: 0.0875rem;
}
</style>
