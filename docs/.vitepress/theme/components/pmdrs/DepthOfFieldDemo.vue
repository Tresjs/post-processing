<script lang="ts" setup>
import { TresCanvas } from '@tresjs/core'
import { DepthOfField, EffectComposer } from '@tresjs/post-processing/pmndrs'
import { ref } from 'vue'

import { useRouteDisposal } from '../../composables/useRouteDisposal'

const dofEffect = ref<InstanceType<typeof DepthOfField> | null>(null)

// Need to dispose of the effect composer when the route changes because Vitepress doesnt unmount the components
const { effectComposer } = useRouteDisposal()
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera
      :rotation="[-0.89, 1.28, 0.87]"
      :position="[5.55, 1.57, 1.02]"
    />
    <TresMesh :position="[-2, 1, 0]">
      <TresBoxGeometry
        :width="3"
        :height="3"
        :depth="3"
      />
      <TresMeshNormalMaterial />
    </TresMesh>
    <TresMesh :position="[3, 1, 0]">
      <TresBoxGeometry
        :width="3"
        :height="3"
        :depth="3"
      />
      <TresMeshNormalMaterial />
    </TresMesh>
    <TresGridHelper />
    <EffectComposer ref="effectComposer">
      <DepthOfField
        ref="dofEffect"
        :focus-distance="0.0012"
        :world-focus-distance="2"
        :world-focus-range="2"
        :bokeh-scale="8"
        :focus-range="0.0055"
      />
    </EffectComposer>
  </TresCanvas>
</template>
