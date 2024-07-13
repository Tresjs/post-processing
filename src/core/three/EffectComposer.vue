<script lang="ts" setup>
import { useDevicePixelRatio } from '@vueuse/core'
import { useLoop, useTresContext } from '@tresjs/core'
import { EffectComposer as EffectComposerThreejs } from 'three/addons/postprocessing/EffectComposer.js'
import { type ShallowRef, onUnmounted, shallowRef, watchEffect } from 'vue'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'

const effectComposer: ShallowRef<EffectComposerThreejs | null> = shallowRef(null)
defineExpose({ composer: effectComposer })

const { renderer, sizes, scene, camera } = useTresContext()

const initEffectComposer = () => {
  effectComposer.value?.dispose()
  effectComposer.value = new EffectComposerThreejs(renderer.value)
}
watchEffect(initEffectComposer)

watchEffect(() => {
  const { width, height } = sizes

  if (height.value && width.value) {
    effectComposer.value?.setSize(width.value, height.value)
  }
})

const { pixelRatio } = useDevicePixelRatio() // the renderers pixel ratio is not used because it is not reactive
watchEffect(() => {
  effectComposer.value?.setPixelRatio(pixelRatio.value)
})

watchEffect(() => {
  if (camera.value && scene.value && effectComposer.value) {
    effectComposer.value.addPass(new RenderPass(scene.value, camera.value)) // TODO prop that allows disabling automatically adding the render pass
  }
})

const { render } = useLoop()

render(() => {
  effectComposer.value?.render()
})

onUnmounted(() => {
  effectComposer.value?.dispose()
})
</script>

<template>
  <slot></slot>
</template>
