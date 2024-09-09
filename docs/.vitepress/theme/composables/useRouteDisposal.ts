import { useRouter } from 'vitepress'
import { ref, watch } from 'vue'
import type { EffectComposer } from '@tresjs/post-processing/pmndrs'

export function useRouteDisposal() {
  const router = useRouter()

  const effectComposer = ref<InstanceType<typeof EffectComposer> | null>(null)

  watch(() => router.route.data.relativePath, () => {
    effectComposer.value?.composer.dispose()
  })

  return {
    effectComposer,
  }
}
