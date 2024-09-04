<script lang="ts" setup>
import { GlitchThree } from '@tresjs/post-processing'
import BasicScene from '../../components/BasicScene.vue'
</script>

<template>
  <BasicScene>
    <template #effects>
      <GlitchThree />
    </template>
  </BasicScene>
</template>
