import { mount } from '@vue/test-utils'
import AppFooter from './AppFooter.vue'
import registerGlobalComponents from '../plugins/global-components'
import { router } from '../router'

describe('# AppFooter', () => {
  beforeEach(async () => {
    await router.push('/')
  })

  it('should render correctly', () => {
    const wrapper = mount(AppFooter, {
      global: { plugins: [registerGlobalComponents, router] },
    })

    expect(wrapper.text()).toContain('a')
  })
})
