import { request } from '../index'

export async function postFollowProfile (username: string) {
  return request.post<ProfileResponse>(`/profiles/${username}/follow`).then(res => res.profile)
}

export async function deleteFollowProfile (username: string) {
  return request.delete<ProfileResponse>(`/profiles/${username}/follow`).then(res => res.profile)
}
