<script lang="ts" setup>
import type { BlendFunction, EdgeDetectionMode, PredicationMode, SMAAPreset } from 'postprocessing'
import { EffectPass, SMAAEffect, TextureEffect } from 'postprocessing'
import { makePropWatchers } from '../../util/prop'
import { useEffectPmndrs } from './composables/useEffectPmndrs'
import { inject, watch } from 'vue'
import { useTresContext } from '@tresjs/core'
import { effectComposerInjectionKey } from './EffectComposerPmndrs.vue'

export interface SMAAPmndrsProps {
  /**
   * The blend function.
   */
  blendFunction?: BlendFunction
  /**
   * The opacity of the effect.
   */
  opacity?: number
  /**
   * The preset configuration for SMAA (Subpixel Morphological Antialiasing).
   */
  preset?: SMAAPreset
  /**
   * The mode used for edge detection.
   */
  edgeDetectionMode?: EdgeDetectionMode
  /**
   * The mode used for predication to improve edge detection.
   */
  predicationMode?: PredicationMode
  /**
   * The debug mode for visualizing the effect.
   *
   * OPTIONS:
   * - 0: OFF
   * - 1: EDGES
   * - 2: WEIGHTS
   */
  debug?: number
}

const props = defineProps<SMAAPmndrsProps>()

const { pass, effect } = useEffectPmndrs(() => new SMAAEffect(props), props)
const { camera } = useTresContext()
const composer = inject(effectComposerInjectionKey)

defineExpose({ pass, effect })

const defaultSMAAEffect = new SMAAEffect()

makePropWatchers(
  [
    [() => Number(props.blendFunction), 'blendMode.blendFunction'],
    [() => Number(props.predicationMode), 'edgeDetectionMaterial.predicationMode'],
    [() => Number(props.edgeDetectionMode), 'edgeDetectionMaterial.edgeDetectionMode'],
  ],
  effect,
  () => new SMAAEffect(),
)

watch(
  [effect, () => props.opacity],
  () => {
    if (!effect.value) { return }

    if (props.opacity !== undefined) {
      effect.value.blendMode.setOpacity(props.opacity)
    }
    else {
      effect.value.blendMode.setOpacity(defaultSMAAEffect.blendMode.getOpacity())
    }
  },
  { immediate: true },
)

watch(
  [effect, () => props.preset],
  () => {
    if (!effect.value) { return }
    effect.value.applyPreset(Number(props.preset))
  },
)

let smaaEdgesDebugPass: EffectPass | null = null
let smaaWeightsDebugPass: EffectPass | null = null

const createDebugPass = (type: 'edges' | 'weights') => {
  if (!effect.value) { return null }

  const texture = type === 'edges' ? effect.value.edgesTexture : effect.value.weightsTexture
  const pass = new EffectPass(camera.value, effect.value, new TextureEffect({ texture }))
  pass.renderToScreen = false
  pass.enabled = false
  pass.fullscreenMaterial.encodeOutput = false

  return pass
}

const ensureDebugPass = (type: 'edges' | 'weights') => {
  if (type === 'edges' && !smaaEdgesDebugPass) {
    smaaEdgesDebugPass = createDebugPass('edges')
  }
  else if (type === 'weights' && !smaaWeightsDebugPass) {
    smaaWeightsDebugPass = createDebugPass('weights')
  }
}

const manageDebugPass = (pass: EffectPass | null, active: boolean) => {
  if (!pass || !composer?.value) { return }

  if (pass.enabled === active) { return }

  pass.enabled = active
  pass.renderToScreen = active

  if (active && !composer?.value.passes.includes(pass)) {
    composer?.value.addPass(pass)
  }
  else if (!active && composer?.value.passes.includes(pass)) {
    composer?.value.removePass(pass)
    pass.dispose()
  }
}

const updateDebugMode = (mode: number) => {
  if (!pass.value) { return }

  const mainActive = mode === 0
  const edgesActive = mode === 1
  const weightsActive = mode === 2

  pass.value.enabled = mainActive
  pass.value.renderToScreen = mainActive

  if (edgesActive) { ensureDebugPass('edges') }
  if (weightsActive) { ensureDebugPass('weights') }

  manageDebugPass(smaaEdgesDebugPass, edgesActive)
  manageDebugPass(smaaWeightsDebugPass, weightsActive)

  if (!edgesActive) { smaaEdgesDebugPass = null }
  if (!weightsActive) { smaaWeightsDebugPass = null }
}

watch(
  () => props.debug,
  () => {
    if (!pass.value || props.debug === undefined) { return }

    updateDebugMode(props.debug)
  },
  { immediate: true },
)
</script>
