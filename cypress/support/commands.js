// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import { ROUTES } from '../constants'

Cypress.Commands.add('login', (username = 'plumrx') => {
  cy.fixture('user.json').then(authResponse => {
    authResponse.user.username = username
    cy.intercept('POST', /users\/login$/, { statusCode: 200, body: authResponse })
  })

  // click sign in button in home page
  cy.visit(ROUTES.LOGIN)

  cy.get('[type="email"]').type('foo@example.com')
  cy.get('[type="password"]').type('12345678')
  cy.get('[type="submit"]').contains('Sign in').click()

  cy.url().should('match', /#\/$/)
})
