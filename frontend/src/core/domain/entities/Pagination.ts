/**
 * Pagination metadata - Core business entity
 */
export interface Pagination {
  total_items: number;
  total_pages: number;
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: Pagination;
}

