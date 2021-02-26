import { render } from '@testing-library/vue'
import AppFooter from './AppFooter.vue'
import registerGlobalComponents from '../plugins/global-components'
import { router } from '../router'

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
