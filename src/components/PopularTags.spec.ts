import { render } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import PopularTags from 'src/components/PopularTags.vue'
import { asyncWrapper, renderOptions, setupMockServer } from 'src/utils/test/test.utils'

describe('# PopularTags', () => {
  const server = setupMockServer(
    ['GET', '/api/tags', { tags: ['tag1', 'tag2'] }],
  )

  it('should render correctly', async () => {
    const { getAllByRole } = render(asyncWrapper(PopularTags), renderOptions())

    await server.waitForRequest('GET', '/api/tags')

    expect(getAllByRole('link')).toHaveLength(2)
    expect(getAllByRole('link')[0]).toHaveTextContent('tag1')
    expect(getAllByRole('link')[1]).toHaveTextContent('tag2')
  })
})
