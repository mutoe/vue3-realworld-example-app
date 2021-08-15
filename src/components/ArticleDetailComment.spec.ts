import { fireEvent, render } from '@testing-library/vue'
import registerGlobalComponents from 'src/plugins/global-components'
import { router } from 'src/router'
import fixtures from 'src/utils/test/fixtures'
import ArticleDetailComment from './ArticleDetailComment.vue'

describe('# ArticleDetailComment', () => {
  beforeEach(async () => {
    await router.push({ name: 'article', params: { slug: fixtures.article.slug } })
  })

  it('should render correctly', () => {
    const { container, queryByRole } = render(ArticleDetailComment, {
      global: { plugins: [registerGlobalComponents, router] },
      props: { comment: fixtures.comment },
    })

    expect(container.querySelector('.card-text')).toHaveTextContent('Comment body')
    expect(container.querySelector('.date-posted')).toHaveTextContent('1/1/2020')
    expect(queryByRole('button', { name: 'Delete comment' })).toBeNull()
  })

  it('should delete comment button when comment author is same user', () => {
    const { getByRole } = render(ArticleDetailComment, {
      global: { plugins: [registerGlobalComponents, router] },
      props: {
        comment: fixtures.comment,
        username: fixtures.author.username,
      },
    })

    expect(getByRole('button', { name: 'Delete comment' })).toBeInTheDocument()
  })

  it('should emit remove comment when click remove comment button', async () => {
    const { getByRole, emitted } = render(ArticleDetailComment, {
      global: { plugins: [registerGlobalComponents, router] },
      props: { comment: fixtures.comment, username: fixtures.author.username },
    })

    await fireEvent.click(getByRole('button', { name: 'Delete comment' }))

    const events = emitted()
    expect(events['remove-comment']).toHaveLength(1)
  })
})
