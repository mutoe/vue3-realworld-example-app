import { render } from '@testing-library/vue'
import PopularTags from 'src/components/PopularTags.vue'
import { useTags } from 'src/composable/useTags'
import registerGlobalComponents from 'src/plugins/global-components'
import { router } from 'src/router'
import { ref } from 'vue'

jest.mock('src/composable/useTags')

describe('# PopularTags', () => {
  const mockUseTags = useTags as jest.MockedFunction<typeof useTags>

  beforeEach(async () => {
    const mockFetchTags = jest.fn()
    mockUseTags.mockReturnValue({
      tags: ref(['foo', 'bar']),
      fetchTags: mockFetchTags,
    })
    await router.push('/')
  })

  it.skip('should render correctly', async () => {
    const { container } = render(PopularTags, {
      global: { plugins: [registerGlobalComponents, router] },
    })

    expect(container.querySelectorAll('.tag-pill')).toHaveLength(2)
  })
})
