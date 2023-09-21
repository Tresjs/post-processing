<script lang="ts" setup>
// eslint-disable-next-line import/no-named-as-default
import gsap from 'gsap'
import { ref } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { EffectComposer, DepthOfField } from '@tresjs/post-processing'

const focusDistance = ref(0.0012)

const toggleFocusDistance = () => {
  gsap.to(focusDistance, {
    value: focusDistance.value === 0.0012 ? 0.0017 : 0.0012,
    duration: 0.3,
    ease: 'power2',
  })
}
</script>

<template>
  <button
    class="
      absolute
      rounded
      px-2 py-1
      bg-white/15
      top-2.5
      right-2
      z-10
      ring-1
      ring-inset
      ring-gray-400/50
      hover:bg-gray-400/40
      active:bg-gray-400/50
      font-semibold
      transition-colors
    "
    @click="toggleFocusDistance"
  >
    toggle focus
  </button>
  <TresCanvas>
    <TresPerspectiveCamera
      :rotation="[-0.89, 1.28, 0.87]"
      :position="[5.55, 1.57, 1.02]"
    />
    <TresMesh :position="[-2, 1, 0]">
      <TresBoxGeometry
        :width="3"
        :height="3"
        :depth="3"
      />
      <TresMeshNormalMaterial />
    </TresMesh>
    <TresMesh :position="[3, 1, 0]">
      <TresBoxGeometry
        :width="3"
        :height="3"
        :depth="3"
      />
      <TresMeshNormalMaterial />
    </TresMesh>
    <TresGridHelper />
    <EffectComposer>
      <DepthOfField
        :focus-distance="focusDistance"
        :world-focus-distance="2"
        :world-focus-range="1"
        :bokeh-scale="8"
        :focus-range="0.005"
      />
    </EffectComposer>
  </TresCanvas>
</template>
