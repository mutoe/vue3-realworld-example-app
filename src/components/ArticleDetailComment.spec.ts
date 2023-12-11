import { fireEvent, render } from '@testing-library/vue'
import { describe, expect, it, vi } from 'vitest'
import fixtures from 'src/utils/test/fixtures'
import { renderOptions } from 'src/utils/test/test.utils.ts'
import ArticleDetailComment from './ArticleDetailComment.vue'

describe('# ArticleDetailComment', () => {
  it('should render correctly', () => {
    const { container, queryByRole } = render(ArticleDetailComment, renderOptions({
      props: { comment: fixtures.comment },
    }))

    expect(container).toHaveTextContent('Comment body')
    expect(container).toHaveTextContent('1/1/2020')
    expect(queryByRole('button', { name: 'Delete comment' })).not.toBeInTheDocument()
  })

  it('should delete comment button when comment author is same user', () => {
    const { getByRole } = render(ArticleDetailComment, renderOptions({
      props: {
        comment: fixtures.comment,
        username: fixtures.author.username,
      },
    }))

    expect(getByRole('button', { name: 'Delete comment' })).toBeInTheDocument()
  })

  it('should emit remove comment when click remove comment button', async () => {
    const onRemoveComment = vi.fn()
    const { getByRole } = render(ArticleDetailComment, renderOptions({
      props: {
        comment: fixtures.comment,
        username: fixtures.author.username,
        onRemoveComment,
      },
    }))

    await fireEvent.click(getByRole('button', { name: 'Delete comment' }))

    expect(onRemoveComment).toHaveBeenCalled()
  })
})
