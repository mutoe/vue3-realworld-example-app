import FetchRequest from 'src/utils/request'

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    status: 200,
    async json () {
      return {}
    },
  })
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('# Request GET', function () {
  it('should implement GET method', async function () {
    const request = new FetchRequest()
    await request.get('/path')

    expect(global.fetch).toBeCalledTimes(1)
    expect(global.fetch).toBeCalledWith('/path', expect.objectContaining({
      method: 'GET',
    }))
  })

  it('should can set prefix of request url with global', async function () {
    const request = new FetchRequest({ prefix: '/prefix' })
    await request.get('/path')

    expect(global.fetch).toBeCalledWith('/prefix/path', expect.any(Object))
  })

  it('should can be set prefix of request url with single request', async function () {
    const request = new FetchRequest()
    await request.get('/path', { prefix: '/prefix' })

    expect(global.fetch).toBeCalledWith('/prefix/path', expect.any(Object))
  })

  it('can be convert query object to query string in request url', async function () {
    const request = new FetchRequest()
    await request.get('/path', { params: { foo: 'bar' } })

    expect(global.fetch).toBeCalledWith('/path?foo=bar', expect.any(Object))
  })

  it('should converted response body to json', async function () {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      async json () {
        return {
          foo: 'bar',
        }
      },
    })
    const request = new FetchRequest()
    const response = await request.get('/path')

    expect(response).toMatchObject({ foo: 'bar' })
  })

  it('should throw Error with response when request status code is not 2xx', async function () {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 400,
      statusText: 'Bad request',
      async json () {
        return {}
      },
    })

    const request = new FetchRequest()

    await expect(request.post('/path')).rejects.toThrow('Bad request')
  })
})

describe('# Request POST', function () {
  it('should implement POST method', async function () {
    const request = new FetchRequest()
    await request.post('/path')

    expect(global.fetch).toBeCalledTimes(1)
    expect(global.fetch).toBeCalledWith('/path', expect.objectContaining({
      method: 'POST',
    }))
  })

  it('should can set prefix of request url with global', async function () {
    const request = new FetchRequest({ prefix: '/prefix' })
    await request.post('/path')

    expect(global.fetch).toBeCalledWith('/prefix/path', expect.any(Object))
  })

  it('should can be set prefix of request url with single request', async function () {
    const request = new FetchRequest()
    await request.post('/path', {}, { prefix: '/prefix' })

    expect(global.fetch).toBeCalledWith('/prefix/path', expect.any(Object))
  })

  it('should can be send json data in request body', async function () {
    const request = new FetchRequest()
    await request.post('/path', { foo: 'bar' })

    expect(global.fetch).toBeCalledWith('/path', expect.objectContaining({
      body: JSON.stringify({ foo: 'bar' }),
    }))
  })

  it('can be convert query object to query string in request url', async function () {
    const request = new FetchRequest()
    await request.post('/path', {}, { params: { foo: 'bar' } })

    expect(global.fetch).toBeCalledWith('/path?foo=bar', expect.any(Object))
  })

  it('should converted response body to json', async function () {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      async json () {
        return {
          foo: 'bar',
        }
      },
    })
    const request = new FetchRequest()
    const response = await request.post('/path')

    expect(response).toMatchObject({ foo: 'bar' })
  })

  it('should throw Error with response when request status code is not 2xx', async function () {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 400,
      statusText: 'Bad request',
      async json () {
        return {}
      },
    })

    const request = new FetchRequest()

    await expect(request.post('/path')).rejects.toThrow('Bad request')
  })

  it('should throw Error with 4xx code', function () {
    global.fetch = jest.fn().mockReturnValue({
      ok: true,
      status: 422,
      async json () {
        return {
          errors: {
            some: ['error'],
          },
        }
      },
    })

    const request = new FetchRequest()

    expect(() => {
      request.get('/')
    }).toThrow()
  })
})

describe('# Request DELETE', function () {
  it('should implement DELETE method', async function () {
    const request = new FetchRequest()
    await request.delete('/path')

    expect(global.fetch).toBeCalledTimes(1)
    expect(global.fetch).toBeCalledWith('/path', expect.objectContaining({
      method: 'DELETE',
    }))
  })
})

describe('# Request PUT', function () {
  it('should implement PUT method', async function () {
    const request = new FetchRequest()
    await request.put('/path')

    expect(global.fetch).toBeCalledTimes(1)
    expect(global.fetch).toBeCalledWith('/path', expect.objectContaining({
      method: 'PUT',
    }))
  })
})

describe('# Request PATCH', function () {
  it('should implement PATCH method', async function () {
    const request = new FetchRequest()
    await request.patch('/path')

    expect(global.fetch).toBeCalledTimes(1)
    expect(global.fetch).toBeCalledWith('/path', expect.objectContaining({
      method: 'PATCH',
    }))
  })
})

describe('# Authorization header', function () {
  it('should add authorization header', async function () {
    const token = 'token'
    const request = new FetchRequest()
    await request.setAuthorizationHeader(token)
    await request.get('/path')

    expect(global.fetch).toBeCalledWith('/path', expect.objectContaining({
      headers: { Authorization: `Token ${token}` },
    }))
  })

  it('should remove authorization header', async function () {
    const token = 'token'
    const request = new FetchRequest({
      headers: { Authorization: `Token ${token}` },
    })

    await request.get('/path')

    expect(global.fetch).toBeCalledTimes(1)
    expect(global.fetch).toBeCalledWith('/path', expect.objectContaining({
      headers: { Authorization: `Token ${token}` },
    }))

    await request.deleteAuthorizationHeader()
    await request.get('/path')

    expect(global.fetch).toBeCalledTimes(2)
    expect(global.fetch).toBeCalledWith('/path', expect.objectContaining({
      headers: { },
    }))
  })
})
