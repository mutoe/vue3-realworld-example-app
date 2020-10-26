import { request } from '../index'

export interface PostLoginForm {
  email: string;
  password: string;
}

export async function postLogin (form: PostLoginForm) {
  return request.post<UserResponse>('/users/login', { user: form }).then(res => res.user)
}
