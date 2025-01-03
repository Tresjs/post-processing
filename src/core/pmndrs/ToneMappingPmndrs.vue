<script lang="ts" setup>
import { BlendFunction, ToneMappingEffect, ToneMappingMode } from 'postprocessing'
import { makePropWatchers } from '../../util/prop'
import { useEffectPmndrs } from './composables/useEffectPmndrs'

export interface ToneMappingPmndrsProps {
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
  defineProps<ToneMappingPmndrsProps>(),
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

const { pass, effect } = useEffectPmndrs(() => new ToneMappingEffect(props), props)

defineExpose({ pass, effect })

makePropWatchers(
  [
    [() => props.mode, 'mode'],
    [() => props.blendFunction, 'blendMode.blendFunction'],
    [() => props.resolution, 'resolution'],
    [() => props.averageLuminance, 'averageLuminance'],
    [() => props.middleGrey, 'middleGrey'],
    [() => props.minLuminance, 'adaptiveLuminanceMaterial.minLuminance'],
    [() => props.whitePoint, 'whitePoint'],
  ],
  effect,
  () => new ToneMappingEffect(),
)
</script>
