<script setup lang="ts">
import { ContactShadows, Environment, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { NoToneMapping, Shape, Vector3 } from 'three'
import { computed, reactive, ref, shallowRef } from 'vue'
import { EffectComposerPmndrs, ShockWavePmndrs } from '@tresjs/post-processing'
import { DepthPickingPass } from 'postprocessing'
import { useMouse, useWindowSize } from '@vueuse/core'

import '@tresjs/leches/styles'

const gl = {
  clearColor: '#ffffff',
  toneMapping: NoToneMapping,
  multisampling: 8,
}

const meshHearRef = shallowRef(null)
const shockWaveEffect = shallowRef(null)
const mousePosition = ref(new Vector3())
const effectComposerRef = ref(null)
const elCanvas = ref(null)

const depthPickingPass = new DepthPickingPass()

function createHeartShape(scale: number) {
  const shape = new Shape()
  const x = 0
  const y = 0

  shape.moveTo(x, y)
  shape.bezierCurveTo(x, y, x - 0.5 * scale, y + 2.5 * scale, x - 2.5 * scale, y + 2.5 * scale)
  shape.bezierCurveTo(x - 6.5 * scale, y + 2.5 * scale, x - 6.5 * scale, y - 1.5 * scale, x - 6.5 * scale, y - 1.5 * scale)
  shape.bezierCurveTo(x - 6.5 * scale, y - 4.5 * scale, x - 3.5 * scale, y - 7 * scale, x, y - 9.5 * scale)
  shape.bezierCurveTo(x + 3.5 * scale, y - 7 * scale, x + 6.5 * scale, y - 4.5 * scale, x + 6.5 * scale, y - 1.5 * scale)
  shape.bezierCurveTo(x + 6.5 * scale, y - 1.5 * scale, x + 6.5 * scale, y + 2.5 * scale, x + 2.5 * scale, y + 2.5 * scale)
  shape.bezierCurveTo(x + 0.5 * scale, y + 2.5 * scale, x, y, x, y)

  return shape
}

const heartShape = createHeartShape(0.35)

const { x, y } = useMouse()
const { width, height } = useWindowSize()

const extrudeSettings = reactive({
  depth: 0.1,
  bevelEnabled: true,
  bevelSegments: 2,
  steps: 2,
  bevelSize: 0.25,
  bevelThickness: 0.25,
})

const { amplitude, waveSize, speed, maxRadius } = useControls({
  amplitude: { value: 0.3, step: 0.01, max: 1.0 },
  waveSize: { value: 0.75, step: 0.01, max: 1.0 },
  speed: { value: 0.5, step: 0.1, max: 10.0 },
  maxRadius: { value: 1.0, step: 0.1, max: 10.0 },
})

const cursorX = computed(() => (x.value / width.value) * 2.0 - 1.0)
const cursorY = computed(() => -(y.value / height.value) * 2.0 + 1.0)

async function updateMousePosition3D() {
  if (!elCanvas.value || !shockWaveEffect.value || !depthPickingPass) { return }

  const ndcPosition = new Vector3(cursorX.value, cursorY.value, 0)
  ndcPosition.z = await depthPickingPass.readDepth(ndcPosition)
  ndcPosition.z = ndcPosition.z * 2.0 - 1.0

  mousePosition.value.copy(ndcPosition.unproject(elCanvas.value.context.camera.value))
}

function updateMousePosition() {
  updateMousePosition3D()
}

function triggerShockWave() {
  if (!elCanvas.value || !shockWaveEffect.value) { return }

  updateMousePosition()

  const delay = getActiveDuration()
  console.log('finish', delay)

  setTimeout(() => {
    console.log('finish')
  }, delay)

  shockWaveEffect.value.effect.explode()
}

function getActiveDuration() {
  // Retrieve the values dynamically
  const radiusMax = maxRadius.value.value
  const wave = waveSize.value.value

  // Duration formula: 2 * maxRadius + 3 * waveSize
  const duration = 2 * radiusMax + 3 * wave

  // Convert to milliseconds
  return duration * 1000
}

console.log('Active duration:', getActiveDuration())

watch(() => effectComposerRef.value?.composer, () => {
  if (!effectComposerRef.value?.composer) { return }

  effectComposerRef.value.composer.addPass(depthPickingPass)
})

onBeforeUnmount(() => {
  if (!effectComposerRef.value?.composer || !depthPickingPass) { return }

  effectComposerRef.value.composer.removePass(depthPickingPass)
  depthPickingPass.dispose()
})
</script>

<template>
  <TresLeches style="left: initial;right:10px; top:10px;" />

  <TresCanvas
    ref="elCanvas"
    v-bind="gl"
  >
    <TresPerspectiveCamera
      :position="[0, 0, 10]"
    />

    <OrbitControls make-default />

    <TresMesh ref="meshHearRef" :position-y="2" @click="triggerShockWave">
      <TresExtrudeGeometry :args="[heartShape, extrudeSettings]" />
      <TresMeshStandardMaterial
        color="#78B158"
      />
    </TresMesh>

    <ContactShadows
      :opacity="1"
      :position-y="-2"
      :scale="20"
      :blur=".85"
    />

    <Suspense>
      <Environment background :intensity="2" :blur="0" preset="snow" />
    </Suspense>

    <Suspense>
      <EffectComposerPmndrs ref="effectComposerRef">
        <ShockWavePmndrs ref="shockWaveEffect" :position="mousePosition" :amplitude="amplitude.value" :waveSize="waveSize.value" :speed="speed.value" :maxRadius="maxRadius.value" />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
