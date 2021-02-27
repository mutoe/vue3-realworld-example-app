import { flushPromises, mount } from '@vue/test-utils'
import { router } from 'src/router'
import AppLink from './AppLink.vue'

describe('# AppLink', function () {
  beforeEach(async () => {
    await router.push('/')
  })

  it('should redirect to another page when click the link', async function () {
    // given
    const wrapper = mount(AppLink, {
      global: { plugins: [router] },
      props: { name: 'tag', params: { tag: 'foo' } },
      slots: { default: 'Go to Foo tag' },
    })

    expect(wrapper.text()).toContain('Go to Foo tag')

    // when
    const linkElement = wrapper.get('a[aria-label=tag]')
    await linkElement.trigger('click')
    await flushPromises()

    // then
    expect(linkElement.html()).toContain('router-link-active')
  })
})
