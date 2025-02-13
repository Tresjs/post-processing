<script lang="ts" setup>
import type { BlendFunction, EdgeDetectionMode, SMAAPreset } from 'postprocessing'
import { PredicationMode, SMAAEffect } from 'postprocessing'
import { makePropWatchers } from '../../util/prop'
import { useEffectPmndrs } from './composables/useEffectPmndrs'
import { watch } from 'vue'

export interface SMAAPmndrsProps {
  /**
   * The blend function.
   */
  blendFunction?: BlendFunction
  /**
   * The quality preset.
   */
  preset?: SMAAPreset
  /**
   * The edge detection mode.
   */
  edgeDetectionMode?: EdgeDetectionMode
  /**
   * The predication mode.
   */
  predicationMode?: PredicationMode
}

const props = defineProps<SMAAPmndrsProps>()

const { pass, effect } = useEffectPmndrs(() => new SMAAEffect(props), props)

defineExpose({ pass, effect })

makePropWatchers(
  [
    [() => props.blendFunction, 'blendMode.blendFunction'],
  ],
  effect,
  () => new SMAAEffect(),
)

console.log(effect.value?.edgeDetectionMaterial)

watch(effect, () => {
  if (!effect.value) { return }

  console.log(effect.value)
  effect.value.edgeDetectionMaterial.predicationMode = PredicationMode.DEPTH
  effect.value.edgeDetectionMaterial.edgeDetectionThreshold = 0.02
  effect.value.edgeDetectionMaterial.predicationThreshold = 0.002
  effect.value.edgeDetectionMaterial.predicationScale = 1.0
})
</script>
