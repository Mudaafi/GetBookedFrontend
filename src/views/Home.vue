<template>
  <div class="home">
    <!-- <img src="../assets/getbooked_logo.png" alt="Logo" /> -->
    <div v-for="book in books" :key="book.id">
      <h3>{{ book.title }}</h3>
      <img :src="book.imgFrontUrl" :alt="book.isbn" />
    </div>
    <div>Line Break!</div>
    <input v-model="entry" />
    <button @click="fetchData">Get Data</button>
    <button @click="postData({ data: entry, cell: 'A1' })">Write Data</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// @ is an alias to /src
import { ActionType, GetterType } from '@/store/types'
import { mapActions, mapGetters } from 'vuex'

export default Vue.extend({
  name: 'Home',
  computed: {
    ...mapGetters({
      books: GetterType.GET_BOOKS,
    }),
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
