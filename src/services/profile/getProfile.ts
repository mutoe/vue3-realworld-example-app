import { request } from '../index'

export async function getProfile (username: string) {
  return request.get<ProfileResponse>(`/profiles/${username}`).then(res => res.profile)
}
