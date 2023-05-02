<script setup lang="ts">
import { Color } from 'three'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, useTweakPane } from '@tresjs/cientos'
import { EffectComposer, Bloom } from '@post'
import { BasicShadowMap, NoToneMapping } from 'three'
import { reactive, ref } from 'vue'
import { watchEffect } from 'vue'
import { onMounted } from 'vue'

const gl = {
  clearColor: '#121212',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  toneMapping: NoToneMapping,
}

const bloomParams = reactive({
  luminanceThreshold: 0.1,
  luminanceSmoothing: 0.3,
  mipmapBlur: true,
  intensity: 4.0,
  radius: 0.85,
})

const { pane } = useTweakPane()

pane.addInput(bloomParams, 'luminanceThreshold', { min: 0, max: 1 })
pane.addInput(bloomParams, 'luminanceSmoothing', { min: 0, max: 1 })
pane.addInput(bloomParams, 'mipmapBlur')
pane.addInput(bloomParams, 'intensity', { min: 0, max: 10 })
pane.addInput(bloomParams, 'radius', { min: 0, max: 1 })

const materialRef = ref(null)

onMounted(() => {
  if (materialRef.value) {
    pane.addInput(materialRef.value, 'emissiveIntensity', { min: 0, max: 10, step: 0.1 })
  }
})
</script>

<template>
  <TresCanvas v-bind="gl" disable-render>
    <TresPerspectiveCamera :position="[5, 5, 5]" :look-at="[0, 0, 0]" />
    <OrbitControls />
    <!--     <TresMesh>
      <TresSphereGeometry :args="[2, 32, 32]" />
      <TresMeshStandardMaterial color="hotpink" :emissive="new Color('hotpink')" :emissive-intensity="9" />
    </TresMesh> -->
    <TresMesh :position="[2, 2, 2]">
      <TresSphereGeometry :args="[2, 32, 32]" />
      <TresMeshStandardMaterial color="hotpink" />
    </TresMesh>
    <TresMesh>
      <TresSphereGeometry :args="[2, 32, 32]" />
      <TresMeshStandardMaterial
        ref="materialRef"
        color="hotpink"
        :emissive="new Color('hotpink')"
        :emissive-intensity="0.1"
      />
    </TresMesh>
    <TresGridHelper />
    <TresAmbientLight :intensity="0.5" />
    <TresDirectionalLight :position="[3, 3, 3]" :intensity="1" />
    <Suspense>
      <EffectComposer>
        <Bloom v-bind="bloomParams"> </Bloom>
      </EffectComposer>
    </Suspense>
  </TresCanvas>
</template>