# Kuwahara

<DocsDemo>
  <KuwaharaDemo />
</DocsDemo>

The `Kuwahara` effect is part of the [`postprocessing`](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/KuwaharaEffect.js~KuwaharaEffect.html) package. It allows you to apply a Kuwahara filter to your scene, providing a painterly effect.

## Usage

The `<KuwaharaPmndrs>` component is straightforward to use and provides customizable options to fine-tune the Kuwahara effect.

```vue{2,5-9,26-32}
<script setup lang="ts">
import { EffectComposerPmndrs, KuwaharaPmndrs } from '@tresjs/post-processing'
import { BlendFunction } from 'postprocessing'

const effectProps = reactive({
  radius: 1,
  blendFunction: BlendFunction.NORMAL,
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
      <TresMeshPhysicalMaterial color="white" />
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

## Props

| Prop           | Description                                                                                                                                                                  | Default                  |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| **radius**     | The intensity of the Kuwahara effect. A value between `0` (no effect) and `1` (maximum effect).                                                                               | `1`                      |
| **blendFunction** | Defines how the effect blends with the original scene. See the [`BlendFunction`](https://pmndrs.github.io/postprocessing/public/docs/variable/index.html#static-variable-BlendFunction) options. | `BlendFunction.NORMAL`   |

## Further Reading

For more details, see the [Kuwahara documentation](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/KuwaharaEffect.js~KuwaharaEffect.html).
