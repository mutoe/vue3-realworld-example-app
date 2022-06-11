import { createPinia, setActivePinia } from 'pinia'
import { useUserStore } from 'src/store/user'
import fixtures from 'src/utils/test/fixtures'
import { asyncWrapper, createTestRouter } from 'src/utils/test/test.utils'
import ArticleDetailComments from './ArticleDetailComments.vue'

describe('# ArticleDetailComments', () => {
  // const mockDeleteComment = deleteComment as jest.MockedFunction<typeof deleteComment>
  const AsyncArticleDetailComments = asyncWrapper(ArticleDetailComments)
  const router = createTestRouter()
  setActivePinia(createPinia())
  const userStore = useUserStore()

  beforeEach(() => {
    cy.intercept('GET', '/api/profiles/*', { profile: fixtures.author }).as('getProfile')
    cy.intercept('GET', '/api/articles/*/comments', { comments: [fixtures.comment] }).as('getCommentsByArticle')
    cy.intercept('POST', '/api/articles/*/comments', { comment: fixtures.comment2 }).as('postCommentsByArticle')
    cy.wrap(router.push({ name: 'article', params: { slug: fixtures.article.slug } }))
  })

  it('should render correctly', () => {
    cy.mount(AsyncArticleDetailComments, { router })

    cy.wait('@getCommentsByArticle')
      .its('request.url')
      .should('contain', '/api/articles/article-foo/comments')

    cy.contains(fixtures.comment.body)
  })

  it('should display new comment when post new comment', () => {
    // given
    userStore.updateUser(fixtures.user)
    cy.mount(AsyncArticleDetailComments, { router })
    cy.wait('@getProfile')
    cy.wait('@getCommentsByArticle')
    cy.contains(fixtures.comment.body)

    // when
    cy.findByRole('textbox', { name: 'Write comment' }).type(fixtures.comment2.body)
    cy.findByRole('button', { name: 'Submit' }).click()

    // then
    cy.contains(fixtures.comment2.body)
  })

  it.only('should call remove comment service when click delete button', () => {
    // given
    cy.intercept('DELETE', '/api/articles/*/comments/*', { status: 200 }).as('deleteComment')
    userStore.updateUser(fixtures.user)
    cy.mount(AsyncArticleDetailComments, { router })
    cy.wait('@getCommentsByArticle')

    // when
    cy.findByRole('button', { name: 'Delete comment' }).click()

    // then
    cy.wait('@deleteComment')
    cy.contains(fixtures.comment.body).should('not.exist')
  })
})
