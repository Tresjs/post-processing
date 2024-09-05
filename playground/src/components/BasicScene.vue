<script lang="ts" setup>
import { TresCanvas } from '@tresjs/core'
import { EffectComposerThree, PixelationThree } from '@tresjs/post-processing'
import { OrbitControls } from '@tresjs/cientos'

defineProps<{
  wireframe?: boolean
}>()
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera
      :position="[5, 5, 5]"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls />
    <TresMesh
      :position="[-3.5, 1, 0]"
    >
      <TresConeGeometry :args="[1.25, 2, 4, 1, false, Math.PI * 0.25]" />
      <TresMeshNormalMaterial :wireframe="wireframe" />
    </TresMesh>

    <TresMesh :position="[0, 1, 0]">
      <TresBoxGeometry :args="[2, 2, 2]" />
      <TresMeshNormalMaterial :wireframe="wireframe" />
    </TresMesh>

    <TresMesh :position="[3.5, 1, 0]">
      <TresSphereGeometry />
      <TresMeshNormalMaterial :wireframe="wireframe" />
    </TresMesh>

    <TresGridHelper />
    <EffectComposerThree>
      <slot name="effects"></slot>
    </EffectComposerThree>
  </TresCanvas>
</template>
