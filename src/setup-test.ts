import 'jest'
import '@testing-library/jest-dom'
import { createPinia, setActivePinia } from 'pinia'
import { createApp } from 'vue'
import useUserStore from './store/useUserStore'

jest.spyOn(window.Storage.prototype, 'getItem').mockReturnValue('')
jest.spyOn(window.Storage.prototype, 'setItem').mockImplementation()
jest.mock('src/config', () => ({
  CONFIG: {
    API_HOST: '',
  },
}))

// eslint-disable-next-line @typescript-eslint/no-empty-function
global.fetch = jest.fn().mockImplementation(() => new Promise(() => {}))
const app = createApp({})

beforeAll(() => {
  const pinia = createPinia()
  app.use(pinia)
  setActivePinia(pinia)
  const { updateUser } = useUserStore()

  updateUser(null)
})

afterEach(() => {
  jest.clearAllMocks()
})
