<script setup lang="ts">
import { Ref, inject, onUnmounted, ref, toRaw, unref } from 'vue'
import { DepthOfFieldEffect, EffectPass, EffectComposer, BlendFunction } from 'postprocessing'
import { useCore } from '../useCore'
import { watch } from 'vue'

export type DepthOfFieldProps = ConstructorParameters<typeof DepthOfFieldEffect>[1] &
  Partial<{
    target: TresVector3
    depthTexture: {
      texture: Texture
      packing: number
    }
    blur: number
  }>

const {
  blendFunction = BlendFunction.ADD,
  mipmapBlur = false,
  intensity = 1,
  luminanceThreshold = 0.9,
  luminanceSmoothing = 0.025,
} = defineProps<BloomProps>()

const { state } = useCore()

const composer = inject<Ref<EffectComposer>>('effectComposer')
const pass = ref<EffectPass | null>(null)
const effect = ref<BloomEffect | null>(null)

defineExpose({ pass, effect })

function createPass() {
  effect.value = new BloomEffect({
    blendFunction,
    mipmapBlur,
    intensity,
    luminanceThreshold,
    luminanceSmoothing,
  })
  pass.value = new EffectPass(unref(state.camera), toRaw(effect.value) as BloomEffect)
}

function disposePass() {
  effect.value?.dispose()
  pass.value?.dispose()
  composer?.value.removePass(toRaw(pass.value) as EffectPass)
}

const unwatchComposer = watch(
  () => [state.camera, composer?.value],
  () => {
    if (state.camera && composer && composer.value) {
      createPass()
      composer?.value?.addPass(toRaw(pass.value) as EffectPass)
    }
  },
)

const unwatchProps = watch(
  () => [blendFunction, mipmapBlur, intensity, luminanceThreshold, luminanceSmoothing],
  () => {
    if (pass.value) {
      disposePass()
      createPass()
      composer?.value?.addPass(toRaw(pass.value) as EffectPass)
    }
  },
)

onUnmounted(() => {
  disposePass()
  unwatchComposer()
  unwatchProps()
})
</script>
<template></template>
