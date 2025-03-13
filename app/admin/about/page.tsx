"use client";
import React, { useEffect, useState } from "react";
import DynamicImageSection from "@/app/components/DynamicImageSection";
import { galleryService } from "@/services";
import { imageUploadCategory } from "@/constants/imageuploadCategory";
import { Query } from "appwrite";
import { ImageItem, Section } from "@/types";
import { nanoid } from "nanoid";

const Home: React.FC = () => {
  const [items, setItems] = useState<ImageItem[]>([]);

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
    const documents = await galleryService.getDocuments([
      Query.equal("category", imageUploadCategory.ABOUT_PERSONAL_PHOTO),
    ]);
    if (documents?.data) setItems(documents.data);
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
