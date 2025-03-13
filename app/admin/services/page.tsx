"use client";
import React, { useEffect, useState } from "react";
import DynamicImageSection from "@/app/components/DynamicImageSection";
import { ImageItem, Section } from "@/types";
import { imageUploadCategory } from "@/constants/imageuploadCategory";
import { nanoid } from "nanoid";
import { Query } from "appwrite";
import { galleryService } from "@/services";
const Home: React.FC = () => {
  const [servicesWedding, setServicesWedding] = useState<ImageItem[]>([]);
  const [sevicePreWedding, setsevicesPreWedding] = useState<ImageItem[]>([]);
  const [servicePersonal, setServicesPersonal] = useState<ImageItem[]>([]);
  const [serviceMaternity, setServicesMaternity] = useState<ImageItem[]>([]);

  const sections: Section[] = [
    {
      id: nanoid(),
      title: "Wedding",
      category: imageUploadCategory.SERVICES_WEDDING,
      items: servicesWedding,
      setItems: setServicesWedding,
    },
    {
      id: nanoid(),
      title: "Pre Wedding",
      category: imageUploadCategory.SERVICES_PRE_WEDDING,
      items: sevicePreWedding,
      setItems: setsevicesPreWedding,
    },
    {
      id: nanoid(),
      title: "Personal Shoot",
      category: imageUploadCategory.SERVICES_PERSONAL_SHOOT,
      items: servicePersonal,
      setItems: setServicesPersonal,
    },
    {
      id: nanoid(),
      title: "Maternity",
      category: imageUploadCategory.SERVICES_MATERNITY,
      items: serviceMaternity,
      setItems: setServicesMaternity,
    },
  ];

  const getServiceWeddingDocuments = async () => {
    const documents = await galleryService.getDocuments([
      Query.equal("category", imageUploadCategory.SERVICES_WEDDING),
    ]);
    if (documents?.data) setServicesWedding(documents.data);
  };
  const getServicePreWeddingDocuments = async () => {
    const documents = await galleryService.getDocuments([
      Query.equal("category", imageUploadCategory.SERVICES_PRE_WEDDING),
    ]);
    if (documents?.data) setsevicesPreWedding(documents.data);
  };
  const getServicePersonalDocuments = async () => {
    const documents = await galleryService.getDocuments([
      Query.equal("category", imageUploadCategory.SERVICES_PERSONAL_SHOOT),
    ]);
    if (documents?.data) setServicesPersonal(documents.data);
  };
  const getServiceMaternityDocuments = async () => {
    const documents = await galleryService.getDocuments([
      Query.equal("category", imageUploadCategory.SERVICES_MATERNITY),
    ]);
    if (documents?.data) setServicesMaternity(documents.data);
  };

  useEffect(() => {
    getServiceWeddingDocuments();
    getServicePreWeddingDocuments();
    getServicePersonalDocuments();
    getServiceMaternityDocuments();
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
