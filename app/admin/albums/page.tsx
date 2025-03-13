"use client";
import React, { useEffect, useState } from "react";
import DynamicImageSection from "@/app/components/DynamicImageSection";
import { ImageItem, Section } from "@/types";
import { imageUploadCategory } from "@/constants/imageuploadCategory";
import { nanoid } from "nanoid";
import { galleryService } from "@/services";
import { Query } from "appwrite";

const Home: React.FC = () => {
  const [items, setItems] = useState<ImageItem[]>([]);

  const sections: Section[] = [
    {
      id: nanoid(),
      title: "Featured Works",
      category: imageUploadCategory.ALBUM_FEATUREDWORKS,
      items,
      setItems,
    },
  ];

  const getDocuments = async () => {
    const documents = await galleryService.getDocuments([
      Query.equal("category", imageUploadCategory.ALBUM_FEATUREDWORKS),
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
            items={items}
            setItems={setItems}
            category={section.category}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
