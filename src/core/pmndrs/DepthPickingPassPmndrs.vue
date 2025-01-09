<script lang="ts" setup>
import type { DepthPackingStrategies } from 'three'
import { DepthPickingPass } from 'postprocessing'
import { inject, onUnmounted, shallowRef, watch } from 'vue'
import { effectComposerInjectionKey } from './EffectComposerPmndrs.vue'

export interface DepthPickingPmndrsProps {
  depthPacking?: DepthPackingStrategies
  mode?: number
}

const props = defineProps<DepthPickingPmndrsProps>()
const composer = inject(effectComposerInjectionKey)

const pass = shallowRef(new DepthPickingPass(props))

watch(composer, () => {
  if (composer?.value && pass.value) {
    composer.value.addPass(pass.value)
  }
})

onUnmounted(() => {
  if (!composer.value || !pass.value) { return }

  composer.value.removePass(pass.value)
  pass.value.dispose()
})

defineExpose({ pass })
</script>
