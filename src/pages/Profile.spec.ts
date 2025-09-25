import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/vue'
import Profile from 'src/pages/Profile.vue'
import { router } from 'src/router'
import fixtures from 'src/utils/test/fixtures'
import { asyncWrapper, createTestRouter, flushPromises, renderOptions, setupMockServer } from 'src/utils/test/test.utils'

describe('# Profile page', () => {
  const server = setupMockServer(
    ['GET', '/api/profiles/*', { profile: fixtures.user }],
    ['GET', '/api/articles', { articles: [fixtures.article], articlesCount: 1 }],
  )

  it('should display user info', async () => {
    const router = createTestRouter()
    const { container } = render(asyncWrapper(Profile), await renderOptions({
      router,
      initialState: { user: { user: null } },
      initialRoute: '/profile/mutoe',
    }))

    await flushPromises()

    expect(container).toHaveTextContent('mutoe')
  })

  it('should display edit button when author logged', async () => {
    vi.spyOn(router, 'push')
    const { getByRole } = render(asyncWrapper(Profile), await renderOptions({
      router,
      initialState: { user: { user: fixtures.user } },
      initialRoute: '/profile/mutoe',
    }))

    await flushPromises()

    await fireEvent.click(getByRole('link', { name: 'Edit profile settings' }))

    expect(router.push).toHaveBeenCalledWith({ name: 'settings', params: {} })
  })

  it('should jump to login page when click follow user', async () => {
    server.use(['POST', '/api/profiles/*/follow', { profile: fixtures.user }])
    vi.spyOn(router, 'push')
    const { getByRole } = render(asyncWrapper(Profile), await renderOptions({
      router,
      initialState: { user: { user: null } },
      initialRoute: '/profile/mutoe',
    }))

    await flushPromises()

    await fireEvent.click(getByRole('button', { name: 'Follow mutoe' }))

    await server.waitForRequest('POST', '/api/profiles/*/follow')
  })
})
