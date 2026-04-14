import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/vue'
import { renderOptions } from 'src/utils/test/test.utils'
import NotFound from './NotFound.vue'

describe('# NotFound page', () => {
  it('should render not found message', () => {
    const { getByText } = render(NotFound, renderOptions())

    expect(getByText('Page Not Found')).toBeTruthy()
    expect(getByText('Go to Home')).toBeTruthy()
  })
})
