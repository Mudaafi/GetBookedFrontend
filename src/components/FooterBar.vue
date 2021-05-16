<template>
  <footer :style="`background-color: ${bgColor}`">
    <hr />
    <div class="copyright">© 2021 by NUS Muslim Society</div>
    <div class="credits">
      Icons made by
      <a href="https://www.freepik.com" title="Freepik" class="link">Freepik</a>
      from
      <a href="https://www.flaticon.com/" title="Flaticon" class="link"
        >www.flaticon.com</a
      >
    </div>
  </footer>
</template>

<script lang="ts">
import { RouteConfig } from 'node_modules/vue-router/types'
import Vue from 'vue'
export default Vue.extend({
  name: 'FooterBar',
  data() {
    return {
      bgColor: 'var(--background-main)',
    }
  },
  watch: {
    $route(to: RouteConfig) {
      if (to.name == 'Faq' || to.name == 'About') {
        this.bgColor = 'white'
      } else {
        this.bgColor = 'var(--background-main)'
      }
    },
  },
})
</script>
<style scoped>
footer {
  padding: 10px;
  margin-top: auto;
  letter-spacing: 0.15em;
  font-size: 0.8125rem;
  font-weight: 300;
  font-style: italic;
  color: rgb(105, 105, 105);
  text-decoration: none;
}
footer hr {
  width: 75%;
  border-width: 1px;
  border-color: rgb(149, 123, 95);
  border-radius: 10px;
  color: rgb(149, 123, 95);
  border-style: solid;
  margin-bottom: 15px;
}
footer .copyright {
  font-weight: 700;
  margin-bottom: 5px;
  margin-top: 10px;
}
footer .credits {
  font-size: 0.75rem;
}
footer .credits .link {
  text-decoration: none;
  color: rgb(105, 105, 105);
  font-weight: 500;
}
@media screen and (max-width: 650px) {
  footer .copyright {
    font-size: 0.75rem;
  }
  footer .credits {
    font-size: 0.7rem;
  }
}
</style>
