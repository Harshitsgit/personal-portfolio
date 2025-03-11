"use client";
import ImageUpload from "@/app/components/ImageUpload";
import React from "react";

const Service = () => {
  const handleUpload = (file: File) => {
    console.log("Uploading file:", file);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Upload Services Images</h2>
      {/* 
        Default: 2 columns 
        On screens above 1024px (lg breakpoint): 4 columns
      */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <ImageUpload label="Services Images 1" onUpload={handleUpload} />
        <ImageUpload label="Services Images 2" onUpload={handleUpload} />
        <ImageUpload label="Services Images 3" onUpload={handleUpload} />
        <ImageUpload label="Services Images 4" onUpload={handleUpload} />
      </div>
    </div>
  );
};

export default Service;
