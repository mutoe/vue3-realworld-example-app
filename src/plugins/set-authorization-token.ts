import { request } from 'src/services'
import storage from 'src/utils/storage'

export default function (): void {
  const token = storage.get<User>('user')?.token
  if (token !== undefined) request.setAuthorizationHeader(token)
}
