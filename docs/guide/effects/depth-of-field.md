# DepthOfField

<ClientOnly>
<DepthOfFieldDemo class="demo-scene"  />
</ClientOnly>

DepthOfField is an effect that mimics the behavior of a real-life camera. In a real-world camera, objects at a specific distance are in sharp focus while objects that are closer or further away from that point are increasingly out of focus.

## Usage

```vue
<script setup lang="ts">
import { EffectComposer, DepthOfField } from '@tresjs/post-processing'
</script>

<template>
  <EffectComposer>
    <DepthOfField 
      :focus-distance="2" 
      :focalLength="0.03" 
      :bokehScale="2" 
    />
  </EffectComposer>
</template>
```

## Props

| Prop            | Description                                                       | Default                 |
| --------------- | ----------------------------------------------------------------- | ----------------------- |
| `blendFunction` | Defines how this effect blends with the underlying scene.         | `BlendFunction.NORMAL`  |
| `focusDistance` | The distance from the camera where objects will be in focus.      | `0`                     |
| `focalLength`  | The distance between the camera and the plane in focus.           | `0.1`                   |
| `bokehScale`    | The scale factor for the bokeh (blur).                            | `1`                     |
| `width`         | The width of the render.                                          |                         |
| `height`        | The height of the render.                                         |                         |
