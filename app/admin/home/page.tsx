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
