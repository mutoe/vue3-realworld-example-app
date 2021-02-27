import { mount } from '@vue/test-utils'
import registerGlobalComponents from 'src/plugins/global-components'
import { router } from 'src/router'
import AppFooter from './AppFooter.vue'

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
