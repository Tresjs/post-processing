<script lang="ts" setup>
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { EffectComposer, DepthOfField } from '@tresjs/post-processing'
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera
      :look-at="[0, 1, 2]"
      :position="[5, 2, 1]"
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
      <DepthOfField
        :focus-distance="0.001" 
        :world-focus-distance="3.8"
        :bokeh-scale="10"
        :focus-range="0.0018"
      />
    </EffectComposer>
  </TresCanvas>
</template>
