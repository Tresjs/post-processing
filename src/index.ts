import Bloom from './core/postprocessing/Bloom.vue'
import Noise from './core/postprocessing/Noise.vue'
import Glitch from './core/postprocessing/Glitch.vue'
import Outline from './core/postprocessing/Outline.vue'
import Vignette from './core/postprocessing/Vignette.vue'
import SMAAThree from './core/three/SMAA.vue' // TODO seperate exports differently
import Pixelation from './core/postprocessing/Pixelation.vue'
import GlitchThree from './core/three/Glitch.vue' // TODO seperate exports differently
import OutputThree from './core/three/Output.vue' // TODO seperate exports differently
import DepthOfField from './core/postprocessing/DepthOfField.vue'
import HalftoneThree from './core/three/Halftone.vue' // TODO seperate exports differently
import EffectComposer from './core/EffectComposer.vue'
import PixelationThree from './core/three/Pixelation.vue' // TODO seperate exports differently
import UnrealBloomThree from './core/three/UnrealBloom.vue' // TODO seperate exports differently
import EffectComposerThree from './core/three/EffectComposer.vue'

import { useEffect } from './core/composables/effect'
import { useEffectThree } from './core/composables/useEffectThree'

export {
  Bloom,
  Noise,
  Glitch,
  Outline,
  Vignette,
  Pixelation,
  DepthOfField,

  useEffect,
  EffectComposer,

  SMAAThree,
  GlitchThree,
  OutputThree,
  HalftoneThree,
  PixelationThree,
  UnrealBloomThree,

  useEffectThree,
  EffectComposerThree,
}
