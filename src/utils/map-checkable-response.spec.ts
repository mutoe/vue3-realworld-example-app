import { ValidationError, AuthorizationError, NetworkError } from 'src/types/error'
import { Either, fail, isEither, success } from './either'
import { mapAuthorizationResponse, mapValidationResponse } from './map-checkable-response'

const createCheckableResponse = (response: Partial<Response>): Either<NetworkError, Partial<Response>> => response.ok === true
  ? success(response)
  : fail(new NetworkError(response as Response))

describe('# mapAuthorizationResponse', function () {
  it('should return Either with AuthorizationError and correct Response', function () {
    const RESPONSE = { ok: true }
    const response = createCheckableResponse(RESPONSE)

    const result = mapAuthorizationResponse<Partial<Response>>(response)

    cy.wrap(isEither(result)).should('be.true')
    cy.wrap(result.isOk()).should('be.true')
    cy.wrap(result.value).should('equal', RESPONSE)
  })

  it('should return Either with AuthorizationError and failed Response', function () {
    const RESPONSE = { ok: false, status: 401 }
    const response = createCheckableResponse(RESPONSE)

    const result = mapAuthorizationResponse<Partial<Response>>(response)

    cy.wrap(isEither(result)).should('be.true')
    cy.wrap(result.isFail()).should('be.true')
    cy.wrap(result.value).should('be.instanceOf', AuthorizationError)
  })

  it('should throw NetworkError when Response is failed with status != 401', function () {
    const RESPONSE = { ok: false, status: 400 }
    const response = createCheckableResponse(RESPONSE)

    expect(() => {
      mapAuthorizationResponse<Partial<Response>>(response)
    }).to.throw()
  })
})

describe('# mapValidationResponse', function () {
  interface ValidationErrors {[field: string]: string}

  it('should return Either with ValidationError and correct Response', function () {
    const RESPONSE = { ok: true }
    const response = createCheckableResponse(RESPONSE)

    const result = mapValidationResponse<ValidationErrors, Partial<Response>>(response)

    cy.wrap(isEither(result)).should('be.true')
    cy.wrap(result.isOk()).should('be.true')
    cy.wrap(result.value).should('equal', RESPONSE)
  })

  it('should return Either with ValidationError and failed Response', async function () {
    const RESPONSE = { ok: false, status: 422, json: () => Promise.resolve({ errors: { foo: 'bar' } }) }
    const response = createCheckableResponse(RESPONSE)

    const result = mapValidationResponse<ValidationErrors, Partial<Response>>(response)

    cy.wrap(isEither(result)).should('be.true')
    cy.wrap(result.isFail()).should('be.true')
    cy.wrap(result.value).should('be.instanceOf', ValidationError)
    const errors = result.isFail() && result.value.getErrors()
    const expectErrors = (await RESPONSE.json()).errors
    cy.wrap(errors).should('equal', expectErrors)
  })

  it('should throw NetworkError when Response is failed with status != 422', function () {
    const RESPONSE = { ok: false, status: 400 }
    const response = createCheckableResponse(RESPONSE)

    expect(() => {
      mapValidationResponse<ValidationErrors, Partial<Response>>(response)
    }).to.throw()
  })
})
