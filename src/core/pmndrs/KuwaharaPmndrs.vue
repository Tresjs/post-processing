<script lang="ts" setup>
import type { BlendFunction } from 'postprocessing'
import { KuwaharaEffect } from './custom/kuwahara/index'
import { makePropWatchers } from '../../util/prop'
import { useEffectPmndrs } from './composables/useEffectPmndrs'

export interface KuwaharaPmndrsProps {
  /**
   * The blend function for the effect.
   * Determines how this effect blends with other effects.
   */
  blendFunction?: BlendFunction

  /**
   * The intensity of the barrel distortion.
   * A value between 0 (no distortion) and 1 (maximum distortion).
   */
  radius?: number
}

const props = defineProps<KuwaharaPmndrsProps>()

const { pass, effect } = useEffectPmndrs(
  () => new KuwaharaEffect(props),
  props,
)

defineExpose({ pass, effect })

makePropWatchers(
  [
    [() => props.blendFunction, 'blendMode.blendFunction'],
    [() => props.radius, 'radius'],
  ],
  effect,
  () => new KuwaharaEffect(),
)
</script>
