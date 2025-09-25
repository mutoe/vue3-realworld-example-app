declare module 'insane' {
  export default function insane(html: string, options: {
    allowedTags: string[]
    allowedAttributes: Record<string, string[]>
    filter: (arg0: { tag: string, attrs: Record<string, string> }) => boolean
  }): string
}

interface ImportMeta {
  env: {
    BASE_URL: string
    VITE_API_HOST: string
  }
}
