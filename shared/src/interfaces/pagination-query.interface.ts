export interface IPaginationQueryOptions {
  page: number;

  limit: number;

  sort?: Record<string, 'ASC' | 'DESC'>;
}
