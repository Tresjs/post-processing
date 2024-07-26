<script setup lang="ts">
import { BlendFunction, EdgeDetectionMode, PredicationMode, SMAAEffect, SMAAPreset } from 'postprocessing'
import { useEffect } from '../composables/effect'
// import { makePropWatchers } from '../../util/prop'

export interface SMAAProps {
  /**
   * The blend function of this effect. This prop is not reactive.
   * @default BlendFunction.SCREEN
   * @type {BlendFunction}
   * @memberof SMAAProps
   */
  blendFunction?: BlendFunction
  /**
   * The quality preset.
   *
   * @default SMAAPreset.MEDIUM
   * @type {number}
   * @memberof SMAAPreset
   */
  preset?: SMAAPreset
  /**
   * The edge detection mode.
   *
   * @default EdgeDetectionMode.COLOR
   * @type {EdgeDetectionMode}
   * @memberof SMAAProps
   */
  edgeDetectionMode?: EdgeDetectionMode
  /**
   * The predication mode.
   *
   * @default PredicationMode.NORMAL
   * @type {PredicationMode}
   * @memberof SMAAProps
   */
  predicationMode?: PredicationMode
}

const props = withDefaults(defineProps<SMAAProps>(), {})

const { pass, effect } = useEffect(() => new SMAAEffect(props))

defineExpose({ pass, effect }) // to allow users to modify pass and effect via template ref

// makePropWatchers([], effect, () => new SMAAEffect())
</script>

<template></template>
