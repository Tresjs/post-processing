import Bloom from './core/postprocessing/Bloom.vue'
import Glitch from './core/postprocessing/Glitch.vue'
import Noise from './core/postprocessing/Noise.vue'
import Outline from './core/postprocessing/Outline.vue'
import Vignette from './core/postprocessing/Vignette.vue'
import SMAAThree from './core/three/SMAA.vue' // TODO seperate exports differently
import Pixelation from './core/postprocessing/Pixelation.vue'
import GlitchThree from './core/three/Glitch.vue' // TODO seperate exports differently
import OutputThree from './core/three/Output.vue' // TODO seperate exports differently
import DepthOfField from './core/postprocessing/DepthOfField.vue'
import HalftoneThree from './core/three/Halftone.vue' // TODO seperate exports differently
import EffectComposer from './core/postprocessing/EffectComposer.vue'
import PixelationThree from './core/three/Pixelation.vue' // TODO seperate exports differently
import UnrealBloomThree from './core/three/UnrealBloom.vue' // TODO seperate exports differently
import { useEffect } from './core/composables/effect'

import { useEffectThree } from './core/composables/useEffectThree'
import EffectComposerThree from './core/three/EffectComposer.vue'

export {
  Bloom,
  Noise,
  Glitch,
  Outline,
  Vignette,
  useEffect,
  SMAAThree,
  Pixelation,
  GlitchThree,
  OutputThree,
  DepthOfField,
  HalftoneThree,
  EffectComposer,
  useEffectThree,
  PixelationThree,
  UnrealBloomThree,
  EffectComposerThree,
}
