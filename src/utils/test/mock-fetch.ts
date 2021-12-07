import { jest } from '@jest/globals'
interface FetchResponseBody {
  type: 'body'
}
interface FetchResponseFull {
  type: 'full'
  ok: boolean
  status: number
  statusText: string
  json: () => Promise<unknown>
}

export default function mockFetch (data: FetchResponseBody | FetchResponseFull): void {
  let response
  const { type, ...body } = data

  if (type === 'body') {
    response = {
      ok: true,
      status: 200,
      json: async () => body,
    }
  } else {
    response = body
  }

  // @ts-expect-error let's fix this later
  global.fetch = jest.fn().mockResolvedValue(response)
}
