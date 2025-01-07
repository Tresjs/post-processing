<script setup lang="ts">
import { ContactShadows, Environment, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { NoToneMapping, Vector3 } from 'three'
import { shallowRef } from 'vue'
import { EffectComposerPmndrs, ShockWavePmndrs } from '@tresjs/post-processing'

import '@tresjs/leches/styles'

const gl = {
  clearColor: '#ffffff',
  toneMapping: NoToneMapping,
  multisampling: 8,
}

const shockWaveRef = shallowRef(null)

const { positionX, positionY, positionZ, amplitude, waveSize, speed, maxRadius } = useControls({
  positionX: { value: 0.5, step: 0.01, max: 1.0 },
  positionY: { value: 0.5, step: 0.01, max: 1.0 },
  positionZ: { value: 0.5, step: 0.01, max: 1.0 },
  amplitude: { value: 0.1, step: 0.01, max: 1.0 },
  waveSize: { value: 0.1, step: 0.01, max: 1.0 },
  speed: { value: 1.0, step: 0.1, max: 10.0 },
  maxRadius: { value: 1.0, step: 0.1, max: 10.0 },
})
</script>

<template>
  <TresLeches style="left: initial;right:10px; top:10px;" />

  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera
      :position="[5, 5, 5]"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls auto-rotate />

    <template
      v-for="i in 4"
      :key="i"
    >
      <TresMesh
        :position="[((i - 1) - (4 - 1) / 2) * 1.5, 0, 0]"
      >
        <TresBoxGeometry
          :width="4"
          :height="4"
          :depth="4"
        />
        <TresMeshStandardMaterial color="#1C1C1E" />
      </TresMesh>
    </template>

    <TresAmbientLight color="#ffffff" />

    <TresDirectionalLight />

    <ContactShadows
      :opacity="1"
      :position-y="-.5"
      :scale="20"
      :blur=".85"
    />

    <Suspense>
      <EffectComposerPmndrs>
        <ShockWavePmndrs ref="shockWaveRef" :position="new Vector3(positionX.value, positionY.value, positionZ.value)" :amplitude="amplitude.value" :waveSize="waveSize.value" :speed="speed.value" :maxRadius="maxRadius.value" />
      </EffectComposerPmndrs>
    </Suspense>

    <Suspense>
      <Environment :intensity="2" :blur="0" preset="snow" />
    </Suspense>
  </TresCanvas>
</template>
