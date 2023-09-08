import { fireEvent, render, waitFor } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import { renderOptions } from 'src/utils/test/test.utils.ts'
import AppLink from './AppLink.vue'

describe('# AppLink', () => {
  it('should redirect to another page when click the link', async () => {
    const { container, getByRole } = render(AppLink, renderOptions({
      props: { name: 'tag', params: { tag: 'foo' } },
      slots: { default: () => 'Go to Foo tag' },
    }))

    expect(container).toHaveTextContent('Go to Foo tag')
    await fireEvent.click(getByRole('link', { name: 'tag' }))

    await waitFor(() => expect(getByRole('link', { name: 'tag' })).toHaveClass('router-link-active'))
  })
})
