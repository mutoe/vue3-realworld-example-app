import type { ValidationError } from 'src/types/error'
import { Either, fail, success } from 'src/utils/either'
import { mapValidationResponse } from 'src/utils/map-checkable-response'
import { request } from '../index'

export interface PostLoginForm {
  email: string
  password: string
}

export type PostLoginErrors = Partial<Record<keyof PostLoginForm, string[]>>

export async function postLogin (form: PostLoginForm): Promise<Either<ValidationError<PostLoginErrors>, User>> {
  const result1 = await request.checkablePost<UserResponse>('/users/login', { user: form })
  const result2 = mapValidationResponse<PostLoginErrors, UserResponse>(result1)

  if (result2.isOk()) return success(result2.value.user)
  else return fail(result2.value)
}
