<template>
  <div class="container">
    <picture>
      <img :src="book.imgFrontUrl" alt="" class="img img-bg" />
    </picture>
    <main class="main">
      <header class="header">
        <div class="title">
          <mark class="blue-highlight">{{ book.title }}</mark>
        </div>
        <div class="author">{{ book.author }}</div>
      </header>
      <section class="description" :class="{ 'is-desktop': !isMobile }">
        {{ book.synopsis }}
      </section>
    </main>

    <footer class="card-footer">
      <!-- Add status Component -->
      <AvailabilityTag :value="book.status" />
    </footer>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { BookListing } from '@/types'
import { isMobileDevice } from '@/utilities'
import AvailabilityTag from '@/components/AvailabilityTag.vue'
export default Vue.extend({
  name: 'BookCard',
  props: {
    book: {
      type: Object as PropType<BookListing>,
    },
  },
  components: {
    AvailabilityTag,
  },
  computed: {
    isMobile() {
      return isMobileDevice()
    },
  },
})
</script>

<style scoped>
.container {
  width: 17.3125rem;
  /* height: 24.25rem; */
  border-radius: 6px;
  box-shadow: 3px 4px 6px 3px rgba(0, 0, 0, 0.1225);
  display: flex;
  flex-direction: column;
  position: relative;
  cursor: pointer;
  transition: 0.5s ease-in-out;
  background-color: white;
}
.img {
  margin-top: -3rem;
  width: 13rem;
  height: 13rem;
  object-fit: cover;
  object-position: 0 0;
  border-radius: 2rem;
}
.img-bg {
  box-shadow: 5.5px 5.5px 0 2px var(--highlight-blue);
}
.main {
  padding: 0 1.5rem 0 2.2rem;
  text-align: start;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.main .header {
  text-transform: uppercase;
  padding: 0.5rem 0;
  letter-spacing: 100%;
  letter-spacing: 0.085em;
  color: black;
}
.main .header .title {
  font-size: 1rem;
  font-weight: 500;
}
.main .header .author {
  margin-top: 0.07rem;
  font-size: 0.75rem;
  font-weight: 300;
}
.main .header .title .blue-highlight {
  background-color: var(--highlight-blue);
  line-height: 0;
  padding: 0.175rem 0.1rem 0.5rem 0rem;
  display: inline-block;
}

.main .description {
  margin-bottom: 0.5rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  transition: 0.6s ease-in-out;
}
.main .description.is-desktop {
  max-height: 0;
  opacity: 0;
}
.container:hover .main .description {
  opacity: 1;
  max-height: 30rem;
  transition: 0.5s ease-in-out;
  /* Also add card popping animation */
}
.card-footer {
  display: flex;
  justify-content: flex-end;
  position: relative;
  bottom: 0;
  padding: 6px;
}
</style>
