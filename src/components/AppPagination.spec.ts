import { shallowMount } from '@vue/test-utils'
import AppPagination from './AppPagination.vue'

describe('# AppPagination', () => {
  it('should highlight current active page', () => {
    const wrapper = shallowMount(AppPagination, {
      props: { page: 1, count: 15 },
    })

    const pageItems = wrapper.findAll('.page-item')
    expect(pageItems).toHaveLength(2)
    expect(pageItems[0].classes()).toContain('active')
  })

  it('should call onPageChange when click a page item', async () => {
    const wrapper = shallowMount(AppPagination, {
      props: { page: 1, count: 15 },
    })

    await wrapper.find('a[aria-label="Go to page 2"]').trigger('click')

    const events = wrapper.emitted('page-change')
    expect(events).toHaveLength(1)
    expect(events?.[0]).toEqual([2])
  })
})
