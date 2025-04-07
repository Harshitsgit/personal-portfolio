"use client";
import React, { useCallback, useEffect, useReducer } from "react";
import DynamicImageSection from "@/app/components/DynamicImageSection";
import { imageUploadCategory } from "@/constants/imageuploadCategory";
import { galleryService } from "@/services";
import { Query } from "appwrite";
import converter from "@/utils/appWriteDataToImageDocument";
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

const Services: React.FC = () => {
  const [state, dispatch] = useReducer(galleryReducer, initialState);
  const sectionsConfig = [
    {
      key: "weddingShoot",
      title: "Wedding",
      category: imageUploadCategory.SERVICES_WEDDING,
    },
    {
      key: "preWeddingShoot",
      title: "Pre Wedding",
      category: imageUploadCategory.SERVICES_PRE_WEDDING,
    },
    {
      key: "personalShoot",
      title: "Personal",
      category: imageUploadCategory.SERVICES_PERSONAL_SHOOT,
    },
    {
      key: "maternityShoot",
      title: "Maternity",
      category: imageUploadCategory.SERVICES_MATERNITY,
    },
  ];

  const fetchDocuments = useCallback(
    async ({ key, category }: { key: string; category: string }) => {
      dispatch({ type: "SET_LOADING", payload: { key, loading: true } });
      try {
        const documents = await galleryService.getDocuments([
          Query.select([
            "$id",
            "src",
            "alt",
            "title",
            "category",
            "fileId",
            "description",
          ]),
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
            showTitleDescButton={true}
          />
        ))}
      </div>
    </div>
  );
};

export default Services;
