<script lang="ts" setup>
import { BlendFunction, NoiseEffect } from 'postprocessing'
import { useEffect } from '../composables/effect'
import { makePropWatchersUsingAllProps } from '../../util/prop'

export interface NoiseProps {
  /**
   * Whether the noise should be multiplied with the input color.
   */
  premultiply?: boolean
  blendFunction?: BlendFunction
}

const props = withDefaults(defineProps<NoiseProps>(), {
  premultiply: false,
  blendFunction: BlendFunction.SCREEN,
})

const { pass, effect } = useEffect(() => new NoiseEffect({
  premultiply: props.premultiply,
  blendFunction: props.blendFunction,
}))
defineExpose({ pass, effect }) // to allow users to modify pass and effect via template ref

makePropWatchersUsingAllProps(
  props,
  effect,
  () => new NoiseEffect(),
)
</script>

<template></template>
