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
  src: string;
  id: string;
  file: File | null;
  label: string;
  $id?: string;
  fileId?: string;
};

export type Section = {
  id: string;
  title: string;
  category: string;
  items: Images[];
  setItems: any;
};

export type Images = {
  $id: string;
  src: string;
  title?: string;
  alt?: string;
  description?: string;
  [key: string]: any;
};
