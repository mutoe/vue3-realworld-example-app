import type { App } from 'vue'

import AppLink from '../components/AppLink.vue'

export default function registerGlobalComponents (app: App) {
  app.component('AppLink', AppLink)
}
