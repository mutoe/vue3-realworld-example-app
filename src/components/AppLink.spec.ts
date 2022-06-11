import AppLink from './AppLink.vue'

describe('# AppLink', () => {
  it('should redirect to another page when click the link', () => {
    // given
    cy.mount(AppLink, {
      props: { name: 'tag', params: { tag: 'foo' } },
      slots: { default: () => 'Go to Foo tag' },
    })

    cy.contains('Go to Foo tag')

    cy.contains('tag').click()

    // await waitFor(() => expect(linkElement).toHaveClass('router-link-active'))
  })
})
