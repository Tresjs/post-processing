<script setup lang="ts">
import { BlendFunction, FXAAEffect } from 'postprocessing'
import { useEffect } from '../composables/effect'
// import { makePropWatchers } from '../../util/prop'

export interface FXAAProps {
  /**
   * The blend function of this effect. This prop is not reactive.
   * @default BlendFunction.SCREEN
   * @type {BlendFunction}
   * @memberof FXAAProps
   */
  blendFunction?: BlendFunction
}

const props = withDefaults(defineProps<FXAAProps>(), {})

const { pass, effect } = useEffect(() => new FXAAEffect(props))

defineExpose({ pass, effect }) // to allow users to modify pass and effect via template ref

// makePropWatchers([], effect, () => new FXAAEffect())
</script>

<template></template>
