import merge from 'deepmerge'

interface FetchRequestOptions {
  prefix: string;
  headers: Record<string, any>;
  params: Record<string, any>;
  responseInterceptor: (response: Response) => void;
}

export default class FetchRequest {
  private defaultOptions: FetchRequestOptions = {
    prefix: '',
    headers: {},
    params: {},
    responseInterceptor: (response) => response,
  }

  private options: FetchRequestOptions

  constructor (options: Partial<FetchRequestOptions> = {}) {
    this.options = merge(this.defaultOptions, options)
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

  private generateFinalHeaders = (options: Partial<FetchRequestOptions> = {}) => {
    return merge(this.options.headers, options.headers ?? {})
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
    const finalUrl = this.generateFinalUrl(url, options)
    const headers = this.generateFinalHeaders(options)

    return fetch(finalUrl, {
      method: 'GET',
      headers,
    })
      .then(this.handleResponse)
  }

  post<T = any> (url: string, data: Record<string, any> = {}, options: Partial<FetchRequestOptions> = {}): Promise<T> {
    const finalUrl = this.generateFinalUrl(url, options)
    const headers = this.generateFinalHeaders(options)

    return fetch(finalUrl, {
      method: 'POST',
      body: JSON.stringify(data),
      headers,
    })
      .then(this.handleResponse)
  }

  delete<T = any> (url: string, options: Partial<FetchRequestOptions> = {}): Promise<T> {
    const finalUrl = this.generateFinalUrl(url, options)
    const headers = this.generateFinalHeaders(options)

    return fetch(finalUrl, {
      method: 'DELETE',
      headers,
    })
      .then(this.handleResponse)
  }

  put<T = any> (url: string, data: Record<string, any> = {}, options: Partial<FetchRequestOptions> = {}): Promise<T> {
    const finalUrl = this.generateFinalUrl(url, options)
    const headers = this.generateFinalHeaders(options)

    return fetch(finalUrl, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers,
    })
      .then(this.handleResponse)
  }

  patch<T = any> (url: string, data: Record<string, any> = {}, options: Partial<FetchRequestOptions> = {}): Promise<T> {
    const finalUrl = this.generateFinalUrl(url, options)
    const headers = this.generateFinalHeaders(options)

    return fetch(finalUrl, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers,
    })
      .then(this.handleResponse)
  }

  public setAuthorizationHeader (token: string): void {
    if (!this.options.headers) this.options.headers = {}
    this.options.headers.Authorization = `Token ${token}`
  }

  public deleteAuthorizationHeader (): void {
    delete this.options?.headers?.Authorization
  }
}
