<script lang="ts" setup>
import { PixelationEffect } from 'postprocessing'
import { makePropWatchersUsingAllProps } from '../../util/prop.js'
import { useEffectPmndrs } from './composables/useEffectPmndrs.js'
import type { PixelationPmndrsProps } from './types.js'

const props = defineProps<PixelationPmndrsProps>()

const { pass, effect } = useEffectPmndrs(() => new PixelationEffect(props.granularity), props)
defineExpose({ pass, effect })

makePropWatchersUsingAllProps(
  props,
  effect,
  () => new PixelationEffect(),
)
</script>
