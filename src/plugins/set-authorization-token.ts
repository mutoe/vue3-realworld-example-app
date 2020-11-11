import { request } from '../services'
import storage from '../utils/storage'

export default function (): void {
  const token = storage.get<User>('user')?.token
  if (token !== undefined) request.setAuthorizationHeader(token)
}
