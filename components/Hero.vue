<template>
  <div>
    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="relative bg-white">
      <main class="lg:relative">
        <div
          class="mx-auto max-w-7xl w-full pt-16 pb-20 text-center lg:py-48 lg:text-left"
        >
          <div class="px-4 lg:w-1/2 sm:px-8 xl:pr-16">
            <h1
              class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl"
            >
              <span class="block"
                >The RNA Viruses in Metatransciptomes Discovery Project"</span
              >
              <!-- <span class="block text-green-500 xl:inline">RNA virome</span> -->
            </h1>
            <p
              class="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl"
            >
              The RNA Viruses in Metatransciptomes (RVMT) database is a
              comprehensive, open-access dataset of RNA virome data from around
              the world.
            </p>
            <div class="mt-10 sm:flex sm:justify-center lg:justify-start">
              <div class="rounded-md shadow">
                <NuxtLink
                  to="/download"
                  class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-500 hover:bg-green-600 md:py-4 md:text-lg md:px-10"
                >
                  Get the data
                </NuxtLink>
              </div>
              <div class="mt-3 rounded-md sm:mt-0 sm:ml-3">
                <a
                  href="https://doi.org/10.1101/2022.02.15.480533"
                  target="_blank"
                  class="w-full flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-green-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                >
                  Read the preprint
                </a>
              </div>
            </div>
          </div>
        </div>
        <div
          class="relative w-full h-64 sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full"
        >
          <picture>
            <source
              srcset="
                /TmpTree_circ_ultra_perm_code_lysis_crispr.2022-01-13.webp
              "
              type="image/webp"
            />
            <img
              class="absolute inset-0 w-full h-full object-cover"
              src="/TmpTree_circ_ultra_perm_code_lysis_crispr.2022-01-13.gif"
              alt=""
            />
          </picture>
        </div>
      </main>
    </div>
  </div>
</template>
