<script setup lang="ts">
import { Environment, OrbitControls, useGLTF } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { EffectComposerPmndrs, KuwaharaPmndrs } from '@tresjs/post-processing'
import { BlendFunction } from 'postprocessing'
import { NoToneMapping } from 'three'

import '@tresjs/leches/styles'

const gl = {
  clearColor: '#3386E0',
  toneMapping: NoToneMapping,
  multisampling: 8,
}

const { scene: scenePlant } = await useGLTF('/plant-jar.glb', { draco: true })
const { scene: sceneAvocado } = await useGLTF('/avocado.glb', { draco: true })
const { scene: sceneWatermelon } = await useGLTF('/watermelon.glb', { draco: true })

const { radius, blendFunction } = useControls({
  radius: { value: 10, min: 1, max: 40, step: 1 },
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
      :position="[0, 5, 8.5]"
    />
    <OrbitControls :target="[0, 1, 0]" />

    <primitive :rotation-y="Math.PI / -2" :position-y="-.2" :scale="2" :object="scenePlant" />
    <primitive :position-x="3.5" :position-y="-.75" :scale="50" :object="sceneAvocado" />
    <primitive :position-x="-4.25" :position-y="1" :scale="25" :object="sceneWatermelon" />

    <TresDirectionalLight
      :position="[5, 10, 5]"
      :intensity="5"
    />

    <TresAmbientLight :intensity="1.25" />

    <Suspense>
      <Environment :blur=".25" preset="snow" />
    </Suspense>

    <Suspense>
      <EffectComposerPmndrs>
        <KuwaharaPmndrs :blendFunction="Number(blendFunction.value)" :radius="radius.value" />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
