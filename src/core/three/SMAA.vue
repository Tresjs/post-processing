<script lang="ts" setup>
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js'
import { useTresContext } from '@tresjs/core'
import { computed, watchEffect } from 'vue'
import { useDevicePixelRatio } from '@vueuse/core'
import { useEffectThree } from '../composables/useEffectThree'

const props = defineProps<{
  width?: number
  height?: number
}>()

const { sizes } = useTresContext()
const { pixelRatio } = useDevicePixelRatio() // the renderers pixel ratio is not used because it is not reactive

const width = computed(() => props.width ?? sizes.width.value * pixelRatio.value)
const height = computed(() => props.height ?? sizes.height.value * pixelRatio.value)

const { pass } = useEffectThree(() => new SMAAPass(width.value, height.value))

defineExpose({ pass })

watchEffect(() => {
  pass.value.setSize(width.value, height.value)
})
</script>
