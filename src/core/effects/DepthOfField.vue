<script lang="ts" setup>
import type { BlendFunction } from 'postprocessing'
import { EffectPass, DepthOfFieldEffect, BlendMode } from 'postprocessing'
import { useTresContext } from '@tresjs/core'
import { inject, onUnmounted, shallowRef, watchEffect } from 'vue'
import { effectComposerInjectionKey } from '../injectionKeys'

export interface DepthOfFieldProps {
  /**
   * The blend function of this effect. This prop is not reactive.
   */
  blendFunction?: BlendFunction

  /**
   * The focus distance in world units.
   */
  worldFocusDistance?: number

  /**
   * The focus range in world units.
   */
  worldFocusRange?: number

  /**
   * The normalized focus distance. Range is [0.0, 1.0].
   */
  focusDistance?: number

  /**
   * The focus range. Range is [0.0, 1.0].
   */
  focusRange?: number

  /**
   * The scale of the bokeh blur.
   */
  bokehScale?: number

  resolutionScale?: number
  resolutionX?: number
  resolutionY?: number
}

const props = defineProps<DepthOfFieldProps>()

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

watchEffect(() => {
  if (!effect.value) return
  const plainEffectPass = new DepthOfFieldEffect()
  console.log(plainEffectPass.circleOfConfusionMaterial.worldFocusRange)

  // blendFunction is not updated, because it has no setter in BloomEffect

  effect.value.circleOfConfusionMaterial.worldFocusDistance
    = props.worldFocusDistance !== undefined
      ? props.worldFocusDistance
      : plainEffectPass.circleOfConfusionMaterial.worldFocusDistance

  effect.value.circleOfConfusionMaterial.worldFocusRange
    = props.worldFocusDistance !== undefined
      ? props.worldFocusDistance
      : plainEffectPass.circleOfConfusionMaterial.worldFocusDistance

  effect.value.circleOfConfusionMaterial.focusRange
    = props.focusRange !== undefined
      ? props.focusRange
      : plainEffectPass.circleOfConfusionMaterial.focusRange

  effect.value.circleOfConfusionMaterial.focusDistance
    = props.focusDistance !== undefined
      ? props.focusDistance
      : plainEffectPass.circleOfConfusionMaterial.focusDistance

  effect.value.bokehScale
    = props.bokehScale !== undefined
      ? props.bokehScale
      : plainEffectPass.bokehScale

  effect.value.blurPass.resolution.scale
    = props.resolutionScale !== undefined
      ? props.resolutionScale
      : plainEffectPass.blurPass.resolution.scale

  effect.value.blurPass.resolution.width
    = props.resolutionX !== undefined
      ? props.resolutionX
      : plainEffectPass.resolution.width

  effect.value.blurPass.resolution.height
    = props.resolutionX !== undefined
      ? props.resolutionX
      : plainEffectPass.resolution.height
})

onUnmounted(() => {
  if (pass.value) composer?.value?.removePass(pass.value)
  effect.value?.dispose()
  pass.value?.dispose()
})
</script>

<template></template>
