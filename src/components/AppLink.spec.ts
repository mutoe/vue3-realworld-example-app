import AppLink from './AppLink.vue'
import { fireEvent, render, waitFor } from '@testing-library/vue'
import { routerForTests } from '../utils/test/mock-router'

describe('# AppLink', function () {
  beforeEach(async () => {
    await routerForTests.push({ name: 'home' })
  })

  it('should redirect to another page when click the link', async function () {
    // given
    const { container, getByRole } = render(AppLink, {
      global: { plugins: [routerForTests] },
      props: { name: 'foo' },
      slots: { default: 'Go to Foo' },
    })

    expect(container).toHaveTextContent('Go to Foo')

    // when
    const linkElement = getByRole('link', { name: 'foo' })
    await fireEvent.click(linkElement)

    // then
    await waitFor(() => expect(linkElement).toHaveClass('router-link-active'))
  })
})
