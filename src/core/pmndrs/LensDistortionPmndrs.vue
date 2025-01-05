<script lang="ts" setup>
import type { BlendFunction } from 'postprocessing'
import { LensDistortionEffect } from 'postprocessing'
import { makePropWatchers } from '../../util/prop'
import { useEffectPmndrs } from './composables/useEffectPmndrs'
import { Vector2 } from 'three'

export interface LensDistortionPmndrsProps {
  /**
   * The distortion effect strength.
   */
  distortion?: Vector2 | [number, number]

  /**
   * The center point.
   */
  principalPoint?: Vector2 | [number, number]

  /**
   * The focal length.
   */
  focalLength?: Vector2 | [number, number]

  /**
   * The skew value.
   */
  skew?: number

  /**
   * The blend function. Defines how the effect blends with the original scene.
   */
  blendFunction?: BlendFunction
}

const props = withDefaults(
  defineProps<LensDistortionPmndrsProps>(),
  {
    distortion: new Vector2(0.0, 0.0),
    principalPoint: new Vector2(0.0, 0.0),
    focalLength: new Vector2(1.0, 1.0),
    skew: 0,
  },
)

const { pass, effect } = useEffectPmndrs(() => new LensDistortionEffect(props), props)

defineExpose({ pass, effect })

makePropWatchers(
  [
    [() => props.blendFunction, 'blendMode.blendFunction'],
    [() => props.distortion, 'distortion'],
    [() => props.principalPoint, 'principalPoint'],
    [() => props.focalLength, 'focalLength'],
    [() => props.skew, 'skew'],
  ],
  effect,
  () => new LensDistortionEffect(),
)
</script>
