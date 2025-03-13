"use client";
import Image from "next/image";
import React, { ChangeEvent } from "react";

interface ImageUploadProps {
  label?: string;
  src: string;
  onFileChange: (file: File) => void;
  onUpload: () => void;
  isAlreadyUploaded: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  label = "Profile picture",
  src,
  onFileChange,
  onUpload,
  isAlreadyUploaded = false,
}) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile) {
      onFileChange(selectedFile);
    }
  };

  return (
    <div className="border border-gray-300 p-4 mb-5 rounded-lg shadow-sm bg-black text-white w-full">
      <h2 className="text-xl font-semibold mb-4">Upload Your Images</h2>

      <div className="flex flex-col md:flex-row gap-6 items-center">
        {/* Left Section: Preview Box */}
        <div
          className={`w-full md:w-1/2 mr-auto ${
            isAlreadyUploaded ? "border-green-500 border-2 p-2" : ""
          }`}
        >
          <div className="w-full h-48 border-2 border-dashed border-gray-300 flex items-center justify-center rounded-lg overflow-hidden bg-gray-900">
            {src ? (
              <Image
                src={src}
                alt="Preview"
                width={200}
                height={200}
                className="object-contain h-full w-full rounded-lg"
              />
            ) : (
              <span className="text-gray-400">No image selected</span>
            )}
          </div>
        </div>

        {/* Right Section: File Input & Upload Button */}
        {!isAlreadyUploaded ? (
          <div className="w-full md:w-1/2 flex flex-col justify-end">
            <h4 className="text-lg font-semibold mb-2 text-right">{label}</h4>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mb-3 text-sm file:mr-2 file:py-1 file:px-3 file:border file:border-gray-400 file:rounded file:bg-gray-800 file:text-gray-200 file:cursor-pointer w-full md:w-auto"
            />
            <button
              onClick={onUpload}
              className="py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded transition-colors w-full md:w-40"
            >
              Upload
            </button>
          </div>
        ) : (
          <div className="w-full md:w-1/2 text-green-400 text-right font-semibold">
            Image uploaded!
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
