<script lang="ts" setup>
import { useLoop } from '@tresjs/core'
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js'
import { makePropWatchers } from '../../util/prop.js'
import { useEffect } from './composables/useEffect.js'
import type { GlitchProps } from './types.js'

const props = defineProps<GlitchProps>()

const { pass } = useEffect(() => new GlitchPass(props.dtSize), props)

defineExpose({ pass })

const { onBeforeRender } = useLoop()
onBeforeRender(({ invalidate }) => invalidate())

makePropWatchers(
  [[() => props.goWild, 'goWild']],
  pass,
  () => new GlitchPass(),
)
</script>
