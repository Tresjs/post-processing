# Kuwahara (Watercolor Painting)

<DocsDemo>
  <KuwaharaDemo />
</DocsDemo>

The `Kuwahara` effect is part of the [`postprocessing`](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/KuwaharaEffect.js~KuwaharaEffect.html) package. It allows you to apply a Kuwahara filter to your scene, providing a painterly effect.

The Kuwahara effect smooths out an image while keeping the edges sharp. It splits the image into small parts, checks each part for differences, and uses the part with the least differences. This makes the image look like a painting, reducing noise but keeping important details.

## Usage

The `<KuwaharaPmndrs>` component is straightforward to use and provides customizable options to fine-tune the Kuwahara effect.

```vue{2,5-9,26-32}
<script setup lang="ts">
import { EffectComposerPmndrs, KuwaharaPmndrs } from '@tresjs/post-processing'
import { BlendFunction } from 'postprocessing'

const effectProps = reactive({
  radius: 1,
  blendFunction: BlendFunction.NORMAL,
  sectorCount: 4,
})
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
      <TresMeshPhysicalMaterial color="green" />
    </TresMesh>

    <Suspense>
      <EffectComposerPmndrs>
        <KuwaharaPmndrs
          v-bind="effectProps"
        />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
```

::: warning
It is normal to experience a drastic drop in FPS when you significantly increase the `radius` in the Kuwahara effect. This is because a higher `radius` increases the number of calculations performed for each pixel, which can be very costly in terms of performance.

The `sectorCount` value in the shader determines the number of sectors used to calculate the variance and average color in the Kuwahara effect. It divides the space around each pixel into several sectors to perform these calculations. A higher number of sectors can improve the quality of the effect but also increases the computational cost. Therefore, the `sectorCount` value helps find a good compromise between rendering quality and performance.
:::

## Props

| Prop           | Description                                                                                                                                                                  | Default                  |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| **radius**     | The intensity of the Kuwahara effect. A value between `0` (no effect) and `1` (maximum effect).                                                                               | `1`                      |
| **blendFunction** | Defines how the effect blends with the original scene. See the [`BlendFunction`](https://pmndrs.github.io/postprocessing/public/docs/variable/index.html#static-variable-BlendFunction) options. | `BlendFunction.NORMAL`   |
| **sectorCount** | The number of sectors used in the Kuwahara filter. Higher values can improve the quality of the effect but may reduce performance. <br> The maximum value is `8`. <br> *It is preferable that the value is an **Integer***. | `4`                      |

## Further Reading

Inspired by and based on the post [On Crafting Painterly Shaders](https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/).
