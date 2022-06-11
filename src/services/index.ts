import { Api } from 'src/services/api'
import { CONFIG } from 'src/config'

export const limit = 10

export const api = new Api({
  baseUrl: `${CONFIG.API_HOST}/api`,
  securityWorker: token => token ? { headers: { authorization: `Bearer ${token}` } } : {},
})

export function pageToOffset (page: number = 1, localLimit = limit): {limit: number, offset: number} {
  const offset = (page - 1) * localLimit
  return { limit: localLimit, offset }
}
