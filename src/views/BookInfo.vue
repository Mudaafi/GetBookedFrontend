<template>
  <div>
    <span class="bg-wave"></span>
    <!-- Desktop View -->
    <div class="desktop-container" v-if="!isLoading && !isMobile">
      <BookCard
        class="small-card"
        :book="book"
        :isExtracted="true"
        @borrow="isFormVisible = true"
      />
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
            <button
              class="btn"
              @click="isFormVisible = true"
              v-if="isWithinPhase"
            >
              Borrow Now!
            </button>
            <div v-else style="text-align: center">
              <em>The current phase for Get Booked! has ended.</em>
              <br />
              <em>See you in the next one!</em>
            </div>
          </div>
          <AvailabilityTag class="tag" :value="book.status" v-else />
        </section>
      </div>
    </div>
    <!-- Mobile View -->
    <div class="mobile-container" v-else-if="!isLoading">
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
      <section class="title-section">
        <div class="title">{{ book.title }}</div>
        <div class="author">
          <i>{{ book.author }}</i>
        </div>
        <AvailabilityTag :value="book.status" class="tag" />
        <div v-if="isAvailable">
          <div
            class="borrow-btn"
            @click="isFormVisible = true"
            v-if="isWithinPhase"
          >
            Borrow
          </div>
          <div v-else style="text-align: center">
            <em
              >The current phase for Get Booked! has ended. See you in the next
              one!</em
            >
          </div>
        </div>
      </section>
      <section class="synopsis-section">
        <div class="section-title">Synopsis</div>
        <div class="synopsis">{{ book.synopsis }}</div>
      </section>
      <section class="lenders-section">
        <div class="section-title">Lenders:</div>
        <ul class="lenders">
          <li>{{ book.lenderName }}</li>
        </ul>
      </section>
    </div>
    <div class="default" v-else>
      {{ isBookMissing ? 'Book not found :(' : 'Loading...' }}
    </div>
    <Overlay
      v-show="isFullscreen"
      @click.native="isFullscreen = !isFullscreen"
      style="z-index: 4"
    />
    <transition name="fade">
      <BorrowForm
        v-if="book != undefined"
        :title="book.title"
        :bookListingId="book.listingId"
        @close="isFormVisible = false"
        v-show="isFormVisible"
      />
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BookCard from '@/components/BookCard.vue'
import AvailabilityTag from '@/components/AvailabilityTag.vue'
import FlipImageSlide from '@/components/FlipImageSlide.vue'
import Overlay from '@/components/Overlay.vue'
import BorrowForm from '@/components/ModalBorrow.vue'
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
    BorrowForm,
  },
  data() {
    return {
      isFullscreen: false,
      isFrontPageActive: true,
      isBookMissing: false,
      isFormVisible: false,
    }
  },
  computed: {
    book(): BookListing {
      return this.$store.getters[GetterType.BOOK](this.listingId)
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
    isLoading(): boolean {
      return this.book == undefined
    },
    isWithinPhase(): boolean {
      return this.$store.getters[GetterType.IS_WITHIN_PHASE](new Date())
    },
  },

  async created() {
    this.$store.dispatch(ActionType.FETCH_PHASE)
    if (this.$store.getters[GetterType.BOOK](this.listingId) == undefined) {
      this.$store.dispatch(ActionType.FETCH_BOOKS)
    }
    setTimeout(() => {
      this.isBookMissing = true
    }, 5000)
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
    padding-bottom: 18rem;
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
  justify-content: flex-start;
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

/* Mobile Styles */
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
  transform: translateY(10px);
  z-index: 5;
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

.mobile-container section {
  padding: 1rem 1.5rem 1.25rem 1.5rem;
  background-color: white;
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-bottom: 8px;
}

.mobile-container .title-section .title {
  /* https://stackoverflow.com/questions/43683187/how-can-i-create-custom-underline-or-highlight-for-text-in-html-or-css */
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 38%,
    var(--highlight-blue) 38%
  );
  font-size: 1.25rem;
  font-weight: 700;
  width: fit-content;
  padding-right: 4px;
  margin-bottom: 2px;
}
.mobile-container .title-section .author {
  font-size: 0.75rem;
  font-weight: 300;
  margin-bottom: 7px;
}

.mobile-container .title-section .tag {
  font-size: 0.5rem;
  padding: 3px 12px;
  margin-bottom: 12px;
}

.mobile-container .title-section .borrow-btn {
  background-color: var(--primary-blue);
  padding: 0.5rem 0.5rem;
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

.mobile-container .section-title {
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 7px;
}

.mobile-container .synopsis-section .synopsis {
  font-size: 0.875rem;
  letter-spacing: 0.085em;
}

.mobile-container .lenders-section .lenders {
  margin: 0;
}

.default {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30vh;
  font-size: 32px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

@media screen and (max-width: 1000px) {
  .default {
    font-size: 18px;
  }
}
</style>
