/**
 * API Endpoints configuration
 */
export const API_ENDPOINTS = {
  items: {
    list: '/items',
    detail: (uuid: string) => `/items/${uuid}`,
    create: '/items',
    update: (uuid: string) => `/items/${uuid}`,
    delete: (uuid: string) => `/items/${uuid}`,
  },
  ingredients: {
    list: '/ingredients',
    create: '/ingredients',
    update: (uuid: string) => `/ingredients/${uuid}`,
    delete: (uuid: string) => `/ingredients/${uuid}`,
  },
} as const;

