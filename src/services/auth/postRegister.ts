import { request } from '../index'
import { PostLoginForm } from './postLogin'

export interface PostRegisterForm extends PostLoginForm {
  username: string;
}

export type PostRegisterErrors = Partial<Record<keyof PostRegisterForm, string[]>>

export async function postRegister (form: PostRegisterForm): Promise<{status: 'error', data: PostRegisterErrors} | {status: 'ok', data: User}> {
  try {
    const response = await request.post<UserResponse>('/users', { user: form })
    return { status: 'ok', data: response.user }
  } catch (e) {
    return { status: 'error', data: e.errors as PostRegisterErrors }
  }
}
