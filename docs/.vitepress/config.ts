import { templateCompilerOptions } from '@tresjs/core'
import { resolve } from 'pathe'
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Post-processing',
  description: 'Post-processing effects for TresJS',
  head: [
    ['link', { rel: 'icon', type: 'image/svg', href: '/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#82DBC5' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@tresjs_dev' }],
    ['meta', { name: 'twitter:creator', content: '@tresjs_dev' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Cientos - TresJS' }],
    [
      'meta',
      {
        property: 'og:image',
        content: '/og-banner.png',
      },
    ],
    [
      'meta',
      {
        property: 'twitter:image',
        content: '/og-banner.png',
      },
    ],
    ['script', { 'defer': 'true', 'data-site': 'OWBUVCJK', 'src': 'https://cdn.usefathom.com/script.js' }],
  ],
  themeConfig: {
    logo: '/logo.svg',
    search: {
      provider: 'local',
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Guide', link: '/guide/' },
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [{ text: 'Introduction', link: '/guide/' }],
      },
      {
        text: 'Pmndrs',
        items: [
          { text: 'Bloom', link: '/guide/pmndrs/bloom' },
          { text: 'Depth of Field', link: '/guide/pmndrs/depth-of-field' },
          { text: 'Glitch', link: '/guide/pmndrs/glitch' },
          { text: 'Noise', link: '/guide/pmndrs/noise' },
          { text: 'Outline', link: '/guide/pmndrs/outline' },
          { text: 'Pixelation', link: '/guide/pmndrs/pixelation' },
          { text: 'Vignette', link: '/guide/pmndrs/vignette' },
          { text: 'Barrel blur', link: '/guide/pmndrs/barrel-blur' },
        ],
      },
      {
        text: 'Three',
        items: [
          { text: 'Glitch', link: '/guide/three/glitch' },
          { text: 'Halftone', link: '/guide/three/halftone' },
          { text: 'Output', link: '/guide/three/output' },
          { text: 'Pixelation', link: '/guide/three/pixelation' },
          { text: 'SMAA', link: '/guide/three/smaa' },
          { text: 'Unreal Bloom', link: '/guide/three/unreal-bloom' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'twitter', link: 'https://twitter.com/tresjs_dev' },
      { icon: 'discord', link: 'https://discord.gg/UCr96AQmWn' },
      { icon: 'github', link: 'https://github.com/Tresjs/post-processing' },
    ],
  },
  vite: {
    optimizeDeps: {
      exclude: ['vitepress'],
      include: ['three'],
    },
    server: {
      hmr: {
        overlay: false,
      },
    },
    resolve: {
      alias: {
        '@tresjs/post-processing/three': resolve(__dirname, '../../src/core/three'),
        '@tresjs/post-processing/pmndrs': resolve(__dirname, '../../src/core/pmndrs'),
      },
      dedupe: ['three', '@tresjs/core'],
    },
  },
  vue: {
    ...templateCompilerOptions,
  },
})
