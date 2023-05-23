import { useWindowSize } from '@vueuse/core'
import { useRenderLoop, Camera } from '@tresjs/core'
import { defineComponent, provide, shallowRef, ShallowRef, toRefs, watch, watchEffect } from 'vue'
import { DepthDownsamplingPass, EffectComposer as EffectComposerImpl, NormalPass, RenderPass } from 'postprocessing'
import { isWebGL2Available } from 'three-stdlib'

import { useCore } from '../useCore'

export interface EffectComposerProps {
  /**
   * Whether the effect composer is enabled.
   * @default true
   * @type {boolean}
   * @memberof EffectComposerProps // TODO why is this here?
   * @name enabled
   *
   **/
  enabled?: boolean
  /**
   * The children of the effect composer.
   * @default []
   * @type {Array}
   * @memberof EffectComposerProps
   * @name children
   *
   **/
  children?: Array<any> // TODO remove; it is not in use
  /**
   * Whether the depth buffer is enabled.
   * @default true
   * @type {boolean}
   * @memberof EffectComposerProps
   * @name depthBuffer
   *
   **/
  depthBuffer?: boolean // TODO use
  /**
   *
   * @default false
   * @type {boolean}
   * @memberof EffectComposerProps
   * @name dissableNormalPass
   *
   **/
  dissableNormalPass?: boolean // TODO typo diSSableNormalPass  // TODO remove; it is not in use
  /**
   *
   * Stencil buffer.
   *
   * @type {boolean}
   * @memberof EffectComposerProps
   * @name stencilBuffer
   *
   **/
  stencilBuffer?: boolean // TODO ruse!
  /**
   *
   * Whether the effect composer should clear the buffers before rendering.
   *
   * @type {boolean}
   * @memberof EffectComposerProps
   * @name autoClear
   *
   **/
  autoClear?: boolean // TODO remove; it is not in use
  /**
   *
   * The resolution scale.
   *
   * @type {number}
   * @memberof EffectComposerProps
   * @name resolutionScale
   *
   **/
  resolutionScale?: number // TODO remove; is not (really) in use
  /**
   *
   * The multisampling.
   *
   * @type {number}
   * @memberof EffectComposerProps
   * @name multisampling
   *
   **/
  multisampling?: number //TODO use
  /**
   *
   * The frame buffer type.
   *
   * @type {number}
   * @memberof EffectComposerProps
   * @name frameBufferType
   *
   **/
  frameBufferType?: number // TODO use

  /**
   *
   * The render priority.
   *
   * @type {number}
   * @memberof EffectComposerProps
   * @name renderPriority
   *
   **/
  renderPriority?: number // TODO remove, is not in use
  /**
   *
   * A camera to use for rendering.
   *
   * @type {Camera}
   * @memberof EffectComposerProps
   * @name camera
   *
   **/
  camera?: Camera
  /**
   * A scene to use for rendering.
   * @type {Scene}
   * @memberof EffectComposerProps
   * @name scene
   *
   **/
  scene?: Scene // TODO How would this be used? I could imagine, that the post processing components would not work without having a TresScene.
}

export const EffectComposer = defineComponent<EffectComposerProps>({
  name: 'EffectComposer',
  props: [
    'enabled',
    'children',
    'depthBuffer',
    'dissableNormalPass',
    'stencilBuffer',
    'autoClear',
    'resolutionScale',
    'multisampling',
    'frameBufferType',
    'renderPriority',
    'camera',
    'scene',
  ] as unknown as undefined,

  setup(props, { slots }) {
    const { state } = useCore()
    const {
      enabled = true,
      renderPriority = 1,
      autoClear = true,
      multisampling = 8,
      frameBufferType = HalfFloatType,
      resolutionScale,
    } = toRefs(props)
    const effectComposer: ShallowRef<EffectComposerImpl | null> = shallowRef(null)

    const scene = props.scene || state.scene
    const camera = props.camera || state.camera
    let downSamplingPass = null
    let normalPass = null
    const webGL2Available = isWebGL2Available()

    provide('effectComposer', effectComposer)

    const { width, height } = useWindowSize()

    function setNormalPass() {
      // TODO there is no code that enables the normal pass and downsampling pass. I'd suggest we remove the unused parts until they are in use
      if (effectComposer.value) {
        normalPass = new NormalPass(scene as Scene, camera as Camera)
        normalPass.enabled = false
        effectComposer.value.addPass(normalPass)
        if (resolutionScale.value !== undefined && webGL2Available) {
          downSamplingPass = new DepthDownsamplingPass({
            normalBuffer: normalPass.texture,
            resolutionScale: resolutionScale?.value,
          })
          downSamplingPass.enabled = false
          effectComposer.value.addPass(downSamplingPass)
        }
      }
    }

    watchEffect(() => {
      // TODO this will run way to often
      // a new EffectComposer and RenderPass is created whenever the active camera changes.
      // we should set camera via `renderPass.camera = ` only when it changes instead

      if (state.renderer && state.scene && state.camera) {
        state.renderer.setSize(width.value, height.value) // TODO remove; should be the responsibility of renderer
        state.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // TODO remove; should be the responsibility of renderer
        effectComposer.value = new EffectComposerImpl(state.renderer)
        effectComposer.value.addPass(new RenderPass(scene, camera))

        if (!props.dissableNormalPass) {
          setNormalPass()
        }
      }
    })

    watch(
      () => props.enabled,
      enabled => {
        if (effectComposer.value) {
          effectComposer.value.enabled = enabled
        }
      },
    )

    const { onLoop } = useRenderLoop()

    onLoop(() => {
      if (effectComposer.value) {
        effectComposer.value.render()
      }
    })

    return () => {
      return slots.default?.()
    }
  },
})
