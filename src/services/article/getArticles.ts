import { limit, request } from '../index'

export function getArticles (page = 1): Promise<ArticlesResponse> {
  const params = { limit, offset: (page - 1) * limit }
  return request.get<ArticlesResponse>('/articles', { params })
}

export function getFavoritedArticles (username: string, page = 1): Promise<ArticlesResponse> {
  const params = { limit, offset: (page - 1) * limit, favorited: username }
  return request.get<ArticlesResponse>('/articles', { params })
}

export function getProfileArticles (username: string, page = 1): Promise<ArticlesResponse> {
  const params = { limit, offset: (page - 1) * limit, author: username }
  return request.get<ArticlesResponse>('/articles', { params })
}

export function getFeeds (page = 1): Promise<ArticlesResponse> {
  const params = { limit, offset: (page - 1) * limit }
  return request.get<ArticlesResponse>('/articles/feed', { params })
}

export function getArticlesByTag (tagName: string, page = 1): Promise<ArticlesResponse> {
  const params = { tag: tagName, limit, offset: (page - 1) * limit }
  return request.get<ArticlesResponse>('/articles', { params })
}
