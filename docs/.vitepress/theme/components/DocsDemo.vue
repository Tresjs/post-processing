<script setup lang="ts">
</script>

<template>
  <ClientOnly>
    <div
      class="relative"
      style="height: auto; margin: 2rem 0; border-radius: 8px; overflow:hidden;"
    >
      <Suspense>
        <slot></slot>
      </Suspense>
    </div>
  </ClientOnly>
</template>

<style scoped>
.relative canvas {
  aspect-ratio: 16 / 9;
}
</style>
