<script setup lang="ts">
import { Camera, HalfFloatType, Scene, WebGLRenderer } from 'three'
import { TresCamera, TresCanvas, TresObject, useRenderLoop, useTresContext } from '@tresjs/core'
import { DepthDownsamplingPass, EffectComposer as EffectComposerImpl, NormalPass, RenderPass } from 'postprocessing'

import { isWebGL2Available } from 'three-stdlib'
import { MaybeElement, useElementBounding } from '@vueuse/core'
import { effectComposerInjectionKey } from './injectionKeys'
import { ShallowRef, computed, provide, shallowRef, watchEffect } from 'vue'

export type EffectComposerProps = {
  enabled?: boolean
  children?: TresObject[]
  depthBuffer?: boolean
  disableNormalPass?: boolean
  stencilBuffer?: boolean
  resolutionScale?: number
  /*   renderPriority?: number */
  autoClear?: boolean
  multisampling?: number
  frameBufferType?: number
  scene?: Scene
  camera?: TresCamera
}

const tresContext = useTresContext()

setInterval(() => {
  console.log(tresContext)
}, 5000)

const {
  enabled = true,
  /*   renderPriority = 1, */
  autoClear = true,
  multisampling = 8,
  frameBufferType = HalfFloatType,
  disableNormalPass = false,
  depthBuffer = true,
  stencilBuffer = false,
  scene,
  camera,
  resolutionScale,
} = defineProps<EffectComposerProps>()

const effectComposer: ShallowRef<EffectComposerImpl | null> = shallowRef(null)

const localScene = computed(() => scene || (tresContext.scene.value as Scene))
const localCamera = computed(() => camera || (tresContext.camera.value as Camera))

let downSamplingPass = null
let normalPass = null
const webGL2Available = isWebGL2Available()

provide(effectComposerInjectionKey, effectComposer)

function setNormalPass() {
  if (effectComposer.value) {
    normalPass = new NormalPass(localScene.value as Scene, localCamera.value as TresCamera)
    normalPass.enabled = false
    effectComposer.value.addPass(normalPass)
    if (resolutionScale !== undefined && webGL2Available) {
      downSamplingPass = new DepthDownsamplingPass({
        normalBuffer: normalPass.texture,
        resolutionScale: resolutionScale,
      })
      downSamplingPass.enabled = false
      effectComposer.value.addPass(downSamplingPass)
    }
  }
}

// const canvas = computed<HTMLCanvasElement>(() => tresContext.renderer.value.domElement) // having a seperate computed makes useElementBounding work //TODO remove

const { width, height } = useElementBounding(tresContext.renderer.value.domElement as HTMLCanvasElement) // TODO test

watchEffect(() => {
  if (effectComposer.value && width.value && height.value) effectComposer.value.setSize(width.value, height.value)
})

watchEffect(() => {
  if (tresContext.renderer.value && localScene.value && localCamera.value) {
    console.log(tresContext.renderer.value)

    effectComposer.value = new EffectComposerImpl(tresContext.renderer.value as WebGLRenderer, {
      depthBuffer,
      stencilBuffer,
      multisampling: multisampling > 0 && webGL2Available ? multisampling : 0,
      frameBufferType,
    })
    effectComposer.value.addPass(new RenderPass(localScene.value, localCamera.value))

    if (!disableNormalPass) {
      setNormalPass()
    }
  }
})

const { onLoop } = useRenderLoop()

onLoop(({ delta }) => {
  if (enabled && tresContext.renderer.value && effectComposer.value && width.value && height.value) {
    // const currentAutoClear = tresContext.renderer.value.autoClear //TODO ?
    // tresContext.renderer.value.autoClear = autoClear
    if (stencilBuffer && !autoClear) tresContext.renderer.value.clearStencil()
    effectComposer.value.render(delta)
    // tresContext.renderer.value.autoClear = currentAutoClear
  }
})
</script>
<template>
  <slot />
</template>
