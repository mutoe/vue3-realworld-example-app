import { mount } from '@vue/test-utils'
import Article from './Article.vue'

describe('# Article', () => {
  it('should display correctly', () => {
    const wrapper = mount(Article)

    expect(wrapper.find('.article-page')).toHaveLength(1)
  })
})
