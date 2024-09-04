<script lang="ts" setup>
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js'
import { useEffectThree } from '../composables/useEffectThree'

const { pass } = useEffectThree(() => new GlitchPass())

defineExpose({ pass })
</script>
