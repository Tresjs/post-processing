# Hue & Saturation

<DocsDemo>
  <HueSaturationDemo />
</DocsDemo>

The `HueSaturation` effect is part of the [`postprocessing`](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/HueSaturationEffect.js~HueSaturationEffect.html) package. It allows you to adjust the hue and saturation of your scene, providing flexibility for color grading and artistic effects.

## Usage

The `<HueSaturationPmndrs>` component is straightforward to use and provides customizable options to fine-tune the hue and saturation of your visuals.

```vue{2,5-9,26-32}
<script setup lang="ts">
import { EffectComposerPmndrs, HueSaturationPmndrs } from '@tresjs/post-processing'
import { BlendFunction } from 'postprocessing'

const effectProps = {
  saturation: 1,
  hue: -Math.PI,
  blendFunction: BlendFunction.SRC,
}
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera
      :position="[5, 5, 5]"
      :look-at="[0, 0, 0]"
    />

    <OrbitControls auto-rotate />

    <TresMesh :position="[0, 1, 0]">
      <TresBoxGeometry :args="[2, 2, 2]" />
      <TresMeshPhysicalMaterial color="white" />
    </TresMesh>

    <Suspense>
      <EffectComposerPmndrs>
        <HueSaturationPmndrs
          v-bind="effectProps"
        />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
```

## Props

| Prop           | Description                                                                                                                                                                  | Default                  |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| **saturation** | The saturation adjustment. A value of `0.0` results in grayscale, while `1.0` leaves saturation unchanged. Range: `[0.0, 1.0]`.                                               | `0.0`                    |
| **hue**        | The hue adjustment in radians. Values range from `[-π, π]` (or `[0, 2π]` for a full rotation).                                                                               | `0.0`                    |
| **blendFunction** | Defines how the effect blends with the original scene. See the [`BlendFunction`](https://pmndrs.github.io/postprocessing/public/docs/variable/index.html#static-variable-BlendFunction) options. | `BlendFunction.SRC`      |

## Further Reading

For more details, see the [HueSaturation documentation](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/HueSaturationEffect.js~HueSaturationEffect.html).

# Dot Screen

<DocsDemo>
  <DotScreenDemo />
</DocsDemo>

The `DotScreen` effect is part of the [`postprocessing`](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/DotScreenEffect.js~DotScreenEffect.html) package. It allows you to create a dot screen effect, providing flexibility for artistic effects.

## Usage

The `<DotScreenPmndrs>` component is straightforward to use and provides customizable options to fine-tune the dot screen effect.

```vue{2,5-9,26-32}
<script setup lang="ts">
import { EffectComposerPmndrs, DotScreenPmndrs } from '@tresjs/post-processing'
import { BlendFunction } from 'postprocessing'

const effectProps = {
  angle: 1.57,
  scale: 1.0,
  blendFunction: BlendFunction.SRC,
}
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera
      :position="[5, 5, 5]"
      :look-at="[0, 0, 0]"
    />

    <OrbitControls auto-rotate />

    <TresMesh :position="[0, 1, 0]">
      <TresBoxGeometry :args="[2, 2, 2]" />
      <TresMeshPhysicalMaterial color="white" />
    </TresMesh>

    <Suspense>
      <EffectComposerPmndrs>
        <DotScreenPmndrs
          v-bind="effectProps"
        />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
```

## Props

| Prop           | Description                                                                                                                                                                  | Default                  |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| **angle**      | The angle of the dot pattern. Default: `1.57`.                                                                                                                               | `1.57`                   |
| **scale**      | The scale of the dot pattern. Default: `1.0`.                                                                                                                                | `1.0`                    |
| **blendFunction** | Defines how the effect blends with the original scene. See the [`BlendFunction`](https://pmndrs.github.io/postprocessing/public/docs/variable/index.html#static-variable-BlendFunction) options. | `BlendFunction.SRC`      |

## Further Reading

For more details, see the [DotScreen documentation](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/DotScreenEffect.js~DotScreenEffect.html).
