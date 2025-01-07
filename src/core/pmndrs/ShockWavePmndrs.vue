<script lang="ts" setup>
import type { BlendFunction } from 'postprocessing'
import { ShockWaveEffect } from 'postprocessing'
import { Vector3 } from 'three'
import { makePropWatchers } from '../../util/prop'
import { useEffectPmndrs } from './composables/useEffectPmndrs'

export interface ShockWavePmndrsProps {
  /**
   * The blend function.
   */
  blendFunction?: BlendFunction

  /**
   * The center of the shockwave.
   */
  center?: Vector3

  /**
   * The amplitude of the shockwave.
   */
  amplitude?: number

  /**
   * The wavelength of the shockwave.
   */
  wavelength?: number

  /**
   * The speed of the shockwave.
   */
  speed?: number
}

const props = withDefaults(
  defineProps<ShockWavePmndrsProps>(),
  {
    center: () => new Vector3(0.5, 0.5, 0.5),
    amplitude: 0.1,
    wavelength: 0.1,
    speed: 1.0,
  },
)

const { pass, effect } = useEffectPmndrs(() => new ShockWaveEffect(props), props)

defineExpose({ pass, effect })

makePropWatchers(
  [
    [() => props.blendFunction, 'blendMode.blendFunction'],
    [() => props.center, 'center'],
    [() => props.amplitude, 'amplitude'],
    [() => props.wavelength, 'wavelength'],
    [() => props.speed, 'speed'],
  ],
  effect,
  () => new ShockWaveEffect(),
)
</script>
