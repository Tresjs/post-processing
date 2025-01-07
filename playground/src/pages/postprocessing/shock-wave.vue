<script setup lang="ts">
import { ContactShadows, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { NoToneMapping, Vector3 } from 'three'
import { EffectComposerPmndrs, ShockWavePmndrs } from '@tresjs/post-processing'
import { onKeyStroke, useMouse, useWindowSize } from '@vueuse/core'

import '@tresjs/leches/styles'

const gl = {
  clearColor: '#ffffff',
  toneMapping: NoToneMapping,
  multisampling: 8,
  envMapIntensity: 10,
}

const { x, y } = useMouse()

const { width, height } = useWindowSize()

const shockWaveEffect = ref(null)

// const cursorX = computed(() => (x.value / width.value - 0.5))
// const cursorY = computed(() => -(y.value / height.value - 0.5))

const cursorX = computed(() => (x.value / width.value) * 2.0 - 1.0)
const cursorY = computed(() => -(y.value / height.value) * 2.0 + 1.0)

watch([cursorX, cursorY], ([x, y]) => {
  console.log(cursorX.value, cursorY.value)
}, { immediate: true })

onKeyStroke('e', (_e) => {
  console.log('effect', shockWaveEffect.value.effect)
  console.log('effect position', shockWaveEffect.value.effect.position)
  shockWaveEffect.value.effect.explode()
}, { dedupe: true })

const { positionX, positionY, positionZ, amplitude, waveSize, speed, maxRadius } = useControls({
  positionX: { value: 0, step: 0.01, min: -10, max: 10 },
  positionY: { value: 0, step: 0.01, min: -10, max: 10 },
  positionZ: { value: 0, step: 0.01, min: -10, max: 10 },
  amplitude: { value: 0.05, step: 0.001, max: 1.0 },
  waveSize: { value: 0.2, step: 0.01, max: 1.0 },
  speed: { value: 1, step: 0.1, max: 10.0 },
  maxRadius: { value: 1.0, step: 0.1, max: 10.0 },
})
</script>

<template>
  <TresLeches />

  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera
      :position="[5, 5, 5]"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls auto-rotate />

    <TresMesh :position="[0, .5, 0]">
      <TresBoxGeometry :args="[2, 2, 2]" />
      <TresMeshPhysicalMaterial color="#82DBC5" :roughness=".25" />
    </TresMesh>

    <ContactShadows
      :opacity="1"
      :position-y="-.5"
    />

    <Suspense>
      <EffectComposerPmndrs>
        <ShockWavePmndrs ref="shockWaveEffect" :position="[cursorX, cursorY, 0]" :amplitude="amplitude.value" :waveSize="waveSize.value" :speed="speed.value" :maxRadius="maxRadius.value" />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
