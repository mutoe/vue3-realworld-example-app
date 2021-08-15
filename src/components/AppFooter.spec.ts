import { render } from '@testing-library/vue'
import registerGlobalComponents from 'src/plugins/global-components'
import { router } from 'src/router'
import AppFooter from './AppFooter.vue'

describe('# AppFooter', () => {
  beforeEach(async () => {
    await router.push('/')
  })

  it('should render correctly', () => {
    const { container } = render(AppFooter, {
      global: { plugins: [registerGlobalComponents, router] },
    })

    expect(container).toBeInTheDocument()
  })
})
