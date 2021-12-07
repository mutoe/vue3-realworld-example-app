import { jest } from '@jest/globals'
import '@testing-library/jest-dom'

jest.spyOn(window.Storage.prototype, 'getItem').mockReturnValue('')
jest.spyOn(window.Storage.prototype, 'setItem').mockImplementation(() => ({}))
jest.mock('src/config', () => ({
  CONFIG: {
    API_HOST: '',
  },
}))

// @ts-expect-error let's fix this later
// eslint-disable-next-line @typescript-eslint/no-empty-function
global.fetch = jest.fn().mockImplementation(() => new Promise(() => {}))

afterEach(() => {
  jest.clearAllMocks()
})
