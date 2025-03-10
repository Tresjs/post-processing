import type { Effect } from 'postprocessing'
import type { Reactive, ShallowRef } from 'vue'
import { useTresContext } from '@tresjs/core'
import { EffectPass } from 'postprocessing'
import { inject, nextTick, onUnmounted, shallowRef, watch, watchEffect } from 'vue'
import { effectComposerInjectionKey } from '../EffectComposerPmndrs.vue'

export const useEffectPmndrs = <T extends Effect>(
  newEffectFunction: () => T,
  passDependencies: Reactive<object>,
  /**
   * Props that require effect recreation when changed
   */
  recreateOnPropsChange?: string[],
): {
  pass: ShallowRef<EffectPass | null>
  effect: ShallowRef<T | null>
} => {
  const composer = inject(effectComposerInjectionKey)
  const pass = shallowRef<EffectPass | null>(null) as ShallowRef<EffectPass | null>
  const effect = shallowRef<T | null>(null) as ShallowRef<T | null>

  const { scene, camera, invalidate } = useTresContext()

  if (passDependencies) {
    watch(passDependencies, () => invalidate())
  }

  // Watch for changes in props that require effect recreation
  if (recreateOnPropsChange) {
    watch(
      () => recreateOnPropsChange.map(prop => (passDependencies as Record<string, any>)[prop]),
      () => {
        removePass()
        createEffect()
      },
    )
  }

  watchEffect(() => {
    if (!camera.value || !effect?.value) { return }

    effect.value.mainCamera = camera.value
  })

  function removePass() {
    if (pass.value) { composer?.value?.removePass(pass.value) }
    effect.value?.dispose()
    pass.value?.dispose()
  }

  function createEffect() {
    if (!camera.value || !composer?.value || !scene.value) { return }

    effect.value = newEffectFunction()
    pass.value = new EffectPass(camera.value, effect.value)

    composer.value.addPass(pass.value)
  }

  // Initial effect creation
  const unwatch = watchEffect(() => {
    if (!camera.value || !composer?.value || !scene.value) { return }

    nextTick(() => unwatch())
    if (effect.value) { return }

    createEffect()
  })

  onUnmounted(() => {
    removePass()
  })

  return {
    pass,
    effect,
  }
}
