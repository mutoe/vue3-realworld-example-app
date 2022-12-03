import { mockFetch } from 'src/utils/test/test.utils'
beforeAll(() => {
  mockFetch.enableMocks()
  globalThis.fetch = mockFetch as typeof fetch
})

afterEach(() => {
  mockFetch.resetMocks()
})
