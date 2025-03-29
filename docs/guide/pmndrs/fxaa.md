# FXAA

<DocsDemoGUI>
  <FXAADemo />
</DocsDemoGUI>

<details>
  <summary>Demo code</summary>

  <<< @/.vitepress/theme/components/pmdrs/FXAADemo.vue{0}
</details>

The `FXAAEffect` effect is part of the [`postprocessing`](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/FXAAEffect.js~FXAAEffect.html) package.
FXAA offers a performance-friendly anti-aliasing solution, smoothing jagged edges while maintaining good speed. However, the quality can be only modest, sometimes resulting in a slightly blurry appearance.

  <a href="https://x.com/Miamiamia0103/status/1490355292487487494" target="_blank" class="flex flex-col gap-[7.5px] items-center justify-center">
    <img src="https://pbs.twimg.com/media/FK7MziPWUAYdHfu?format=jpg&name=large" alt="@Miamiamia0103 illustration" class="w-4/5">
    <span class="text-xs">
      Illustration credit @Miamiamia0103
    </span>
  </a>

:::info
When using the `<EffectComposerPmndrs>` pipeline, enabling native antialiasing with the [`antialias`](https://docs.tresjs.org/api/tres-canvas.html#props) props on `<TresCanvas>` is unnecessary.
:::

## Usage

The `<FXAAPmndrs>` component is easy to use and provides customizable options to suit different visual styles.

```vue{2,17-21}
<script setup lang="ts">
import { EffectComposerPmndrs, FXAAPmndrs } from '@tresjs/post-processing/pmndrs'

const gl = {
  antialias: false,
  toneMapping: NoToneMapping,
}

</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera />

    <!-- Your scene -->

    <Suspense>
      <EffectComposerPmndrs>
        <FXAAPmndrs />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
```

## Props

| Prop          | Description                                                         | Default                     |
| ------------- | ------------------------------------------------------------------- | --------------------------- |
| blendFunction | Defines how the effect blends with the original scene. See the [`BlendFunction`](https://pmndrs.github.io/postprocessing/public/docs/variable/index.html#static-variable-BlendFunction) options.             | `BlendFunction.SRC`        |

## Further Reading
For more details, see the [FXAAEffect documentation](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/FXAAEffect.js~FXAAEffect.html)
