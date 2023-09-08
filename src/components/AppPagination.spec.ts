import { fireEvent, render } from '@testing-library/vue'
import { describe, expect, it, vi } from 'vitest'
import { renderOptions } from 'src/utils/test/test.utils.ts'
import AppPagination from './AppPagination.vue'

describe('# AppPagination', () => {
  it('should highlight current active page', () => {
    const { getByRole } = render(AppPagination, renderOptions({
      props: { page: 1, count: 15 },
    }))

    expect(getByRole('link', { name: 'Go to page 1' }).parentNode).toHaveClass('active')
    expect(getByRole('link', { name: 'Go to page 2' }).parentNode).not.toHaveClass('active')
  })

  it('should call onPageChange when click a page item', async () => {
    const onPageChange = vi.fn()
    const { getByRole } = render(AppPagination, renderOptions({
      props: { page: 1, count: 15, onPageChange },
    }))

    await fireEvent.click(getByRole('link', { name: 'Go to page 2' }))

    expect(onPageChange).toHaveBeenCalledWith(2)
  })
})
