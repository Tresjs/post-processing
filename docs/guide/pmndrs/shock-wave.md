# Shock Wave

<DocsDemo>
  <ShockWaveDemo />
</DocsDemo>

The `ShockWave` effect is part of the [`postprocessing`](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/ShockWaveEffect.js~ShockWaveEffect.html) package. It simulates a shockwave effect originating from a center point, creating a ripple-like distortion in the scene. This effect can add dramatic impact to your scene by simulating explosions or other shockwave phenomena.

## Usage

The `<ShockWavePmndrs>` component is easy to use and provides customizable options to suit different visual styles.

### Using DepthPickingPassPmndrs

The `DepthPickingPassPmndrs` component is used to read the depth information from the scene. This is particularly useful when you need to interact with the 3D objects in the scene based on their depth, such as triggering effects at specific points in 3D space.

In the example above, `DepthPickingPassPmndrs` is used to determine the depth of the point where the shockwave effect should originate. This allows the shockwave to interact accurately with the 3D objects in the scene.

```vue{2,38-46}
<script setup lang="ts">
import { EffectComposerPmndrs, ShockWavePmndrs, DepthPickingPassPmndrs } from '@tresjs/post-processing/pmndrs'
import { useMouse, useWindowSize } from '@vueuse/core'
import { Vector3 } from 'three'

const gl = {
  toneMapping: NoToneMapping,
  multisampling: 8,
}

const effectProps = {
  speed: 1.0,
}

const position = ref(new Vector3(0, 0, 0))
const depthPickingPassRef = ref(null)
const shockWaveEffectRef = ref(null)

const { x, y } = useMouse()
const { width, height } = useWindowSize()

const cursorX = computed(() => (x.value / width.value) * 2.0 - 1.0)
const cursorY = computed(() => -(y.value / height.value) * 2.0 + 1.0)

async function updateMousePosition() {
  if (!elCanvas.value || !shockWaveEffectRef.value || !depthPickingPassRef.value) { return }

  const ndcPosition = new Vector3(cursorX.value, cursorY.value, 0)

  ndcPosition.z = await depthPickingPassRef.value.pass.readDepth(ndcPosition)
  ndcPosition.z = ndcPosition.z * 2.0 - 1.0

  mousePosition.value.copy(ndcPosition.unproject(elCanvas.value.context.camera.value))
}

function triggerShockWave() {
  if (!elCanvas.value || !shockWaveEffectRef.value) { return }

  updateMousePosition()

  shockWaveEffectRef.value.effect.explode()
}
</script>

<template>
  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera
      :position="[5, 5, 5]"
      :look-at="[0, 0, 0]"
    />

    <TresMesh>
      <TresBoxGeometry />
      <TresMeshStandardMaterial color="#1C1C1E" />
    </TresMesh>

    <Suspense>
      <EffectComposerPmndrs>
        <DepthPickingPassPmndrs ref="depthPickingPassRef" />
        <ShockWavePmndrs
          ref="shockWaveEffectRef"
          :position="position"
          v-bind="effectProps"
        />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
```

### Using Raycast

Another technique to determine the position of the shockwave effect is by using raycasting. Raycasting allows you to project a ray from the camera through the mouse position and find the intersection point with objects in the scene. This technique is useful when you need to interact with specific objects based on user input.

Here is an example of how to use raycasting to trigger the shockwave effect:

```vue
<script setup lang="ts">
import { EffectComposerPmndrs, ShockWavePmndrs } from '@tresjs/post-processing/pmndrs'
import { Raycaster, Vector2, Vector3 } from 'three'
import { ref } from 'vue'

const raycaster = new Raycaster()
const mouse = new Vector2()
const shockWaveEffect = ref(null)
const elCanvas = ref(null)
const mousePosition = ref(new Vector3())

function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
}

function triggerShockWave() {
  if (!elCanvas.value || !shockWaveEffect.value) { return }

  raycaster.setFromCamera(mouse, elCanvas.value.context.camera.value)
  const intersects = raycaster.intersectObjects(elCanvas.value.context.scene.value.children)

  if (intersects.length > 0) {
    mousePosition.value.copy(intersects[0].point)
    shockWaveEffect.value.effect.explode()
  }
}

window.addEventListener('mousemove', onMouseMove)
</script>

<template>
  <TresCanvas ref="elCanvas">
    <!-- ...existing code... -->
    <EffectComposerPmndrs>
      <ShockWavePmndrs ref="shockWaveEffect" :position="mousePosition" />
    </EffectComposerPmndrs>
  </TresCanvas>
</template>
```

## Props

| Prop              | Description                                                                                                   | Default                   |
| ----------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------- |
| position          | The position of the shockwave.                                                                                | `Vector3(0, 0, 0)`  |
| amplitude         | The amplitude of the shockwave.                                                                               | `0.05`                     |
| waveSize          | The wave size of the shockwave.                                                                               | `0.2`                     |
| speed             | The speed of the shockwave.                                                                                   | `2.0`                     |
| maxRadius         | The max radius of the shockwave.                                                                              | `1.0`                     |

## Further Reading
see [postprocessing docs](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/ShockWaveEffect.js~ShockWaveEffect.html)
