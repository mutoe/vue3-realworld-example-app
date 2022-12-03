import { render } from '@testing-library/vue'
import AppFooter from 'src/components/AppFooter.vue'

describe('# AppFooter', () => {
  it('should render correctly', () => {
    const { html } = render(AppFooter, {
      global: {
        stubs: {
          AppLink: true,
        },
      },
    })

    expect(html()).toContain('Real world app')
  })
})
