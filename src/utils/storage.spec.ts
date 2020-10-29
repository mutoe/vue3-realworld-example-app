import mockLocalStorage from './test/mock-local-storage'

import storage from './storage'

describe('# storage', function () {
  const DATA = { foo: 'bar' }
  const KEY = 'key'

  describe('# GET', function () {
    it('should be called with correct key', function () {
      const fn = mockLocalStorage('getItem')

      storage.get(KEY)

      expect(fn).toBeCalledWith(KEY)
    })

    it('should get an object given valid local storage item', function () {
      mockLocalStorage('getItem', DATA)

      const result = storage.get(KEY)

      expect(result).toMatchObject(DATA)
    })

    it('should get null if invalid storage item given', function () {
      mockLocalStorage('getItem', '{invalid value}', false)

      expect(() => {
        const result = storage.get(KEY)
        expect(result).toBeNull()
      }).not.toThrow()
    })
  })

  describe('# SET', () => {
    it('should be called with correct key and value', function () {
      const fn = mockLocalStorage('setItem')

      storage.set(KEY, DATA)

      expect(fn).toBeCalledWith(KEY, JSON.stringify(DATA))
    })
  })

  describe('# REMOVE', () => {
    it('should be called with correct key', function () {
      const fn = mockLocalStorage('removeItem')

      storage.remove(KEY)

      expect(fn).toBeCalledWith(KEY)
    })
  })
})
