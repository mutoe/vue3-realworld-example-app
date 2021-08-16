import { mount } from '@cypress/vue'
import { router } from 'src/router'
import Article from './Article.vue'

describe('# Article', () => {
  beforeEach(async () => {
    await router.push('/')
  })

  it('should render correctly', () => {
    mount(Article, {
      global: { plugins: [router] },
    })

    cy.contains('Article is downloading')
  })
})
