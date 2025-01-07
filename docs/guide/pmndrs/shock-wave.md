# Shock Wave

<DocsDemo>
  <ShockWaveDemo />
</DocsDemo>

The `ShockWave` effect is part of the [`postprocessing`](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/ShockWaveEffect.js~ShockWaveEffect.html) package. It simulates a shockwave effect originating from a center point, creating a ripple-like distortion in the scene. This effect can add dramatic impact to your scene by simulating explosions or other shockwave phenomena.

## Usage

The `<ShockWavePmndrs>` component is easy to use and provides customizable options to suit different visual styles.

```vue{2,38-46}
<script setup lang="ts">
import { EffectComposerPmndrs, ShockWavePmndrs } from '@tresjs/post-processing/pmndrs'
import { Vector3 } from 'three'

const gl = {
  toneMapping: NoToneMapping,
  multisampling: 8,
}

const center = new Vector3(0.5, 0.5, 0.5)
</script>

<template>
  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera
      :position="[5, 5, 5]"
      :look-at="[0, 0, 0]"
    />

    <template
      v-for="i in 4"
      :key="i"
    >
      <TresMesh
        :position="[((i - 1) - (4 - 1) / 2) * 1.5, 0, 0]"
      >
        <TresBoxGeometry
          :width="4"
          :height="4"
          :depth="4"
        />
        <TresMeshStandardMaterial color="#1C1C1E" />
      </TresMesh>
    </template>

    <Suspense>
      <EffectComposerPmndrs>
        <ShockWavePmndrs
          :center="center"
          :amplitude="0.1"
          :wavelength="0.1"
          :speed="1.0"
        />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
```

## Props

| Prop              | Description                                                                                                   | Default                   |
| ----------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------- |
| blendFunction     | Defines the [`BlendFunction`](https://pmndrs.github.io/postprocessing/public/docs/variable/index.html#static-variable-BlendFunction) used for the effect.                                                               | `BlendFunction.SRC`       |
| center            | The center of the shockwave.                                                                                  | `Vector3(0.5, 0.5, 0.5)`  |
| amplitude         | The amplitude of the shockwave.                                                                               | `0.1`                     |
| wavelength        | The wavelength of the shockwave.                                                                              | `0.1`                     |
| speed             | The speed of the shockwave.                                                                                   | `1.0`                     |

## Further Reading
see [postprocessing docs](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/ShockWaveEffect.js~ShockWaveEffect.html)
