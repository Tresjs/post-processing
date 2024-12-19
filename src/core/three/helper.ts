import type { InjectionKey, ShallowRef } from 'vue'
import type { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'

export const effectComposerInjectionKey: InjectionKey<ShallowRef<EffectComposer | null>> = Symbol('effectComposerThree')
