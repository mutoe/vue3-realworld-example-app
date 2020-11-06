// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (user) => {
  // click sign in button in home page
  cy.get('li.nav-item a.nav-link')
    .contains(' Sign in')
    .click()

  cy.get('[type="email"]')
    .type(user.email)
  cy.get('[type="password"]')
    .type(user.password)
  cy.get('[type="submit"]')
    .contains(' Sign in ')
    .click()

  cy.get('h1.logo-font')
    .should('contain', ' conduit ')
  cy.get('li.nav-item:last')
    .should('contain.text', user.username)
})

Cypress.Commands.add('register', (user) => {
  // click sign up button in home page
  cy.get('li.nav-item a.nav-link')
    .contains(' Sign up')
    .click()
    // []属性选择器
  cy.get('[placeholder="Your Name"]')
    .type(user.username)
  cy.get('[placeholder="Email"]')
    .type(user.email)
  cy.get('[placeholder="Password"]')
    .type(user.password)
  cy.get('[type="submit"]')
    .click()
})
