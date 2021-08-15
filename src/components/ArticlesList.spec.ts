import { render } from '@testing-library/vue'
import { GlobalMountOptions } from '@vue/test-utils/dist/types'
import ArticlesList from 'src/components/ArticlesList.vue'
import registerGlobalComponents from 'src/plugins/global-components'
import { router } from 'src/router'
import { getArticles } from 'src/services/article/getArticles'
import fixtures from 'src/utils/test/fixtures'
import asyncComponentWrapper from '../utils/test/async-component-wrapper'

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
    const wrapper = render(asyncComponentWrapper(ArticlesList), {
      global: globalMountOptions,
    })

    expect(wrapper).toBeTruthy()
    expect(mockFetchArticles).toBeCalledTimes(1)
  })
})
