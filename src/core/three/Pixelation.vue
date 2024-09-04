<script lang="ts">
import { RenderPixelatedPass } from 'three/examples/jsm/postprocessing/RenderPixelatedPass.js'
import { useTresContext } from '@tresjs/core'
import { watchEffect } from 'vue'
import { useEffectThree } from '../composables/useEffectThree'
import { makePropWatchers } from '../../util/prop'

export interface PixelationProps {
  pixelSize: number
  depthEdgeStrength?: number
  normalEdgeStrength?: number
}
</script>

<script lang="ts" setup>
const props = defineProps<PixelationProps>()

const { scene, camera } = useTresContext()

const { pass } = useEffectThree(() => new RenderPixelatedPass(props.pixelSize, scene.value, camera.value!))

defineExpose({ pass })

watchEffect(() => {
  pass.value.setPixelSize(props.pixelSize)
})

makePropWatchers(
  [
    [() => props.depthEdgeStrength, 'depthEdgeStrength'],
    [() => props.normalEdgeStrength, 'normalEdgeStrength'],
  ],
  pass,
  () => new RenderPixelatedPass(1, scene.value, camera.value!),
)
</script>
