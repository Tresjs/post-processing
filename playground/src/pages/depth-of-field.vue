<script lang="ts" setup>
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { EffectComposer, DepthOfField } from '@tresjs/post-processing'
import { TresLeches, useControls } from '@tresjs/leches'
import '@tresjs/leches/styles'

import type { Ref } from 'vue'
import { reactive, computed } from 'vue'
import { CONTROLS_CONTEXT_KEY } from '@tresjs/leches/dist/composables/useControls.js'

const paneElements = reactive({
  focusDistance: 1,
  focalLength: 0.02,
  bokehScale: 5,
})

useControls('fpsgraph')
const controls = useControls({
  focusDistance: {
    value: 1,
    min: 0,
    max: 1,
    step: 0.01,
  },
  worldFocusDistance: {
    value: 0.2,
    min: 0,
    max: 1,
    step: 0.001,
  },
  bokehScale: {
    value: 2,
    min: 1,
    max: 5,
    step: 0.001,
  },
  focalLength: {
    value: 0.04,
    min: 0,
    max: 1,
    step: 0.001,
  },
}) as { [key: string]: Ref<{ value: number }> }

const effectParams = computed(() => 
  Object
    .entries(controls)
    .reduce(
      (acc, [key, value]) => ({ ...acc, [key]: value.value.value })
      , {},
    ),
)
</script>

<template>
  <TresLeches />
  <TresCanvas>
    <TresPerspectiveCamera
      :position="[5, 2, 1]"
      :look-at="[0, 1, 2]"
    />
    <OrbitControls />
    <template
      v-for="i in 5"
      :key="i"
    >
      <TresMesh :position="[i * 1.1 - 2.8, 1, 0]">
        <TresBoxGeometry
          :width="4"
          :height="4"
          :depth="4"
        />
        <TresMeshNormalMaterial />
      </TresMesh>
    </template>
    <TresGridHelper />

    <EffectComposer>
      <DepthOfField v-bind="effectParams" />
    </EffectComposer>
  </TresCanvas>
</template>
