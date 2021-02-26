import AppLink from './AppLink.vue'
import { fireEvent, render, waitFor } from '@testing-library/vue'
import { router } from '../router'

describe('# AppLink', () => {
  beforeEach(async () => {
    await router.push({ name: 'global-feed' })
  })

  it('should redirect to another page when click the link', async () => {
    // given
    const { container, getByRole } = render(AppLink, {
      global: { plugins: [router] },
      props: { name: 'tag', params: { tag: 'foo' } },
      slots: { default: 'Go to Foo tag' },
    })

    expect(container).toHaveTextContent('Go to Foo')

    // when
    const linkElement = getByRole('link', { name: 'tag' })
    await fireEvent.click(linkElement)

    // then
    await waitFor(() => expect(linkElement).toHaveClass('router-link-active'))
  })
})
