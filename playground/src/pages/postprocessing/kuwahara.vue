<script setup lang="ts">
import { Environment, OrbitControls, useGLTF } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { EffectComposerPmndrs, KuwaharaPmndrs } from '@tresjs/post-processing'
import { BlendFunction } from 'postprocessing'
import { NoToneMapping } from 'three'

import '@tresjs/leches/styles'

const gl = {
  toneMapping: NoToneMapping,
  multisampling: 8,
}

const { scene } = await useGLTF('https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/cyber-samurai/scene.gltf', { draco: true })

const { radius, blendFunction } = useControls({
  radius: { value: 15, min: 1, max: 30, step: 1 },
  blendFunction: {
    options: Object.keys(BlendFunction).map(key => ({
      text: key,
      value: BlendFunction[key],
    })),
    value: BlendFunction.NORMAL,
  },
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
    <OrbitControls />

    <primitive :position-y="-1.5" :scale="2" :object="scene" />
    <!-- <primitive :position-y="-1.5" :scale="60" :object="scene" /> -->

    <TresDirectionalLight
      :position="[3, 3, 3]"
      :intensity="1"
    />

    <TresDirectionalLight
      :position="[-3, 3, -3]"
      :intensity="1"
    />

    <Suspense>
      <Environment :blur=".25" preset="shangai" />
    </Suspense>

    <Suspense>
      <EffectComposerPmndrs>
        <KuwaharaPmndrs :blendFunction="Number(blendFunction.value)" :radius="radius.value" />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
