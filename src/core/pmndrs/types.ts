import type { BlendFunction, GlitchMode, KernelSize, VignetteTechnique } from 'postprocessing'
import type { Object3D, Texture, Vector2 } from 'three'
import type { TresColor } from '@tresjs/core'

export interface EffectComposerPmndrsProps {
  enabled?: boolean
  depthBuffer?: boolean
  disableNormalPass?: boolean
  stencilBuffer?: boolean
  resolutionScale?: number
  autoClear?: boolean
  multisampling?: number
  frameBufferType?: number
}

export interface DepthOfFieldPmndrsProps {
  /**
   * The blend function of this effect. This prop is not reactive.
   */
  blendFunction?: BlendFunction

  /**
   * The focus distance in world units.
   */
  worldFocusDistance?: number

  /**
   * The focus range in world units.
   */
  worldFocusRange?: number

  /**
   * The normalized focus distance. Range is [0.0, 1.0].
   */
  focusDistance?: number

  /**
   * The focus range. Range is [0.0, 1.0].
   */
  focusRange?: number

  /**
   * The scale of the bokeh blur.
   */
  bokehScale?: number

  resolutionScale?: number
  resolutionX?: number
  resolutionY?: number
}

export interface BloomPmndrsProps {
  /**
   * The blend function of this effect. This prop is not reactive.
   * @default BlendFunction.SCREEN
   * @type {BlendFunction}
   * @memberof BloomPmndrsProps
   */
  blendFunction?: BlendFunction
  /**
   * The intensity of the bloom effect.
   *
   * @default 1
   * @type {number}
   * @memberof BloomPmndrsProps
   */
  intensity?: number
  /**
   * The kernel size.
   *
   * @default KernelSize.LARGE
   *
   * @type {KernelSize}
   * @memberof BloomPmndrsProps
   */
  kernelSize?: KernelSize
  /**
   * The luminance threshold. Raise this value to mask out darker elements in the scene. Range is [0, 1].
   *
   * @default 0.9
   *
   * @type {number}
   * @memberof BloomPmndrsProps
   */
  luminanceThreshold?: number
  /**
   * Controls the smoothness of the luminance threshold. Range is [0, 1].
   *
   * @default 0.025
   *
   * @type {number}
   * @memberof BloomPmndrsProps
   */
  luminanceSmoothing?: number
  /**
   * Enables mip map blur.
   *
   * @default false
   *
   * @type {boolean}
   * @memberof BloomPmndrsProps
   */
  mipmapBlur?: boolean
}

export interface GlitchPmndrsProps {
  blendFunction?: BlendFunction
  /**
   *  The minimum and maximum delay between glitch activations in seconds.
   */
  delay?: Vector2
  /**
   * The minimum and maximum duration of a glitch in seconds.
   */
  duration?: Vector2
  /**
   * The strength of weak and strong glitches.
   */
  strength?: Vector2
  /**
   * The glitch mode. Can be DISABLED | SPORADIC | CONSTANT_MILD | CONSTANT_WILD.
   */
  mode?: GlitchMode
  /**
   * Turn the effect on and off.
   */
  active?: boolean
  /**
   *
   * The threshold for strong glitches.
   */
  ratio?: number
  /**
   * The scale of the blocky glitch columns.
   */
  columns?: number
  /**
   * A chromatic aberration offset. If provided, the glitch effect will influence this offset.
   */
  chromaticAberrationOffset?: Vector2
  /**
   * A perturbation map. If none is provided, a noise texture will be created.
   */
  perturbationMap?: Texture
  /**
   * The size of the generated noise map. Will be ignored if a perturbation map is provided.
   */
  dtSize?: number
}

export interface NoisePmndrsProps {
  /**
   * Whether the noise should be multiplied with the input color.
   */
  premultiply?: boolean
  blendFunction?: BlendFunction
}

export interface OutlinePmndrsProps {
  /**
   * The objects in the scene which should have an outline.
   */
  outlinedObjects: Object3D[]

  blur?: boolean

  /**
   * Whether occluded parts of selected objects should be visible
   */
  xRay?: boolean

  /**
   * The blur kernel size. Must be used with blur being true.
   */
  kernelSize?: KernelSize

  /**
   * The pulse speed. A value of zero disables the pulse effect.
   */
  pulseSpeed?: number
  resolutionX?: number
  resolutionY?: number
  edgeStrength?: number
  patternScale?: number

  /**
   * The number of samples used for multisample antialiasing. Requires WebGL 2.
   */
  multisampling?: number

  /**
   * The blend function. Use `BlendFunction.ALPHA` for dark outlines.
   */
  blendFunction?: BlendFunction
  patternTexture?: Texture
  resolutionScale?: number
  hiddenEdgeColor?: TresColor
  visibleEdgeColor?: TresColor
}

export interface PixelationPmndrsProps {
  /**
   * The pixel granularity.
   */
  granularity?: number
}

export interface VignettePmndrsProps {
  /**
   * Whether the noise should be multiplied with the input color.
   */
  technique?: VignetteTechnique
  blendFunction?: BlendFunction
  offset: number
  darkness: number
}
