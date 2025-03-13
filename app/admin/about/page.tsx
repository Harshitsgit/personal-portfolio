"use client";
import React, { useEffect, useState } from "react";
import DynamicImageSection from "@/app/components/DynamicImageSection";
import { galleryService } from "@/services";
import { imageUploadCategory } from "@/constants/imageuploadCategory";
import { Models, Query } from "appwrite";
import { Apiresponse, Images, Section } from "@/types";
import { nanoid } from "nanoid";

const Home: React.FC = () => {
  const [items, setItems] = useState<Images[]>([]);

  const sections: Section[] = [
    {
      id: nanoid(),
      title: "Personal Photo",
      category: imageUploadCategory.ABOUT_PERSONAL_PHOTO,
      items,
      setItems,
    },
  ];

  const getDocuments = async () => {
    const documents: Apiresponse<Models.Document[] | null> =
      await galleryService.getDocuments([
        Query.select(["$id", "src", "alt", "title", "category"]),
        Query.equal("category", imageUploadCategory.ABOUT_PERSONAL_PHOTO),
      ]);
    if (documents?.data?.length) {
      const images: Images[] = documents.data.map((doc) => ({
        ...doc,
        src: doc.src || "/placeholder.jpg", // Ensure 'src' exists
        title: doc.title || "Untitled",
        alt: doc.alt || "Image",
      }));
      setItems(images);
    }
  };

  useEffect(() => {
    getDocuments();
  }, []);

  return (
    <div className="space-y-8 p-4">
      <h1 className="text-2xl font-bold">Gallery Sections</h1>
      <div className="space-y-8">
        {sections.map((section) => (
          <DynamicImageSection
            key={section.id}
            sectionTitle={section.title}
            fileAddLimit={1}
            items={items}
            setItems={setItems}
            category={imageUploadCategory.ABOUT_PERSONAL_PHOTO}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
