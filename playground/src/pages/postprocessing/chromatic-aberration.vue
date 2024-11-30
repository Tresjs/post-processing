<script setup lang="ts">
import { ContactShadows, Environment, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { ChromaticAberration, EffectComposer } from '@tresjs/post-processing/pmndrs'
import { NoToneMapping, Vector2 } from 'three'
import { watchEffect } from 'vue'

import '@tresjs/leches/styles'

const gl = {
  clearColor: '#ffffff',
  toneMapping: NoToneMapping,
  multisampling: 8,
  envMapIntensity: 10,
}

const { offsetX, offsetY, radialModulation, modulationOffset } = useControls({
  offsetX: { value: 0.085, step: 0.001, max: 0.5 },
  offsetY: { value: 0.0, step: 0.001, max: 0.5 },
  radialModulation: false,
  modulationOffset: { value: 0, step: 0.01 },
})

watchEffect(() => {
  modulationOffset.value.visible = radialModulation.value.value
})
</script>

<template>
  <TresLeches />

  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera
      :position="[5, 5, 5]"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls auto-rotate />

    <TresMesh :position="[0, .5, 0]">
      <TresBoxGeometry :args="[2, 2, 2]" />
      <TresMeshPhysicalMaterial color="#82DBC5" :roughness=".25" />
    </TresMesh>

    <ContactShadows
      :opacity="1"
      :position-y="-.5"
    />

    <Suspense>
      <EffectComposer>
        <ChromaticAberration :offset="new Vector2(offsetX.value, offsetY.value)" :radial-modulation="radialModulation.value" :modulation-offset="modulationOffset.value" />
      </EffectComposer>
    </Suspense>
  </TresCanvas>
</template>
