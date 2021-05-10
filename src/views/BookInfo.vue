<template>
  <div id="x">
    <span class="bg-wave"></span>
    <!-- Desktop View -->
    <div class="desktop-container" v-if="!isMobile">
      <BookCard class="small-card" :book="book" :isExtracted="true" />
      <div class="big-card">
        <section class="synopsis-section">
          <h3 class="section-header">Synopsis</h3>
          <div class="synopsis">{{ book.synopsis }}</div>
        </section>
        <section class="lenders-section">
          <h3 class="section-header">Lenders:</h3>
          <ul>
            <li>{{ book.lenderName }}</li>
          </ul>
        </section>
        <section class="footer-section">
          <div class="button-container" v-if="isAvailable">
            <button class="btn">Borrow Now!</button>
          </div>
          <AvailabilityTag class="tag" :value="book.status" v-else />
        </section>
      </div>
    </div>
    <!-- Mobile View -->
    <div class="mobile-container" v-else id="y">
      <div class="carousel" :class="{ 'is-fullscreen': isFullscreen }">
        <FlipImageSlide
          :frontUrl="book.imgFrontUrl"
          :backUrl="book.imgBackUrl"
          :isFullscreen="isFullscreen"
          @changeFullscreen="isFullscreen = $event"
          @isFrontPageActive="isFrontPageActive = $event"
        />
        <div class="pagination">
          <button
            class="page-tab"
            :class="{ 'is-active': isFrontPageActive }"
          />
          <button
            class="page-tab"
            :class="{ 'is-active': !isFrontPageActive }"
          />
        </div>
      </div>
    </div>
    <Overlay
      v-show="isFullscreen"
      @click.native="isFullscreen = !isFullscreen"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BookCard from '@/components/BookCard.vue'
import AvailabilityTag from '@/components/AvailabilityTag.vue'
import FlipImageSlide from '@/components/FlipImageSlide.vue'
import Overlay from '@/components/Overlay.vue'
import { ActionType, GetterType } from '@/store/types'
import { BookListing, BookListingStatus } from '@/types'
import { isMobileDevice } from '@/utilities'
export default Vue.extend({
  name: 'BookInfo',
  props: {
    listingId: {
      type: String,
    },
  },
  components: {
    BookCard,
    AvailabilityTag,
    FlipImageSlide,
    Overlay,
  },
  data() {
    return {
      isFullscreen: false,
      isFrontPageActive: true,
    }
  },
  computed: {
    book(): BookListing {
      return this.$store.getters[GetterType.GET_BOOK](this.listingId)
    },
    isAvailable(): boolean {
      if (this.book == undefined) return false
      return (
        this.book.status == BookListingStatus.AVAILABLE ||
        this.book.status == BookListingStatus.NEW
      )
    },
    isMobile() {
      return isMobileDevice()
    },
  },

  async mounted() {
    if (this.$store.getters[GetterType.GET_BOOK](this.listingId) == undefined) {
      this.$store.dispatch(ActionType.FETCH_BOOKS)
    }
  },
})
</script>

<style scoped>
.desktop-container {
  margin: 100px 50px 0 50px;
  display: flex;
  align-items: top;
}
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

@media screen and (max-width: 1000px) {
  .bg-wave {
    padding-bottom: 27rem;
  }
}

.desktop-container .small-card {
  max-height: 20.625rem;
  margin: 0;
}

.desktop-container .big-card {
  background-color: white;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: start;
  text-align: start;

  width: 65%;
  margin-left: 32px;
  padding: 40px;
  padding-bottom: 80px;

  border-radius: 6px;
  box-shadow: 3px 4px 6px 3px rgba(0, 0, 0, 0.1225);
  letter-spacing: 0.085em;
}
.desktop-container .big-card .synopsis-section .section-header {
  margin: 0 0 9px 0;
}
.desktop-container .big-card .lenders-section {
  margin-top: 50px;
}

.footer-section {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  position: absolute;
  bottom: 0px;
  left: 0;
}
.footer-section .button-container {
  margin-bottom: 15px;
  margin-right: 15px;
}
.footer-section .tag {
  margin-bottom: 10px;
  margin-right: 10px;
}
.footer-section .button-container .btn {
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
.footer-section .button-container .btn::after {
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

.footer-section .button-container .btn:hover {
  background-color: var(--primary-blue);
}

.footer-section .button-container .btn:hover::after {
  opacity: 1;
}

.mobile-container {
  width: 100%;
  height: 100%;
}

.mobile-container .carousel {
  width: 100%;
  height: 100%;
  position: relative;
  display: block;
  margin-top: 1rem;
  transition: 0.25s ease-in-out;
}
.mobile-container .carousel.is-fullscreen {
  transform: translateY(40px);
  z-index: 10;
}

.mobile-container .carousel .pagination {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.mobile-container .carousel .pagination .page-tab {
  border-width: 0;
  background-color: rgb(173, 173, 173);
  border-radius: 100px;
  margin: 10px 5px;
  width: 1rem;
  height: 1rem;
  cursor: pointer;
  transition: 0.25s ease-in-out;
}

.mobile-container .carousel .pagination .page-tab.is-active {
  background-color: #5a6274;
  width: 1.825rem;
  border-radius: 32px;
}
</style>
