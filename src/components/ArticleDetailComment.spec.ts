import fixtures from 'src/utils/test/fixtures'
import ArticleDetailComment from './ArticleDetailComment.vue'

describe('# ArticleDetailComment', () => {
  it('should render correctly', () => {
    cy.mount(ArticleDetailComment, {
      props: { comment: fixtures.comment },
    })

    cy.get('.card-text').should('have.text', 'Comment body')
    cy.get('.date-posted').should('have.text', '1/1/2020')
    cy.findByRole('button', { name: 'Delete comment' }).should('not.exist')
  })

  it('should delete comment button when comment author is same user', () => {
    cy.mount(ArticleDetailComment, {
      props: {
        comment: fixtures.comment,
        username: fixtures.author.username,
      },
    })

    cy.findByRole('button', { name: 'Delete comment' })
  })

  it('should emit remove comment when click remove comment button', () => {
    const onRemoveComment = cy.spy().as('onRemoveComment')
    cy.mount(ArticleDetailComment, {
      props: {
        comment: fixtures.comment,
        username: fixtures.author.username,
        onRemoveComment,
      },
    })

    cy.findByRole('button', { name: 'Delete comment' }).click()

    cy.get('@onRemoveComment').should('have.been.called')
  })
})
