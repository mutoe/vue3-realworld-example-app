import { render } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import { renderOptions } from 'src/utils/test/test.utils'
import AppFooter from './AppFooter.vue'

describe('# AppFooter', () => {
  it('should render correctly', () => {
    const { container } = render(AppFooter, renderOptions())

    expect(container).toHaveTextContent('Real world app')
  })
})
