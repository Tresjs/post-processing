<script lang="ts" setup>
import { useTresContext } from '@tresjs/core'
import { DepthOfFieldEffect } from 'postprocessing'
import { makePropWatchers } from '../../util/prop.js'
import { useEffectPmndrs } from './composables/useEffectPmndrs.js'
import type { DepthOfFieldPmndrsProps } from './types.js'

const props = defineProps<DepthOfFieldPmndrsProps>()
const { camera } = useTresContext()

const { pass, effect } = useEffectPmndrs(() => new DepthOfFieldEffect(camera.value, props), props)
defineExpose({ pass, effect })

makePropWatchers(
  [
    // blendFunction is not updated, because it has no setter in BloomEffect
    [() => props.worldFocusDistance, 'circleOfConfusionMaterial.worldFocusDistance'],
    [() => props.focusDistance, 'circleOfConfusionMaterial.focusDistance'],
    [() => props.worldFocusRange, 'circleOfConfusionMaterial.worldFocusRange'],
    [() => props.focusRange, 'circleOfConfusionMaterial.focusRange'],
    [() => props.bokehScale, 'bokehScale'],
    [() => props.resolutionScale, 'blurPass.resolution.scale'],
    [() => props.resolutionX, 'resolution.width'],
    [() => props.resolutionY, 'resolution.height'],
  ],
  effect,
  () => new DepthOfFieldEffect(),
)
</script>
