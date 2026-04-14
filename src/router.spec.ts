import { describe, expect, it } from 'vitest'
import { userStorage } from 'src/store/user'
import fixtures from 'src/utils/test/fixtures'
import { createTestRouter } from 'src/utils/test/test.utils'

describe('# Router guards', () => {
  it('should redirect to home when logged-in user navigates to /login', async () => {
    userStorage.set(fixtures.user)
    const router = createTestRouter()
    await router.push('/login')
    await router.isReady()

    expect(router.currentRoute.value.name).toBe('global-feed')

    userStorage.remove()
  })

  it('should redirect to home when logged-in user navigates to /register', async () => {
    userStorage.set(fixtures.user)
    const router = createTestRouter()
    await router.push('/register')
    await router.isReady()

    expect(router.currentRoute.value.name).toBe('global-feed')

    userStorage.remove()
  })

  it('should allow unauthenticated user to access /login', async () => {
    userStorage.remove()
    const router = createTestRouter()
    await router.push('/login')
    await router.isReady()

    expect(router.currentRoute.value.name).toBe('login')
  })

  it('should match not-found route for unknown paths', async () => {
    const router = createTestRouter()
    await router.push('/some-nonexistent-path')
    await router.isReady()

    expect(router.currentRoute.value.name).toBe('not-found')
  })
})
