<script lang="ts">
import { RenderPixelatedPass } from 'three/examples/jsm/postprocessing/RenderPixelatedPass.js'
import { inject } from 'vue'
import { useTresContext } from '@tresjs/core'
import { useEffectThree } from '../composables/useEffectThree'
import { effectComposerInjectionKey } from './EffectComposer.vue'

export interface PixelationProps {
  pixelSize: number
}
</script>

<script lang="ts" setup>
const props = defineProps<PixelationProps>()

const { scene, camera } = useTresContext()

const renderPixelatedPass = new RenderPixelatedPass(props.pixelSize, scene.value, camera.value!)

useEffectThree(() => new RenderPixelatedPass(props.pixelSize, scene.value, camera.value!))
</script>
