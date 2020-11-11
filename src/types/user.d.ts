declare interface Profile {
  username: string
  bio: string
  image: string
  following: boolean
}

declare interface User {
  id: number
  email: string
  username: string
  bio: string | undefined
  image: string | undefined
  token: string
}
