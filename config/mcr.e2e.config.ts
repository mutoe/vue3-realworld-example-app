import type { CoverageReportOptions } from 'monocart-coverage-reports'
import baseConfig from './mcr.base.config'

// https://github.com/cenfun/monocart-coverage-reports
const coverageOptions: CoverageReportOptions = {
  ...baseConfig,

  name: 'E2E Test Coverage Report',

  outputDir: './coverage/e2e',
}

export default coverageOptions
