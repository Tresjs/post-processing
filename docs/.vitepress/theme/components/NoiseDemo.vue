<script setup lang="ts">
import { ref } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'
import { EffectComposer, Noise } from '@tresjs/post-processing'
import { OrbitControls } from '@tresjs/cientos'
import { BlendFunction } from 'postprocessing'
import type { EffectComposer as EffectComposerImpl } from 'postprocessing'

import { useRouteDisposal } from '../composables/useRouteDisposal'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

// Need to dispose of the effect composer when the route changes because Vitepress doesnt unmount the components
const effectComposer = ref<EffectComposerImpl | null>(null)
useRouteDisposal(effectComposer)
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <OrbitControls />
    <TresGridHelper />
    <TresAmbientLight :intensity="1" />
    <Suspense>
      <EffectComposer ref="effectComposer">
        <Noise
          premultiply
          :blend-function="BlendFunction.SCREEN"
        />
      </EffectComposer>
    </Suspense>
  </TresCanvas>
</template>