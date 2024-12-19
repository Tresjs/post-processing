<script setup lang="ts">
import { BloomEffect } from 'postprocessing'
import { makePropWatchers } from '../../util/prop.js'
import { useEffectPmndrs } from './composables/useEffectPmndrs.js'
import type { BloomPmndrsProps } from './types.js'

const props = withDefaults(
  defineProps<BloomPmndrsProps>(),
  {
    mipmapBlur: undefined,
  },
)

const { pass, effect } = useEffectPmndrs(() => new BloomEffect(props), props)

defineExpose({ pass, effect })

makePropWatchers(
  [
    // blendFunction is not updated, because it has no setter in BloomEffect
    [() => props.intensity, 'intensity'],
    [() => props.kernelSize, 'kernelSize'],
    [() => props.luminanceSmoothing, 'luminanceMaterial.smoothing'],
    [() => props.luminanceThreshold, 'luminanceMaterial.threshold'],
  ],
  effect,
  () => new BloomEffect(),
)
</script>
