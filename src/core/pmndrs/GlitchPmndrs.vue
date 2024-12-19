<script setup lang="ts">
import { useLoop } from '@tresjs/core'
import { GlitchEffect, GlitchMode } from 'postprocessing'
import { watchEffect } from 'vue'
import { omit } from '../../util/object.js'
import { makePropWatchersUsingAllProps } from '../../util/prop.js'
import { useEffectPmndrs } from './composables/useEffectPmndrs.js'
import type { GlitchPmndrsProps } from './types.js'

const props = defineProps<GlitchPmndrsProps>()

const { pass, effect } = useEffectPmndrs(() => new GlitchEffect(props), props)
defineExpose({ pass, effect })

const { onBeforeRender } = useLoop()
onBeforeRender(({ invalidate }) => invalidate())

watchEffect(() => {
  const getMode = () => {
    if (props.mode !== undefined) { return props.active === false ? GlitchMode.DISABLED : props.mode }
    const plainEffectPass = new GlitchEffect()

    const defaultMode = plainEffectPass.mode
    plainEffectPass.dispose()

    return defaultMode
  }

  if (effect.value) { effect.value.mode = getMode() }
})

makePropWatchersUsingAllProps(
  omit(props, ['active', 'mode', 'blendFunction']),
  effect,
  () => new GlitchEffect(),
)
</script>
