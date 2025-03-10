export type Apiresponse<T = Record<string, unknown> | [] | null> = {
  status: number;
  data: T;
  message: string;
  metaData?: {
    currentPage: number;
    totalFilteredCount: number;
    totalFilteredPage: number;
  };
};
