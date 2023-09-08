import userEvent from '@testing-library/user-event'
import { fireEvent, render, waitFor } from '@testing-library/vue'
import { describe, expect, it, vi } from 'vitest'
import { router } from 'src/router.ts'
import { useUserStore } from 'src/store/user.ts'
import fixtures from 'src/utils/test/fixtures.ts'
import { renderOptions, setupMockServer } from 'src/utils/test/test.utils.ts'
import Settings from './Settings.vue'

describe('# Settings Page', () => {
  const server = setupMockServer()

  it('should render correctly', async () => {
    const { container } = render(Settings, renderOptions({
      initialState: { user: { user: fixtures.user } },
    }))

    expect(container).toHaveTextContent('Your Settings')
  })

  it('should jump to login page when user not logged', async () => {
    vi.spyOn(router, 'push')
    render(Settings, await renderOptions({
      router,
      initialState: { user: { user: null } },
      initialRoute: '/settings',
    }))

    await waitFor(() => expect(router.push).toBeCalled())
  })

  it('should jump to home page and clear logged state when click logout button', async () => {
    vi.spyOn(router, 'push')
    const { getByRole } = render(Settings, await renderOptions({
      router,
      initialState: { user: { user: fixtures.user } },
      initialRoute: '/settings',
    }))
    const store = useUserStore()

    await fireEvent.click(getByRole('button', { name: 'Logout' }))

    expect(store.isAuthorized).toBe(false)
    expect(router.push).toHaveBeenCalledWith({ name: 'global-feed' })
  })

  it('should not trigger update api when user click submit directly', async () => {
    const { getByRole } = render(Settings, await renderOptions({
      router,
      initialState: { user: { user: fixtures.user } },
      initialRoute: '/settings',
    }))

    expect(getByRole('button', { name: 'Update Settings' })).toHaveProperty('disabled')
  })

  it('should submit new settings when submit form', async () => {
    vi.spyOn(router, 'push')
    server.use(['PUT', '/api/user', { user: { ...fixtures.user, username: 'new username' } }])
    const { getByRole, getByPlaceholderText } = render(Settings, await renderOptions({
      router,
      initialState: { user: { user: fixtures.user } },
      initialRoute: '/settings',
    }))

    await fireEvent.update(getByPlaceholderText('Your name'), 'new username')
    await fireEvent.update(getByPlaceholderText('New password'), 'new password')
    await fireEvent.click(getByRole('button', { name: 'Update Settings' }))

    const mockedRequest = await server.waitForRequest('PUT', '/api/user')
    expect(router.push).toHaveBeenCalledWith({ name: 'profile', params: { username: 'new username' } })
    expect(await mockedRequest.json()).toMatchInlineSnapshot(`
      {
        "user": {
          "bio": "Author bio",
          "email": "foo@example.com",
          "image": "",
          "password": "new password",
          "username": "new username",
        },
      }
    `)
  })

  it('should display error message when api returned some errors', async () => {
    server.use(['PUT', '/api/user', 400, { errors: { username: ['has already been taken'] } }])
    const { getByRole, getByPlaceholderText, getByText } = render(Settings, renderOptions({
      initialState: { user: { user: fixtures.user } },
    }))

    await userEvent.type(getByPlaceholderText('Your name'), 'new username')
    await userEvent.click(getByRole('button', { name: 'Update Settings' }))

    expect(getByText('username has already been taken')).toBeInTheDocument()
  })
})
