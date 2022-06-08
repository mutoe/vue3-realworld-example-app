import mockLocalStorage from './test/mock-local-storage'

import Storage from './storage'

describe('# storage', () => {
  const DATA = { foo: 'bar' }
  const KEY = 'key'

  const storage = new Storage<typeof DATA>(KEY)

  describe('# GET', () => {
    it('should be called with correct key', () => {
      const fn = mockLocalStorage('getItem')

      storage.get()

      expect(fn).toBeCalledWith(KEY)
    })

    it('should get an object given valid local storage item', () => {
      mockLocalStorage('getItem', DATA)

      const result = storage.get()

      expect(result).toMatchObject(DATA)
    })

    it('should get null if invalid storage item given', () => {
      mockLocalStorage('getItem', '{invalid value}', false)

      expect(() => {
        const result = storage.get()
        expect(result).toBeNull()
      }).not.toThrow()
    })
  })

  describe('# SET', () => {
    it('should be called with correct key and value', () => {
      const fn = mockLocalStorage('setItem')

      storage.set(DATA)

      expect(fn).toBeCalledWith(KEY, JSON.stringify(DATA))
    })
  })

  describe('# REMOVE', () => {
    it('should be called with correct key', () => {
      const fn = mockLocalStorage('removeItem')

      storage.remove()

      expect(fn).toBeCalledWith(KEY)
    })
  })
})
