<script lang="ts" setup>
import type { BlendFunction } from 'postprocessing'
import { FXAAEffect } from 'postprocessing'
import { makePropWatchers } from '../../util/prop'
import { useEffectPmndrs } from './composables/useEffectPmndrs'

export interface FXAAPmndrsProps {
  /**
   * The blend function.
   */
  blendFunction?: BlendFunction
}

const props = defineProps<FXAAPmndrsProps>()

const { pass, effect } = useEffectPmndrs(() => new FXAAEffect(props), props)

defineExpose({ pass, effect })

makePropWatchers(
  [
    [() => props.blendFunction, 'blendMode.blendFunction'],
  ],
  effect,
  () => new FXAAEffect(),
)
</script>
