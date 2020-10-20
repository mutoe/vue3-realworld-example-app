import { request } from '../index'

export async function putProfile (form: Partial<Profile>) {
  return request.put<UserResponse>('/user', form).then(res => res.user)
}
