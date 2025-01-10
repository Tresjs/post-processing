# Color Average

<DocsDemo>
  <ColorAverageDemo />
</DocsDemo>

The `ColorAverage` effect is part of the [`postprocessing`](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/ColorAverageEffect.js~ColorAverageEffect.html) package. It averages the colors of the scene, creating a unique visual effect. This effect can be used to achieve a variety of artistic styles.

## Usage

The `<ColorAveragePmndrs>` component is easy to use and provides customizable options to suit different visual styles.

```vue{2,38-40}
<script setup lang="ts">
import { EffectComposerPmndrs, ColorAveragePmndrs } from '@tresjs/post-processing/pmndrs'

const gl = {
  toneMapping: NoToneMapping,
  multisampling: 8,
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
        <ColorAveragePmndrs :blendFunction="BlendFunction.NORMAL" />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
```

## Props

| Prop              | Description                                                                                                   | Default                   |
| ----------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------- |
| blendFunction     | Defines the [`BlendFunction`](https://pmndrs.github.io/postprocessing/public/docs/variable/index.html#static-variable-BlendFunction) used for the effect.                                                               | `BlendFunction.NORMAL`    |

## Further Reading
For more details, see the [ColorAverage documentation](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/ColorAverageEffect.js~ColorAverageEffect.html)
