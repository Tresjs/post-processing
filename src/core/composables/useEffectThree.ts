import type { Pass } from 'three/examples/jsm/postprocessing/Pass'
import { inject, onUnmounted, shallowRef, watchEffect } from 'vue'
import { effectComposerInjectionKey } from '../three/EffectComposer.vue'

export const useEffectThree = <T extends Pass>(newPassFunction: () => T) => {
  const composer = inject(effectComposerInjectionKey)

  const pass = shallowRef<T>(newPassFunction())

  let unwatch = () => {} // seperate declaration prevents error in HMR
  unwatch = watchEffect(() => {
    if (!composer?.value) { return }

    composer.value.addPass(pass.value)
    unwatch()
  })

  onUnmounted(() => {
    composer?.value?.removePass(pass.value)
    pass.value.dispose()
  })

  return { pass }
}
