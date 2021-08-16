import { mount } from '@cypress/vue'
import { GlobalMountOptions } from '@vue/test-utils/dist/types'
import ArticlesListNavigation from 'src/components/ArticlesListNavigation.vue'
import registerGlobalComponents from 'src/plugins/global-components'
import { router } from 'src/router'
import { updateUser, user } from 'src/store/user'
import fixtures from 'src/utils/test/fixtures'

describe('# ArticlesListNavigation', () => {
  const globalMountOptions: GlobalMountOptions = {
    plugins: [registerGlobalComponents, router],
    mocks: { $store: user },
  }

  beforeEach(async () => {
    updateUser(fixtures.user)
    await router.push('/')
  })

  it('should render global feed item when passed global feed prop', () => {
    mount(ArticlesListNavigation, {
      global: globalMountOptions,
      props: { tag: '', username: '', useGlobalFeed: true },
    })

    cy.get('.nav-item')
      .should('have.length', 1)
      .should('contain.text', 'Global Feed')
  })

  it('should render full item', () => {
    mount(ArticlesListNavigation, {
      global: globalMountOptions,
      props: { tag: 'foo', username: '', useGlobalFeed: true, useMyFeed: true, useTagFeed: true },
    })

    cy.get('.nav-item')
      .should('have.length', 3)
      .should('contain.text', 'Global Feed')
      .should('contain.text', 'Your Feed')
      .should('contain.text', 'foo')
  })
})
