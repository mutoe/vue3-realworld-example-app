import { ROUTES } from './constant'

describe('Auth', () => {
  describe('Login and logout', () => {
    it('should login success when submit a valid login form', () => {
      cy.login()

      cy.url().should('match', /\/#\/$/)
    })

    it('should logout when click logout button', () => {
      cy.get(`[href="${ROUTES.SETTINGS}"]`).click()

      cy.get('button.btn-outline-danger')
        .contains('logout')
        .click()

      cy.get('ul.navbar-nav')
        .should('contain', 'Sign in')
        .should('contain', 'Sign up')
    })

    it('should display error when submit an invalid form (password not match)', () => {
      cy.intercept('POST', /users\/login/, {
        statusCode: 403,
        body: { errors: { 'email or password': ['is invalid'] } },
      })
      cy.visit(ROUTES.LOGIN)

      cy.get('[type="email"]').type('foo@example.com')
      cy.get('[type="password"]').type('12345678')
      cy.get('[type="submit"]').click()

      cy.contains('email or password is invalid')
    })

    it('should display format error without API call when submit an invalid format', () => {
      cy.intercept('POST', /users\/login/).as('loginRequest')
      cy.visit(ROUTES.LOGIN)

      cy.get('[type="email"]').type('foo')
      cy.get('[type="password"]').type('123456')
      cy.get('[type="submit"]').click()

      cy.get('form').then(($el) => {
        cy.wrap($el[0].checkValidity()).should('to.be', false)
      })
    })

    it('should not allow visiting login page when the user is logged in', () => {
      cy.login()

      cy.visit('/#/login')

      cy.url().should('match', /\/#\/$/)
    })
  })

  describe('Register', () => {
    it('should call register API and jump to home page when submit a valid form', () => {
      cy.intercept('POST', /users$/, { fixture: 'user.json' }).as('registerRequest')
      cy.visit(ROUTES.REGISTER)

      cy.get('[placeholder="Your Name"]').type('foo')
      cy.get('[placeholder="Email"]').type('foo@example.com')
      cy.get('[placeholder="Password"]').type('12345678')

      cy.get('[type="submit"]').click()

      cy.wait('@registerRequest')
      cy.url().should('match', /\/#\/$/)
    })

    it('should display error message when submit the form that username already exist', () => {
      cy.intercept('POST', /users$/, {
        statusCode: 422,
        body: { errors: { email: ['has already been taken'], username: ['has already been taken'] } },
      }).as('registerRequest')

      cy.visit(ROUTES.REGISTER)

      cy.get('[placeholder="Your Name"]').type('foo')
      cy.get('[placeholder="Email"]').type('foo@example.com')
      cy.get('[placeholder="Password"]').type('12345678')

      cy.get('[type="submit"]').click()

      cy.wait('@registerRequest')
      cy.contains('email has already been taken')
      cy.contains('username has already been taken')
    })

    it('should not allow visiting register page when the user is logged in', () => {
      cy.login()

      cy.visit('/#/register')

      cy.url().should('match', /\/#\/$/)
    })
  })
})
