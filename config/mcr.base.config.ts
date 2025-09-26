import type { CoverageReportOptions } from 'monocart-coverage-reports'

// https://github.com/cenfun/monocart-coverage-reports
const coverageOptions = {
  reports: [
    'text',
    'v8',
    'v8-json',
    'lcovonly',
    'raw',
  ],

  /**
   * V8 entity filter. The entry.url is the URL of the entity.
   * @example http://localhost:4173/assets/index-Bn6Ml0wL.js
   * @example https://fonts.googleapis.com/css?family=Titillium+Web:700
   * @example https://demo.realworld.io/main.css
   * @example https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css
   */
  entryFilter: entry => {
    const excludeList = [
      'googleapis.com',
      'realworld.(io|show)/main.css',
      'ionicons.min.css',
    ]
    for (const regexp of excludeList) {
      if (new RegExp(regexp).test(entry.url)) return false
    }
    return true
  },

  /**
   * Source filter. The sourcePath is the path of the source file.
   * @example src/components/HelloWorld.vue
   * @example src/config.ts
   * @example node_modules/.pnpm/@vue+devtools-kit@7.7.7/node_modules/@vue/devtools-kit/dist/index.js
   */
  sourceFilter: sourcePath => {
    const excludeList = [
      'node_modules',
      'src/services/api.ts',
      'src/setup-tests.ts',
      'src/utils/test',
      '.(spec|test).ts$',
    ]
    for (const regexp of excludeList) {
      if (new RegExp(regexp).test(sourcePath)) return false
    }
    return true
  },
} satisfies CoverageReportOptions

export default coverageOptions
