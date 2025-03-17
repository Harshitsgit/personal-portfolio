import { State, Images, Action } from "@/types";

export const updateSection = (
  state: State,
  key: string,
  updateFn: (items: Images[]) => Images[]
): State => {
  return {
    ...state,
    sections: {
      ...state.sections,
      [key]: {
        ...state.sections[key],
        items: updateFn(state.sections[key].items),
      },
    },
  };
};

export function galleryReducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_ITEMS":
      return updateSection(
        state,
        action.payload.key,
        () => action.payload.items
      );

    case "ADD_ITEM":
      return updateSection(state, action.payload.key, (items) => [
        ...items,
        action.payload,
      ]);

    case "UPDATE_ITEM":
      return updateSection(state, action.payload.key, (items) =>
        items.map((item) =>
          item.id === action.payload.id
            ? { ...item, ...action.payload.data }
            : item
        )
      );

    case "REMOVE_ITEM":
      return updateSection(state, action.payload.key, (items) =>
        items.filter((item) => item.id !== action.payload.id)
      );

    case "MARK_AS_UPLOADED":
      debugger;
      return updateSection(state, action.payload.key, (items) =>
        items.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                isAlreadyUploaded: true,
                fileId: action.payload?.fileId ?? "",
              }
            : item
        )
      );

    case "SET_LOADING":
      return {
        ...state,
        sections: {
          ...state.sections,
          [action.payload.key]: {
            ...state.sections[action.payload.key],
            loading: action.payload.loading,
          },
        },
      };

    default:
      return state;
  }
}
