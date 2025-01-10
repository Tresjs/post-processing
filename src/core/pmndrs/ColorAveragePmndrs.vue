<script lang="ts" setup>
import type { BlendFunction } from 'postprocessing'
import { ColorAverageEffect } from 'postprocessing'
import { makePropWatchers } from '../../util/prop'
import { useEffectPmndrs } from './composables/useEffectPmndrs'
import { watch } from 'vue'

export interface ColorAveragePmndrsProps {
  /**
   * The blend function.
   */
  blendFunction?: BlendFunction

  /**
   * The opacity of the color Average.
   */
  opacity?: number
}

const props = withDefaults(
  defineProps<ColorAveragePmndrsProps>(),
  {
    opacity: 1,
  },
)

const { pass, effect } = useEffectPmndrs(() => new ColorAverageEffect(props.blendFunction), props)

defineExpose({ pass, effect })

makePropWatchers(
  [
    [() => props.blendFunction, 'blendMode.blendFunction'],
  ],
  effect,
  () => new ColorAverageEffect(),
)

watch(
  [effect, () => props.opacity],
  () => {
    if (!effect.value) { return }

    if (props.opacity !== undefined) {
      effect.value?.blendMode.setOpacity(props.opacity)
    }
    else {
      const plainEffect = new ColorAverageEffect()
      effect.value?.blendMode.setOpacity(plainEffect.blendMode.getOpacity())
      plainEffect.dispose()
    }
  },
  {
    immediate: true,
  },
)
</script>
