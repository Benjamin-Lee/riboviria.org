<template>
  <div
    class="my-12 px-4 prose prose-sm md:prose prose-green lg:prose-lg mx-auto"
  >
    <!-- <TheHeader v-if="page.title">{{ page.title }}</TheHeader> -->
    <nuxt-content :document="page" />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return { page: undefined as any }
  },
  async fetch() {
    this.page = await this.$content(this.$route.params.page).fetch()
  },
})
</script>

<style lang="postcss">
.prose h1 {
  @apply text-xl md:text-2xl lg:text-3xl font-bold leading-tight text-gray-900 text-center;
}
</style>
