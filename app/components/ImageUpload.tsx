"use client";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";

interface ImageUploadProps {
  id: string;
  label?: string;
  src: string;
  onFileChange: (file: File) => void;
  onUpload: () => void;
  isAlreadyUploaded: boolean;
  showTitleDescButton?: boolean;
  handleTitleDescriptionUpdation?: (
    id: string,
    title: string,
    dscription: string
  ) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  id,
  label = "Profile picture",
  src,
  onFileChange,
  onUpload,
  isAlreadyUploaded = false,
  showTitleDescButton = false,
  handleTitleDescriptionUpdation,
}) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile) {
      onFileChange(selectedFile);
    }
  };

  const handleSaveEvent = () => {
    if (handleTitleDescriptionUpdation) {
      console.log(title, description);
      const response = handleTitleDescriptionUpdation(id, title, description);
      if (response) setIsModalOpen(false);
    }
  };

  // return (
  //   <div className="border border-gray-300 p-4 mb-5 rounded-lg shadow-sm bg-black text-white w-full">
  //     <h2 className="text-xl font-semibold mb-4">Upload Your Images</h2>

  //     <div className="flex flex-col md:flex-row gap-6 items-center">
  //       {/* Left Section: Preview Box */}
  //       <div
  //         className={`w-full md:w-1/2 mr-auto ${
  //           isAlreadyUploaded ? "border-green-500 border-2 p-2" : ""
  //         }`}
  //       >
  //         <div className="w-full h-48 border-2 border-dashed border-gray-300 flex items-center justify-center rounded-lg overflow-hidden bg-gray-900">
  //           {src ? (
  //             <Image
  //               src={src}
  //               alt="Preview"
  //               width={200}
  //               height={200}
  //               className="object-contain h-full w-full rounded-lg"
  //             />
  //           ) : (
  //             <span className="text-gray-400">No image selected</span>
  //           )}
  //         </div>
  //       </div>

  //       {/* Right Section: File Input & Upload Button */}
  //       {!isAlreadyUploaded ? (
  //         <div className="w-full md:w-1/2 flex flex-col justify-end">
  //           <h4 className="text-lg font-semibold mb-2 text-right">{label}</h4>
  //           <input
  //             type="file"
  //             accept="image/*"
  //             onChange={handleFileChange}
  //             className="mb-3 text-sm file:mr-2 file:py-1 file:px-3 file:border file:border-gray-400 file:rounded file:bg-gray-800 file:text-gray-200 file:cursor-pointer w-full md:w-auto"
  //           />
  //           <button
  //             onClick={onUpload}
  //             className="py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded transition-colors w-full md:w-40"
  //           >
  //             Upload
  //           </button>
  //         </div>
  //       ) : (
  //         <div className="w-full md:w-1/2 text-green-400 text-right font-semibold">
  //           Image uploaded!
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // );

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
        <div className="w-full md:w-1/2 flex flex-col justify-end">
          {!isAlreadyUploaded ? (
            <>
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
            </>
          ) : (
            <div className="w-full text-green-400 text-right font-semibold">
              Image uploaded!
            </div>
          )}

          {showTitleDescButton && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-3 py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded transition-colors w-full md:w-40"
            >
              Add Details
            </button>
          )}
        </div>
      </div>

      {/* Modal for Title & Description */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Enter Details</h3>
            <input
              type="text"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 mb-3 border border-gray-300 rounded"
            />
            <textarea
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 mb-3 border border-gray-300 rounded"
            ></textarea>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="py-2 px-4 bg-gray-400 hover:bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEvent}
                className="py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
