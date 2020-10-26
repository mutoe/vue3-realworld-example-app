import { request } from '../index'
import { PostLoginForm } from './postLogin'

export interface PostRegisterForm extends PostLoginForm {
  username: string;
}

export async function postRegister (form: PostRegisterForm) {
  return request.post<UserResponse>('/users', { user: form }).then(res => res.user)
}
