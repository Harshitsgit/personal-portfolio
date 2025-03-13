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

export type ImageItem = {
  src?: string;
  id: string;
  preview: string | null | ArrayBuffer;
  file: File | null;
  label: string;
  $id?: string;
  fileId?: string;
};

export type Section = {
  id: string;
  title: string;
  category: string;
  items: ImageItem[];
  setItems: any;
};
