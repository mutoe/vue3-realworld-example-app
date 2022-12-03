import AppLink from 'src/components/AppLink.vue'
import type { App, Component } from 'vue'

export const globalComponents: Record<string, Component> = {
  AppLink,
}

export default function registerGlobalComponents (app: App): void {
  for (const name in globalComponents) {
    app.component(name, globalComponents[name])
  }
}
