<script lang="ts" setup>
import { BlendFunction, VignetteEffect, VignetteTechnique } from 'postprocessing'
import { omit } from '../../util/object.js'
import { makePropWatchersUsingAllProps } from '../../util/prop.js'
import { useEffectPmndrs } from './composables/useEffectPmndrs.js'
import type { VignettePmndrsProps } from './types.js'

const props = withDefaults(defineProps<VignettePmndrsProps>(), {
  technique: VignetteTechnique.DEFAULT,
  blendFunction: BlendFunction.NORMAL,
  offset: 0.5,
  darkness: 0.5,
})

const { pass, effect } = useEffectPmndrs(() => new VignetteEffect(props), props)
defineExpose({ pass, effect })

makePropWatchersUsingAllProps(
  omit(props, ['blendFunction']),
  effect,
  () => new VignetteEffect(),
)
</script>
