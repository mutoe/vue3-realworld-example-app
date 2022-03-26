import { render } from '@testing-library/vue'
import { storeToRefs } from 'pinia'
import registerGlobalComponents from 'src/plugins/global-components'
import { router } from 'src/router'
import useUserStore from 'src/store/useUserStore'
import AppNavigation from './AppNavigation.vue'

describe.skip('# AppNavigation', () => {
  beforeEach(async () => {
    await router.push('/')
  })

  it('should render Sign in and Sign up when user not logged', () => {
    const { container } = render(AppNavigation, {
      global: { plugins: [registerGlobalComponents, router] },
    })

    expect(container.querySelectorAll('.nav-item')).toHaveLength(3)
    expect(container.textContent).toContain('Home')
    expect(container.textContent).toContain('Sign in')
    expect(container.textContent).toContain('Sign up')
  })

  it('should render xxx when user logged', () => {
    const { updateUser, ...store } = useUserStore()
    const { user } = storeToRefs(store)

    updateUser({
      id: 1,
      username: 'foo',
      email: '',
      token: '',
      bio: undefined,
      image: undefined,
    })
    const { container } = render(AppNavigation, {
      global: {
        plugins: [registerGlobalComponents, router],
        mocks: { $store: user },
      },
    })

    expect(container.querySelectorAll('.nav-item')).toHaveLength(4)
    expect(container.textContent).toContain('Home')
    expect(container.textContent).toContain('New Post')
    expect(container.textContent).toContain('Settings')
    expect(container.textContent).toContain('foo')
  })
})
