<template>
  <div>
    <!-- This example requires Tailwind CSS v2.0+ -->
    <div id="download" class="bg-white">
      <div class="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <!-- Info text -->
        <div class="sm:flex sm:flex-col sm:align-center">
          <h1 class="text-5xl font-extrabold text-gray-900 sm:text-center">
            Download
          </h1>
          <p
            class="mt-5 text-xl text-gray-500 sm:text-center lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0"
          >
            All data types&mdash;including sequences, trees, and
            annotations&mdash;are available from the National Energy Research
            Scientific Computing Center.
          </p>
        </div>
        <!-- Taxon picker -->
        <div
          class="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-4"
        >
          <Taxon
            name="Phylum-level"
            :choices="
              tree.children
                .map((x) => x.name)
                .filter((x) => !x.startsWith('RiboV1'))
            "
            :current-choice="phylum"
            @change="onChange('phylum', $event)"
          ></Taxon>
          <Taxon
            name="Class-level"
            :choices="classes"
            :current-choice="Class"
            @change="onChange('Class', $event)"
          ></Taxon>
          <Taxon
            name="Order-level"
            :choices="orders"
            :current-choice="order"
            @change="onChange('order', $event)"
          ></Taxon>
          <Taxon
            name="Family-level"
            :choices="families"
            :current-choice="family"
            @change="onChange('family', $event)"
          ></Taxon>
        </div>
        <p
          class="text-center text-sm mt-4"
          :class="{
            'text-gray-600': sequences !== 1,
            'text-red-600': sequences === 1,
          }"
        >
          {{
            `${Number(sequences).toLocaleString()} sequence${
              sequences === 1 ? '' : 's'
            } selected${
              sequences === 1
                ? '.\nWarning: since there is only 1 sequence, there is no tree.'
                : ''
            }`
          }}
        </p>
        <!-- Download buttons -->
        <div class="flex justify-center mt-12 sm:mt-16">
          <div class="grid sm:grid-cols-3 gap-4">
            <a
              :href="downloadUrl + '/' + downloadUrl.split('/').pop() + '.zip'"
              target="_blank"
              class="text-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <span>Download zipped</span>
            </a>
            <a
              :href="downloadUrl"
              target="_blank"
              class="text-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-green-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Browse FTP
            </a>
            <button
              role="button"
              class="text-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-green-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              @click="showCurl = !showCurl"
            >
              Get curl command
            </button>
          </div>
        </div>
        <Curl
          v-if="showCurl"
          :base-url="downloadUrl"
          :tree="sequences > 1"
          class="mt-12 sm:mt-16 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0"
        ></Curl>

        <!-- <div class="relative my-10">
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center">
            <span class="px-2 bg-white text-sm text-gray-500">
              Excel
            </span>
          </div>
        </div>

        <div class="flex justify-center space-x-6 text-gray-500">
          <a href="">RdRPs</a>
          <a href="">vrANI90 clusters</a>
          <a href="">Contigs</a>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import tree from '~/treeV1.4.json'
import stats from '~/statsV1.4.json'

interface Node {
  name: string
  children: Node[]
  sequences?: number // used in neristats
}

export default Vue.extend({
  data() {
    return {
      phylum: '',
      Class: '',
      order: '',
      family: '',
      tree: tree as Node,
      stats: stats as Node,
      showCurl: false,
    }
  },
  computed: {
    classes(): string[] {
      return (
        this.tree.children
          .find((x) => x.name === this.phylum)
          ?.children.map((x) => x.name)
          .filter((x) => !x.startsWith(this.phylum)) ?? []
      )
    },
    orders(): string[] {
      return (
        this.tree.children
          .find((x) => x.name === this.phylum)
          ?.children.find((x) => x.name === this.Class)
          ?.children.map((x) => x.name)
          .filter((x) => !x.startsWith(this.Class)) ?? []
      )
    },
    families(): string[] {
      return (
        this.tree.children
          .find((x) => x.name === this.phylum)!
          ?.children.find((x) => x.name === this.Class)!
          ?.children.find((x) => x.name === this.order)!
          ?.children.map((x) => x.name)
          .filter((x) => !x.startsWith(this.order)) ?? []
      )
    },
    /** Note: the downloadUrl mustn't end in a / or else the split for the zip link won't work */
    downloadUrl(): string {
      return `https://portal.nersc.gov/dna/microbial/prokpubs/Riboviria/RiboV1.4${
        this.phylum ? '/' + this.phylum : ''
      }${this.Class ? '/' + this.Class : ''}${
        this.order ? '/' + this.order : ''
      }${this.family ? '/' + this.family : ''}`
    },
    sequences(): number {
      // find the taxon to get the number of sequences
      const taxon = [
        'RiboV1.4',
        this.phylum,
        this.Class,
        this.order,
        this.family,
      ]
        .filter((x) => x)
        .pop()!

      // recursive search for the node with the name of the taxon
      function search(node: Node): Node | undefined {
        if (node.name === taxon) return node
        if (node.children) {
          for (const child of node.children) {
            const result = search(child)
            if (result) return result
          }
        }
        return undefined
      }

      // find the node in the stats
      const found = search({ ...this.stats })
      if (!found) return 0

      return found.children.find((x) => x.sequences)?.sequences ?? 0
    },
  },
  methods: {
    onChange(level: 'phylum' | 'Class' | 'order' | 'family', choice: string) {
      switch (level) {
        case 'phylum':
          this.Class = ''
          this.order = ''
          this.family = ''
          break
        case 'Class':
          this.order = ''
          this.family = ''
          break
        case 'order':
          this.family = ''
          break
        default:
          break
      }
      this[level] = choice
    },
  },
})
</script>
