declare module '*.vue' {
  import { defineComponent } from 'vue'
  const Component: ReturnType<typeof defineComponent>

  export default Component
}

interface ImportMeta {
  env: {
    VITE_API_HOST: string
  }
}
