import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: 'j7s91r',
  e2e: {
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:4173',
  },
  component: {
    specPattern: 'src/**/*.{cy,spec}.{js,ts,jsx,tsx}',
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
  },
})
