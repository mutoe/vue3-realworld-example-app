describe('View the system by guest', () => {
  it('should can access home page', () => {
    cy.visit('/')

    cy.get('h1.logo-font')
      .should('contain.text', 'conduit')
  })

  it('should highlight Global Feed when home page loaded', () => {
    cy.get('.nav').get('.nav-link.active')
      .should('contain.text', 'Global Feed')
  })
})
