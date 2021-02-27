import { mount } from '@vue/test-utils'
import ArticlesListArticlePreview from 'src/components/ArticlesListArticlePreview.vue'
import registerGlobalComponents from 'src/plugins/global-components'
import { router } from 'src/router'
import fixtures from 'src/utils/test/fixtures'

const mockFavoriteArticle = jest.fn()
jest.mock('src/composable/useFavoriteArticle', () => ({
  useFavoriteArticle: () => ({
    favoriteProcessGoing: false,
    favoriteArticle: mockFavoriteArticle,
  }),
}))

describe('# ArticlesListArticlePreview', () => {
  const favoriteButton = '[aria-label="Favorite article"]'

  beforeEach(async () => {
    await router.push({ name: 'article', params: { slug: fixtures.article.slug } })
  })

  it('should call favorite method when click favorite button', async () => {
    const wrapper = mount(ArticlesListArticlePreview, {
      global: { plugins: [registerGlobalComponents, router] },
      props: { article: fixtures.article },
    })

    await wrapper.find(favoriteButton).trigger('click')

    expect(mockFavoriteArticle).toBeCalledTimes(1)
  })
})
