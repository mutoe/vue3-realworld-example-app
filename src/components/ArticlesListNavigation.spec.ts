import { mount } from '@vue/test-utils'
import { GlobalMountOptions } from '@vue/test-utils/dist/types'
import ArticlesListNavigation from 'src/components/ArticlesListNavigation.vue'
import registerGlobalComponents from 'src/plugins/global-components'
import { router } from 'src/router'
import { updateUser, user } from 'src/store/user'
import fixtures from 'src/utils/test/fixtures'

describe('# ArticlesListNavigation', () => {
  const globalMountOptions: GlobalMountOptions = {
    plugins: [registerGlobalComponents, router],
    mocks: { $store: user },
  }

  beforeEach(async () => {
    updateUser(fixtures.user)
    await router.push('/')
  })

  it('should render global feed item when passed global feed prop', () => {
    const wrapper = mount(ArticlesListNavigation, {
      global: globalMountOptions,
      props: { tag: '', username: '', useGlobalFeed: true },
    })

    const items = wrapper.findAll('.nav-item')
    expect(items).toHaveLength(1)
    expect(items[0].text()).toContain('Global Feed')
  })

  it('should render full item', () => {
    const wrapper = mount(ArticlesListNavigation, {
      global: globalMountOptions,
      props: { tag: 'foo', username: '', useGlobalFeed: true, useMyFeed: true, useTagFeed: true },
    })

    const items = wrapper.findAll('.nav-item')
    expect(items).toHaveLength(3)
    expect(items[0].text()).toContain('Global Feed')
    expect(items[1].text()).toContain('Your Feed')
    expect(items[2].text()).toContain('foo')
  })
})
