<template>
  <div>
    <!-- This example requires Tailwind CSS v2.0+ -->
    <div>
      <label for="location" class="block text-sm font-medium text-gray-700">{{
        name
      }}</label>
      <select
        id="location"
        name="location"
        class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
        :class="{ italic: currentChoice }"
        @input="$emit('change', $event.target.value)"
      >
        <option value="" selected>All</option>
        <option v-for="choice in choices" :key="choice">{{ choice }}</option>
      </select>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    name: {
      type: String,
      required: true,
    },
    choices: {
      type: Array as () => string[],
      required: true,
    },
    currentChoice: {
      type: String,
      required: true,
    },
  },
})
</script>
