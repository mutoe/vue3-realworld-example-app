import { expect } from '@jest/globals'
import { flushPromises, mount } from '@vue/test-utils'
import PopularTags from 'src/components/PopularTags.vue'
import { useTags } from 'src/composable/useTags'
import registerGlobalComponents from 'src/plugins/global-components'
import { router } from 'src/router'
import asyncComponentWrapper from 'src/utils/test/async-component-wrapper'
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

  it('should render correctly', async () => {
    const wrapper = mount(asyncComponentWrapper(PopularTags), {
      global: { plugins: [registerGlobalComponents, router] },
    })
    await flushPromises()

    expect(wrapper.findAll('.tag-pill')).toHaveLength(2)
  })
})
