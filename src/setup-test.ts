import 'jest'
import '@testing-library/jest-dom'

jest.spyOn(window.Storage.prototype, 'getItem').mockReturnValue('')
jest.spyOn(window.Storage.prototype, 'setItem').mockImplementation()
jest.mock('src/config', () => ({
  CONFIG: {
    API_HOST: '',
  },
}))

afterEach(() => {
  jest.clearAllMocks()
})
