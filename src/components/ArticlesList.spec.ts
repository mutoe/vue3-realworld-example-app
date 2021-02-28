import { render } from '@testing-library/vue'
import { flushPromises } from '@vue/test-utils'
import { GlobalMountOptions } from '@vue/test-utils/dist/types'
import ArticlesList from 'src/components/ArticlesList.vue'
import { router } from 'src/router'
import { getArticles } from 'src/services/article/getArticles'
import fixtures from 'src/utils/test/fixtures'

jest.mock('src/services/article/getArticles')

describe('# ArticlesList', () => {
  const mockFetchArticles = getArticles as jest.MockedFunction<typeof getArticles>

  const globalMountOptions: GlobalMountOptions = {
    plugins: [router],
  }

  beforeEach(async () => {
    mockFetchArticles.mockResolvedValue({ articles: [fixtures.article], articlesCount: 1 })
    await router.push('/')
  })

  it.skip('should render correctly', async () => {
    const wrapper = render(ArticlesList, {
      global: globalMountOptions,
    })

    expect(wrapper).toBeTruthy()
    expect(mockFetchArticles).toBeCalledTimes(1)
  })
})
