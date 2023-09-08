import { render } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import { renderOptions } from 'src/utils/test/test.utils.ts'
import AppNavigation from './AppNavigation.vue'

describe('# AppNavigation', () => {
  it('should render Sign in and Sign up when user not logged', () => {
    const { getByRole } = render(AppNavigation, renderOptions())

    expect(getByRole('link', { name: 'Home' })).toHaveTextContent('Home')
    expect(getByRole('link', { name: 'Sign in' })).toHaveTextContent('Sign in')
    expect(getByRole('link', { name: 'Sign up' })).toHaveTextContent('Sign up')
  })

  it('should render xxx when user logged', () => {
    const { getByRole } = render(AppNavigation, renderOptions({
      initialState: {
        user: { user: { username: 'username', email: '', token: '', bio: '', image: '' } },
      },
    }))

    expect(getByRole('link', { name: 'Home' })).toHaveTextContent('Home')
    expect(getByRole('link', { name: 'New Post' })).toHaveTextContent('New Post')
    expect(getByRole('link', { name: 'Settings' })).toHaveTextContent('Settings')
    expect(getByRole('link', { name: 'username' })).toHaveTextContent('username')
  })
})
