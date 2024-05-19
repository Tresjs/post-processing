<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import GraphPane from '../../../components/GraphPane.vue'
import OnDemandExperience from './experience.vue'
</script>

<template>
  <GraphPane />
  <TresCanvas
    render-mode="on-demand"
    clear-color="#c0ffee"
  >
    <OnDemandExperience />
  </TresCanvas>
</template>
