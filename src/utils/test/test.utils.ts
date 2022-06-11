import { routes } from 'src/router'
import type { DefineComponent } from 'vue'
import { defineComponent, h, Suspense } from 'vue'
import type { Router } from 'vue-router'
import { createMemoryHistory, createRouter } from 'vue-router'

export const createTestRouter = (): Router => createRouter({
  routes,
  history: createMemoryHistory(),
})

type AsyncWrapper = (...args: Parameters<typeof h>) => DefineComponent
export const asyncWrapper: AsyncWrapper = (...args) => defineComponent({
  render () {
    return h(Suspense, null, {
      default: h(...args),
    })
  },
})
