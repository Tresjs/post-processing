<script setup lang="ts">
import { Camera, HalfFloatType, Scene, WebGLRenderer } from 'three' //TODO remove unused
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
}

const props = withDefaults(defineProps<EffectComposerProps>(), {
  //TODO use defaults from three/postprocessing
  enabled: true,
  autoClear: true,
  multisampling: 8,
  frameBufferType: HalfFloatType,
  disableNormalPass: false,
  depthBuffer: true,
  stencilBuffer: false,
})
const { scene, camera, renderer, sizes } = useTresContext()

const effectComposer: ShallowRef<EffectComposerImpl | null> = shallowRef(null)

let downSamplingPass: DepthDownsamplingPass | null = null
let normalPass: NormalPass | null = null
const webGL2Available = isWebGL2Available()

provide(effectComposerInjectionKey, effectComposer)

const setNormalPass = () => {
  if (!effectComposer.value) return

  normalPass = new NormalPass(scene.value, camera.value)
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

watchEffect(() => {
  if (effectComposer.value && sizes.width.value && sizes.height.value)
    effectComposer.value.setSize(sizes.width.value, sizes.height.value)
})
watchEffect(() => {
  if (renderer.value && scene.value && camera.value) {
    effectComposer.value = new EffectComposerImpl(renderer.value as WebGLRenderer, {
      depthBuffer: props.depthBuffer,
      stencilBuffer: props.stencilBuffer,
      multisampling: props.multisampling > 0 && webGL2Available ? props.multisampling : 0,
      frameBufferType: props.frameBufferType,
    })
    effectComposer.value.addPass(new RenderPass(scene.value as Scene, camera.value))

    if (!props.disableNormalPass) {
      setNormalPass()
    }
  }
})

const { onLoop } = useRenderLoop()

onLoop(({ delta }) => {
  if (props.enabled && renderer.value && effectComposer.value && sizes.width.value && sizes.height.value) {
    const currentAutoClear = renderer.value.autoClear
    renderer.value.autoClear = props.autoClear
    if (props.stencilBuffer && !props.autoClear) renderer.value.clearStencil()
    effectComposer.value.render(delta)
    renderer.value.autoClear = currentAutoClear
  }
})
</script>
<template>
  <slot />
</template>
