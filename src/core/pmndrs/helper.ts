import type { InjectionKey, ShallowRef } from 'vue'
import type { EffectComposer } from 'postprocessing'

export const effectComposerInjectionKey: InjectionKey<ShallowRef<EffectComposer | null>> = Symbol('effectComposer')
