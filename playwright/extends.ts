import type { Page } from '@playwright/test'
import { test as base } from '@playwright/test'
import MCR from 'monocart-coverage-reports'
import { ConduitPageObject } from 'page-objects/conduit.page-object'
import coverageOptions from '../config/mcr.e2e.config'

export const test = base.extend<{
  conduit: ConduitPageObject
  autoTestFixture: string
}>({
  conduit: async ({ page }, use) => {
    const buyscoutPageObject = new ConduitPageObject(page)
    await use(buyscoutPageObject)
  },

  autoTestFixture: [async ({ context }, use) => {
    const isChromium = test.info().project.name === 'chromium'

    // eslint-disable-next-line unicorn/consistent-function-scoping
    const handlePageEvent = async (page: Page) => {
      await Promise.all([
        page.coverage.startJSCoverage({
          resetOnNavigation: false,
        }),
        page.coverage.startCSSCoverage({
          resetOnNavigation: false,
        }),
      ])
    }

    // coverage API is chromium only
    if (isChromium) {
      context.on('page', handlePageEvent)
    }

    await use('autoTestFixture')

    if (isChromium) {
      context.off('page', handlePageEvent)
      const coverageList = await Promise.all(context.pages().map(async page => {
        const jsCoverage = await page.coverage.stopJSCoverage()
        const cssCoverage = await page.coverage.stopCSSCoverage()
        return [...jsCoverage, ...cssCoverage]
      }))
      // console.log(coverageList.map((item) => item.url));

      const mcr = MCR(coverageOptions)
      await mcr.add(coverageList.flat())
    }
  }, {
    scope: 'test',
    auto: true,
  }],
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
