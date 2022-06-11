/* eslint-disable @typescript-eslint/consistent-type-imports */

import type AppLink from 'src/components/AppLink.vue'

declare module '@vue/runtime-core' {
  // noinspection JSUnusedGlobalSymbols
  export interface GlobalComponents {
    RouterLink: typeof import('vue-router')['RouterLink']
    RouterView: typeof import('vue-router')['RouterView']
    AppLink: typeof AppLink
  }
}
