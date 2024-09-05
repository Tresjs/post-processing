<script lang="ts">
import { Vector2 } from 'three'
import { computed, watchEffect } from 'vue'
import { useTresContext } from '@tresjs/core'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { LuminosityHighPassShader } from 'three/examples/jsm/shaders/LuminosityHighPassShader.js'
import { useEffectThree } from '../composables/useEffectThree'

export interface UnrealBloomProps {
  radius?: number
  strength?: number
  threshold?: number
}
</script>

<script lang="ts" setup>
const props = withDefaults(defineProps<UnrealBloomProps>(), {
  radius: 0,
  strength: 1,
  threshold: 0,
})

const { sizes } = useTresContext()
const { pass } = useEffectThree(() => new UnrealBloomPass(
  new Vector2(sizes.width.value, sizes.height.value),
  props.radius,
  props.strength,
  props.threshold,
))

defineExpose({ pass })

watchEffect(() => {
  // TODO should this be done for all passes? 🤔
  pass.value.setSize(sizes.width.value, sizes.height.value)
})

watchEffect(() => {
  pass.value.radius = props.radius
  ?? pass.value.getCompositeMaterial().uniforms.bloomRadius?.value
  ?? 0.1
})

watchEffect(() => {
  pass.value.strength
  = props.strength
  ?? pass.value.getCompositeMaterial().uniforms.bloomStrength?.value
  ?? 1
})

watchEffect(() => {
  pass.value.threshold
  = props.threshold
  ?? LuminosityHighPassShader.uniforms.luminosityThreshold?.value
  ?? 1
})
</script>
