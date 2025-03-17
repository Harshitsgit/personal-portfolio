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

export type SectionState = {
  items: Images[];
  loading: boolean;
};

export type State = {
  sections: Record<string, SectionState>;
};

export type Action =
  | { type: "SET_ITEMS"; payload: { key: string; items: Images[] } }
  | { type: "ADD_ITEM"; payload: Images }
  | {
      type: "UPDATE_ITEM";
      payload: { key: string; id: string; data: Partial<Images> };
    }
  | { type: "REMOVE_ITEM"; payload: { key: string; id: string } }
  | {
      type: "MARK_AS_UPLOADED";
      payload: { key: string; id: string; fileId?: string };
    }
  | { type: "SET_LOADING"; payload: { key: string; loading: boolean } };
