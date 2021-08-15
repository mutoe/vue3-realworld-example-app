import { routerPush } from 'src/router'
import { deleteFollowProfile, postFollowProfile } from 'src/services/profile/followProfile'
import type { AuthorizationError } from 'src/types/error'
import createAsyncProcess from 'src/utils/create-async-process'
import type { Either } from 'src/utils/either'

interface UseFollowProps {
  username: string
  following: boolean
  onUpdate: (profile: Profile) => void
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/explicit-function-return-type
export function useFollow ({ username, following, onUpdate }: UseFollowProps) {
  async function toggleFollow (): Promise<void> {
    let response: Either<AuthorizationError, Profile>

    if (following) {
      response = await deleteFollowProfile(username)
    } else {
      response = await postFollowProfile(username)
    }

    if (response.isOk()) onUpdate(response.value)
    else await routerPush('login')
  }

  const { active, run } = createAsyncProcess(toggleFollow)

  return {
    followProcessGoing: active,
    toggleFollow: run,
  }
}
