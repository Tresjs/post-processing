import type { Blending } from 'three/src/constants'

export interface EffectComposerProps {
  enabled?: boolean
  withoutRenderPass?: boolean
}

export interface GlitchProps {
  /**
   * The size of the generated noise map
   */
  dtSize?: number
  /**
   * If true, the glitch effect will be more wild 🤪
   */
  goWild?: boolean
}

export interface PixelationProps {
  pixelSize: number
  depthEdgeStrength?: number
  normalEdgeStrength?: number
}

export interface SMAAProps {
  width?: number
  height?: number
}

export interface UnrealBloomProps {
  radius?: number
  strength?: number
  threshold?: number
}

export enum HalftoneShape {
  Dot = 1,
  Ellipse = 2,
  Line = 3,
  Square = 4,
}

export interface HalftoneProps {
  shape?: HalftoneShape
  radius?: number
  rotateR?: number
  rotateG?: number
  rotateB?: number
  scatter?: number
  blending?: number
  greyscale?: boolean
  blendingMode?: Blending
}
