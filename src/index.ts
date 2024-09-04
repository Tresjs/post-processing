import Bloom from './core/postprocessing/Bloom.vue'
import DepthOfField from './core/postprocessing/DepthOfField.vue'
import EffectComposer from './core/EffectComposer.vue'
import EffectComposerThree from './core/three/EffectComposer.vue'
import PixelationThree from './core/three/Pixelation.vue' // TODO seperate exports differently
import GlitchThree from './core/three/Glitch.vue' // TODO seperate exports differently
import Glitch from './core/postprocessing/Glitch.vue'
import Outline from './core/postprocessing/Outline.vue'
import Pixelation from './core/postprocessing/Pixelation.vue'
import Vignette from './core/postprocessing/Vignette.vue'
import Noise from './core/postprocessing/Noise.vue'

import { useEffect } from './core/composables/effect.ts'

export {
  Bloom,
  DepthOfField,
  EffectComposer,
  Glitch,
  Noise,
  Outline,
  Pixelation,
  Vignette,
  useEffect,
  EffectComposerThree,
  PixelationThree,
  GlitchThree,
}
