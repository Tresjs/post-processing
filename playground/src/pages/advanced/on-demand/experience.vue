<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { useTres } from '@tresjs/core'
import { EffectComposer, Pixelation } from '@tresjs/post-processing'
import { useState } from '../../../composables/state'

const { invalidate } = useTres()

function onControlChange() {
  invalidate()
}

const { renderingTimes } = useState()

function onRender() {
  renderingTimes.value = 1
}
</script>

<template>
  <TresPerspectiveCamera
    :position="[5, 5, 5]"
    :look-at="[0, 0, 0]"
  />
  <OrbitControls @change="onControlChange" />
  <TresMesh
    :position="[-3.5, 1, 0]"
  >
    <TresConeGeometry :args="[1.25, 2, 4, 1, false, Math.PI * 0.25]" />
    <TresMeshNormalMaterial />
  </TresMesh>

  <TresMesh :position="[0, 1, 0]">
    <TresBoxGeometry :args="[2, 2, 2]" />
    <TresMeshNormalMaterial />
  </TresMesh>

  <TresMesh :position="[3.5, 1, 0]">
    <TresSphereGeometry />
    <TresMeshNormalMaterial />
  </TresMesh>

  <TresGridHelper />

  <EffectComposer @render="onRender">
    <Pixelation :granularity="10" />
  </EffectComposer>
</template>
