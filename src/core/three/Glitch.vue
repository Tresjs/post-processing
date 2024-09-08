<script lang="ts">
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js'
import { makePropWatchers } from '../../util/prop'
import { useEffectThree } from '../composables/useEffectThree'

export interface GlitchProps {
  /**
   * The size of the generated noise map
   */
  dtSize?: number
  /**
   * If true, the glitch effect will be more wild 🤪
   */
  goWild?: boolean
}
</script>

<script lang="ts" setup>
const props = defineProps<GlitchProps>()

const { pass } = useEffectThree(() => new GlitchPass(props.dtSize))

defineExpose({ pass })

makePropWatchers(
  [[() => props.goWild, 'goWild']],
  pass,
  () => new GlitchPass(),
)
</script>
