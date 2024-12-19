<script lang="ts" setup>
import { useTresContext } from '@tresjs/core'
import { HalftonePass } from 'three/examples/jsm/postprocessing/HalftonePass.js'
import { HalftoneShader } from 'three/examples/jsm/shaders/HalftoneShader.js'
import { computed, watchEffect } from 'vue'
import { useEffect } from './composables/useEffect.js'
import type { HalftoneProps } from './types.js'

const props = defineProps<HalftoneProps>()
const { sizes } = useTresContext()

const shakedProps = computed(() =>
  Object.fromEntries(
    Object.entries(props).filter(([_, value]) => value !== undefined),
  ),
)

const { pass } = useEffect(() => new HalftonePass(
  sizes.width.value,
  sizes.height.value,
  shakedProps.value,
), props)

defineExpose({ pass })

watchEffect(() => {
  pass.value.setSize(sizes.width.value, sizes.height.value)
})

watchEffect(() => {
  type UniformsKey = keyof typeof pass.value.uniforms

  Object.entries(props).forEach(([key, value]) => {
    if (key in pass.value.uniforms) {
      pass.value.uniforms[key as UniformsKey].value = value ?? HalftoneShader.uniforms[key as UniformsKey].value
    }
  })
})
</script>
