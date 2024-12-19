import { readFile, writeFile, readdir } from 'node:fs/promises'

/**
 * Fix node16 issue: https://www.typescriptlang.org/tsconfig/#allowArbitraryExtensions
 * - node10 and bundler will check for d.vue.ts and vue.d.ts file when importing a vue file in a dts
 * - node16 will check only for d.vue.ts file, this function will just copy/paste the content of vue.d.ts to d.vue.ts
 *
 * @param path {String}
 * @return {Promise<void>}
 */
async function patchVueDts(path) {
  const files = await readdir(path, { recursive: false })
  for (const file of files) {
    if (file.endsWith('.vue.d.ts')) {
      await writeFile(`${path}/${file.replace('.vue.d.ts', '.d.vue.ts')}`, await readFile(`${path}/${file}`, 'utf-8'), 'utf-8')
    }
  }
}

/**
 * Adds `.js` when importing the core/xxx/index.js in the dts
 *
 * @param pmndrsDts {Boolean}
 * @return {Promise<void>}
 */
async function patchRootDts(pmndrsDts) {
  const dts = `dist/${pmndrsDts ? 'pmndrs' : 'three'}.d.ts`
  const replacement = `./core/${pmndrsDts ? 'pmndrs' : 'three'}/index`
  const content = await readFile(dts, 'utf8')
  await writeFile(dts, content.replace(replacement, `${replacement}.js`))
}

async function fixNode16() {
  await Promise.all([
    patchRootDts(true),
    patchRootDts(false),
    patchVueDts('dist/core/pmndrs'),
    patchVueDts('dist/core/three'),
  ])
}

fixNode16()
