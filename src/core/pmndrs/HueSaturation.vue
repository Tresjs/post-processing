<script lang="ts" setup>
import { BlendFunction, HueSaturationEffect } from 'postprocessing'
import { defineProps, watchEffect } from 'vue'
import { useEffect } from './composables/useEffect'
import { makePropWatchers } from '../../util/prop'

export interface HueSaturationProps {
  /**
   * The saturation adjustment. A value of 0.0 results in grayscale, and 1.0 leaves saturation unchanged.
   * Range: [0.0, 1.0]
   */
  saturation?: number

  /**
   * The hue adjustment in radians.
   * Range: [-π, π] (or [0, 2π] for a full rotation)
   */
  hue?: number

  /**
   * The blend function. Defines how the effect blends with the original scene.
   */
  blendFunction?: BlendFunction

}

const props = withDefaults(
  defineProps<HueSaturationProps>(),
  {
    saturation: 0.0,
    hue: 0.0,
    blendFunction: BlendFunction.SRC,
  },
)

const { pass, effect } = useEffect(() => new HueSaturationEffect(props), props)

defineExpose({ pass, effect })

makePropWatchers(
  [
    [() => props.hue, 'hue'],
    [() => props.saturation, 'saturation'],
  ],
  effect,
  () => new HueSaturationEffect(),
)

watchEffect(() => {
  if (!effect.value) { return }

  effect.value.blendMode.blendFunction = Number(props.blendFunction)
})
</script>
