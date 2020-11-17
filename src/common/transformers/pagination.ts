export interface PaginationTransformer
{
  total: number;
  perPage: number;
  lastPage: number;
  currentPage: number;
}
export const paginationTransformer = (data: PaginationTransformer, responseData: any) => {
  if (!responseData.meta) {
    responseData.meta = {}
  }

  responseData.meta = { ...responseData.meta, ...data }

  return responseData
}
