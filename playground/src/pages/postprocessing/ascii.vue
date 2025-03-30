<script setup lang="ts">
import { ContactShadows, Environment, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { NoToneMapping } from 'three'
import { BlendFunction } from 'postprocessing'
import { ASCIIPmndrs, EffectComposerPmndrs } from '@tresjs/post-processing'

import '@tresjs/leches/styles'

const gl = {
  clearColor: '#ffffff',
  toneMapping: NoToneMapping,
  multisampling: 8,
}

const { blendFunction, opacity, cellSize, inverted, color, useSceneColor } = useControls({
  blendFunction: {
    options: Object.keys(BlendFunction).map(key => ({
      text: key,
      value: BlendFunction[key as keyof typeof BlendFunction],
    })),
    value: BlendFunction.OVERLAY,
  },
  opacity: { value: 1, step: 0.1, min: 0.0, max: 1.0 },
  cellSize: { value: 12, step: 1, min: 2, max: 64 },
  useSceneColor: false,
  color: '#ff0000',
  inverted: false,
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

    <TresMesh :position="[0, .5, 0]">
      <TresBoxGeometry :args="[2, 2, 2]" />
      <TresMeshPhysicalMaterial color="black" :roughness=".25" />
    </TresMesh>

    <ContactShadows
      :opacity="1"
      :position-y="-.5"
    />

    <Suspense>
      <Environment background :blur=".5" preset="night" />
    </Suspense>

    <Suspense>
      <EffectComposerPmndrs>
        <ASCIIPmndrs
          :blendFunction="Number(blendFunction)"
          :opacity="opacity"
          :cellSize="cellSize"
          :inverted="inverted"
          :color="color"
          :useSceneColor="useSceneColor"
        />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
