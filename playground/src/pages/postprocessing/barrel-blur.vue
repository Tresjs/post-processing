<script setup lang="ts">
import { ContactShadows, Environment, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { NoToneMapping } from 'three'
import { BlendFunction } from 'postprocessing'
import { BarrelBlurPmndrs, EffectComposerPmndrs } from '@tresjs/post-processing'

import '@tresjs/leches/styles'

const gl = {
  clearColor: '#ffffff',
  toneMapping: NoToneMapping,
  multisampling: 8,
  envMapIntensity: 10,
}

const { blendFunction, amount } = useControls({
  amount: { value: 0.2, step: 0.001, max: 1 },
  blendFunction: {
    options: Object.keys(BlendFunction).map(key => ({
      text: key,
      value: BlendFunction[key],
    })),
    value: BlendFunction.OVERLAY,
  },
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

    <template
      v-for="i in 8"
      :key="i"
    >
      <TresMesh
        :position="[((i - 1) - (8 - 1) / 2) * -2, 0, ((i - 1) - (8 - 1) / 2) * -2]"
      >
        <TresBoxGeometry :args="[2, 2, 2]" />
        <TresMeshStandardMaterial color="white" :roughness="1" :metalness="1" />
      </TresMesh>
    </template>

    <Suspense>
      <Environment :blur=".25" preset="shangai" />
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
        <BarrelBlurPmndrs :amount="amount.value" :blendFunction="blendFunction.value" />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
