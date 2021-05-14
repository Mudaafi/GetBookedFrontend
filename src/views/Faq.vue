<template>
  <div class="faq">
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
  min-height: 84.8vh;
  padding: 24px 20px 24px 40px;
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

/* Desktop Styles */
@media screen and (min-width: 999px) {
  .faq {
    padding: 24px 70px;
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
}
</style>
