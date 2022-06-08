// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="vite/client" />
// noinspection JSFileReferences

declare module 'insane';

interface ImportMeta {
  env: {
    BASE_URL: string
    VITE_API_HOST: string
  }
}
