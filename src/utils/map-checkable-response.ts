import { AuthorizationError, NetworkError, ValidationError } from '../types/error'

import { Either, fail, success } from './either'

export const mapAuthorizationResponse = <T>(result: Either<NetworkError, T>): Either<AuthorizationError, T> => {
  if (result.isOk()) {
    return success(result.value)
  } else if (result.value.response.status === 401) {
    return fail(new AuthorizationError(result.value.response))
  } else {
    throw result.value
  }
}

export const mapValidationResponse = <E, T>(result: Either<NetworkError, T>): Either<ValidationError<E>, T> => {
  if (result.isOk()) {
    return success(result.value)
  } else if ([422, 403].includes(result.value.response.status)) {
    return fail(new ValidationError<E>(result.value.response))
  } else {
    throw result.value
  }
}
