import { render } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import fixtures from 'src/utils/test/fixtures'
import { asyncWrapper, renderOptions, setupMockServer } from 'src/utils/test/test.utils'
import ArticleDetail from './ArticleDetail.vue'

describe('# ArticleDetail', () => {
  const server = setupMockServer(
    ['/api/articles/markdown', { article: { ...fixtures.article, body: fixtures.markdown } }],
    ['/api/articles/markdown-cn', { article: { ...fixtures.article, body: fixtures.markdownCN } }],
    ['/api/articles/markdown-xss', { article: { ...fixtures.article, body: fixtures.markdownXss } }],
  )

  it('should render markdown body correctly', async () => {
    const { container } = render(asyncWrapper(ArticleDetail), await renderOptions({
      initialRoute: { name: 'article', params: { slug: 'markdown' } },
    }))
    await server.waitForRequest('GET', '/api/articles/markdown')

    expect(container.querySelector('#article-content')).toMatchSnapshot()
  })

  it('should render markdown (zh-CN) body correctly', async () => {
    const { container } = render(asyncWrapper(ArticleDetail), await renderOptions({
      initialRoute: { name: 'article', params: { slug: 'markdown-cn' } },
    }))
    await server.waitForRequest('GET', '/api/articles/markdown-cn')

    expect(container.querySelector('#article-content')).toMatchSnapshot()
  })

  it('should filter the xss content in Markdown body', async () => {
    const { container } = render(asyncWrapper(ArticleDetail), await renderOptions({
      initialRoute: { name: 'article', params: { slug: 'markdown-xss' } },
    }))
    await server.waitForRequest('GET', '/api/articles/markdown-xss')

    expect(container.querySelector('#article-content')).toMatchSnapshot()
  })
})
