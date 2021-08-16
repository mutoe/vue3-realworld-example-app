import { mount } from '@cypress/vue'
import registerGlobalComponents from 'src/plugins/global-components'
import { router } from 'src/router'
import fixtures from 'src/utils/test/fixtures'
import ArticleDetailComment from './ArticleDetailComment.vue'

describe('# ArticleDetailComment', () => {
  beforeEach(async () => {
    await router.push({ name: 'article', params: { slug: fixtures.article.slug } })
  })

  it('should render correctly', () => {
    mount(ArticleDetailComment, {
      global: { plugins: [registerGlobalComponents, router] },
      props: { comment: fixtures.comment },
    })

    cy.get('.card-text').should('have.text', 'Comment body')
    cy.get('.date-posted').should('have.text', '01/01/2020')
    cy.findByRole('button', { name: 'Delete comment' }).should('not.exist')
  })

  it('should delete comment button when comment author is same user', () => {
    mount(ArticleDetailComment, {
      global: { plugins: [registerGlobalComponents, router] },
      props: { comment: fixtures.comment, username: fixtures.author.username },
    })

    cy.findByRole('button', { name: 'Delete comment' }).should('exist')
  })

  it('should emit remove comment when click remove comment button', async () => {
    mount(ArticleDetailComment, {
      global: { plugins: [registerGlobalComponents, router] },
      props: { comment: fixtures.comment, username: fixtures.author.username },
    })

    cy.findByRole('button', { name: 'Delete comment' }).click()

    const events = Cypress.vueWrapper.emitted()
    cy.wrap(events).should('have.property', 'remove-comment')
  })
})
