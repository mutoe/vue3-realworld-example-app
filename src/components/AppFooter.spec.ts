import { render } from '@testing-library/vue'
import AppFooter from './AppFooter.vue'

describe('# AppFooter', () => {
  it('should render correctly', () => {
    const { container } = render(AppFooter)

    expect(container).toBeInTheDocument()
  })
})
