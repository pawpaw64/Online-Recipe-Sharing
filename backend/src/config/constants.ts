export const ACCESS_TOKEN_TTL = '15m'
export const REFRESH_TOKEN_TTL = '7d'
export const REFRESH_TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000 // 7 days in ms

export const BCRYPT_SALT_ROUNDS = 12

export const PAGINATION_DEFAULT_LIMIT = 12
export const PAGINATION_MAX_LIMIT = 100

export const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const

export const CATEGORIES = [
  'Breakfast',
  'Lunch',
  'Dinner',
  'Desserts',
  'Snacks',
  'Vegetarian',
  'Seafood',
  'Drinks',
] as const
