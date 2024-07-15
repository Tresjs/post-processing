<script lang="ts" setup>
import { SMAAEffect } from 'postprocessing'
import type { BlendFunction, EdgeDetectionMode, PredicationMode, SMAAPreset } from 'postprocessing'

import { useEffect } from '../composables/effect'

export interface SMAAProps {
  preset?: SMAAPreset
  blendFunction?: BlendFunction
  predicationMode?: PredicationMode
  edgeDetectionMode?: EdgeDetectionMode
}
const props = defineProps<SMAAProps>()

const params = {
  preset: props.preset,
  blendFunction: props.blendFunction,
  predicationMode: props.predicationMode,
  edgeDetectionMode: props.edgeDetectionMode,
}
const { pass, effect } = useEffect(() => new SMAAEffect(params))

defineExpose({ pass, effect })
</script>
