<script setup lang="ts">
import { Environment, OrbitControls } from '@tresjs/cientos'
import { TresCanvas, useTexture } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { EffectComposerPmndrs, LensDistortionPmndrs } from '@tresjs/post-processing'
import { BackSide, NoToneMapping, SRGBColorSpace, Vector2 } from 'three'

import '@tresjs/leches/styles'

const gl = {
  toneMapping: NoToneMapping,
  multisampling: 8,
}

const { distortion, principalPoint, focalLength, skew } = useControls({
  distortion: { value: new Vector2(0.5, 0.5), min: 0, max: 1, step: 0.001 },
  principalPoint: { value: new Vector2(0.0, 0.0), min: 0, max: 1, step: 0.001 },
  focalLength: { value: new Vector2(0.5, 0.5), min: 0, max: 2, step: 0.001 },
  skew: { value: 0, min: -1, max: 1, step: 0.001 },
})

const pbrTexture = await useTexture({
  map: '/lens-distortion/room-map.png',
  normalMap: '/lens-distortion/room-normal.png',
})

pbrTexture.map.colorSpace = SRGBColorSpace
</script>

<template>
  <TresLeches style="left: initial;right:10px; top:10px;" />

  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera
      :position="[-2, 1, 5]"
    />
    <OrbitControls auto-rotate />

    <TresMesh :position="[0, 2, 0]">
      <TresBoxGeometry :args="[8, 8, 8]" />
      <TresMeshStandardMaterial :side="BackSide" :map="pbrTexture.map" :normal-map="pbrTexture.normalMap" />
    </TresMesh>

    <TresMesh :position="[0, 0, 0]">
      <TresBoxGeometry :args="[1.65, 1.65, 1.65]" />
      <TresMeshNormalMaterial />
    </TresMesh>

    <TresAmbientLight :intensity="2" />

    <Suspense>
      <Environment background :blur=".25" preset="snow" />
    </Suspense>

    <Suspense>
      <EffectComposerPmndrs>
        <LensDistortionPmndrs
          :distortion="distortion.value"
          :principalPoint="principalPoint.value"
          :focalLength="focalLength.value"
          :skew="skew.value"
        />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
