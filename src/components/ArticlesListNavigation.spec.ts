import { createPinia, setActivePinia } from 'pinia'
import ArticlesListNavigation from 'src/components/ArticlesListNavigation.vue'
import { useUserStore } from 'src/store/user'
import fixtures from 'src/utils/test/fixtures'

describe('# ArticlesListNavigation', () => {
  setActivePinia(createPinia())
  const userStore = useUserStore()

  beforeEach(async () => {
    userStore.updateUser(fixtures.user)
  })

  it('should render global feed item when passed global feed prop', () => {
    cy.mount(ArticlesListNavigation, {
      props: { tag: '', username: '', useGlobalFeed: true },
    })

    cy.get('.nav-item')
      .should('have.length', 1)
      .contains('Global Feed')
  })

  it('should render full item', () => {
    cy.mount(ArticlesListNavigation, {
      props: { tag: 'foo', username: '', useGlobalFeed: true, useMyFeed: true, useTagFeed: true },
    })

    cy.get('.nav-item')
      .should('have.length', 3)
      .should(elements => {
        expect(elements).to.contain('Global Feed')
        expect(elements).to.contain('Your Feed')
        expect(elements).to.contain('foo')
      })
  })
})
