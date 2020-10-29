import { request } from '../index'

export interface PutProfileForm {
  username?: string;
  bio?: string;
  image?: string;
  email?: string;
  password?: string;
}

export async function putProfile (form: PutProfileForm) {
  return request.put<UserResponse>('/user', form).then(res => res.user)
}
