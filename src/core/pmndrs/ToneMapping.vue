<script lang="ts" setup>
import { BlendFunction, ToneMappingEffect, ToneMappingMode } from 'postprocessing'
import { defineExpose, defineProps, watchEffect, withDefaults } from 'vue'
import { useEffect } from './composables/useEffect'
import { makePropWatchers } from '../../util/prop'

export interface ToneMappingProps {
  /**
   * The tone mapping mode.
   */
  mode?: ToneMappingMode

  /**
   * The blend function.
   */
  blendFunction?: BlendFunction

  /**
   * The resolution for luminance texture. The resolution of the luminance texture. Must be a power of two.
   */
  resolution?: number

  /**
   * The average luminance. Only for `REINHARD2`.
   */
  averageLuminance?: number

  /**
   * The middle grey factor. Only for `REINHARD2`.
   */
  middleGrey?: number

  /**
   * The minimum luminance. Only for `REINHARD2`.
   */
  minLuminance?: number

  /**
   * The white point. Only for `REINHARD2`.
   */
  whitePoint?: number
}

const props = withDefaults(
  defineProps<ToneMappingProps>(),
  {
    mode: ToneMappingMode.AGX,
    blendFunction: BlendFunction.SRC,
    resolution: 256,
    averageLuminance: 1.0,
    middleGrey: 0.6,
    minLuminance: 0.01,
    whitePoint: 4.0,
  },
)

const { pass, effect } = useEffect(() => new ToneMappingEffect(props), props)

defineExpose({ pass, effect })

watchEffect(() => {
  if (!effect.value) { return }

  effect.value.blendMode.blendFunction = Number(props.blendFunction)
})

makePropWatchers(
  [
    [() => props.mode, 'mode'],
    [() => props.resolution, 'resolution'],
    [() => props.averageLuminance, 'averageLuminance'],
    [() => props.middleGrey, 'middleGrey'],
    [() => props.minLuminance, 'minLuminance'],
    [() => props.whitePoint, 'whitePoint'],
  ],
  effect,
  () => new ToneMappingEffect(),
)
</script>
