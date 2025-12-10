/**
 * Application configuration constants
 */

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  GRPC_URL: import.meta.env.VITE_GRPC_URL || 'http://localhost:50051',
  TIMEOUT: 30000,
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 0,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 1000,
} as const;

export const STATUS = {
  INACTIVE: 0,
  ACTIVE: 1,
} as const;

export const INGREDIENT_TYPE = {
  NONE: 0,
  VEGGIE: 1,
  VEGAN: 2,
} as const;

