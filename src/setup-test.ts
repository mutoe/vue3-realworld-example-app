import 'jest'

jest.spyOn(window.Storage.prototype, 'getItem').mockReturnValue('')
jest.spyOn(window.Storage.prototype, 'setItem').mockImplementation()

afterEach(() => {
  jest.clearAllMocks()
})
