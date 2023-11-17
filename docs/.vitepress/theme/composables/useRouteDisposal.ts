import { useRouter } from 'vitepress'
import { watch } from 'vue'

export function useRouteDisposal(effectComposer) {
  const router = useRouter()

  watch(() => router.route.data.relativePath, () => {
    effectComposer.value?.composer.dispose()
  })
}