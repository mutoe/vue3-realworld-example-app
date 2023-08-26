import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: 'j7s91r',
  e2e: {
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:4173',
    defaultCommandTimeout: 8000,
  },
  component: {
    specPattern: 'src/**/*.{cy,spec}.{js,ts,jsx,tsx}',
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
  setupNodeEvents(on, config) {
    require('@cypress/code-coverage/task')(on, config)
    // include any other plugin code...

    // It's IMPORTANT to return the config object
    // with any changed environment variables
    return config
  }  
  },
})
