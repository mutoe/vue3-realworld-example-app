import { request } from '../index'

export interface PutProfileForm {
  username?: string
  bio?: string
  image?: string
  email?: string
  password?: string
}

export function putProfile (form: PutProfileForm): Promise<User> {
  return request.put<UserResponse>('/user', { user: form }).then(res => res.user)
}
