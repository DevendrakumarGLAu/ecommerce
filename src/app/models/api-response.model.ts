/** Envelope every FastAPI endpoint responds with: `{ success, message, data }`. */
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

/** Shape of every paginated listing endpoint's `data` field. */
export interface PaginatedResult<T> {
  items: T[];
  page: number;
  limit: number;
  total: number;
  pages: number;
}

/** Common `page`/`limit`/`sort`/`order` query params accepted by list endpoints. */
export interface PaginationQuery {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}
