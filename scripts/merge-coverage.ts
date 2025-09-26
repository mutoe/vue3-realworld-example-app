/* eslint-disable unicorn/prefer-top-level-await */

import path from 'node:path'
import type { CoverageReportOptions } from 'monocart-coverage-reports'
import { CoverageReport } from 'monocart-coverage-reports'
import baseConfig from '../config/mcr.base.config'

const inputDir = [
  path.join(import.meta.dirname, '../coverage/unit/raw'),
  path.join(import.meta.dirname, '../coverage/e2e/raw'),
]

const coverageOptions: CoverageReportOptions = {
  ...baseConfig,

  name: 'Merged Coverage Report',
  inputDir,
  outputDir: './coverage/merged',
  reports: [
    'v8',
    'v8-json',
    'console-details',
  ],

  // onEnd: () => {
  // remove the raw files if it useless
  // inputDir.forEach((p) => {
  //     fs.rmSync(p, {
  //         recursive: true,
  //         force: true
  //     });
  // });
  // },
}

void new CoverageReport(coverageOptions).generate().then(() => {
  console.log('Merged coverage report generated successfully')
})
