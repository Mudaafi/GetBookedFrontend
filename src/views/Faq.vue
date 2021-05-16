<template>
  <div class="faq">
    <span class="bubbles bubble-1"
      ><img src="@/assets/Bubble 1.svg" alt="bubbles"
    /></span>
    <span class="bubbles bubble-2"
      ><img src="@/assets/Bubble 2.svg" alt="bubbles"
    /></span>
    <span class="bubbles bubble-3"
      ><img src="@/assets/Bubble 3.svg" alt="bubbles"
    /></span>
    <span class="bubbles bubble-4"
      ><img src="@/assets/Bubble 4.svg" alt="bubbles"
    /></span>
    <span class="bubbles bubble-5"
      ><img src="@/assets/Bubble 5.svg" alt="bubbles"
    /></span>
    <span class="bubbles bubble-5 bubble-52"
      ><img src="@/assets/Bubble 5.svg" alt="bubbles"
    /></span>
    <div class="faq-title">faq</div>
    <ol>
      <li v-for="(faq, index) in faqs" :key="index">
        <div class="qn">
          <i>{{ faq.qn }}</i>
        </div>
        <div class="ans">{{ faq.ans }}</div>
      </li>
    </ol>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { GetterType, ActionType } from '@/store/types'
export default Vue.extend({
  name: 'Faq',
  computed: {
    faqs() {
      return this.$store.getters[GetterType.FAQS]
    },
  },
  mounted() {
    this.$store.dispatch(ActionType.FETCH_FAQS)
  },
})
</script>

<style scoped>
.faq {
  background-color: white;
  min-height: 87.4vh;
  height: 100%;
  padding: 24px 20px 24px 40px;
  position: relative;
  overflow: hidden;
}
.faq > :not(.bubbles) {
  position: relative;
  z-index: 2;
}
.faq .faq-title {
  margin-top: 10px;
  margin-bottom: 28px;
  padding-right: 0.5rem;
  width: fit-content;
  font-family: Pacifico, 'Open Sans', 'Courier New', Courier, monospace;
  font-size: 2.5rem;
  font-weight: 400;
  color: black;
  line-height: 2.8125rem;
  /* https://stackoverflow.com/questions/43683187/how-can-i-create-custom-underline-or-highlight-for-text-in-html-or-css */
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 50%,
    var(--highlight-yellow) 50%
  );
}

.faq ol {
  text-align: left;
  padding-left: 20px;
}

.faq ol li {
  margin-bottom: 32px;
}

.faq ol li .qn {
  font-weight: bold;
  margin-bottom: 8px;
  font-size: 1.125rem;
}

.faq ol li::marker {
  font-weight: bold;
  font-style: italic;
  font-size: 1.125rem;
}

.faq ol li .ans {
  letter-spacing: 0.065em;
  line-height: 20px;
}

.bubbles {
  position: absolute;
}

.bubbles.bubble-1 {
  top: 0.5rem;
  left: 9rem;
}
.bubbles.bubble-1 img {
  width: 6rem;
}

.bubbles.bubble-2 {
  top: 12em;
  left: -6rem;
}
.bubbles.bubble-2 img {
  width: 12rem;
}

.bubbles.bubble-3 {
  display: none;
}

.bubbles.bubble-4 {
  bottom: -1rem;
  right: 0;
}
.bubbles.bubble-4 img {
  width: 12rem;
}

.bubbles.bubble-5 {
  right: 1rem;
  top: 5rem;
}
.bubbles.bubble-5 img {
  width: 2rem;
}
.bubbles.bubble-52 {
  right: -0.575rem;
  top: 12rem;
}

/* Desktop Styles */
@media screen and (min-width: 999px) {
  .faq {
    padding: 24px 70px;
    min-height: 84.8vh;
  }
  .faq .faq-title {
    font-size: 5rem;
    line-height: 6.4rem;
    margin-bottom: 40px;
  }
  .faq ol {
    padding-left: 60px;
  }
  .faq ol li {
    margin-bottom: 45px;
  }
  .faq ol li .qn {
    margin-bottom: 14px;
    font-size: 1.5rem;
  }

  .faq ol li::marker {
    font-size: 1.5rem;
  }

  .faq ol li .ans {
    font-size: 1.5rem;
    letter-spacing: 0.065em;
    line-height: 30px;
  }
  .bubbles.bubble-1 {
    top: 1.5rem;
    left: 19rem;
  }
  .bubbles.bubble-1 img {
    width: 9rem;
  }

  .bubbles.bubble-2 {
    top: 18em;
    left: 0;
  }
  .bubbles.bubble-2 img {
    width: 8rem;
  }

  .bubbles.bubble-3 {
    display: block;
    top: 10rem;
    right: 10rem;
  }
  .bubbles.bubble-3 img {
    width: 15rem;
  }

  .bubbles.bubble-4 {
    bottom: -1rem;
    right: 0;
  }
  .bubbles.bubble-4 img {
    width: 20rem;
  }

  .bubbles.bubble-5 {
    right: 1rem;
    top: 5rem;
  }
  .bubbles.bubble-5 img {
    width: 2rem;
  }
  .bubbles.bubble-52 {
    right: -0.575rem;
    top: 12rem;
  }
}
</style>
