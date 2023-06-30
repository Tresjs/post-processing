import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./pages/index.vue'),
  },
  {
    path: '/outline',
    name: 'Outline',
    component: () => import('./pages/outline.vue'),
  },
  {
    path: '/glitch',
    name: 'Glitch',
    component: () => import('./pages/glitch.vue'),
  },
  {
    path: '/depth-of-field',
    name: 'Depth of Field',
    component: () => import('./pages/depth-of-field.vue'),
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
