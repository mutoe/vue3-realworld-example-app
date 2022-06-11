import { createPinia, setActivePinia } from 'pinia'
import { useUserStore } from 'src/store/user'
import AppNavigation from './AppNavigation.vue'

describe('# AppNavigation', () => {
  beforeEach(async () => {
    setActivePinia(createPinia())
  })

  it('should render Sign in and Sign up when user not logged', () => {
    const userStore = useUserStore()
    userStore.updateUser(null)
    cy.mount(AppNavigation)

    cy.get('.nav-item').should('have.length', 3)
    cy.contains('Home')
    cy.contains('Sign in')
    cy.contains('Sign up')
  })

  it('should render xxx when user logged', () => {
    const userStore = useUserStore()
    userStore.updateUser({ id: 1, username: 'foo', email: '', token: '', bio: undefined, image: undefined })
    cy.mount(AppNavigation)

    cy.get('.nav-item').should('have.length', 4)
    cy.contains('Home')
    cy.contains('New Post')
    cy.contains('Settings')
    cy.contains('foo')
  })
})
