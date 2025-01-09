<script setup lang="ts">
import { ContactShadows, Environment, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { NoToneMapping, Shape, Vector3 } from 'three'
import { computed, reactive, ref, shallowRef } from 'vue'
import { DepthPickingPassPmndrs, EffectComposerPmndrs, ShockWavePmndrs } from '@tresjs/post-processing'
import { useElementSize, useMouse, useParentElement } from '@vueuse/core'

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
const depthPickingPassRef = ref(null)

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

const parentEl = useParentElement()
const { x, y } = useMouse({ target: parentEl })
const { width, height } = useElementSize(parentEl)

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
  speed: { value: 1, step: 0.1, max: 10.0 },
  maxRadius: { value: 1.0, step: 0.1, max: 10.0 },
})

const cursorX = computed(() => ((x.value - width.value) / width.value) * 2.0)
const cursorY = computed(() => -((y.value - height.value) / height.value) * 2.0)

async function updateMousePosition() {
  if (!elCanvas.value || !shockWaveEffect.value || !depthPickingPassRef.value) { return }

  const ndcPosition = new Vector3(cursorX.value, cursorY.value, 0)

  // Read depth from depth picking pass
  ndcPosition.z = await depthPickingPassRef.value.pass.readDepth(ndcPosition)
  ndcPosition.z = ndcPosition.z * 2.0 - 1.0

  mousePosition.value.copy(ndcPosition.unproject(elCanvas.value.context.camera.value))
}

function triggerShockWave() {
  if (!elCanvas.value || !shockWaveEffect.value) { return }

  updateMousePosition()

  shockWaveEffect.value.effect.explode()

  const duration = getActiveDuration()

  // Fallback for onFinish
  setTimeout(() => {
    console.log('Explode animation done')
    console.log('Total duration:', duration)
  }, duration)
}

function getActiveDuration() {
  // This function retrieves the duration for emitting the shock wave.
  // For more details, see: https://github.com/pmndrs/postprocessing/blob/3d3df0576b6d49aec9e763262d5a1ff7429fd91a/src/effects/ShockWaveEffect.js#L258-L301

  // To reduce the duration of the animation, you can decrease the values of maxRadius and waveSize.
  // Note that the speed affects how quickly the shock wave radius increases over time, but not the total duration of the emit explode.

  // Retrieve the values dynamically
  const radiusMax = maxRadius.value.value
  const wave = waveSize.value.value

  // Duration formula: 2 * maxRadius + 3 * waveSize
  const duration = 2 * radiusMax + 3 * wave

  // Convert to milliseconds
  return duration * 1000
}
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

    <TresMesh :position="[0, .5, -5]" @click="triggerShockWave">
      <TresBoxGeometry :args="[2, 2, 2]" />
      <TresMeshPhysicalMaterial color="#82DBC5" :roughness=".25" />
    </TresMesh>

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
        <DepthPickingPassPmndrs ref="depthPickingPassRef" />
        <ShockWavePmndrs ref="shockWaveEffect" :position="mousePosition" :amplitude="amplitude.value" :waveSize="waveSize.value" :speed="speed.value" :maxRadius="maxRadius.value" />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
