import { fireEvent, render } from '@testing-library/vue'
import AppPagination from './AppPagination.vue'

describe('# AppPagination', () => {
  it('should highlight current active page', () => {
    const { container } = render(AppPagination, {
      props: { page: 1, count: 15 },
    })

    const pageItems = container.querySelectorAll('.page-item')
    expect(pageItems).toHaveLength(2)
    expect(pageItems[0]).toHaveClass('active')
  })

  it('should call onPageChange when click a page item', async () => {
    const { getByRole, emitted } = render(AppPagination, {
      props: { page: 1, count: 15 },
    })

    await fireEvent.click(getByRole('link', { name: 'Go to page 2' }))

    const events = emitted()
    expect(events['page-change']).toHaveLength(1)
    expect(events['page-change']?.[0]).toEqual([2])
  })
})
