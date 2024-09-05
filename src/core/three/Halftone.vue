<script lang="ts">
import { HalftonePass } from 'three/examples/jsm/postprocessing/HalftonePass.js'
import { useTresContext } from '@tresjs/core'
import { HalftoneShader } from 'three/examples/jsm/shaders/HalftoneShader.js'
import { computed, watchEffect } from 'vue'
import type { Blending } from 'three/src/constants.js'
import { useEffectThree } from '../composables/useEffectThree'

export const Dot = 1
export const Ellipse = 2
export const Line = 3
export const Square = 4

export type HalftoneShape = typeof Dot | typeof Ellipse | typeof Line | typeof Square

interface HalftonePassProps {
  shape?: HalftoneShape
  radius?: number
  rotateR?: number
  rotateG?: number
  rotateB?: number
  scatter?: number
  blending?: number
  greyscale?: boolean
  blendingMode?: Blending
}
</script>

<script lang="ts" setup>
const props = defineProps<HalftonePassProps>()
const { sizes } = useTresContext()

const shakedProps = computed(() =>
  Object.fromEntries(
    Object.entries(props).filter(([_, value]) => value !== undefined),
  ),
)

const { pass } = useEffectThree(() => new HalftonePass(
  sizes.width.value,
  sizes.height.value,
  shakedProps.value,
))
defineExpose({ pass })

watchEffect(() => {
  pass.value.setSize(sizes.width.value, sizes.height.value)
})

watchEffect(() => {
  Object.entries(props).forEach(([key, value]) => {
    if (key in pass.value.uniforms) {
      pass.value.uniforms[key].value = value ?? HalftoneShader.uniforms[key].value
    }
  })
})
</script>
