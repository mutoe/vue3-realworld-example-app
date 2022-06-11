import { NetworkError } from 'src/types/error'
import type { Either } from 'src/utils/either'
import { fail, isEither, success } from 'src/utils/either'
import params2query from 'src/utils/params-to-query'
import type { FetchRequestOptions } from 'src/utils/request'
import FetchRequest from 'src/utils/request'
import wrapTests from 'src/utils/test/wrap-tests'

const PREFIX = '/prefix'
const SUB_PREFIX = '/sub-prefix'
const PATH = '/path'
const PARAMS = { q1: 'q1', q2: 'q2' }

type SafeMethod = 'get' | 'delete' | 'checkableGet' | 'checkableDelete'
type UnsafeMethod = 'post' | 'put' | 'patch' | 'checkablePost' | 'checkablePut' | 'checkablePatch'
type Method = SafeMethod | UnsafeMethod

type CheckableSafeMethod = 'checkableGet' | 'checkableDelete'
type CheckableUnsafeMethod = 'checkablePost' | 'checkablePut' | 'checkablePatch'
type CheckableMethod = CheckableSafeMethod | CheckableUnsafeMethod

function isSafe (method: Method): method is SafeMethod {
  return ['get', 'delete'].includes(method)
}
function isCheckableSafe (method: CheckableMethod): method is CheckableSafeMethod {
  return ['checkableGet', 'checkableDelete'].includes(method)
}
function isCheckable (method: CheckableMethod | Method): method is CheckableMethod {
  return ['checkableGet', 'checkableDelete', 'checkablePost', 'checkablePut', 'checkablePatch'].includes(method)
}

async function triggerMethod<T = unknown> (request: FetchRequest, method: Method | CheckableMethod, options?: Partial<FetchRequestOptions>): Promise<T | Either<NetworkError, T>> {
  if (isCheckable(method)) {
    let response: Either<NetworkError, T>
    if (isCheckableSafe(method)) response = await request[method]<T>(PATH, options)
    else response = await request[method]<T>(PATH, {}, options)
    return response.isOk() ? success(response.value) : fail(response.value)
  } else {
    let body: T
    if (isSafe(method)) body = await request[method]<T>(PATH, options)
    else body = await request[method]<T>(PATH, {}, options)
    return body
  }
}

function forCorrectMethods (task: string, fn: (method: Method) => void): void {
  wrapTests<Method>({
    task,
    fn,
    list: ['get', 'delete', 'post', 'put', 'patch'],
    testName: method => `for method: ${method}`,
  })
}

function forCheckableMethods (task: string, fn: (method: CheckableMethod) => void): void {
  wrapTests<CheckableMethod>({
    task,
    fn,
    list: ['checkableGet', 'checkableDelete', 'checkablePost', 'checkablePut', 'checkablePatch'],
    testName: method => `for method: ${method}`,
  })
}

function forAllMethods (task: string, fn: (method: Method | CheckableMethod) => void): void {
  forCheckableMethods(`[Checkable Methods] ${task}`, fn)
  forCorrectMethods(`[Correct Methods] ${task}`, fn)
}

beforeEach(() => {
  cy.intercept('*', { foo: 'bar' }).as('request')
})

describe('# Request', () => {
  forAllMethods('should be implemented', (method) => {
    const request = new FetchRequest()

    cy.wrap(triggerMethod(request, method))

    cy.wait('@request').then(({ request }) => {
      expect(request.url).to.equal(window.location.origin + PATH)
      expect(request.method).to.equal(method.replace('checkable', '').toUpperCase())
    })
  })
})

describe('# Prefix', () => {
  forAllMethods('should implement global prefix', (method) => {
    cy.intercept('*', { foo: 'bar' }).as('request')
    const request = new FetchRequest({ prefix: PREFIX })

    cy.wrap(triggerMethod(request, method))

    cy.wait('@request')
      .its('request.url')
      .should('eq', `${window.location.origin}${PREFIX}${PATH}`)
  })

  forAllMethods('should implement local prefix', (method) => {
    cy.intercept('*', { foo: 'bar' }).as('request')
    const request = new FetchRequest()

    cy.wrap(triggerMethod(request, method, { prefix: SUB_PREFIX }))

    cy.wait('@request')
      .its('request.url')
      .should('eq', `${window.location.origin}${SUB_PREFIX}${PATH}`)
  })

  forAllMethods('should implement global + local prefix', (method) => {
    const request = new FetchRequest({ prefix: PREFIX })

    cy.wrap(triggerMethod(request, method, { prefix: SUB_PREFIX }))

    cy.wait('@request')
      .its('request.url')
      .should('eq', `${window.location.origin}${SUB_PREFIX}${PATH}`)
  })
})

describe('# Query string', () => {
  forAllMethods('should implement global query', (method) => {
    cy.intercept('*', { foo: 'bar' }).as('request')
    const request = new FetchRequest({ params: PARAMS })

    cy.wrap(triggerMethod(request, method))

    cy.wait('@request')
      .its('request.url')
      .should('eq', `${window.location.origin}${PATH}?${params2query(PARAMS)}`)
  })

  forAllMethods('should implement local query', (method) => {
    const request = new FetchRequest()

    cy.wrap(triggerMethod(request, method, { params: PARAMS }))

    cy.wait('@request')
      .its('request.url')
      .should('eq', `${window.location.origin}${PATH}?${params2query(PARAMS)}`)
  })

  forAllMethods('should implement global + local query', (method) => {
    cy.intercept('*', { foo: 'bar' }).as('request')
    const options = { params: { q1: 'q1', q2: 'q2' } }
    const localOptions = { params: { q1: 'q11', q3: 'q3' } }
    const expectedOptions = { params: { q1: 'q11', q2: 'q2', q3: 'q3' } }
    const request = new FetchRequest(options)

    cy.wrap(triggerMethod(request, method, localOptions))

    cy.wait('@request')
      .its('request.url')
      .should('eq', `${window.location.origin}${PATH}?${params2query(expectedOptions.params)}`)
  })
})

describe('# Headers', () => {
  forAllMethods('should add global headers', (method) => {
    cy.intercept('*', { foo: 'bar' }).as('request')
    const options = { headers: { h1: 'h1', h2: 'h2' } }
    const request = new FetchRequest(options)

    cy.wrap(triggerMethod(request, method))

    cy.wait('@request')
      .its('request.headers')
      .should('contain', options.headers)
  })

  forAllMethods('should merge global and local headers', (method) => {
    cy.intercept('*', { foo: 'bar' }).as('request')
    const options = { headers: { h1: 'h1', h2: 'h2' } }
    const localOptions = { headers: { h1: 'h11', h3: 'h3' } }
    const expectedOptions = { headers: { h1: 'h11', h2: 'h2', h3: 'h3' } }
    const request = new FetchRequest(options)

    cy.wrap(triggerMethod(request, method, localOptions))

    cy.wait('@request')
      .its('request.headers')
      .should('contain', expectedOptions.headers)
  })
})

describe('# Response', () => {
  const DATA = { foo: 'bar' }
  interface DATA_TYPE { foo: 'bar' }

  context('response body', () => {
    forCorrectMethods('should converted correct response body to json', (method) => {
      cy.intercept('*', DATA).as('request')
      const request = new FetchRequest()

      cy.wrap(triggerMethod(request, method))
        .its('foo')
        .should('eq', DATA.foo)
    })
  })

  context('checkable response body', () => {
    forCheckableMethods('should convert checkable response to Either<NetworkError, DATA_TYPE>', (method) => {
      cy.intercept('*', DATA).as('request')
      const request = new FetchRequest()

      cy.wrap(triggerMethod<DATA_TYPE>(request, method))
        .then(result => {
          const resultIsEither = isEither<unknown, DATA_TYPE>(result)
          const resultIsOk = isEither<unknown, DATA_TYPE>(result) && result.isOk()
          const resultValue = isEither<unknown, DATA_TYPE>(result) && result.isOk() ? result.value : null

          expect(resultIsEither).to.be.true
          expect(resultIsOk).to.be.true
          expect(resultValue).to.deep.equal(DATA)
        })
    })
  })

  context.skip('network error check', () => {
    beforeEach(() => {
      cy.intercept('*', { status: 400 }).as('request')
    })

    forCorrectMethods('should throw NetworkError if correct request is not OK', (method) => {
      const request = new FetchRequest()

      cy.wrap(triggerMethod(request, method))
        .should('throw', NetworkError)
    })

    forCheckableMethods('should return Either<NetworkError, DATA_TYPE> if checkable request is not OK', (method) => {
      const request = new FetchRequest()
      cy.wrap(triggerMethod(request, method))
        .then(result => {
          const resultIsEither = isEither<NetworkError, unknown>(result)
          const resultIsNotOk = isEither<NetworkError, unknown>(result) && result.isFail()
          const resultValue = isEither<NetworkError, unknown>(result) && result.isFail() ? result.value : null

          expect(resultIsEither).to.be.true
          expect(resultIsNotOk).to.be.true
          expect(resultValue).to.be.instanceof(NetworkError)
        })
    })
  })
})

context('# Authorization header', () => {
  const TOKEN = 'token'
  const OPTIONS = { headers: { authorization: `Token ${TOKEN}` } }

  context('should add Authorization header', () => {
    forAllMethods('should add authorization header', (method) => {
      const request = new FetchRequest()
      request.setAuthorizationHeader('T2')

      cy.wrap(triggerMethod(request, method))

      // expect(global.fetch).toBeCalledWith(PATH, expect.objectContaining(OPTIONS))
      cy.wait('@request')
        .its('request.headers.authorization')
        .should('eq', 'Token T2')
    })
  })

  context('should remove Authorization header', () => {
    forAllMethods('should remove authorization header', (method) => {
      const request = new FetchRequest(OPTIONS)

      cy.wrap(triggerMethod(request, method))

      cy.wait('@request')
        .its('request.headers')
        .should('contain', OPTIONS.headers)

      request.deleteAuthorizationHeader()

      cy.wrap(triggerMethod(request, method))

      cy.wait('@request')
        .its('request.headers')
        .should('not.contain', OPTIONS.headers)
    })
  })
})
