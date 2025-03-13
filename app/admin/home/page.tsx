"use client";
import React, { useEffect, useState } from "react";
import DynamicImageSection from "@/app/components/DynamicImageSection";
import { imageUploadCategory } from "@/constants/imageuploadCategory";
import { Images, Section } from "@/types";
import { nanoid } from "nanoid";
import { galleryService } from "@/services";
import { Query } from "appwrite";
import converter from "@/utils/appWriteDataToImageDocument";

const Home: React.FC = () => {
  const [homeFeaturedWorks, setHomeFeaturedWorks] = useState<Images[]>([]);
  const [homeWedding, setHomeWedding] = useState<Images[]>([]);
  const [homePersonal, setHomePersonal] = useState<Images[]>([]);
  const [homeMaternity, setHomeMaternity] = useState<Images[]>([]);

  const sections: Section[] = [
    {
      id: nanoid(),
      title: "Featured Works",
      category: imageUploadCategory.HOME_FEATUREDWORKS,
      items: homeFeaturedWorks,
      setItems: setHomeFeaturedWorks,
    },
    {
      id: nanoid(),
      title: "Wedding",
      category: imageUploadCategory.HOME_WEDDING,
      items: homeWedding,
      setItems: setHomeWedding,
    },
    {
      id: nanoid(),
      title: "Personal",
      category: imageUploadCategory.HOME_PERSONAL,
      items: homePersonal,
      setItems: setHomePersonal,
    },
    {
      id: nanoid(),
      title: "Maternity",
      category: imageUploadCategory.HOME_MATERNITY,
      items: homeMaternity,
      setItems: setHomeMaternity,
    },
  ];

  const getHomeFeaturedWorksDocuments = async () => {
    const documents = await galleryService.getDocuments([
      Query.select(["$id", "src", "alt", "title", "category"]),
      Query.equal("category", imageUploadCategory.HOME_FEATUREDWORKS),
    ]);
    if (documents?.data) {
      setHomeFeaturedWorks(converter(documents.data));
    }
  };
  const getHomeWeddingDocuments = async () => {
    const documents = await galleryService.getDocuments([
      Query.select(["$id", "src", "alt", "title", "category"]),
      Query.equal("category", imageUploadCategory.HOME_WEDDING),
    ]);
    if (documents?.data) {
      setHomeWedding(converter(documents.data));
    }
  };
  const getHomePersonalDocuments = async () => {
    const documents = await galleryService.getDocuments([
      Query.select(["$id", "src", "alt", "title", "category"]),
      Query.equal("category", imageUploadCategory.HOME_PERSONAL),
    ]);
    if (documents?.data) setHomePersonal(converter(documents.data));
  };
  const getHomeMaternityDocuments = async () => {
    const documents = await galleryService.getDocuments([
      Query.select(["$id", "src", "alt", "title", "category"]),
      Query.equal("category", imageUploadCategory.HOME_MATERNITY),
    ]);
    if (documents?.data) setHomeMaternity(converter(documents.data));
  };

  useEffect(() => {
    getHomeFeaturedWorksDocuments();
    getHomeWeddingDocuments();
    getHomePersonalDocuments();
    getHomeMaternityDocuments();
  }, []);
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

  return (
    <div className="space-y-8 p-4">
      <h1 className="text-2xl font-bold">Gallery Sections</h1>
      {/* Render each section */}
      <div className="space-y-8">
        {sections.map((section) => (
          <DynamicImageSection
            key={section.id}
            sectionTitle={section.title}
            items={section.items}
            setItems={section.setItems}
            category={section.category}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
