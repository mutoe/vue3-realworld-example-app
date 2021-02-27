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
    mockGetArticle.mockResolvedValue(fixtures.article)
    await router.push({
      name: 'article',
      params: { slug: fixtures.article.slug },
    })
  })

  it('should render markdown body correctly', async () => {
    const wrapper = mount(asyncComponentWrapper(ArticleDetail), {
      global: { plugins: [registerGlobalComponents, router] },
    })
    await flushPromises()

    const articleBody = wrapper.find('.article-content')
    expect(articleBody.find('h1').text()).toEqual('Article body')
    expect(articleBody.find('strong').text()).toEqual('Strong')
  })
})
