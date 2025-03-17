"use client";
import React, { useCallback, useEffect, useReducer } from "react";
import DynamicImageSection from "@/app/components/DynamicImageSection";
import { imageUploadCategory } from "@/constants/imageuploadCategory";
import { Action, Images, State } from "@/types";
import { galleryService } from "@/services";
import { Query } from "appwrite";
import converter from "@/utils/appWriteDataToImageDocument";
import { galleryReducer } from "@/utils/reducerutils";

const initialState = {
  sections: {
    featuredWork: {
      items: [],
      loading: true,
    },
    weddingShoot: {
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
//                   ? {
//                       ...item,
//                       isAlreadyUploaded: true,
//                       fileId: action.payload.fileId,
//                     }
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

  const sectionsConfig = [
    {
      key: "featuredWork",
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

  // const [homeFeaturedWorks, setHomeFeaturedWorks] = useState<Images[]>([]);
  // const [homeWedding, setHomeWedding] = useState<Images[]>([]);
  // const [homePersonal, setHomePersonal] = useState<Images[]>([]);
  // const [homeMaternity, setHomeMaternity] = useState<Images[]>([]);

  // const sections: Section[] = [
  //   {
  //     id: nanoid(),
  //     title: "Featured Works",
  //     category: imageUploadCategory.HOME_FEATUREDWORKS,
  //     items: homeFeaturedWorks,
  //     setItems: setHomeFeaturedWorks,
  //   },
  //   {
  //     id: nanoid(),
  //     title: "Wedding",
  //     category: imageUploadCategory.HOME_WEDDING,
  //     items: homeWedding,
  //     setItems: setHomeWedding,
  //   },
  //   {
  //     id: nanoid(),
  //     title: "Personal",
  //     category: imageUploadCategory.HOME_PERSONAL,
  //     items: homePersonal,
  //     setItems: setHomePersonal,
  //   },
  //   {
  //     id: nanoid(),
  //     title: "Maternity",
  //     category: imageUploadCategory.HOME_MATERNITY,
  //     items: homeMaternity,
  //     setItems: setHomeMaternity,
  //   },
  // ];

  // const getHomeFeaturedWorksDocuments = async () => {
  //   const documents = await galleryService.getDocuments([
  //     Query.select(["$id", "src", "alt", "title", "category"]),
  //     Query.equal("category", imageUploadCategory.HOME_FEATUREDWORKS),
  //   ]);
  //   if (documents?.data) {
  //     setHomeFeaturedWorks(converter(documents.data));
  //   }
  // };
  // const getHomeWeddingDocuments = async () => {
  //   const documents = await galleryService.getDocuments([
  //     Query.select(["$id", "src", "alt", "title", "category"]),
  //     Query.equal("category", imageUploadCategory.HOME_WEDDING),
  //   ]);
  //   if (documents?.data) {
  //     setHomeWedding(converter(documents.data));
  //   }
  // };
  // const getHomePersonalDocuments = async () => {
  //   const documents = await galleryService.getDocuments([
  //     Query.select(["$id", "src", "alt", "title", "category"]),
  //     Query.equal("category", imageUploadCategory.HOME_PERSONAL),
  //   ]);
  //   if (documents?.data) setHomePersonal(converter(documents.data));
  // };
  // const getHomeMaternityDocuments = async () => {
  //   const documents = await galleryService.getDocuments([
  //     Query.select(["$id", "src", "alt", "title", "category"]),
  //     Query.equal("category", imageUploadCategory.HOME_MATERNITY),
  //   ]);
  //   if (documents?.data) setHomeMaternity(converter(documents.data));
  // };

  // useEffect(() => {
  //   getHomeFeaturedWorksDocuments();
  //   getHomeWeddingDocuments();
  //   getHomePersonalDocuments();
  //   getHomeMaternityDocuments();
  // }, []);
  // Add a new section
  // const handleAddSection = () => {
  //   const newId = nanoid();
  //   setSections((prev) => [
  //     ...prev,
  //     { id: newId, title: `Section ${prev.length + 1}` },
  //   ]);
  // };

  // // Optionally remove a section (if desired)
  // const handleRemoveSection = (id: number) => {
  //   setSections((prev) => prev.filter((section) => section.id !== id));
  // };

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

  // return (
  //   <div className="space-y-8 p-4">
  //     <h1 className="text-2xl font-bold">Gallery Sections</h1>
  //     {/* Render each section */}
  //     <div className="space-y-8">
  //       {sections.map((section) => (
  //         <DynamicImageSection
  //           key={section.id}
  //           sectionTitle={section.title}
  //           items={section.items}
  //           setItems={section.setItems}
  //           category={section.category}
  //         />
  //       ))}
  //     </div>
  //   </div>
  // );

  return (
    <div className="space-y-8 p-4">
      <h1 className="text-2xl font-bold">Gallery Sections</h1>
      <div className="space-y-8">
        {sectionsConfig.map(({ key, title, category }) => (
          <DynamicImageSection
            sectionKey={key}
            key={key}
            sectionTitle={title}
            items={state.sections[key]?.items || []}
            dispatch={dispatch}
            category={category}
            loading={state.sections[key].loading}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
