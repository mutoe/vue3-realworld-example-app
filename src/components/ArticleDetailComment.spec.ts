import { shallowMount } from '@vue/test-utils'
import registerGlobalComponents from 'src/plugins/global-components'
import fixtures from 'src/utils/test/fixtures'
import ArticleDetailComment from './ArticleDetailComment.vue'

describe('# ArticleDetailComment', () => {
  const deleteButton = '[role=button][aria-label="Delete comment"]'

  it('should render correctly', () => {
    const wrapper = shallowMount(ArticleDetailComment, {
      global: { plugins: [registerGlobalComponents] },
      props: { comment: fixtures.comment },
    })

    expect(wrapper.find('.card-text').text()).toEqual('Comment body')
    expect(wrapper.find('.date-posted').text()).toEqual('1/1/2020')
    expect(wrapper.find(deleteButton).exists()).toBe(false)
  })

  it('should delete comment button when comment author is same user', () => {
    const wrapper = shallowMount(ArticleDetailComment, {
      global: { plugins: [registerGlobalComponents] },
      props: {
        comment: fixtures.comment,
        username: fixtures.author.username,
      },
    })

    expect(wrapper.find(deleteButton).exists()).toBe(true)
  })

  it('should emit remove comment when click remove comment button', async () => {
    const wrapper = shallowMount(ArticleDetailComment, {
      global: { plugins: [registerGlobalComponents] },
      props: { comment: fixtures.comment, username: fixtures.author.username },
    })

    await wrapper.find(deleteButton).trigger('click')

    const events = wrapper.emitted('remove-comment')

    expect(events).toHaveLength(1)
    expect(events![0]).toEqual([])
  })
})
