<script lang="ts" setup>
import type { BlendFunction } from 'postprocessing'
import { EffectPass, DepthOfFieldEffect } from 'postprocessing'
import { useTresContext } from '@tresjs/core'
import { inject, onUnmounted, shallowRef, watchEffect } from 'vue'
import { effectComposerInjectionKey } from '../injectionKeys'

export interface DepthOfFielProps { // TODO comments
  blendFunction?: BlendFunction
  worldFocusDistance?: number
  worldFocusRange?: number
  focusDistance?: number
  focalLength?: number
  focusRange?: number
  bokehScale?: number
  resolutionScale?: number
  resolutionX?: number
  resolutionY?: number
}

//TODO share code!

const props = defineProps<DepthOfFielProps>()

const composer = inject(effectComposerInjectionKey)
const pass = shallowRef<EffectPass | null>(null)
const effect = shallowRef<DepthOfFieldEffect | null>(null)

defineExpose({ pass, effect }) // to allow users to modify pass and effect via template ref

const { camera } = useTresContext()

const unwatch = watchEffect(() => {
  if (!camera.value || !composer?.value) return

  unwatch?.()

  if (effect.value) return
  
  effect.value = new DepthOfFieldEffect(camera.value, props)
  pass.value = new EffectPass(camera.value, effect.value)
  
  composer?.value?.addPass(pass.value)
})

onUnmounted(() => {
  if (pass.value) composer?.value?.removePass(pass.value)
  effect.value?.dispose()
  pass.value?.dispose()
})
</script>

<template></template>
