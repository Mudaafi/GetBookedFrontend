<template>
  <router-link
    class="container"
    :class="{ 'not-clickable': isExtracted }"
    :to="
      isExtracted
        ? ''
        : { name: 'BookInfo', params: { listingId: book.listingId } }
    "
  >
    <picture>
      <img :src="book.imgFrontUrl" alt="" class="img img-bg" />
    </picture>
    <main class="main">
      <header class="header">
        <div class="title">
          <span class="blue-highlight">{{ book.title }}</span>
        </div>
        <div class="author">{{ book.author }}</div>
      </header>
      <section v-if="!isExtracted && !isMobile" class="description">
        {{ book.synopsis }}
      </section>
      <section class="button-container" v-else-if="isAvailable && !isMobile">
        <button class="btn">Borrow</button>
      </section>
    </main>

    <footer class="card-footer">
      <!-- Add status Component -->
      <AvailabilityTag class="tag" :value="book.status" />
    </footer>
  </router-link>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { BookListing, BookListingStatus } from '@/types'
import { isMobileDevice } from '@/utilities'
import AvailabilityTag from '@/components/AvailabilityTag.vue'
export default Vue.extend({
  name: 'BookCard',
  props: {
    book: {
      type: Object as PropType<BookListing>,
    },
    isExtracted: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    AvailabilityTag,
  },
  computed: {
    isMobile() {
      return isMobileDevice()
    },
    isAvailable(): boolean {
      return (
        this.book.status == BookListingStatus.AVAILABLE ||
        this.book.status == BookListingStatus.NEW
      )
    },
  },
})
</script>

<style scoped>
.container {
  width: 17.3125rem;
  min-width: 17.3125rem;
  /* height: 24.25rem; */
  padding-bottom: 1.75rem;
  border-radius: 6px;
  box-shadow: 3px 4px 6px 3px rgba(0, 0, 0, 0.1225);
  display: flex;
  flex-direction: column;
  position: relative;
  transition: 0.5s ease-in-out;
  background-color: white;
  text-decoration: none;
  color: black;
}
.not-clickable {
  cursor: default;
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
  font-weight: 700;
}
.main .header .author {
  margin-top: 0.175rem;
  font-size: 0.75rem;
  font-weight: 300;
}
.main .header .title .blue-highlight {
  /* https://stackoverflow.com/questions/43683187/how-can-i-create-custom-underline-or-highlight-for-text-in-html-or-css */
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 38%,
    var(--highlight-blue) 38%
  );
}

.main .description {
  margin-bottom: 0.5rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  transition: 0.6s ease-in-out;
  max-height: 0;
  opacity: 0;
}

.container:hover .main .description {
  opacity: 1;
  max-height: 30rem;
  transition: 0.5s ease-in-out;
  /* Also add card popping animation */
}
.main .button-container {
  display: flex;
  justify-content: center;
  margin: 1rem 0 1.5rem 0;
}
.main .button-container .btn {
  background-color: white;
  padding: 0.5rem 1.25rem;
  border: 2px solid #000000;
  border-radius: 8px;
  font-weight: 900;
  font-size: 22px;
  line-height: 26px;
  text-align: center;
  letter-spacing: 0.05em;
  color: var(--primary-orange);
  -webkit-text-stroke: 1px black;
  transition: 0.2s ease-in-out;
  cursor: pointer;
  position: relative;
}
.main .button-container .btn::after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  border-radius: 8px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
  transition: opacity 0.3s ease-in-out;
}

.main .button-container .btn:hover {
  background-color: var(--primary-blue);
}

.main .button-container .btn:hover::after {
  opacity: 1;
}

.card-footer {
  display: flex;
  justify-content: flex-end;
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
}
.card-footer .tag {
  margin-bottom: 6px;
  margin-right: 6px;
}

/* Mobile Styles */
@media screen and (max-width: 600px) {
  .container {
    border-radius: 8px;
    width: 45%;
    min-width: 162px;
  }
  .img {
    margin-top: 0;
    width: 100%;
    height: 10rem;
    border-radius: 8px;
  }
  .img-bg {
    box-shadow: none;
  }
  .main {
    padding: 0.1rem 0.5rem 1rem 0.5rem;
  }
  .main .header {
    padding: 0;
  }
  .main .header .title {
    font-size: 0.75rem;
  }
  .main .header .author {
    font-size: 0.625rem;
  }
  .tag {
    font-size: 0.5rem;
    padding: 2px 12px;
  }
}
</style>
