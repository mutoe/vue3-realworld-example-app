import { request } from '../index'

import type { ValidationError } from '../../types/error'

import { mapValidationResponse } from '../../utils/map-checkable-response'
import { Either, fail, success } from '../../utils/either'

export interface PostRegisterForm {
  email: string
  password: string
  username: string
}

export type PostRegisterErrors = Partial<Record<keyof PostRegisterForm, string[]>>

export async function postRegister (form: PostRegisterForm): Promise<Either<ValidationError<PostRegisterErrors>, User>> {
  const result1 = await request.checkablePost<UserResponse>('/users', { user: form })
  const result2 = mapValidationResponse<PostRegisterErrors, UserResponse>(result1)

  if (result2.isOk()) return success(result2.value.user)
  else return fail(result2.value)
}
