<script setup lang="ts">
import { ContactShadows, Environment, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { NoToneMapping, Shape, Vector3 } from 'three'
import { shallowRef } from 'vue'
import { EffectComposerPmndrs, ShockWavePmndrs } from '@tresjs/post-processing'

import '@tresjs/leches/styles'

const gl = {
  clearColor: '#ffffff',
  toneMapping: NoToneMapping,
  multisampling: 8,
}

const shockWaveRef = shallowRef(null)

const heartShape = new Shape()

heartShape.moveTo(25, 25)
heartShape.bezierCurveTo(25, 25, 20, 0, 0, 0)
heartShape.bezierCurveTo(-30, 0, -30, 35, -30, 35)
heartShape.bezierCurveTo(-30, 55, -10, 77, 25, 95)
heartShape.bezierCurveTo(60, 77, 80, 55, 80, 35)
heartShape.bezierCurveTo(80, 35, 80, 0, 50, 0)
heartShape.bezierCurveTo(35, 0, 25, 25, 25, 25)

const extrudeSettings = {
  depth: 8,
  bevelEnabled: true,
  bevelSegments: 2,
  steps: 2,
  bevelSize: 1,
  bevelThickness: 1,
}

const { amplitude, waveSize, speed, maxRadius } = useControls({
  amplitude: { value: 0.1, step: 0.01, max: 1.0 },
  waveSize: { value: 0.1, step: 0.01, max: 1.0 },
  speed: { value: 1.0, step: 0.1, max: 10.0 },
  maxRadius: { value: 1.0, step: 0.1, max: 10.0 },
})
</script>

<template>
  <TresLeches style="left: initial;right:10px; top:10px;" />

  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera
      :position="[5, 5, 5]"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls />

    <TresMesh>
      <TresExtrudeGeometry :args="[heartShape, extrudeSettings]" />
      <TresMeshStandardMaterial
        :color="0x0000FF"
        :wireframe="true"
      />
    </TresMesh>

    <ContactShadows
      :opacity="1"
      :position-y="-.5"
      :scale="20"
      :blur=".85"
    />

    <Suspense>
      <EffectComposerPmndrs>
        <ShockWavePmndrs ref="shockWaveRef" :position="new Vector3()" :amplitude="amplitude.value" :waveSize="waveSize.value" :speed="speed.value" :maxRadius="maxRadius.value" />
      </EffectComposerPmndrs>
    </Suspense>

    <Suspense>
      <Environment :intensity="2" :blur="0" preset="snow" />
    </Suspense>
  </TresCanvas>
</template>
