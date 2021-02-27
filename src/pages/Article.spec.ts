import { mount } from '@vue/test-utils'
import { router } from 'src/router'
import Article from './Article.vue'

describe('# Article', () => {
  beforeEach(async () => {
    await router.push('/')
  })

  it('should display correctly', () => {
    const wrapper = mount(Article, {
      global: { plugins: [router] },
    })

    expect(wrapper.text()).toContain('Article is downloading')
  })
})
