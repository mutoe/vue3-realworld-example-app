const author: Profile = {
  username: 'Author name',
  bio: 'Author bio',
  following: false,
  image: '',
}

const user: User = {
  ...author,
  id: 1,
  email: 'foo@example.com',
  token: '',
}

const article: Article = {
  slug: 'article-foo',
  title: 'Article foo',
  author,
  tagList: ['foo'],
  description: 'Article description',
  body: `# Article body

This is **Strong** content.`,
  favorited: false,
  favoritesCount: 0,
  createdAt: '2020-01-01T00:00:00Z',
  updatedAt: '2020-01-01T00:00:00Z',
}

const comment: ArticleComment = {
  id: 1,
  author,
  body: 'Comment body',
  createdAt: '2020-01-01T00:00:00Z',
  updatedAt: '2020-01-01T00:00:00Z',
}

const comment2: ArticleComment = {
  ...comment,
  id: 2,
  body: 'comment2',
}

export default {
  author,
  user,
  article,
  comment,
  comment2,
}
