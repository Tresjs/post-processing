<script setup lang="ts">
import { Ref, inject, onUnmounted, ref, toRaw, unref } from 'vue'
import { DepthOfFieldEffect, EffectPass, EffectComposer, BlendFunction, MaskFunction } from 'postprocessing'
import { useCore } from '../useCore'
import { watch } from 'vue'
import { effectComposerInjectionKey } from '../injectionKeys'

export type DepthOfFieldProps = {
  blendFunction?: BlendFunction
  focusDistance?: number
  focalLength?: number
  bokehScale?: number
  width?: number
  height?: number
}

const {
  blendFunction = BlendFunction.NORMAL,
  focusDistance = 0,
  focalLength = 0.1,
  bokehScale = 1,
  width,
  height,
} = defineProps<DepthOfFieldProps>()

const { state } = useCore()

const composer = inject<Ref<EffectComposer>>(effectComposerInjectionKey)
const pass = ref<EffectPass | null>(null)
const effect = ref<DepthOfFieldEffect | null>(null)

defineExpose({ pass, effect })

function createPass() {
  effect.value = new DepthOfFieldEffect(unref(state.camera), {
    blendFunction,
    focusDistance,
    focalLength,
    bokehScale,
    width,
    height,
  })
  /*   const maskMaterial = (effect as any).maskPass.getFullscreenMaterial()
    maskMaterial.maskFunction = MaskFunction.MULTIPLY_RGB_SET_ALPHA */
  pass.value = new EffectPass(unref(state.camera), toRaw(effect.value) as DepthOfFieldEffect)
}

function disposePass() {
  effect.value?.dispose()
  pass.value?.dispose()
  composer?.value.removePass(toRaw(pass.value) as EffectPass)
}

const unwatchComposer = watch(
  () => [state.camera, composer?.value],
  () => {
    if (state.camera) {
      createPass()
      composer?.value?.addPass(toRaw(pass.value) as EffectPass)
    }
  },
)

const unwatchProps = watch(
  () => [
    blendFunction,
    focusDistance,
    focalLength,
    bokehScale,
    width,
    height
  ],
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
