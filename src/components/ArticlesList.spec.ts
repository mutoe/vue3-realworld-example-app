import { flushPromises, mount } from '@vue/test-utils'
import { GlobalMountOptions } from '@vue/test-utils/dist/types'
import ArticlesList from 'src/components/ArticlesList.vue'
import { router } from 'src/router'
import { getArticles } from 'src/services/article/getArticles'
import fixtures from 'src/utils/test/fixtures'

jest.mock('src/services/article/getArticles')

const globalMountOptions: GlobalMountOptions = {
  plugins: [router],
}

describe('# ArticlesList', () => {
  const mockFetchArticles = getArticles as jest.MockedFunction<typeof getArticles>

  beforeEach(async () => {
    mockFetchArticles.mockResolvedValue({ articles: [fixtures.article], articlesCount: 1 })
    await router.push('/')
  })

  it('should render correctly', async () => {
    const wrapper = mount(ArticlesList, {
      global: globalMountOptions,
    })
    await flushPromises()

    expect(wrapper).toBeTruthy()
    expect(mockFetchArticles).toBeCalledTimes(1)
  })
})
