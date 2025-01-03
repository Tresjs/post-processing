<script lang="ts" setup>
import type { BlendFunction } from 'postprocessing'
import { BarrelBlurEffect } from './custom/barrel-blur/index'
import { makePropWatchers } from '../../util/prop'
import { useEffectPmndrs } from './composables/useEffectPmndrs'

export interface BarrelBlurPmndrsProps {
  /**
   * The blend function for the effect.
   * Determines how this effect blends with other effects.
   */
  blendFunction?: BlendFunction

  /**
   * The intensity of the barrel distortion.
   * A value between 0 (no distortion) and 1 (maximum distortion).
   */
  amount?: number
}

const props = withDefaults(defineProps<BarrelBlurPmndrsProps>(), {
  amount: 0.25,
})

const { pass, effect } = useEffectPmndrs(() => new BarrelBlurEffect(props), props)

defineExpose({ pass, effect })

makePropWatchers(
  [
    [() => props.blendFunction, 'blendMode.blendFunction'],
    [() => props.amount, 'amount'],
  ],
  effect,
  () => new BarrelBlurEffect(),
)
</script>
