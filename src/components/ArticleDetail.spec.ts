import { flushPromises, mount } from '@vue/test-utils'
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

  it('should render markdown body correctly', async () => {
    mockGetArticle.mockResolvedValue({ ...fixtures.article, body: fixtures.markdown })
    const wrapper = mount(asyncComponentWrapper(ArticleDetail), {
      global: { plugins: [registerGlobalComponents, router] },
    })
    await flushPromises()

    const articleBody = wrapper.find('.article-content')
    expect(articleBody.html()).toMatchSnapshot()
  })

  it('should render markdown (zh-CN) body correctly', async () => {
    mockGetArticle.mockResolvedValue({ ...fixtures.article, body: fixtures.markdownCN })
    const wrapper = mount(asyncComponentWrapper(ArticleDetail), {
      global: { plugins: [registerGlobalComponents, router] },
    })
    await flushPromises()

    const articleBody = wrapper.find('.article-content')
    expect(articleBody.html()).toMatchSnapshot()
  })

  it('should filter the xss content in Markdown body', async () => {
    mockGetArticle.mockResolvedValue({ ...fixtures.article, body: fixtures.markdownXss })
    const wrapper = mount(asyncComponentWrapper(ArticleDetail), {
      global: { plugins: [registerGlobalComponents, router] },
    })
    await flushPromises()

    const articleBody = wrapper.find('.article-content')
    expect(articleBody.html()).not.toContain('alert')
  })
})
