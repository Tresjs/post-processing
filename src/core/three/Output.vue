<script lang="ts" setup>
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js'
import { useEffectThree } from '../composables/useEffectThree'

const { pass } = useEffectThree(() => new OutputPass())

defineExpose({ pass })
</script>
