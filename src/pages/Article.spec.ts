import { render } from '@testing-library/vue'
import { router } from 'src/router'
import Article from './Article.vue'

describe('# Article', () => {
  beforeEach(async () => {
    await router.push('/')
  })

  it('should render correctly', () => {
    const { container } = render(Article, {
      global: { plugins: [router] },
    })

    expect(container.textContent).toContain('Article is downloading')
  })
})
