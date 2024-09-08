import { useTresContext } from '@tresjs/core'
import { inject, onUnmounted, shallowRef, watchEffect } from 'vue'
import type { Pass } from 'three/examples/jsm/postprocessing/Pass.js'
import { effectComposerInjectionKey } from '../three/EffectComposer.vue'

export const useEffectThree = <T extends Pass>(newPassFunction: () => T) => {
  const composer = inject(effectComposerInjectionKey)

  const pass = shallowRef<T>(newPassFunction())
  const { sizes } = useTresContext()

  let unwatch = () => {} // seperate declaration prevents error in HMR
  unwatch = watchEffect(() => {
    if (!composer?.value || !sizes.height.value || !sizes.width.value) { return }

    composer.value.addPass(pass.value)
    unwatch()
  })

  onUnmounted(() => {
    composer?.value?.removePass(pass.value)
    pass.value.dispose()
  })

  return { pass }
}
