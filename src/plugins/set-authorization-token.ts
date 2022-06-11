import { api } from 'src/services'
import { userStorage } from 'src/store/user'

export default function (): void {
  const token = userStorage.get()?.token
  if (token !== undefined) api.setSecurityData(token)
}
