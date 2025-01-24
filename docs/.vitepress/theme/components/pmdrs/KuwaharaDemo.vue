<script setup lang="ts">
import { Environment, OrbitControls } from '@tresjs/cientos'
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

const { radius, blendFunction } = useControls({
  radius: { value: 5, min: 1, max: 8, step: 1 },
  blendFunction: {
    options: Object.keys(BlendFunction).map((key: string) => ({
      text: key,
      value: BlendFunction[key as keyof typeof BlendFunction],
    })),
    value: BlendFunction.NORMAL,
  },
})
</script>

<template>
  <TresLeches style="left: initial;right:10px; top:10px;" />

  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera
      :position="[0, 5, 12.5]"
    />
    <OrbitControls auto-rotate />

    <TresMesh :position-y="0">
      <TresBoxGeometry :args="[6, 6, 6]" />
      <TresMeshPhysicalMaterial color="white" :reflectivity="1" :roughness="0.0" :metalness="1.0" :clearcoat="1.0" />
    </TresMesh>

    <Suspense>
      <Environment background :blur="0.2" preset="snow" />
    </Suspense>

    <Suspense>
      <EffectComposerPmndrs>
        <KuwaharaPmndrs :blendFunction="Number(blendFunction.value)" :radius="radius.value" />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
