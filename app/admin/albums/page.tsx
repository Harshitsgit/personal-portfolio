"use client";
import React, { useCallback, useEffect, useReducer } from "react";
import DynamicImageSection from "@/app/components/DynamicImageSection";
import { imageUploadCategory } from "@/constants/imageuploadCategory";
import { Query } from "appwrite";
import { galleryService } from "@/services";
import converter from "@/utils/appWriteDataToImageDocument";
import { Action, State } from "@/types";
import { galleryReducer } from "@/utils/reducerutils";

const initialState = {
  sections: {
    featuredWork: {
      items: [],
      loading: true,
    },
  },
};

// function reducer(state: State, action: Action) {
//   switch (action.type) {
//     case "SET_ITEMS": {
//       return {
//         ...state,
//         sections: {
//           ...state.sections,
//           [action.payload.key]: {
//             ...state.sections[action.payload.key],
//             items: action.payload.items,
//             loading: false,
//           },
//         },
//       };
//     }
//     case "ADD_ITEM":
//       return {
//         ...state,
//         sections: {
//           ...state.sections,
//           [action.payload.key]: {
//             ...state.sections[action.payload.key],
//             items: [
//               ...state.sections[action.payload.key].items,
//               action.payload,
//             ],
//           },
//         },
//       };
//     case "UPDATE_ITEM":
//       return {
//         ...state,
//         sections: {
//           ...state.sections,
//           [action.payload.key]: {
//             ...state.sections[action.payload.key],
//             items: state.sections[action.payload.key].items.map(
//               (item: Images) =>
//                 item.id === action.payload.id
//                   ? { ...item, ...action.payload.data }
//                   : item
//             ),
//           },
//         },
//       };
//     case "REMOVE_ITEM":
//       return {
//         ...state,
//         sections: {
//           ...state.sections,
//           [action.payload.key]: {
//             ...state.sections[action.payload.key],
//             items: state.sections[action.payload.key].items.filter(
//               (item: Images) => item.id !== action.payload.id
//             ),
//           },
//         },
//       };
//     case "MARK_AS_UPLOADED":
//       return {
//         ...state,
//         sections: {
//           ...state.sections,
//           [action.payload.key]: {
//             ...state.sections[action.payload.key],
//             items: state.sections[action.payload.key].items.map(
//               (item: Images) =>
//                 item.id === action.payload.id
//                   ? { ...item, isAlreadyUploaded: true }
//                   : item
//             ),
//           },
//         },
//       };
//     case "SET_LOADING": {
//       return {
//         ...state,
//         sections: {
//           ...state.sections,
//           [action.payload.key]: {
//             ...state.sections[action.payload.key],
//             loading: action.payload.loading,
//           },
//         },
//       };
//     }

//     default:
//       return state;
//   }
// }

const Home: React.FC = () => {
  const [state, dispatch] = useReducer(galleryReducer, initialState);

  const fetchDocuments = useCallback(
    async ({ key, category }: { key: string; category: string }) => {
      dispatch({ type: "SET_LOADING", payload: { key, loading: true } });
      try {
        const documents = await galleryService.getDocuments([
          Query.select(["$id", "src", "alt", "title", "category", "fileId"]),
          Query.equal("category", category),
        ]);
        if (documents?.data) {
          dispatch({
            type: "SET_ITEMS",
            payload: { key, items: converter(documents.data) },
          });
          dispatch({ type: "SET_LOADING", payload: { key, loading: false } });
        } else {
          dispatch({ type: "SET_LOADING", payload: { key, loading: false } });
        }
      } catch (error) {
        console.error(`Error fetching ${category} documents:`, error);
        dispatch({ type: "SET_LOADING", payload: { key, loading: false } });
      }
    },
    []
  );

  useEffect(() => {
    sectionsConfig.forEach(({ key, category }) =>
      fetchDocuments({ key, category })
    );
  }, []);
  const sectionsConfig = [
    {
      key: "featuredWork",
      title: "Featured Works",
      category: imageUploadCategory.ALBUM_FEATUREDWORKS,
    },
  ];

  return (
    <div className="space-y-8 p-4">
      <h1 className="text-2xl font-bold">Gallery Sections</h1>
      <div className="space-y-8">
        {sectionsConfig.map((section) => (
          <DynamicImageSection
            key={section.key}
            sectionKey={section.key}
            sectionTitle={section.title}
            items={state.sections[section.key]?.items ?? []}
            dispatch={dispatch}
            category={section.category}
            loading={state.sections[section.key]?.loading ?? true}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
