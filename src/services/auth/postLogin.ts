import { request } from '../index'

export interface PostLoginForm {
  email: string;
  password: string;
}

export type PostLoginErrors = Partial<Record<keyof PostLoginForm, string[]>>

export async function postLogin (form: PostLoginForm): Promise<{status: 'error', data: PostLoginErrors} | {status: 'ok', data: User}> {
  try {
    const response = await request.post<UserResponse>('/users/login', { user: form })
    return { status: 'ok', data: response.user }
  } catch (e) {
    return { status: 'error', data: e.errors as PostLoginErrors }
  }
}
