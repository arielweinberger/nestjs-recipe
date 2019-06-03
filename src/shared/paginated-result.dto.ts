export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    count: number,
    page: number,
    pageSize: number,
  };
}
