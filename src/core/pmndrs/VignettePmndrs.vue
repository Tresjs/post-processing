<script lang="ts">
import type { BlendFunction, VignetteTechnique } from 'postprocessing'
import { VignetteEffect } from 'postprocessing'
import { omit } from '../../util/object'
import { makePropWatchersUsingAllProps } from '../../util/prop'
import { useEffectPmndrs } from './composables/useEffectPmndrs'

export interface VignettePmndrsProps {
  /**
   * Whether the noise should be multiplied with the input color.
   */
  technique?: VignetteTechnique
  blendFunction?: BlendFunction
  offset?: number
  darkness?: number
}
</script>

<script lang="ts" setup>
const props = defineProps<VignettePmndrsProps>()

const { pass, effect } = useEffectPmndrs(() => new VignetteEffect(props), props)
defineExpose({ pass, effect })

makePropWatchersUsingAllProps(
  omit(props, ['blendFunction']),
  effect,
  () => new VignetteEffect(),
)
</script>
