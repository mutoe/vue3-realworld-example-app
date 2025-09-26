import type { FullConfig } from '@playwright/test'
import MCR from 'monocart-coverage-reports'
import coverageOptions from '../config/mcr.e2e.config'

async function globalSetup(_config: FullConfig) {
  const mcr = MCR(coverageOptions)
  mcr.cleanCache()
}

export default globalSetup
