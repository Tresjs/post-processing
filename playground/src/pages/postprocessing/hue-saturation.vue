<script setup lang="ts">
import { Environment, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { EffectComposer } from '@tresjs/post-processing/pmndrs'
import { ToneMappingMode } from 'postprocessing'
import { NoToneMapping } from 'three'

import '@tresjs/leches/styles'

const gl = {
  toneMapping: NoToneMapping,
  multisampling: 8,
}

const { resolution, mode } = useControls({

  mode: {
    value: ToneMappingMode.AGX,
    options: [
      { text: 'LINEAR', value: ToneMappingMode.LINEAR },
      { text: 'REINHARD', value: ToneMappingMode.REINHARD },
      { text: 'REINHARD2', value: ToneMappingMode.REINHARD2 },
      { text: 'REINHARD2_ADAPTIVE', value: ToneMappingMode.REINHARD2_ADAPTIVE },
      { text: 'UNCHARTED2', value: ToneMappingMode.UNCHARTED2 },
      { text: 'OPTIMIZED_CINEON', value: ToneMappingMode.OPTIMIZED_CINEON },
      { text: 'CINEON', value: ToneMappingMode.CINEON },
      { text: 'ACES_FILMIC', value: ToneMappingMode.ACES_FILMIC },
      { text: 'AGX', value: ToneMappingMode.AGX },
      { text: 'NEUTRAL', value: ToneMappingMode.NEUTRAL },
    ],
  },
  resolution: {
    value: 256,
    options: [
      { text: '128', value: 128 },
      { text: '256', value: 256 },
      { text: '512', value: 512 },
      { text: '1024', value: 1024 },
      { text: '2048', value: 2048 },
    ],
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

    <TresMesh :position="[0, 1, 0]">
      <TresBoxGeometry :args="[2, 2, 2]" />
      <TresMeshPhysicalMaterial color="#F57BAD" :roughness=".25" :transmission=".85" />
    </TresMesh>

    <Suspense>
      <Environment :intensity="2" background :blur=".25" preset="dawn" />
    </Suspense>

    <Suspense>
      <!-- <EffectComposer> -->
      <!-- <ToneMapping :mode="Number(mode.value)" :resolution="Number(resolution.value)" /> -->
      <!-- </EffectComposer> -->
    </Suspense>
  </TresCanvas>
</template>
