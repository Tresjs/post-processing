import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { kebabCase } from './util/string'

const makeRoute = (name: string, icon: string, isThreeEffect: boolean = true): RouteRecordRaw => {
  const nameInKebab = kebabCase(name)
  const folder = isThreeEffect ? 'three' : 'postprocessing'

  return {
    path: `/${folder}/${nameInKebab}`,
    name: `${folder}-${nameInKebab}`,
    meta: {
      icon,
      name,
    },
    component: () => import(`./pages/${folder}/${nameInKebab}.vue`),
  }
}

const home: RouteRecordRaw = {
  path: '/',
  name: 'Home',
  component: () => import('./pages/index.vue'),
}

export const threeRoutes = [
  makeRoute('Pixelation', '👾'),
]

export const postProcessingRoutes = [
  makeRoute('Outline', '🔲', false),
  makeRoute('Glitch', '📺', false),
  makeRoute('Depth of Field', '📷', false),
  makeRoute('Pixelation', '👾', false),
  makeRoute('Bloom', '🌼', false),
  makeRoute('Noise', '📟', false),
  makeRoute('Vignette', '🕶️', false),
  makeRoute('On-demand', '🔄', false),
]

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    home,
    ...threeRoutes,
    ...postProcessingRoutes,
  ],
})
