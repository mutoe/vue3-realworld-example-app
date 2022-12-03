import { routes } from 'src/router'
import { vi } from 'vitest'
import type { App, DefineComponent } from 'vue'
import { defineComponent, h, Suspense } from 'vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import createMocker from 'vitest-fetch-mock'

export const mockFetch = createMocker(vi)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createTestRouter = () => {
  const router = createRouter({
    routes,
    history: createMemoryHistory(),
  })
  const routerPlugin = { install: (app: App) => app.use(router) }
  return { router, routerPlugin }
}

type AsyncWrapper = (...args: Parameters<typeof h>) => DefineComponent
export const asyncWrapper: AsyncWrapper = (...args) => defineComponent({
  render () {
    return h(Suspense, null, {
      default: h(...args),
      fallback: h('span', null, 'Suspense render failed'),
    })
  },
})
