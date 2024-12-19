<script lang="ts" setup>
import { useLoop } from '@tresjs/core'
import { BlendFunction, NoiseEffect } from 'postprocessing'
import { omit } from '../../util/object.js'
import { makePropWatchersUsingAllProps } from '../../util/prop.js'
import { useEffectPmndrs } from './composables/useEffectPmndrs.js'
import type { NoisePmndrsProps } from './types.js'

const props = withDefaults(defineProps<NoisePmndrsProps>(), {
  premultiply: false,
  blendFunction: BlendFunction.SCREEN,
})

const { pass, effect } = useEffectPmndrs(() => new NoiseEffect(props), props)
defineExpose({ pass, effect })

const { onBeforeRender } = useLoop()
onBeforeRender(({ invalidate }) => invalidate())

makePropWatchersUsingAllProps(
  omit(props, ['blendFunction']),
  effect,
  () => new NoiseEffect(),
)
</script>
