<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { TresLeches, useControls } from '@tresjs/leches'
import { NoToneMapping } from 'three'
import { BlendFunction } from 'postprocessing'
import { ref } from 'vue'
import { EffectComposerPmndrs, FXAAPmndrs } from '@tresjs/post-processing'
import type { PerspectiveCamera } from 'three'

import '@tresjs/leches/styles'

const gl = {
  antialias: false,
  clearColor: '#2e3440',
  toneMapping: NoToneMapping,
}

const cameraRef = ref<PerspectiveCamera | null>(null)

const { blendFunction } = useControls({
  blendFunction: {
    options: Object.keys(BlendFunction).map(key => ({
      text: key,
      value: BlendFunction[key as keyof typeof BlendFunction],
    })),
    value: BlendFunction.SRC,
  },
})

const documentEl = document.documentElement

const onChange = (e: { object: PerspectiveCamera }) => {
  if (!cameraRef.value) { return }

  cameraRef.value.position.copy(e.object.position)
  cameraRef.value.rotation.copy(e.object.rotation)
  cameraRef.value.zoom = e.object.zoom
  cameraRef.value.quaternion.copy(e.object.quaternion)
}
</script>

<template>
  <TresLeches />

  <TresCanvas
    v-bind="gl"
    class="playground-fxaa-canvas-left"
    window-size
  >
    <TresPerspectiveCamera :position="[0, 2.5, 3.5]" />
    <OrbitControls :domElement="documentEl" auto-rotate :auto-rotate-speed=".35" :target="[0, 0.25, 0]" @change="onChange" />

    <TresMesh :position="[0, 0.5, 0]">
      <TresBoxGeometry :args="[2, 2, 2]" />
      <TresMeshBasicMaterial color="#ffffff" />
    </TresMesh>
  </TresCanvas>

  <TresCanvas
    v-bind="gl"
    class="playground-fxaa-canvas-right"
    window-size
  >
    <TresPerspectiveCamera ref="cameraRef" :position="[0, 2.5, 3.5]" />

    <TresMesh :position="[0, 0.5, 0]">
      <TresBoxGeometry :args="[2, 2, 2]" />
      <TresMeshBasicMaterial color="#ffffff" />
    </TresMesh>

    <Suspense>
      <EffectComposerPmndrs :multisampling="0">
        <FXAAPmndrs :blendFunction="Number(blendFunction)" />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>

  <div class="playground-fxaa-divider"></div>

  <p class="playground-fxaa-infos text-xl absolute w-[100%]">Left: No FXAA — Right: FXAA</p>
</template>

<style scoped>
.playground-fxaa-canvas-left {
  position: absolute;
  inset: 0;
  z-index: 1;
  clip-path: inset(0 50% 0 0);
  -webkit-clip-path: inset(0 50% 0 0);
}

.playground-fxaa-canvas-right {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  clip-path: inset(0 0 0 50%);
  -webkit-clip-path: inset(0 0 0 50%);
}

.playground-fxaa-divider {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 2px;
  background: red;
  z-index: 3;
  pointer-events: none;
}

.playground-fxaa-infos {
  margin: 0 auto;
  padding: 1rem;
  text-align: center;
  color: #fff;
  background: rgba(0, 0, 0, 0.65);
  z-index: 5;
}
</style>
