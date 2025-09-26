import type { CoverageReportOptions } from 'monocart-coverage-reports'
import baseConfig from './mcr.base.config'

// https://github.com/cenfun/monocart-coverage-reports
const coverageOptions: CoverageReportOptions = {
  ...baseConfig,

  name: 'Unit Test Coverage Report',

  outputDir: './coverage/unit',
}

export default coverageOptions
