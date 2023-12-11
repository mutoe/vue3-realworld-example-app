import type { App } from 'vue'
import AppLink from 'src/components/AppLink.vue'

export default function registerGlobalComponents(app: App): void {
  app.component('AppLink', AppLink)
}
