import { mount } from '@vue/test-utils'
import registerGlobalComponents from 'src/plugins/global-components'
import { router } from 'src/router'
import { updateUser, user } from 'src/store/user'
import AppNavigation from './AppNavigation.vue'

describe('# AppNavigation', () => {
  beforeEach(async () => {
    updateUser(null)
    await router.push('/')
  })

  it('should render Sign in and Sign up when user not logged', () => {
    const wrapper = mount(AppNavigation, {
      global: { plugins: [registerGlobalComponents, router] },
    })

    expect(wrapper.findAll('.nav-item')).toHaveLength(3)
    expect(wrapper.text()).toContain('Home')
    expect(wrapper.text()).toContain('Sign in')
    expect(wrapper.text()).toContain('Sign up')
  })

  it('should render xxx when user logged', () => {
    updateUser({ id: 1, username: 'foo', email: '', token: '', bio: undefined, image: undefined })
    const wrapper = mount(AppNavigation, {
      global: {
        plugins: [registerGlobalComponents, router],
        mocks: { $store: user },
      },
    })

    expect(wrapper.findAll('.nav-item')).toHaveLength(4)
    expect(wrapper.text()).toContain('Home')
    expect(wrapper.text()).toContain('New Post')
    expect(wrapper.text()).toContain('Settings')
    expect(wrapper.text()).toContain('foo')
  })
})
