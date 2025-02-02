<script setup lang="ts">
import { ContactShadows, Environment, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { NoToneMapping } from 'three'
import { BlendFunction } from 'postprocessing'
import { EffectComposerPmndrs, FishEyePmndrs } from '@tresjs/post-processing'

import '@tresjs/leches/styles'

const gl = {
  clearColor: '#ffffff',
  toneMapping: NoToneMapping,
  multisampling: 8,
  envMapIntensity: 10,
}

const neonColors = [
  '#FF00FF', // Magenta
  '#00FFFF', // Cyan
  '#00FF00', // Lime
  '#FFFF00', // Yellow
  '#FF0000', // Red
  '#FF1493', // Deep Pink
  '#7FFF00', // Chartreuse
  '#FF4500', // Orange Red
  '#8A2BE2', // Blue Violet
  '#00FF7F', // Spring Green
  '#FFD700', // Gold
  '#FF69B4', // Hot Pink
  '#ADFF2F', // Green Yellow
  '#FF6347', // Tomato
  '#40E0D0', // Turquoise
  '#EE82EE', // Violet
]

const { blendFunction, lensSX, lensSY, lensFX, lensFY, scale } = useControls({
  blendFunction: {
    options: Object.keys(BlendFunction).map(key => ({
      text: key,
      value: BlendFunction[key as keyof typeof BlendFunction],
    })),
    value: BlendFunction.NORMAL,
  },
  lensSX: { value: 1.0, step: 0.01, min: 0, max: 2 },
  lensSY: { value: 1.0, step: 0.01, min: 0, max: 2 },
  lensFX: { value: 0.0, step: 0.01, min: -1, max: 1 },
  lensFY: { value: 1.0, step: 0.01, min: -1, max: 1 },
  scale: { value: 1.0, step: 0.01, min: 0.1, max: 2 },
})
</script>

<template>
  <TresLeches />

  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera
      :position="[0, 6.5, 6.5]"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls auto-rotate />

    <TresAmbientLight :intensity="1" />

    <template v-for="(color, index) in neonColors" :key="index">
      <TresMesh :position="[index % 4 * 2 - 3, 0, Math.floor(index / 4) * 2 - 3]">
        <TresBoxGeometry :args="[2, 2, 2]" />
        <TresMeshStandardMaterial :color="color" :roughness=".5" :metalness="1" />
      </TresMesh>
    </template>

    <Suspense>
      <Environment background :blur="0" preset="shangai" />
    </Suspense>

    <TresDirectionalLight color="white" />

    <ContactShadows
      :opacity=".65"
      :position-y="-1"
      :scale="35"
      :blur="1"
    />

    <Suspense>
      <EffectComposerPmndrs>
        <FishEyePmndrs
          :blendFunction="Number(blendFunction)"
          :lensS="[lensSX, lensSY]"
          :lensF="[lensFX, lensFY]"
          :scale="scale"
        />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
