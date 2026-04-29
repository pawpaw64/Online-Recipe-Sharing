export interface AuthUser {
  id: string
  email: string
  fullName: string | null
  displayName: string | null
  avatarUrl: string | null
  bio: string | null
  createdAt: string
}

export interface LoginInput {
  email: string
  password: string
}

export interface RegisterInput {
  fullName: string
  email: string
  password: string
}
