<template>
  <div class="space-y-8">
    <!-- Data format picker -->
    <div>
      <label class="text-base font-medium text-gray-900">Data types</label>
      <p class="text-sm leading-5 text-gray-500">
        Which types of data do you want to download?
      </p>
      <fieldset class="mt-4">
        <legend class="sr-only">Data type</legend>
        <div
          class="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10"
        >
          <div
            v-for="format in allFormats.filter((x) => x !== 'Tree' || tree)"
            :key="format"
            class="flex items-center"
          >
            <input
              :id="`format-${format}`"
              name="notification-method"
              type="checkbox"
              :checked="formats.includes(format)"
              class="focus:ring-green-500 h-4 w-4 text-green-500 border-gray-300 rounded"
              @change="
                formats = formats.includes(format)
                  ? formats.filter((x) => x !== format)
                  : formats.concat(format)
              "
            />
            <label
              :for="`format-${format}`"
              class="ml-3 block text-sm font-medium text-gray-700"
            >
              {{ format }}
            </label>
            <span
              v-if="format === 'Annotations'"
              class="ml-2 inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800"
            >
              Beta
            </span>
          </div>
        </div>
      </fieldset>
    </div>

    <!-- Curl command display -->
    <div
      class="flex rounded bg-gray-800 text-white font-mono text-sm items-center justify-between"
    >
      <pre class="select-none flex-none pl-4 mr-2">$</pre>
      <pre class="grow overflow-x-scroll scrollbar-hide mr-4 py-4">{{
        command
      }}</pre>
      <button
        type="button"
        class="hover:bg-gray-700 ml-auto p-4 rounded-r inline-flex items-center focus:outline-none border-l border-white"
        @click="copyCurl"
      >
        <svg
          v-if="!copied"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <svg
          v-if="copied"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
type Format =
  | 'Sequences'
  | 'Metadata'
  | 'Annotations'
  | 'Tree'
  | 'IMG scaffold cart'
export default Vue.extend({
  props: {
    baseUrl: {
      type: String,
      required: true,
    },
    // whether to display the tree option select
    // needed since taxa with one sequence don't have a tree
    tree: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      allFormats: [
        'Sequences',
        'Metadata',
        'Annotations',
        'Tree',
        'IMG scaffold cart',
      ] as Format[],
      formats: [
        'Sequences',
        'Metadata',
        'Annotations',
        'Tree',
        'IMG scaffold cart',
      ] as Format[],
      copied: false,
    }
  },
  computed: {
    command(): string {
      const urls = []
      const extension = {
        Sequences: '_Contigs.fasta.gzip',
        Metadata: '_Info.tsv',
        Annotations: '_HMMatches.tsv',
        Tree: '_subtree.newick',
        'IMG scaffold cart': '_IMG_Scaffold_cart.txt',
      }
      const taxonName = this.baseUrl.split('/').pop()

      // if all formats are selected, use the zip file instead
      if (
        // normal case (all formats selected)
        this.formats.length === this.allFormats.length ||
        // if there's no tree, we can still download the zip file if all other formats are selected
        (!this.tree &&
          this.formats.length === this.allFormats.length - 1 &&
          !this.formats.includes('Tree'))
      ) {
        return `curl -LOJ ${this.baseUrl}/${taxonName}.zip`
      }

      for (const format of this.formats.filter(
        (x) => x !== 'Tree' || this.tree
      )) {
        urls.push(`-LOJ ${this.baseUrl}/${taxonName}${extension[format]}`)
      }

      return urls.length ? `curl ${urls.join(' ')}` : 'echo "No data selected"'
    },
  },
  methods: {
    copyCurl() {
      navigator.clipboard.writeText(this.command)
      this.copied = true
      setTimeout(() => {
        this.copied = false
      }, 1000)
    },
  },
})
</script>
<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
