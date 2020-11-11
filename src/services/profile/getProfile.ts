import { request } from '../index'

export function getProfile (username: string): Promise<Profile> {
  return request.get<ProfileResponse>(`/profiles/${username}`).then(res => res.profile)
}
