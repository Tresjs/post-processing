<script setup lang="ts">
import { Camera, HalfFloatType, Scene, WebGLRenderer } from 'three'
import { TresCamera, TresCanvas, TresObject, TresScene, useRenderLoop, useTresContext } from '@tresjs/core'
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
  scene?: Scene // TODO check back with Alvaro why this is here
  camera?: TresCamera // TODO check back with Alvaro why this is here -> does probably not work with Bloom effect as it uses tresContext's camera
}

const tresContext = useTresContext()

const props = withDefaults(defineProps<EffectComposerProps>(), {
  enabled: true,
  autoClear: true,
  multisampling: 8,
  frameBufferType: HalfFloatType,
  disableNormalPass: false,
  depthBuffer: true,
  stencilBuffer: false,
})

const effectComposer: ShallowRef<EffectComposerImpl | null> = shallowRef(null)

const localScene = computed(() => props.scene || (tresContext.scene.value as TresScene))
const localCamera = computed(() => props.camera || (tresContext.camera.value as Camera))

let downSamplingPass = null
let normalPass = null
const webGL2Available = isWebGL2Available()

provide(effectComposerInjectionKey, effectComposer)

const setNormalPass = () => {
  if (!effectComposer.value) return

  normalPass = new NormalPass(localScene.value as Scene, localCamera.value as TresCamera)
  normalPass.enabled = false
  effectComposer.value.addPass(normalPass)
  if (props.resolutionScale !== undefined && webGL2Available) {
    downSamplingPass = new DepthDownsamplingPass({
      normalBuffer: normalPass.texture,
      resolutionScale: props.resolutionScale,
    })
    downSamplingPass.enabled = false
    effectComposer.value.addPass(downSamplingPass)
  }
}

const { width, height } = useElementBounding(tresContext.renderer.value.domElement as HTMLCanvasElement)

watchEffect(() => {
  if (effectComposer.value && width.value && height.value) effectComposer.value.setSize(width.value, height.value)
})
watchEffect(() => {
  if (tresContext.renderer.value && localScene.value && localCamera.value) {
    effectComposer.value = new EffectComposerImpl(tresContext.renderer.value as WebGLRenderer, {
      depthBuffer: props.depthBuffer,
      stencilBuffer: props.stencilBuffer,
      multisampling: props.multisampling > 0 && webGL2Available ? props.multisampling : 0,
      frameBufferType: props.frameBufferType,
    })
    effectComposer.value.addPass(new RenderPass(tresContext.scene.value as Scene, tresContext.camera.value))

    if (!props.disableNormalPass) {
      setNormalPass()
    }
  }
})

const { onLoop } = useRenderLoop()

onLoop(({ delta }) => {
  if (props.enabled && tresContext.renderer.value && effectComposer.value && width.value && height.value) {
    const currentAutoClear = tresContext.renderer.value.autoClear // TODO check back with Alvaro why this is here
    tresContext.renderer.value.autoClear = props.autoClear
    if (props.stencilBuffer && !props.autoClear) tresContext.renderer.value.clearStencil()
    effectComposer.value.render(delta)
    tresContext.renderer.value.autoClear = currentAutoClear
  }
})
</script>
<template>
  <slot />
</template>
