import wrapTests from 'src/utils/test/wrap-tests'
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

    expect(isEither(result)).toBe(true)
    expect(result.isOk()).toBe(true)
    expect(result.value).toEqual(RESPONSE)
  })

  it('should return Either with AuthorizationError and failed Response', function () {
    const RESPONSE = { ok: false, status: 401 }
    const response = createCheckableResponse(RESPONSE)

    const result = mapAuthorizationResponse<Partial<Response>>(response)

    expect(isEither(result)).toBe(true)
    expect(result.isFail()).toBe(true)
    expect(result.value).toBeInstanceOf(AuthorizationError)
  })

  it('should throw NetworkError when Response is failed with status != 401', function () {
    const RESPONSE = { ok: false, status: 400 }
    const response = createCheckableResponse(RESPONSE)

    expect(() => {
      mapAuthorizationResponse<Partial<Response>>(response)
    }).toThrowError(NetworkError)
  })
})

describe('# mapValidationResponse', function () {
  interface ValidationErrors {[field: string]: string}

  it('should return Either with ValidationError and correct Response', function () {
    const RESPONSE = { ok: true }
    const response = createCheckableResponse(RESPONSE)

    const result = mapValidationResponse<ValidationErrors, Partial<Response>>(response)

    expect(isEither(result)).toBe(true)
    expect(result.isOk()).toBe(true)
    expect(result.value).toEqual(RESPONSE)
  })

  wrapTests({
    task: 'should return Either with ValidationError and failed Response',
    list: [422, 403],
    testName: (status) => `status code ${status}`,
    fn: async (status) => {
      const RESPONSE = { ok: false, status, json: () => Promise.resolve({ errors: { foo: 'bar' } }) }
      const response = createCheckableResponse(RESPONSE)

      const result = mapValidationResponse<ValidationErrors, Partial<Response>>(response)

      expect(isEither(result)).toBe(true)
      expect(result.isFail()).toBe(true)
      expect(result.value).toBeInstanceOf(ValidationError)
      expect(result.isFail() && await result.value.getErrors()).toEqual((await RESPONSE.json()).errors)
    },
  })

  it('should throw NetworkError when Response is failed with status other than 422 and 403', function () {
    const RESPONSE = { ok: false, status: 400 }
    const response = createCheckableResponse(RESPONSE)

    expect(() => {
      mapValidationResponse<ValidationErrors, Partial<Response>>(response)
    }).toThrowError(NetworkError)
  })
})
