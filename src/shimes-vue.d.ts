declare module '*.vue' {
  import { defineComponent } from 'vue'
  const Component: ReturnType<typeof defineComponent>

  export default Component
}

interface ImportMeta {
  env: {
    BASE_URL: string
    VITE_API_HOST: string
  }
}
