<template>
  <div class="tag" :class="matchTagToClassName">{{ value }}</div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { BookListingStatus } from '@/types'
export default Vue.extend({
  name: 'AvailabilityTag',
  props: {
    value: {
      type: String as PropType<BookListingStatus>,
    },
  },
  computed: {
    matchTagToClassName() {
      switch (this.value) {
        case BookListingStatus.ON_LOAN:
          return { error: true }
        case BookListingStatus.AVAILABLE:
          return { success: true }
        case BookListingStatus.NEW:
          return { info: true }
        case BookListingStatus.RESERVED:
          return { pending: true }
        default:
          return ''
      }
    },
  },
})
</script>

<style scoped>
.tag {
  width: fit-content;
  padding: 4px 12px;
  font-size: 0.75rem;
  font-weight: 500;
  color: white;
  border-radius: 6px;
  text-align: center;
  align-items: center;
  letter-spacing: 0.085em;
}
.tag.pending {
  background-color: var(--pending-light);
}
.tag.error {
  background-color: var(--error-light);
}
.tag.success {
  background-color: var(--success-light);
}
.tag.info {
  background-color: var(--info-light);
}
</style>
