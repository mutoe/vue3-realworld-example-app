import { Suspense, defineComponent, h } from 'vue'
import type { RouteLocationRaw, Router } from 'vue-router'
import { createMemoryHistory, createRouter } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import type { RenderOptions } from '@testing-library/vue'
import { HttpResponse, http, matchRequestUrl } from 'msw'
import type { SetupServer } from 'msw/node'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll } from 'vitest'
import AppLink from 'src/components/AppLink.vue'
import { routes } from 'src/router'

export function createTestRouter(base?: string): Router {
  return createRouter({
    routes,
    history: createMemoryHistory(base),
  })
}

interface RenderOptionsArgs {
  props: Record<string, unknown>
  slots: Record<string, (...args: unknown[]) => unknown>

  router?: Router
  initialRoute: RouteLocationRaw

  initialState: Record<string, unknown>
  stubActions: boolean
}

const scheduler = typeof setImmediate === 'function' ? setImmediate : setTimeout

export function flushPromises(): Promise<void> {
  return new Promise(resolve => {
    scheduler(resolve, 0)
  })
}

export function renderOptions<C>(): RenderOptions<C>
export function renderOptions<C>(args: Partial<Omit<RenderOptionsArgs, 'initialRoute'>>): RenderOptions<C>
export async function renderOptions<C>(args: (Partial<RenderOptionsArgs> & { initialRoute: RouteLocationRaw })): Promise<RenderOptions<C>>
export function renderOptions<C>(args: Partial<RenderOptionsArgs> = {}): RenderOptions<C> | Promise<RenderOptions<C>> {
  const router = args.router || createTestRouter()

  const result = {
    props: args.props,
    slots: args.slots,
    global: {
      plugins: [
        router,
        createTestingPinia({
          initialState: {
            user: { user: null },
            ...args.initialState,
          },
          stubActions: args.stubActions ?? false,
        }),
      ],
      components: { AppLink },
    },
  }

  const { initialRoute } = args

  if (!initialRoute)
    return result as RenderOptions<C>

  return new Promise(resolve => {
    void router.replace(initialRoute).then(() => resolve(result as RenderOptions<C>))
  })
}

export function asyncWrapper(component: ReturnType<typeof defineComponent>, props?: Record<string, unknown>): ReturnType<typeof defineComponent> {
  return defineComponent({
    render() {
      return h(
        'div',
        { id: 'root' },
        h(Suspense, null, {
          default() {
            return h(component, props)
          },
          fallback: h('div', 'Loading...'),
        }),
      )
    },
  })
}

async function waitForServerRequest(server: SetupServer, method: string, url: string, flush = true): Promise<Request> {
  let expectedRequestId = ''
  let expectedRequest: Request

  const result = await new Promise<Request>((resolve, reject) => {
    server.events.on('request:match', ({ request, requestId }) => {
      const matchesMethod = request.method.toLowerCase() === method.toLowerCase()
      const matchesUrl = matchRequestUrl(new URL(request.url), url)
      if (matchesMethod && matchesUrl) {
        expectedRequestId = requestId
        expectedRequest = request
      }
    })

    server.events.on('response:mocked', ({ requestId: reqId }) => {
      if (reqId === expectedRequestId)
        resolve(expectedRequest)
    })

    server.events.on('request:unhandled', ({ request: req, requestId: reqId }) => {
      if (reqId === expectedRequestId)
        reject(new Error(`The ${req.method} ${req.url} request was unhandled.`))
    })
  })
  flush && await flushPromises()
  return result
}

type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete' | 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'all' | 'ALL'

type Listener =
  | [HttpMethod, string, number, object]
  | [HttpMethod, string, number]
  | [HttpMethod, string, object]
  | [string, number, object]
  | [HttpMethod, string]
  | [string, object]
  | [string]

/**
 * Sets up a mock server with provided listeners.
 *
 * @example
 * const server = setupMockServer(
 *   ['/api/articles/markdown', { article }],
 *   ['/api/articles/markdown', 200, { article }],
 *   ['GET', '/api/articles/markdown', { article }],
 *   ['GET', '/api/articles/markdown', 200, { article }],
 *   ['DELETE', '/api/articles/comment'],
 *   ['DELETE', '/api/articles/comment', 204]
 * )
 *
 * it('...', async () => {
 *   await server.waitForRequest('/api/articles/markdown')
 *   await server.waitForRequest('GET', '/api/articles/markdown')
 * })
 */

export function setupMockServer(...listeners: Listener[]) {
  const parseArgs = (args: Listener): [string, string, number, (object | null)] => {
    if (args.length === 4)
      return args
    if (args.length === 3) {
      if (typeof args[1] === 'number')
        return ['all', args[0], args[1], args[2] as object] // ['all', path, 200, object]
      if (typeof args[2] === 'number')
        return [args[0], args[1], args[2], null] // [method, path, status, null]
      return [args[0], args[1], 200, args[2]] // [method, path, 200, object]
    }
    if (args.length === 2) {
      if (typeof args[1] === 'string')
        return [args[0], args[1], 200, null]
      return ['all', args[0], 200, args[1]]
    }
    return ['all', args[0], 200, null]
  }

  const server = setupServer(
    ...listeners.map(args => {
      let [method, path, status, response] = parseArgs(args)
      method = method.toLowerCase()
      return http[method as 'all'](`${import.meta.env.VITE_API_HOST}${path}`, () => {
        return HttpResponse.json(response, { status })
      })
    }),
  )

  beforeAll(() => void server.listen())
  afterEach(() => void server.resetHandlers())
  afterAll(() => void server.close())

  async function waitForRequest(path: string): Promise<Request>
  async function waitForRequest(path: string, flush: boolean): Promise<Request>
  async function waitForRequest(method: HttpMethod, path: string): Promise<Request>
  async function waitForRequest(method: HttpMethod, path: string, flush: boolean): Promise<Request>
  async function waitForRequest(...args: [string] | [string, boolean] | [HttpMethod, string] | [HttpMethod, string, boolean]): Promise<Request> {
    const [method, path, flush] = args.length === 1
      ? ['all', args[0]] // ['all', path]
      : args.length === 2 && typeof args[1] === 'boolean'
        ? ['all', args[0], args[1]] // ['all', path, flush]
        : args.length === 2
          ? [args[0], args[1]] // [method, path]
          : args // [method, path, flush]
    return waitForServerRequest(server, method, path, flush)
  }

  const originalUse = server.use.bind(server)

  function use(...listeners: Listener[]) {
    originalUse(
      ...listeners.map(args => {
        let [method, path, status, response] = parseArgs(args)
        method = method.toLowerCase()
        return http[method as 'all'](`${import.meta.env.VITE_API_HOST}${path}`, () => {
          return HttpResponse.json(response, { status })
        })
      }),
    )
  }

  return Object.assign(server, { waitForRequest, use })
}
