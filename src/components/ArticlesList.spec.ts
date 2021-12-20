import { jest } from '@jest/globals'
import { waitFor } from '@testing-library/vue'
import { GlobalMountOptions } from '@vue/test-utils/dist/types'
import registerGlobalComponents from 'src/plugins/global-components'
import fixtures from 'src/utils/test/fixtures'
import { renderAsync } from '../utils/test/render-async'

jest.unstable_mockModule('src/services/article/getArticles', () => ({
  getArticles: jest.fn(),
  getFavoritedArticles: jest.fn(),
  getProfileArticles: jest.fn(),
  getFeeds: jest.fn(),
  getArticlesByTag: jest.fn(),

}))

const { getArticles } = await import('src/services/article/getArticles')
const { router } = await import('src/router')
const { default: ArticlesList } = await import('src/components/ArticlesList.vue')

describe('# ArticlesList', () => {
  const globalMountOptions: GlobalMountOptions = {
    plugins: [registerGlobalComponents, router],
  }

  const mockFetchArticles = getArticles as jest.MockedFunction<typeof getArticles>

  beforeEach(async () => {
    mockFetchArticles.mockResolvedValue({ articles: [fixtures.article], articlesCount: 1 })
    await router.push('/')
  })

  it('should render correctly', async () => {
    const wrapper = renderAsync(ArticlesList, {
      global: globalMountOptions,
    })

    expect(wrapper).toBeTruthy()
    await waitFor(() => expect(mockFetchArticles).toBeCalledTimes(1))
  })
})
