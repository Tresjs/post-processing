<script lang="ts" setup>
import { useTresContext } from '@tresjs/core'
import { RenderPixelatedPass } from 'three/examples/jsm/postprocessing/RenderPixelatedPass.js'
import { watchEffect } from 'vue'
import { makePropWatchers } from '../../util/prop.js'
import { useEffect } from './composables/useEffect.js'
import type { PixelationProps } from './types.js'

const props = defineProps<PixelationProps>()

const { scene, camera } = useTresContext()

const { pass } = useEffect(() => new RenderPixelatedPass(props.pixelSize, scene.value, camera.value!), props)

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
