<script setup lang="ts">
import { ContactShadows, Environment, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { NoToneMapping } from 'three'
import { BlendFunction, EdgeDetectionMode, PredicationMode, SMAAPreset } from 'postprocessing'
import { EffectComposerPmndrs, SMAAPmndrs } from '@tresjs/post-processing'

import '@tresjs/leches/styles'

const gl = {
  clearColor: '#ffffff',
  toneMapping: NoToneMapping,
}

const { blendFunction, preset, edgeDetectionMode, predicationMode } = useControls({
  blendFunction: {
    options: Object.keys(BlendFunction).map(key => ({
      text: key,
      value: BlendFunction[key as keyof typeof BlendFunction],
    })),
    value: BlendFunction.SRC,
  },
  preset: {
    options: Object.keys(SMAAPreset).map(key => ({
      text: key,
      value: SMAAPreset[key as keyof typeof SMAAPreset],
    })),
    value: SMAAPreset.HIGH,
  },
  edgeDetectionMode: {
    options: Object.keys(EdgeDetectionMode).map(key => ({
      text: key,
      value: EdgeDetectionMode[key as keyof typeof EdgeDetectionMode],
    })),
    value: EdgeDetectionMode.COLOR,
  },
  predicationMode: {
    options: Object.keys(PredicationMode).map(key => ({
      text: key,
      value: PredicationMode[key as keyof typeof PredicationMode],
    })),
    value: PredicationMode.DEPTH,
  },
})
</script>

<template>
  <TresLeches />

  <TresCanvas
    v-bind="gl"
    window-size
    :antialias="false"
  >
    <TresPerspectiveCamera
      :position="[5, 5, 5]"
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
      <Environment background :blur="0" preset="snow" />
    </Suspense>

    <Suspense>
      <EffectComposerPmndrs :multisampling="0">
        <SMAAPmndrs :preset="preset" :edgeDetectionMode="edgeDetectionMode" :predicationMode="predicationMode" :blendFunction="Number(blendFunction)" />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
