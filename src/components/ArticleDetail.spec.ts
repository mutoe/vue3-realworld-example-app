import registerGlobalComponents from 'src/plugins/global-components'
import { router } from 'src/router'
import { getArticle } from 'src/services/article/getArticle'
import { renderAsync } from '../utils/test/render-async'
import ArticleDetail from './ArticleDetail.vue'
import fixtures from 'src/utils/test/fixtures'

jest.mock('src/services/article/getArticle')

describe.skip('# ArticleDetail', () => {
  const mockGetArticle = getArticle as jest.MockedFunction<typeof getArticle>

  beforeEach(async () => {
    await router.push({
      name: 'article',
      params: { slug: fixtures.article.slug },
    })
  })

  it('should render markdown body correctly', async () => {
    mockGetArticle.mockResolvedValue({ ...fixtures.article, body: fixtures.markdown })
    const { container } = await renderAsync(ArticleDetail, {
      global: { plugins: [registerGlobalComponents, router] },
    })

    expect(container.querySelector('.article-content')).toMatchSnapshot()
  })

  it('should render markdown (zh-CN) body correctly', async () => {
    mockGetArticle.mockResolvedValue({ ...fixtures.article, body: fixtures.markdownCN })
    const { container } = await renderAsync(ArticleDetail, {
      global: { plugins: [registerGlobalComponents, router] },
    })

    expect(container.querySelector('.article-content')).toMatchSnapshot()
  })

  it('should filter the xss content in Markdown body', async () => {
    mockGetArticle.mockResolvedValue({ ...fixtures.article, body: fixtures.markdownXss })
    const { container } = await renderAsync(ArticleDetail, {
      global: { plugins: [registerGlobalComponents, router] },
    })

    expect(container.querySelector('.article-content')?.textContent).not.toContain('alert')
  })
})
