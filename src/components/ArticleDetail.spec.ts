import { render } from '@testing-library/vue'
import registerGlobalComponents from 'src/plugins/global-components'
import { router } from 'src/router'
import { getArticle } from 'src/services/article/getArticle'
import asyncComponentWrapper from 'src/utils/test/async-component-wrapper'
import fixtures from 'src/utils/test/fixtures'
import ArticleDetail from './ArticleDetail.vue'

jest.mock('src/services/article/getArticle')

describe('# ArticleDetail', () => {
  const mockGetArticle = getArticle as jest.MockedFunction<typeof getArticle>

  beforeEach(async () => {
    await router.push({
      name: 'article',
      params: { slug: fixtures.article.slug },
    })
  })

  it.skip('should render markdown body correctly', async () => {
    mockGetArticle.mockResolvedValue(fixtures.article)
    const { container } = render(asyncComponentWrapper(ArticleDetail), {
      global: { plugins: [registerGlobalComponents, router] },
    })

    expect(container.querySelector('.article-content')).toMatchSnapshot()
  })

  it.skip('should render markdown (zh-CN) body correctly', async () => {
    mockGetArticle.mockResolvedValue(fixtures.article)
    const { container } = render(asyncComponentWrapper(ArticleDetail), {
      global: { plugins: [registerGlobalComponents, router] },
    })

    expect(container.querySelector('.article-content')).toMatchSnapshot()
  })
})
