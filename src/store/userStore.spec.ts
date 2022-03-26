// counterStore.spec.ts
import { setActivePinia, createPinia } from 'pinia'
import useUserStore from './useUserStore'

describe('Counter Store', () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia())
  })

  it('inits correctly', () => {
    const store = useUserStore()
    expect(store.user).toBe(null)
    expect(store.isAuthorized).toBe(false)
  })
})
