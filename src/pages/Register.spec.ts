import { fireEvent, render } from '@testing-library/vue'
import { describe, expect, it, vi } from 'vitest'
import { createTestRouter, renderOptions, setupMockServer } from 'src/utils/test/test.utils.ts'
import Register from './Register.vue'

describe('# Register form', () => {
  const server = setupMockServer()

  it('should call register api when fill form and click submit button', async () => {
    const router = createTestRouter()
    server.use(['POST', '/api/users'])
    const { getByRole, getByPlaceholderText } = render(Register, renderOptions({
      router,
    }))

    await fireEvent.update(getByPlaceholderText('Your Name'), 'username')
    await fireEvent.update(getByPlaceholderText('Email'), 'email@email.com')
    await fireEvent.update(getByPlaceholderText('Password'), 'password')

    await fireEvent.click(getByRole('button', { name: 'Sign up' }))

    const mockedRequest = await server.waitForRequest('POST', '/api/users')

    expect(router.currentRoute.value.path).toBe('/')
    expect(await mockedRequest.json()).toMatchInlineSnapshot(`
      {
        "user": {
          "email": "email@email.com",
          "password": "password",
          "username": "username",
        },
      }
    `)
  })

  it('should display error message when api returned some errors', async () => {
    server.use(['POST', '/api/users', 400, {
      errors: {
        email: ['is invalid'],
        username: ['is already taken'],
      },
    }])
    const { container, getByRole, getByPlaceholderText } = render(Register, renderOptions())

    await fireEvent.update(getByPlaceholderText('Your Name'), 'username')
    await fireEvent.update(getByPlaceholderText('Email'), 'email@email.com')
    await fireEvent.update(getByPlaceholderText('Password'), 'password')

    await fireEvent.click(getByRole('button', { name: 'Sign up' }))

    await server.waitForRequest('POST', '/api/users')

    expect(container).toHaveTextContent('email is invalid')
    expect(container).toHaveTextContent('username is already taken')
  })

  it('should not trigger api call when user submit a invalid form', async () => {
    const { getByRole, getByPlaceholderText } = render(Register, renderOptions())
    const formElement = getByRole<HTMLFormElement>('form', { name: 'Registration form' })
    vi.spyOn(formElement, 'checkValidity')

    expect(getByRole('button', { name: 'Sign up' })).toHaveProperty('disabled', true)

    await fireEvent.update(getByPlaceholderText('Your Name'), 'username')
    await fireEvent.update(getByPlaceholderText('Email'), 'email')
    await fireEvent.update(getByPlaceholderText('Password'), 'password')

    await fireEvent.click(getByRole('button', { name: 'Sign up' }))

    expect(formElement.checkValidity).toHaveBeenCalled()
  })
})
