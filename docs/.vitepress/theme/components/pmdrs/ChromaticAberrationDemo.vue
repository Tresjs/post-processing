<script setup lang="ts">
import { Environment, OrbitControls, useGLTF } from '@tresjs/cientos'
import { dispose, TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { ChromaticAberration, EffectComposer } from '@tresjs/post-processing/pmndrs'
import { ToneMappingMode } from 'postprocessing'
import { NoToneMapping } from 'three'
import { onUnmounted, shallowRef } from 'vue'

import '@tresjs/leches/styles'

const gl = {
  toneMappingExposure: 1,
  toneMapping: NoToneMapping,
  multisampling: 8,
}

const modelRef = shallowRef(null)

const { scene: model } = await useGLTF('https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/realistic-pokeball/scene.gltf', { draco: true })

const { toneMappingExposure, mode } = useControls({
  toneMappingExposure: {
    value: 1,
    min: 0,
    max: 10,
    step: 1,
  },
  mode: {
    value: ToneMappingMode.AGX,
    options: [
      { text: 'LINEAR', value: ToneMappingMode.LINEAR },
      { text: 'REINHARD', value: ToneMappingMode.REINHARD },
      { text: 'REINHARD2', value: ToneMappingMode.REINHARD2 },
      { text: 'REINHARD2_ADAPTIVE', value: ToneMappingMode.REINHARD2_ADAPTIVE },
      { text: 'UNCHARTED2', value: ToneMappingMode.UNCHARTED2 },
      { text: 'OPTIMIZED_CINEON', value: ToneMappingMode.OPTIMIZED_CINEON },
      { text: 'CINEON', value: ToneMappingMode.CINEON },
      { text: 'ACES_FILMIC', value: ToneMappingMode.ACES_FILMIC },
      { text: 'AGX', value: ToneMappingMode.AGX },
      { text: 'NEUTRAL', value: ToneMappingMode.NEUTRAL },
    ],
  },
})

onUnmounted(() => {
  dispose(model)
})
</script>

<template>
  <TresLeches style="left: initial;right:10px; top:10px;" />

  <TresCanvas
    v-bind="gl"
    :toneMappingExposure="toneMappingExposure.value"
  >
    <TresPerspectiveCamera
      :position="[5, 5, 5]"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls auto-rotate />

    <primitive ref="modelRef" :object="model" :position-y="-.5" :scale=".25" />

    <Suspense>
      <Environment :intensity="2" background :blur=".25" preset="dawn" />
    </Suspense>

    <Suspense>
      <EffectComposer>
        <ChromaticAberration />
      </EffectComposer>
    </Suspense>
  </TresCanvas>
</template>
