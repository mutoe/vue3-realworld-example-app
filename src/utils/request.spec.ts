import FetchRequest, { FetchRequestOptions } from 'src/utils/request'
import { Either, fail, isEither, success } from 'src/utils/either'

import params2query from 'src/utils/params-to-query'
import mockFetch from 'src/utils/test/mock-fetch'
import wrapTests from 'src/utils/test/wrap-tests'

import { NetworkError } from 'src/types/error'

beforeEach(() => {
  mockFetch({ type: 'body' })
})

afterEach(() => {
  jest.clearAllMocks()
})

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

function forCorrectMethods (task: string, fn: (method: Method) => Promise<void>): void {
  wrapTests<Method>({
    task,
    fn,
    list: ['get', 'delete', 'post', 'put', 'patch'],
    testName: method => `for method: ${method}`,
  })
}

function forCheckableMethods (task: string, fn: (method: CheckableMethod) => Promise<void>): void {
  wrapTests<CheckableMethod>({
    task,
    fn,
    list: ['checkableGet', 'checkableDelete', 'checkablePost', 'checkablePut', 'checkablePatch'],
    testName: method => `for method: ${method}`,
  })
}

function forAllMethods (task: string, fn: (method: Method | CheckableMethod) => Promise<void>): void {
  forCheckableMethods(task, fn)
  forCorrectMethods(task, fn)
}

forAllMethods('# Should be implemented', async (method) => {
  const request = new FetchRequest()

  await triggerMethod(request, method)

  expect(global.fetch).toBeCalledWith(PATH, expect.objectContaining({
    method: method.replace('checkable', '').toUpperCase(),
  }))
})

describe('# Should implement prefix', () => {
  forAllMethods('should implement global prefix', async (method) => {
    const request = new FetchRequest({ prefix: PREFIX })

    await triggerMethod(request, method)

    expect(global.fetch).toBeCalledWith(`${PREFIX}${PATH}`, expect.any(Object))
  })

  forAllMethods('should implement local prefix', async (method) => {
    const request = new FetchRequest()

    await triggerMethod(request, method, { prefix: SUB_PREFIX })

    expect(global.fetch).toBeCalledWith(`${SUB_PREFIX}${PATH}`, expect.any(Object))
  })

  forAllMethods('should implement global + local prefix', async (method) => {
    const request = new FetchRequest({ prefix: PREFIX })

    await triggerMethod(request, method, { prefix: SUB_PREFIX })

    expect(global.fetch).toBeCalledWith(`${SUB_PREFIX}${PATH}`, expect.any(Object))
  })
})

describe('# Should convert query object to query string in request url', () => {
  forAllMethods('should implement global query', async (method) => {
    const request = new FetchRequest({ params: PARAMS })

    await triggerMethod(request, method)

    expect(global.fetch).toBeCalledWith(`${PATH}?${params2query(PARAMS)}`, expect.any(Object))
  })

  forAllMethods('should implement local query', async (method) => {
    const request = new FetchRequest()

    await triggerMethod(request, method, { params: PARAMS })

    expect(global.fetch).toBeCalledWith(`${PATH}?${params2query(PARAMS)}`, expect.any(Object))
  })

  forAllMethods('should implement global + local query', async (method) => {
    const options = { params: { q1: 'q1', q2: 'q2' } }
    const localOptions = { params: { q1: 'q11', q3: 'q3' } }
    const expectedOptions = { params: { q1: 'q11', q2: 'q2', q3: 'q3' } }
    const request = new FetchRequest(options)

    await triggerMethod(request, method, localOptions)

    expect(global.fetch).toBeCalledWith(`${PATH}?${params2query(expectedOptions.params)}`, expect.any(Object))
  })
})

describe('# Should work with headers', function () {
  forAllMethods('should add headers', async function (method) {
    const options = { headers: { h1: 'h1', h2: 'h2' } }
    const request = new FetchRequest(options)

    await triggerMethod(request, method)

    expect(global.fetch).toBeCalledWith(PATH, expect.objectContaining(options))
  })

  forAllMethods('should merge headers', async function (method) {
    const options = { headers: { h1: 'h1', h2: 'h2' } }
    const localOptions = { headers: { h1: 'h11', h3: 'h3' } }
    const expectedOptions = { headers: { h1: 'h11', h2: 'h2', h3: 'h3' } }
    const request = new FetchRequest(options)

    await triggerMethod(request, method, localOptions)

    expect(global.fetch).toBeCalledWith(PATH, expect.objectContaining(expectedOptions))
  })
})

forCorrectMethods('# Should converted correct response body to json', async function (method) {
  const DATA = { foo: 'bar' }
  mockFetch({ type: 'body', ...DATA })
  const request = new FetchRequest()

  const body = await triggerMethod(request, method)

  expect(body).toMatchObject(DATA)
})

forCheckableMethods('# Should converted checkable response to Either<NetworkError, DATA_TYPE>', async function (method) {
  const DATA = { foo: 'bar' }
  interface DATA_TYPE { foo: 'bar' }
  mockFetch({ type: 'body', ...DATA })
  const request = new FetchRequest()

  const result = await triggerMethod<DATA_TYPE>(request, method)

  const resultIsEither = isEither<unknown, DATA_TYPE>(result)
  const resultIsOk = isEither<unknown, DATA_TYPE>(result) && result.isOk()
  const resultValue = isEither<unknown, DATA_TYPE>(result) && result.isOk() ? result.value : null

  expect(resultIsEither).toBe(true)
  expect(resultIsOk).toBe(true)
  expect(resultValue).toMatchObject(DATA)
})

forCorrectMethods('# Should throw NetworkError if correct request is not OK', async function (method) {
  mockFetch({
    type: 'full',
    ok: false,
    status: 400,
    statusText: 'Bad request',
    json: async () => ({}),
  })

  const request = new FetchRequest()
  const result = triggerMethod(request, method)

  await expect(result).rejects.toBeInstanceOf(NetworkError)
})

forCheckableMethods('# Should return Either<NetworkError, DATA_TYPE> if checkable request is not OK', async function (method) {
  mockFetch({
    type: 'full',
    ok: false,
    status: 400,
    statusText: 'Bad request',
    json: async () => ({}),
  })

  const request = new FetchRequest()
  const result = await triggerMethod(request, method)

  const resultIsEither = isEither<NetworkError, unknown>(result)
  const resultIsNotOk = isEither<NetworkError, unknown>(result) && result.isFail()
  const resultValue = isEither<NetworkError, unknown>(result) && result.isFail() ? result.value : null

  expect(resultIsEither).toBe(true)
  expect(resultIsNotOk).toBe(true)
  expect(resultValue).toBeInstanceOf(NetworkError)
})

describe('# Authorization header', function () {
  const TOKEN = 'token'
  const OPTIONS = { headers: { Authorization: `Token ${TOKEN}` } }

  forAllMethods('should add authorization header', async function (method) {
    const request = new FetchRequest()
    request.setAuthorizationHeader(TOKEN)

    await triggerMethod(request, method)

    expect(global.fetch).toBeCalledWith(PATH, expect.objectContaining(OPTIONS))
  })

  forAllMethods('should remove authorization header', async function (method) {
    const request = new FetchRequest(OPTIONS)

    await triggerMethod(request, method)

    expect(global.fetch).toBeCalledTimes(1)
    expect(global.fetch).toBeCalledWith(PATH, expect.objectContaining(OPTIONS))

    request.deleteAuthorizationHeader()
    await triggerMethod(request, method)

    expect(global.fetch).toBeCalledTimes(2)
    expect(global.fetch).toBeCalledWith(PATH, expect.objectContaining({
      headers: {},
    }))
  })
})
