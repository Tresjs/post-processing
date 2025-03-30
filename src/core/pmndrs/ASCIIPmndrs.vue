<script lang="ts" setup>
import type { BlendFunction } from 'postprocessing'
import { ASCIIEffect } from 'postprocessing'
import { makePropWatchers } from '../../util/prop'
import { useEffectPmndrs } from './composables/useEffectPmndrs'
import { watch } from 'vue'
import type { Color } from 'three'

// TODO: ADD PROPS:
// - asciiTexture: (ASCIITexture)

export interface ASCIIPmndrsProps {
  /**
   * The blend function.
   */
  blendFunction?: BlendFunction
  /**
   * The opacity of the effect.
   */
  opacity?: number
  /**
   * The cell size.
   */
  cellSize?: number
  /**
   * Controls whether the effect should be inverted.
   */
  inverted?: boolean
  /**
   * The color of the effect.
   */
  color?: Color | string | number | null
  /**
   * Controls whether the effect should use the scene color.
   */
  useSceneColor?: boolean
}

const props = defineProps<ASCIIPmndrsProps>()

const { pass, effect } = useEffectPmndrs(() => new ASCIIEffect(props), props)

defineExpose({ pass, effect })

makePropWatchers(
  [
    [() => props.blendFunction, 'blendMode.blendFunction'],
    [() => props.cellSize, 'cellSize'],
    [() => props.inverted, 'inverted'],
    [() => props.color, 'color'],
  ],
  effect,
  () => new ASCIIEffect(),
)

watch(
  [effect, () => props.useSceneColor],
  () => {
    if (!effect.value) { return }

    if (props.useSceneColor) {
      effect.value.color = null
    }
    else if (!props.useSceneColor) {
      const plainEffect = new ASCIIEffect()
      effect.value.color = props.color ? props.color : plainEffect.color
      plainEffect.dispose()
    }
  },
  { immediate: true },
)

watch(
  [effect, () => props.opacity],
  () => {
    if (!effect.value) { return }

    if (props.opacity !== undefined) {
      effect.value?.blendMode.setOpacity(props.opacity)
    }
    else {
      const plainEffect = new ASCIIEffect()
      effect.value?.blendMode.setOpacity(plainEffect.blendMode.getOpacity())
      plainEffect.dispose()
    }
  },
  { immediate: true },
)
</script>
