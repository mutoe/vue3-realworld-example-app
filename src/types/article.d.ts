declare interface Article {
  title: string
  slug: string
  body: string
  createdAt: string
  updatedAt: string
  tagList: string[]
  description: string
  author: Profile
  favorited: boolean
  favoritesCount: number
}
