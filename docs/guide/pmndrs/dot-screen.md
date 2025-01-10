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
