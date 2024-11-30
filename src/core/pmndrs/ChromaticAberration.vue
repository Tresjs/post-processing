<script lang="ts" setup>
import { BlendFunction, ChromaticAberrationEffect } from 'postprocessing'
import { Vector2 } from 'three'
import { defineExpose, defineProps, withDefaults } from 'vue'
import { useEffect } from './composables/useEffect'
import { makePropWatchers } from '../../util/prop'

export interface ChromaticAberrationProps {
  /**
   * The blend function.
   */
  blendFunction?: BlendFunction

  /**
   * The color offset.
   */
  offset?: Vector2

  /**
   * Whether the effect should be modulated with a radial gradient.
   */
  radialModulation?: boolean

  /**
   * The modulation offset, applicable if radial modulation is enabled.
   */
  modulationOffset?: number
}

const props = withDefaults(
  defineProps<ChromaticAberrationProps>(),
  {
    blendFunction: BlendFunction.SRC,
    offset: () => new Vector2(0.01, 0.01),
    radialModulation: false,
    modulationOffset: 0.15,
  },
)

const { pass, effect } = useEffect(() => new ChromaticAberrationEffect(props), props)

defineExpose({ pass, effect })

makePropWatchers(
  [
    [() => props.offset, 'offset'],
    [() => props.radialModulation, 'radialModulation'],
    [() => props.modulationOffset, 'modulationOffset'],
  ],
  effect,
  () => new ChromaticAberrationEffect(),
)
</script>
