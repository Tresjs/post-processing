<script setup lang="ts">
import {
  advancedRoutes,
  routes,
} from '../router'

const [_home, ...restRoutes] = routes

const sections = [
  {
    icon: '🤓',
    title: 'Advanced',
    routes: advancedRoutes,
  },
]
</script>

<template>
  <div
    class="
  container mx-auto max-w-3xl
  font-sans text-xs color-gray
  bg-white
  "
  >
    <div class="mx-4">
      <div
        class="
    mt-24 mb-12 text-center align-baseline items-center gap-6
    sm:mt-16 sm:mb-6 sm:text-left sm:flex sm:flex-row-reverse
    "
      >
        <div>
          <img
            src="/logo.svg"
            alt="Post-processing logo"
            class="max-w-36 sm:max-w-xs align-baseline"
          />
        </div>
        <div class="sm:w-2/3">
          <h1
            class="
        w-auto max-w-75 mx-auto text-5xl text-zinc-700 mb-3
        sm:mx-none sm:w-1/2 sm:max-w-72
        "
          >
            <span class="text-cientos-blue">Post-processing</span> Playground
          </h1>
          <p class="text-lg">
            Testing zone for TresJS/post-processing components
          </p>
        </div>
      </div>
      <div class="text-center sm:text-left sm:grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        <router-link
          v-for="{ name, path, meta } in restRoutes"
          :key="name"
          :to="path"
          class="
          p-4 my-4 leading-normal no-underline size-m weight-600 bg-zinc-50 rounded
          sm:my-0
          "
        >
          <div class="inline-block p-2 p-x-3 m-b-3 text-2xl bg-zinc-200 rounded">
            {{ meta.icon }}
          </div>
          <h2 class="text-sm p-0 m-0 mb-1.5 font-semibold text-zinc-600">
            {{ name }}
          </h2>
        </router-link>
        <div
          v-for="{ title, routes: internalRoutes, icon } in sections"
          :key="title"
          class="
          p-4 my-4 leading-normal size-m weight-600 bg-zinc-50 rounded
          sm:my-0
          "
        >
          <div class="inline-block p-2 p-x-3 m-b-3 text-2xl bg-zinc-200 rounded">
            {{ icon }}
          </div>
          <h2 class="text-sm p-0 m-0 mb-1.5 font-semibold text-zinc-600">
            {{ title }}
          </h2>
          <div
            v-for="route in internalRoutes"
            :key="route.name"
            class="link-wrapper"
          >
            <router-link
              class="no-underline text-zinc-700 visited:text-zinc-400 hover:text-cientos-blue"
              :to="route.path"
            >
              <span>{{ route.name }} </span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
