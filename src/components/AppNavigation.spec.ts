import { mount } from '@cypress/vue'
import registerGlobalComponents from 'src/plugins/global-components'
import { router } from 'src/router'
import { updateUser, user } from 'src/store/user'
import AppNavigation from './AppNavigation.vue'

describe('# AppNavigation', () => {
  beforeEach(async () => {
    updateUser(null)
    await router.push('/')
  })

  afterEach(() => {
    Cypress.vueWrapper.unmount()
  })

  it('should render Sign in and Sign up when user not logged', () => {
    mount(AppNavigation, {
      global: {
        plugins: [registerGlobalComponents, router],
        mocks: { $store: user },
      },
    })

    cy.get('.nav-item')
      .should('have.length', 3)
      .should('contain.text', 'Home')
      .should('contain.text', 'Sign in')
      .should('contain.text', 'Sign up')
  })

  it('should render xxx when user logged', () => {
    updateUser({ id: 1, username: 'foo', email: '', token: '', bio: undefined, image: undefined })
    mount(AppNavigation, {
      global: {
        plugins: [registerGlobalComponents, router],
        mocks: { $store: user },
      },
    })

    cy.get('.nav-item')
      .should('have.length', 4)
      .should('contain.text', 'Home')
      .should('contain.text', 'New Post')
      .should('contain.text', 'Settings')
      .should('contain.text', 'foo')
  })
})
