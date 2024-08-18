<script lang="ts">
import { RenderPixelatedPass } from 'three/examples/jsm/postprocessing/RenderPixelatedPass.js'
import { useTresContext } from '@tresjs/core'
import { useEffectThree } from '../composables/useEffectThree'

export interface PixelationProps {
  pixelSize: number
}
</script>

<script lang="ts" setup>
const props = defineProps<PixelationProps>()

const { scene, camera } = useTresContext()

const { pass } = useEffectThree(() => new RenderPixelatedPass(props.pixelSize, scene.value, camera.value!))

defineExpose({ pass })
</script>
