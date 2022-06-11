import { ROUTES } from './constant'

describe('Tag', () => {
  beforeEach(() => {
    cy.intercept('GET', /articles\?tag=butt/, { fixture: 'articles-of-tag.json' }).as('getArticlesOfTag')
    cy.intercept('GET', /articles\?limit/, { fixture: 'articles.json' }).as('getArticles')
    cy.intercept('GET', /tags/, { fixture: 'tags.json' }).as('getTags')
  })

  it('should display correct tags when page loaded', () => {
    cy.visit(ROUTES.HOME)
    cy.wait('@getTags')

    cy.get('div.tag-list')
      .find('a.tag-pill.tag-default')
      .should('have.length', 8)

    cy.get('div.tag-list')
      .find('a.tag-pill.tag-default:nth-child(3)')
      .should('contain.text', 'HITLER')
  })

  it('should show right articles of tag', () => {
    cy.get('a.tag-pill.tag-default:last').click()
    cy.wait('@getArticlesOfTag')

    cy.get('a.tag-pill.tag-default:last')
      .should('have.class', 'router-link-active')
      .should('have.class', 'router-link-exact-active')

    cy.get('a.tag-pill.tag-default:last').invoke('text').then(tag => {
      const path = `#/tag/${tag}`

      cy.url()
        .should('include', path)

      // check sheet
      cy.get('a.active.router-link-exact-active.nav-link')
        .should('contain', tag)
    })
  })
})
