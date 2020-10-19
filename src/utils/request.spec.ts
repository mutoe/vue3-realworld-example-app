import FetchRequest from 'src/utils/request'

import params2query from 'src/utils/params-to-query'
import mockFetch from 'src/utils/test/mock-fetch'
import wrapTests from 'src/utils/test/wrap-tests'

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

type SafeMethod = 'get' | 'delete'
type UnsafeMethod = 'post' | 'put' | 'patch'
type Method = SafeMethod | UnsafeMethod

const SAFE_METHODS: SafeMethod[] = ['get', 'delete']
const UNSAFE_METHODS: UnsafeMethod[] = ['post', 'put', 'patch']

function isSafe (method: Method): method is SafeMethod {
  return ['get', 'delete'].includes(method)
}

async function triggerMethod<T = any> (request: FetchRequest, method: Method, options?: any): Promise<T> {
  let body: T
  if (isSafe(method)) body = await request[method]<T>(PATH, options)
  else body = await request[method]<T>(PATH, {}, options)
  return body
}

function forAllMethods (task: string, fn: (method: Method) => void): void {
  wrapTests<Method>({
    task,
    fn,
    list: [...UNSAFE_METHODS, ...SAFE_METHODS],
    testName: method => `for method: ${method}`,
  })
}

forAllMethods('# Should be implemented', async (method) => {
  const request = new FetchRequest()

  triggerMethod(request, method)

  expect(global.fetch).toBeCalledWith(PATH, expect.objectContaining({
    method: method.toUpperCase(),
  }))
})

describe('# Should implement prefix', () => {
  forAllMethods('should implement global prefix', async (method) => {
    const request = new FetchRequest({ prefix: PREFIX })

    triggerMethod(request, method)

    expect(global.fetch).toBeCalledWith(`${PREFIX}${PATH}`, expect.any(Object))
  })

  forAllMethods('should implement local prefix', async (method) => {
    const request = new FetchRequest()

    triggerMethod(request, method, { prefix: SUB_PREFIX })

    expect(global.fetch).toBeCalledWith(`${SUB_PREFIX}${PATH}`, expect.any(Object))
  })

  forAllMethods('should implement global + local prefix', async (method) => {
    const request = new FetchRequest({ prefix: PREFIX })

    triggerMethod(request, method, { prefix: SUB_PREFIX })

    expect(global.fetch).toBeCalledWith(`${SUB_PREFIX}${PATH}`, expect.any(Object))
  })
})

describe('# Should convert query object to query string in request url', () => {
  forAllMethods('should implement global query', async (method) => {
    const request = new FetchRequest({ params: PARAMS })

    triggerMethod(request, method)

    expect(global.fetch).toBeCalledWith(`${PATH}?${params2query(PARAMS)}`, expect.any(Object))
  })

  forAllMethods('should implement local query', async (method) => {
    const request = new FetchRequest()

    triggerMethod(request, method, { params: PARAMS })

    expect(global.fetch).toBeCalledWith(`${PATH}?${params2query(PARAMS)}`, expect.any(Object))
  })

  forAllMethods('should implement global + local query', async (method) => {
    const options = { params: { q1: 'q1', q2: 'q2' } }
    const localOptions = { params: { q1: 'q11', q3: 'q3' } }
    const expectedOptions = { params: { q1: 'q11', q2: 'q2', q3: 'q3' } }
    const request = new FetchRequest(options)

    triggerMethod(request, method, localOptions)

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

forAllMethods('# Should converted response body to json', async function (method) {
  const DATA = { foo: 'bar' }
  mockFetch({ type: 'body', ...DATA })
  const request = new FetchRequest()

  const body = await triggerMethod(request, method)

  expect(body).toMatchObject(DATA)
})

forAllMethods('# Should throw Error with response when request status code is not 2xx', async function (method) {
  mockFetch({
    type: 'full',
    ok: false,
    status: 400,
    statusText: 'Bad request',
    json: async () => ({}),
  })
  const request = new FetchRequest()

  await expect(triggerMethod(request, method)).rejects.toThrow('Bad request')
})

describe('# Authorization header', function () {
  const TOKEN = 'token'
  const OPTIONS = { headers: { Authorization: `Token ${TOKEN}` } }

  forAllMethods('should add authorization header', async function (method) {
    const request = new FetchRequest()
    request.setAuthorizationHeader(TOKEN)

    triggerMethod(request, method)

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
