import { fireEvent, render } from '@testing-library/vue'
import { describe, expect, it, vi } from 'vitest'
import { useUserStore } from 'src/store/user.ts'
import fixtures from 'src/utils/test/fixtures.ts'
import { createTestRouter, renderOptions, setupMockServer } from 'src/utils/test/test.utils.ts'
import Login from './Login.vue'

describe('# Login page', () => {
  const server = setupMockServer()

  it('should call login api when fill form and click submit button', async () => {
    const router = createTestRouter()
    server.use(['POST', '/api/users/login', { user: fixtures.user }])
    const { getByRole, getByPlaceholderText } = render(Login, renderOptions({
      router,
    }))
    const store = useUserStore()

    await fireEvent.update(getByPlaceholderText('Email'), 'email@email.com')
    await fireEvent.update(getByPlaceholderText('Password'), 'password')

    await fireEvent.click(getByRole('button', { name: 'Sign in' }))

    const mockedRequest = await server.waitForRequest('POST', '/api/users/login')

    expect(router.currentRoute.value.path).toBe('/')
    expect(store.updateUser).toHaveBeenCalledWith(fixtures.user)
    expect(await mockedRequest.json()).toMatchInlineSnapshot(`
      {
        "user": {
          "email": "email@email.com",
          "password": "password",
        },
      }
    `)
  })

  it('should display error message when api returned some errors', async () => {
    server.use(['POST', '/api/users/login', 400, { errors: { password: ['is invalid'] } }])
    const { container, getByRole, getByPlaceholderText } = render(Login, renderOptions())

    await fireEvent.update(getByPlaceholderText('Email'), 'email@email.com')
    await fireEvent.update(getByPlaceholderText('Password'), 'password')

    await fireEvent.click(getByRole('button', { name: 'Sign in' }))

    await server.waitForRequest('POST', '/api/users/login')

    expect(container).toHaveTextContent('password is invalid')
  })

  it('should not trigger api call when user submit a invalid form', async () => {
    const { getByRole, getByPlaceholderText } = render(Login, renderOptions())
    const formElement = getByRole<HTMLFormElement>('form', { name: 'Login form' })
    vi.spyOn(formElement, 'checkValidity')

    expect(getByRole('button', { name: 'Sign in' })).toHaveProperty('disabled', true)

    await fireEvent.update(getByPlaceholderText('Email'), 'email')
    await fireEvent.update(getByPlaceholderText('Password'), 'password')

    await fireEvent.click(getByRole('button', { name: 'Sign in' }))

    expect(formElement.checkValidity).toHaveBeenCalled()
  })
})
