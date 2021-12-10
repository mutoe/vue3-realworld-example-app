import { waitFor } from '@testing-library/vue'
import { GlobalMountOptions } from '@vue/test-utils/dist/types'
import ArticlesList from 'src/components/ArticlesList.vue'
import registerGlobalComponents from 'src/plugins/global-components'
import { router } from 'src/router'
import { getArticles } from 'src/services/article/getArticles'
import fixtures from 'src/utils/test/fixtures'
import { renderAsync } from '../utils/test/render-async'

jest.mock('src/services/article/getArticles')

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
