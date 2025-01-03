import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = never
declare module "../../../node_modules/.pnpm/nuxt@3.13.2_@parcel+watcher@2.5.0_@types+node@22.10.0_eslint@9.15.0_jiti@2.4.0__ioredis@5.4.1_odbv7es2w4e3qpijgkqlo3jp6e/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}
declare module 'nitropack' {
  interface NitroRouteConfig {
    appMiddleware?: MiddlewareKey | MiddlewareKey[] | Record<MiddlewareKey, boolean>
  }
}