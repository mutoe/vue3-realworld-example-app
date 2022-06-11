import Storage from './storage'

describe('# Storage', () => {
  const DATA = { foo: 'bar' }
  const KEY = 'key'

  const storage = new Storage<typeof DATA>(KEY)

  before(() => {
    storage.remove()
  })

  it('should be called with correct key', () => {
    expect(storage.get()).to.be.null
  })

  it('should be set value correctly', () => {
    storage.set(DATA)

    expect(storage.get()).to.deep.equal(DATA)
  })

  it('should be remove correctly', () => {
    storage.remove()

    expect(storage.get()).to.be.null
  })
})
