"use client";
import React, { useCallback, useEffect, useReducer } from "react";
import DynamicImageSection from "@/app/components/DynamicImageSection";
import { imageUploadCategory } from "@/constants/imageuploadCategory";
import { galleryService } from "@/services";
import { Query } from "appwrite";
import converter from "@/utils/appWriteDataToImageDocument";
import { Action, Images, State } from "@/types";
import { galleryReducer } from "@/utils/reducerutils";

const initialState = {
  sections: {
    weddingShoot: {
      items: [],
      loading: true,
    },
    preWeddingShoot: {
      items: [],
      loading: true,
    },
    personalShoot: {
      items: [],
      loading: true,
    },
    maternityShoot: {
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

const Services: React.FC = () => {
  const [state, dispatch] = useReducer(galleryReducer, initialState);
  const sectionsConfig = [
    {
      key: "preWeddingShoot",
      title: "Featured Works",
      category: imageUploadCategory.HOME_FEATUREDWORKS,
    },
    {
      key: "weddingShoot",
      title: "Wedding",
      category: imageUploadCategory.HOME_WEDDING,
    },
    {
      key: "personalShoot",
      title: "Personal",
      category: imageUploadCategory.HOME_PERSONAL,
    },
    {
      key: "maternityShoot",
      title: "Maternity",
      category: imageUploadCategory.HOME_MATERNITY,
    },
  ];

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

  return (
    <div className="space-y-8 p-4">
      <h1 className="text-2xl font-bold">Gallery Sections</h1>
      <div className="space-y-8">
        {sectionsConfig.map((section) => (
          <DynamicImageSection
            key={section.key}
            sectionKey={section.key}
            sectionTitle={section.title}
            fileAddLimit={1}
            dispatch={dispatch}
            category={section.category}
            items={state.sections[section.key]?.items ?? []}
            loading={state.sections[section.key]?.loading ?? true}
          />
        ))}
      </div>
    </div>
  );
};

export default Services;
