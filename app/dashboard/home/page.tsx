"use client";
import React, { useState } from "react";
import DynamicImageSection from "@/app/components/DynamicImageSection";

interface Section {
  id: number;
  title: string;
}

const Home: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([
    { id: 1, title: "Featured Works" },
    { id: 2, title: "Additional Works" },
  ]);

  // Add a new section
  // const handleAddSection = () => {
  //   const newId = Date.now();
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
            // If you want, you could pass additional callbacks for removal etc.
          />
        ))}
      </div>
      {/* Centered button to add a new section */}
      {/* <div className="flex justify-center">
        <button
          onClick={handleAddSection}
          className="py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded transition-colors"
        >
          Add Section
        </button>
      </div> */}
    </div>
  );
};

export default Home;
