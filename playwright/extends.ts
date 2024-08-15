import { test as base } from '@playwright/test'
import { ConduitPageObject } from 'page-objects/conduit.page-object'

export const test = base.extend<{
  conduit: ConduitPageObject
}>({
  conduit: async ({ page }, use) => {
    const buyscoutPageObject = new ConduitPageObject(page)
    await use(buyscoutPageObject)
  },
})

test.afterEach(async ({ page }, testInfo) => {
  if (!process.env.CI && testInfo.status !== testInfo.expectedStatus) {
    // eslint-disable-next-line ts/restrict-template-expressions
    process.stderr.write(`❌ ❌ PLAYWRIGHT TEST FAILURE ❌ ❌\n${testInfo.error?.stack || testInfo.error}\n`)
    testInfo.setTimeout(0)
    await page.pause()
  }
})

export const expect = test.expect
