import { render } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import AppLink from './AppLink.vue'

describe('# AppLink', () => {
  it('should redirect to another page when click the link', () => {
    // given
    const { container } = render(AppLink, {
      props: { name: 'tag', params: { tag: 'foo' } },
      slots: { default: () => 'Go to Foo tag' },
    })

    expect(container).toContain('Go to Foo tag')

    // cy.contains('tag').click()

    // await waitFor(() => expect(linkElement).toHaveClass('router-link-active'))
  })
})
