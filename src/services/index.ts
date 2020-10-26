import FetchRequest from '../utils/request'

export const limit = 10

export const request = new FetchRequest({
  prefix: `${import.meta.env.VITE_API_HOST}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
})

export interface PostLoginForm {
  email: string;
  password: string;
}

export async function postLogin (form: PostLoginForm) {
  return request.post<UserResponse>('/users/login', { user: form }).then(res => res.user)
}

export interface PostRegisterForm extends PostLoginForm {
  username: string;
}

export async function postRegister (form: PostRegisterForm) {
  return request.post<UserResponse>('/users', { user: form }).then(res => res.user)
}

export async function postFavoriteArticle (slug: string) {
  return request.post<ArticleResponse>(`/articles/${slug}/favorite`).then(res => res.article)
}

export async function deleteFavoriteArticle (slug: string) {
  return request.delete<ArticleResponse>(`/articles/${slug}/favorite`).then(res => res.article)
}

export async function putProfile (form: Partial<Profile>) {
  return request.put<ProfileResponse>('/user', form).then(res => res.profile)
}
