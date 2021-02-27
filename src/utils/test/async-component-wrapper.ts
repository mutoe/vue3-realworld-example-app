// https://github.com/vuejs/vue-test-utils-next/issues/258#issuecomment-732249010
import { Component, DefineComponent, defineComponent } from 'vue'

export default function asyncComponentWrapper (component: Component): DefineComponent {
  if (component.name === undefined) {
    console.log('component name is undefined')
    return null as never
  }

  return defineComponent({
    components: { [component.name]: component },
    template: `<Suspense><${component.name}/></Suspense>`,
  })
}
