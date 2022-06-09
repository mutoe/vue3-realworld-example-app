import { render } from '@testing-library/vue'
import { createPinia, setActivePinia } from 'pinia'
import registerGlobalComponents from 'src/plugins/global-components'
import { router } from 'src/router'
import { useUserStore } from 'src/store/user'
import AppNavigation from './AppNavigation.vue'

describe('# AppNavigation', () => {
  beforeEach(async () => {
    setActivePinia(createPinia())
    await router.push('/')
  })

  it('should render Sign in and Sign up when user not logged', () => {
    const userStore = useUserStore()
    userStore.updateUser(null)
    const { container } = render(AppNavigation, {
      global: { plugins: [registerGlobalComponents, router], components: {} },
    })

    expect(container.querySelectorAll('.nav-item')).toHaveLength(3)
    expect(container.textContent).toContain('Home')
    expect(container.textContent).toContain('Sign in')
    expect(container.textContent).toContain('Sign up')
  })

  it('should render xxx when user logged', () => {
    const userStore = useUserStore()
    userStore.updateUser({ id: 1, username: 'foo', email: '', token: '', bio: undefined, image: undefined })
    const { container } = render(AppNavigation, {
      global: {
        plugins: [registerGlobalComponents, router],
      },
    })

    expect(container.querySelectorAll('.nav-item')).toHaveLength(4)
    expect(container.textContent).toContain('Home')
    expect(container.textContent).toContain('New Post')
    expect(container.textContent).toContain('Settings')
    expect(container.textContent).toContain('foo')
  })
})
