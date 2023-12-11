import type AppLink from 'src/components/AppLink.vue'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    RouterLink: typeof import('vue-router')['RouterLink']
    RouterView: typeof import('vue-router')['RouterView']
    AppLink: typeof AppLink
  }
}
