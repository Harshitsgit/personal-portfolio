"use client";
import React, { useState } from "react";
import ImageUpload from "@/app/components/ImageUpload";
import { CirclePlus, CircleX } from "lucide-react";

// Define an interface for an image upload item
interface ImageItem {
  id: number;
  preview: string | null | ArrayBuffer;
  file: File | null;
  label: string;
}

const DynamicImageSection = ({ sectionTitle }: { sectionTitle: string }) => {
  const [items, setItems] = useState<ImageItem[]>([]);

  // Callback from child component to update the preview & file of an item.
  const handleFileChange = (file: File, id: number) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setItems((prevItems: ImageItem[]) => {
          return prevItems.map((item) =>
            item.id === id ? { ...item, preview: reader.result, file } : item
          );
        });
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle upload click per item.
  const handleUpload = (id: number) => {
    const item = items.find((i) => i.id === id);
    if (item?.file) {
      console.log(`Uploading file for item ${id}:`, item.file);
      // Perform actual upload logic here...
    }
  };

  // Add a new image upload item.
  const handleAddItem = (initialLabel: string) => {
    const newId = Date.now();
    const newLabel = `${initialLabel} ${items.length + 1}`;
    setItems((prevItems) => [
      ...prevItems,
      { id: newId, preview: "", file: null, label: newLabel },
    ]);
  };

  // Remove an image upload item.
  const handleRemoveItem = (id: number) => {
    if (items.length === 4) {
      return;
    }
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className="border border-gray-300 p-4 mb-8 rounded-lg shadow-sm bg-black text-white">
      <h2 className="text-xl font-bold mb-4">{sectionTitle}</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 items-center">
        {items.map((item) => (
          <div key={item.id} className="relative">
            <ImageUpload
              label={item.label}
              preview={item.preview}
              onFileChange={(file) => handleFileChange(file, item.id)}
              onUpload={() => handleUpload(item.id)}
            />
            {items.length !== 4 && (
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
              >
                <CircleX strokeWidth={1} />
              </button>
            )}
          </div>
        ))}
        {items.length < 4 && (
          <div className="flex justify-center">
            <button
              onClick={() => handleAddItem("Featurer_Works")}
              className="py-2 px-4 hover:bg-white-700 text-white rounded transition-colors"
            >
              <CirclePlus size={80} strokeWidth={0.5} />
            </button>
          </div>
        )}
      </div>
      {items.length > 3 && (
        <div className="flex justify-center">
          <button
            onClick={() => handleAddItem("Featurer_Works")}
            className="py-2 px-4 hover:bg-white-700 text-white rounded transition-colors"
          >
            <CirclePlus size={80} strokeWidth={0.5} />
          </button>
        </div>
      )}
    </div>
  );
};

export default DynamicImageSection;
