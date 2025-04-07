"use client";
import React, { useCallback, useEffect, useReducer } from "react";
import DynamicImageSection from "@/app/components/DynamicImageSection";
import { imageUploadCategory } from "@/constants/imageuploadCategory";
import { Query } from "appwrite";
import { galleryService } from "@/services";
import converter from "@/utils/appWriteDataToImageDocument";
import { galleryReducer } from "@/utils/reducerutils";

const initialState = {
  sections: {
    featuredWork: {
      items: [],
      loading: true,
    },
  },
};

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
        if (documents?.data?.length) {
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
