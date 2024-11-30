<script lang="ts" setup>
import { BlendFunction, ScanlineEffect } from 'postprocessing'
import { defineExpose, defineProps, watchEffect, withDefaults } from 'vue'
import { useEffect } from './composables/useEffect'
import { makePropWatchers } from '../../util/prop'

export interface ScanlineProps {
  /**
   * The blend function.
   */
  blendFunction?: BlendFunction

  /**
   * The density of the scanlines.
   */
  density?: number

  /**
   * The density of the scanlines.
   */
  scrollSpeed?: number

  /**
   * The opacity of the scanlines.
   */
  opacity?: number
}

const props = withDefaults(
  defineProps<ScanlineProps>(),
  {
    blendFunction: BlendFunction.OVERLAY,
    density: 1.25,
    opacity: 1.0,
    scrollSpeed: 0.0,
  },
)

const { pass, effect } = useEffect(() => new ScanlineEffect(props), props)

defineExpose({ pass, effect })

watchEffect(() => {
  if (!effect.value) { return }

  effect.value.blendMode.opacity.value = props.opacity
})

watchEffect(() => {
  if (!effect.value) { return }

  effect.value.blendMode.blendFunction = Number(props.blendFunction)
})

makePropWatchers(
  [
    [() => props.density, 'density'],
    [() => props.scrollSpeed, 'scrollSpeed'],
  ],
  effect,
  () => new ScanlineEffect(),
)
</script>
