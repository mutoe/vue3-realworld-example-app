import { limit, request } from '../index'

export async function getArticles (page = 1): Promise<ArticlesResponse> {
  const params = { limit, offset: (page - 1) * limit }
  return request.get<ArticlesResponse>('/articles', { params })
}

export async function getFavoritedArticles (username: string, page = 1): Promise<ArticlesResponse> {
  const params = { limit, offset: (page - 1) * limit, favorited: username }
  return request.get<ArticlesResponse>('/articles', { params })
}

export async function getProfileArticles (username: string, page = 1): Promise<ArticlesResponse> {
  const params = { limit, offset: (page - 1) * limit, author: username }
  return request.get<ArticlesResponse>('/articles', { params })
}

export async function getFeeds (page = 1): Promise<ArticlesResponse> {
  const params = { limit, offset: (page - 1) * limit }
  return request.get<ArticlesResponse>('/articles/feed', { params })
}

export async function getArticlesByTag (tagName: string, page = 1): Promise<ArticlesResponse> {
  const params = { tag: tagName, limit, offset: (page - 1) * limit }
  return request.get<ArticlesResponse>('/articles', { params })
}
