import { ValidationError, AuthorizationError, NetworkError } from 'src/types/error'
import type { Either } from './either'
import { fail, isEither, success } from './either'
import { mapAuthorizationResponse, mapValidationResponse } from './map-checkable-response'

const createCheckableResponse = (response: Partial<Response>): Either<NetworkError, Partial<Response>> => response.ok === true
  ? success(response)
  : fail(new NetworkError(response as Response))

describe('# mapAuthorizationResponse', () => {
  it('should return Either with AuthorizationError and correct Response', () => {
    const RESPONSE = { ok: true }
    const response = createCheckableResponse(RESPONSE)

    const result = mapAuthorizationResponse<Partial<Response>>(response)

    expect(isEither(result)).to.be.true
    expect(result.isOk()).to.be.true
    expect(result.value).to.equal(RESPONSE)
  })

  it('should return Either with AuthorizationError and failed Response', () => {
    const RESPONSE = { ok: false, status: 401 }
    const response = createCheckableResponse(RESPONSE)

    const result = mapAuthorizationResponse<Partial<Response>>(response)

    expect(isEither(result)).to.be.true
    expect(result.isFail()).to.be.true
    expect(result.value).to.be.instanceof(AuthorizationError)
  })

  it('should throw NetworkError when Response is failed with status != 401', () => {
    const RESPONSE = { ok: false, status: 400 }
    const response = createCheckableResponse(RESPONSE)

    expect(() => {
      mapAuthorizationResponse<Partial<Response>>(response)
    }).to.throw('NETWORK_ERROR')
  })
})

describe('# mapValidationResponse', () => {
  interface ValidationErrors {[field: string]: string}

  it('should return Either with ValidationError and correct Response', () => {
    const RESPONSE = { ok: true }
    const response = createCheckableResponse(RESPONSE)

    const result = mapValidationResponse<ValidationErrors, Partial<Response>>(response)

    expect(isEither(result)).to.be.true
    expect(result.isOk()).to.be.true
    expect(result.value).to.equal(RESPONSE)
  })

  ;[422, 403].forEach(status => {
    it(`should return Either with ValidationError and failed Response when status is ${status}`, () => {
      const responseBody = { errors: { foo: 'bar' } }
      const RESPONSE = { ok: false, status, json: () => Promise.resolve(responseBody) }
      const response = createCheckableResponse(RESPONSE)

      const result = mapValidationResponse<ValidationErrors, Partial<Response>>(response)

      expect(isEither(result)).to.be.true
      expect(result.isFail()).to.be.true
      expect(result.value).to.be.instanceof(ValidationError)
      cy.wrap(result.isFail() && result.value.getErrors())
        .its('foo')
        .should('equal', 'bar')
    })
  })

  it('should throw NetworkError when Response is failed with status other than 422 and 403', () => {
    const RESPONSE = { ok: false, status: 400 }
    const response = createCheckableResponse(RESPONSE)

    expect(() => {
      mapValidationResponse<ValidationErrors, Partial<Response>>(response)
    }).to.throw('NETWORK_ERROR')
  })
})
