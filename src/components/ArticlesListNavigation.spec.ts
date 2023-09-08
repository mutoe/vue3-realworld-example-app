import { render } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import ArticlesListNavigation from 'src/components/ArticlesListNavigation.vue'
import fixtures from 'src/utils/test/fixtures'
import { renderOptions } from 'src/utils/test/test.utils.ts'

describe('# ArticlesListNavigation', () => {
  it('should render global feed item when passed global feed prop', () => {
    const { container } = render(ArticlesListNavigation, renderOptions({
      initialState: { user: { user: fixtures.user } },
      props: { tag: '', username: '', useGlobalFeed: true },
    }))

    expect(container).toHaveTextContent('Global Feed')
  })

  it('should render full item', () => {
    const { container } = render(ArticlesListNavigation, renderOptions({
      initialState: { user: { user: fixtures.user } },
      props: { tag: 'foo', username: '', useGlobalFeed: true, useMyFeed: true, useTagFeed: true },
    }))

    expect(container).toHaveTextContent('Global Feed')
    expect(container).toHaveTextContent('Your Feed')
    expect(container).toHaveTextContent('foo')
  })
})
