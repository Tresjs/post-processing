<script setup lang="ts">
import { ContactShadows, Environment, OrbitControls } from '@tresjs/cientos'
import { TresCanvas, useTexture } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { NoToneMapping, RepeatWrapping, SRGBColorSpace } from 'three'
import { BlendFunction } from 'postprocessing'
import { ref, watch } from 'vue'
import { EffectComposerPmndrs, TexturePmndrs } from '@tresjs/post-processing'
import type { Ref } from 'vue'
import type { EffectPass, TextureEffect } from 'postprocessing'

import '@tresjs/leches/styles'

const gl = {
  clearColor: '#ffffff',
  toneMapping: NoToneMapping,
}

const textureEffectRef: Ref<{ pass: EffectPass, effect: TextureEffect } | null> = ref(null)

const texture = await useTexture(['https://raw.githubusercontent.com/Tresjs/assets/main/textures/dirt/color.jpg'])
texture.colorSpace = SRGBColorSpace
texture.wrapS = texture.wrapT = RepeatWrapping

const { blendFunction, rotation, opacity } = useControls({
  blendFunction: {
    options: Object.keys(BlendFunction).map(key => ({
      text: key,
      value: BlendFunction[key as keyof typeof BlendFunction],
    })),
    value: BlendFunction.PIN_LIGHT,
  },
  opacity: {
    value: 1,
    min: 0,
    max: 1,
    step: 0.01,
  },
  repeat: texture.repeat,
  offset: texture.offset,
  center: texture.center,
  rotation: {
    value: texture.rotation,
    min: 0,
    max: 2 * Math.PI,
    step: 0.001,
  },
})

watch(rotation, () => {
  texture.rotation = rotation.value
})

// Example of using TextureEffect's setTextureSwizzleRGBA function
//   () => textureEffectRef.value?.effect,
//   () => {
//     if (!textureEffectRef.value?.effect) { return}

//     use setTextureSwizzleRGBA() from TextureEffect (https://pmndrs.github.io/postprocessing/public/docs/file/src/effects/TextureEffect.js.html#lineNumber192)
//     textureEffectRef.value?.effect.setTextureSwizzleRGBA()
//   },
// )
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
      <TresMeshPhysicalMaterial color="black" :roughness=".25" />
    </TresMesh>

    <ContactShadows
      :opacity="1"
      :position-y="-.5"
    />

    <Suspense>
      <Environment background :blur=".5" preset="snow" />
    </Suspense>

    <Suspense>
      <EffectComposerPmndrs>
        <TexturePmndrs
          ref="textureEffectRef"
          :blendFunction="Number(blendFunction)"
          :texture="texture"
          :opacity="opacity"
        />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
