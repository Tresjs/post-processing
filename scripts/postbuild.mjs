import { readFile, writeFile } from 'node:fs/promises'

async function fixNode16() {
  let file = await readFile('dist/pmndrs.d.ts', 'utf8')
  await writeFile('dist/pmndrs.d.ts', file.replace('./core/pmndrs/index', './core/pmndrs/index.js'))
  file = await readFile('dist/three.d.ts', 'utf8')
  await writeFile('dist/three.d.ts', file.replace('./core/three/index', './core/three/index.js'))
}

fixNode16()
