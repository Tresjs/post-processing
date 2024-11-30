<script lang="ts" setup>
import { BlendFunction } from 'postprocessing'
import { BarrelBlurEffect } from './custom/barrel-blur/index'
import { makePropWatchers } from '../../util/prop'
import { useEffect } from './composables/useEffect'
import { defineProps, watchEffect } from 'vue'

export interface BarrelBlurProps {
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

const props = withDefaults(defineProps<BarrelBlurProps>(), {
  amount: 0.25,
  blendFunction: BlendFunction.OVERLAY,
})

const { pass, effect } = useEffect(() => new BarrelBlurEffect(props), props)
defineExpose({ pass, effect })

watchEffect(() => {
  if (!effect.value) { return }

  effect.value.blendMode.blendFunction = Number(props.blendFunction)
})

makePropWatchers(
  [
    [() => props.amount, 'amount'],
  ],
  effect,
  () => new BarrelBlurEffect(),
)
</script>
