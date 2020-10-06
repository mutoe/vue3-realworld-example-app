import parseStorageGet from './parse-storage-get'

interface FetchRequestOptions {
  prefix: string;
  headers: Record<string, any>;
  params: Record<string, any>;
  responseInterceptor: (response: Response) => void;
}

export default class FetchRequest {
  defaultOptions: FetchRequestOptions = {
    prefix: '',
    headers: {},
    params: {},
    responseInterceptor: (response) => response,
  }

  public options: FetchRequestOptions

  constructor (options: Partial<FetchRequestOptions> = {}) {
    this.options = Object.assign({}, this.defaultOptions, options)
  }

  private generateFinalUrl = (url: string, options: Partial<FetchRequestOptions> = {}) => {
    const prefix = options.prefix || this.options.prefix || ''
    const params = options.params || {}

    let finalUrl = `${prefix}${url}`
    if (Object.keys(params).length) {
      const queryString = Object.keys(params).map(key => `${key}=${params[key]}`).join('&')
      finalUrl += `?${queryString}`
    }

    return finalUrl
  }

  private handleResponse = (response: Response) => {
    this.options.responseInterceptor(response)
    return response.json()
      .then(json => {
        if (response.status >= 200 && response.status < 300) {
          return json
        }
        const error = new Error(response.statusText)
        Object.assign(error, json, {
          status: response.status,
          statusText: response.statusText,
        })
        throw error
      })
  }

  get<T = any> (url: string, options: Partial<FetchRequestOptions> = {}): Promise<T> {
    options.headers = options.headers ?? {}
    const token = parseStorageGet('user')?.token
    if (token) options.headers.Authorization = `Token ${token}`

    const finalUrl = this.generateFinalUrl(url, options)
    return fetch(finalUrl, {
      method: 'GET',
      headers: this.options.headers,
    })
      .then(this.handleResponse)
  }

  post<T = any> (url: string, data: Record<string, any> = {}, options: Partial<FetchRequestOptions> = {}): Promise<T> {
    options.headers = options.headers ?? {}
    const token = parseStorageGet('user')?.token
    if (token) options.headers.Authorization = `Token ${token}`

    const finalUrl = this.generateFinalUrl(url, options)

    return fetch(finalUrl, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: this.options.headers,
    })
      .then(this.handleResponse)
  }

  delete<T = any> (url: string, options: Partial<FetchRequestOptions> = {}): Promise<T> {
    options.headers = options.headers ?? {}
    const token = parseStorageGet('user')?.token
    if (token) options.headers.Authorization = `Token ${token}`

    const finalUrl = this.generateFinalUrl(url, options)

    return fetch(finalUrl, {
      method: 'DELETE',
      headers: this.options.headers,
    })
      .then(this.handleResponse)
  }

  put<T = any> (url: string, data: Record<string, any> = {}, options: Partial<FetchRequestOptions> = {}): Promise<T> {
    options.headers = options.headers ?? {}
    const token = parseStorageGet('user')?.token
    if (token) options.headers.Authorization = `Token ${token}`

    const finalUrl = this.generateFinalUrl(url, options)

    return fetch(finalUrl, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: this.options.headers,
    })
      .then(this.handleResponse)
  }

  patch<T = any> (url: string, data: Record<string, any> = {}, options: Partial<FetchRequestOptions> = {}): Promise<T> {
    options.headers = options.headers ?? {}
    const token = parseStorageGet('user')?.token
    if (token) options.headers.Authorization = `Token ${token}`

    const finalUrl = this.generateFinalUrl(url, options)

    return fetch(finalUrl, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: this.options.headers,
    })
      .then(this.handleResponse)
  }
}
