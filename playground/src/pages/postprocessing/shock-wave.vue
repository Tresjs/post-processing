<script setup lang="ts">
import { ContactShadows, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { NoToneMapping, Vector3 } from 'three'
import { watchEffect } from 'vue'
import { BlendFunction } from 'postprocessing'
import { EffectComposerPmndrs, ShockWavePmndrs } from '@tresjs/post-processing'

import '@tresjs/leches/styles'

const gl = {
  clearColor: '#ffffff',
  toneMapping: NoToneMapping,
  multisampling: 8,
  envMapIntensity: 10,
}

const { centerX, centerY, centerZ, amplitude, wavelength, speed, blendFunction } = useControls({
  centerX: { value: 0.5, step: 0.01, max: 1.0 },
  centerY: { value: 0.5, step: 0.01, max: 1.0 },
  centerZ: { value: 0.5, step: 0.01, max: 1.0 },
  amplitude: { value: 0.1, step: 0.01, max: 1.0 },
  wavelength: { value: 0.1, step: 0.01, max: 1.0 },
  speed: { value: 1.0, step: 0.1, max: 10.0 },
  blendFunction: {
    options: Object.keys(BlendFunction).map(key => ({
      text: key,
      value: BlendFunction[key],
    })),
    value: BlendFunction.SRC,
  },
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
      <EffectComposerPmndrs>
        <ShockWavePmndrs :center="new Vector3(centerX.value, centerY.value, centerZ.value)" :amplitude="amplitude.value" :wavelength="wavelength.value" :speed="speed.value" :blendFunction="Number(blendFunction.value)" />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
