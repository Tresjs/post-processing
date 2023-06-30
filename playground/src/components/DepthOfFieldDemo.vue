<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { EffectComposer, DepthOfField } from '@tresjs/post-processing'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'
import { OrbitControls, useTweakPane, Environment } from '@tresjs/cientos'
import { reactive } from 'vue';
const gl = {
  clearColor: '#121212',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const depthOfFieldParams = reactive({
  focusDistance: 2,
  focalLength: 0.02,
  bokehScale: 8,
})

const { pane } = useTweakPane()

pane.addInput(depthOfFieldParams, 'focusDistance', { min: 0, max: 4 })
pane.addInput(depthOfFieldParams, 'focalLength', { min: 0, max: 1 })
pane.addInput(depthOfFieldParams, 'bokehScale', { min: 0, max: 10 })
</script>

<template>
  <TresCanvas v-bind="gl" disable-render>
    <TresPerspectiveCamera :position="[0, 0, 8]" :look-at="[0, 0, 0]" />
    <OrbitControls />
    <EffectComposer >
      <DepthOfField v-bind="depthOfFieldParams" />
    </EffectComposer>
    <TresMesh>
      <TresSphereGeometry :args="[2, 32, 32]" />
      <TresMeshPhysicalMaterial :color="'hotpink'" :roughness="0.3" />
    </TresMesh>
    <TresMesh :position="[1,0, 3]">
      <TresSphereGeometry :args="[0.5, 32, 32]" />
      <TresMeshPhysicalMaterial :color="'gray'" :roughness="0.3" />
    </TresMesh>
    <TresAmbientLight :intensity="1" />
  
    <TresDirectionalLight :position="[5, 10, 0]" :intensity="0.5" />
  </TresCanvas>
</template>
