<script lang="ts" setup>
import { ref } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { EffectComposer, DepthOfField } from '@tresjs/post-processing'
import type { Intersection } from 'three'

import { useRouteDisposal } from '../composables/useRouteDisposal'

const dofEffect = ref<InstanceType<typeof DepthOfField> | null>(null)

const setTarget = ({ point }: Intersection) => {
  dofEffect.value.effect.target = point
}

// Need to dispose of the effect composer when the route changes because Vitepress doesnt unmount the components
const { effectComposer } = useRouteDisposal()
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera
      :rotation="[-0.9, 1.28, 0.87]"
      :position="[5.55, 1.75, 1.2]"
    />
    <OrbitControls />
    <TresMesh
      v-for="i in 5"
      :key="i"
      :position="[i * 1.2 - 3, 1, 0]"
      @pointer-move="setTarget"
    >
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
        :world-focus-distance="1"
        :world-focus-range="5"
        :bokeh-scale="8"
      />
    </EffectComposer>
  </TresCanvas>
</template>
