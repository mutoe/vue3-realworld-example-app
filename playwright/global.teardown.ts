import type { FullConfig } from '@playwright/test'
import MCR from 'monocart-coverage-reports'
import coverageOptions from '../config/mcr.e2e.config'

async function globalTeardown(_config: FullConfig) {
  const mcr = MCR(coverageOptions)
  await mcr.generate()
}

export default globalTeardown
