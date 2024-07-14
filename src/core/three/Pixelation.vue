<script lang="ts" setup>
import { RenderPixelatedPass } from 'three/addons/postprocessing/RenderPixelatedPass.js'
import { inject } from 'vue'
import { useTresContext } from '@tresjs/core'
import { effectComposerInjectionKey } from './EffectComposer.vue'

// TODO props

const composer = inject(effectComposerInjectionKey)
const { scene, camera } = useTresContext()

const renderPixelatedPass = new RenderPixelatedPass(16, scene.value, camera.value!)

composer!.value!.addPass(renderPixelatedPass) // TODO move to composable
</script>
