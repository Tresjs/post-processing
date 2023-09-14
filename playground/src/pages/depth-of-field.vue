<script lang="ts" setup>
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { EffectComposer, DepthOfField } from '@tresjs/post-processing'
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera
      :position="[1, 3, 3]"
      :look-at="[2, 2, 2]"
    />
    <OrbitControls />
    <template
      v-for="i in 5"
      :key="i"
    >
      <TresMesh :position="[i * 1.1 - 2.8, 1, 0]">
        <TresBoxGeometry
          :width="4"
          :height="4"
          :depth="4"
        />
        <TresMeshNormalMaterial />
      </TresMesh>
    </template>
    <TresGridHelper />

    <EffectComposer>
      <DepthOfField />
    </EffectComposer>
  </TresCanvas>
</template>
