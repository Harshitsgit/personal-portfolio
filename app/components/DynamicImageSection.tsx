"use client";
import React from "react";
import ImageUpload from "@/app/components/ImageUpload";
import { CirclePlus, CircleX } from "lucide-react";
import { fileService, galleryService } from "@/services";
import { useToast } from "../context/ToastContextProvider";
import { Messages, StatusCodes } from "@/constants";
import { Images } from "@/types";
import { nanoid } from "nanoid";

const DynamicImageSection = ({
  sectionTitle,
  fileAddLimit = 0,
  items,
  setItems,
  category,
}: {
  sectionTitle: string;
  fileAddLimit?: number;
  items: Images[] | [];
  setItems: any;
  category: string;
}) => {
  const { showToast } = useToast();

  const handleFileChange = (file: File, id: string) => {
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        const img = new Image();
        img.src = reader.result;

        img.onload = () => {
          // if (img.width !== 1440 || img.height !== 1800) {
          //   showToast(
          //     "Please upload an image of size 1440 × 1800 px.",
          //     "error"
          //   );
          //   return;
          // }

          // Update state with valid image src
          setItems((prevItems: Images[]) =>
            prevItems.map((item) =>
              item.id === id
                ? {
                    ...item,
                    src: reader.result as string,
                    file,
                    isAlreadyUploaded: false,
                  }
                : item
            )
          );
        };
      }
    };

    reader.readAsDataURL(file);
  };

  // Handle upload click per item.
  const handleUpload = async (id: string) => {
    const item = items.find((i) => i.id === id);
    if (item?.file) {
      const response = await fileService.createFile(item.file);
      const url = fileService.getFilePreview(response.data || "");
      const createdDocument = await galleryService.createDocument({
        fileId: response.data || "",
        src: url.data || "",
        alt: `${item.label.replaceAll(" ", "-")}`,
        title: "",
        category,
        description: "",
      });
      if (
        response.status === StatusCodes.SUCCESS_STATUS &&
        createdDocument.status === StatusCodes.SUCCESS_STATUS
      )
        showToast("File uploaded succesfully", "success");
      else showToast("Problem while uploading file", "error");
    } else showToast("Please select file to upload", "error");
  };

  // Add a new image upload item.
  const handleAddItem = (initialLabel: string) => {
    if (fileAddLimit !== 0 && items.length === fileAddLimit) {
      showToast(`You can add upto ${fileAddLimit} image`, "error");
      return;
    }
    const newId = nanoid();
    const newLabel = `${initialLabel} ${items.length + 1}`;

    setItems((prevItems: Images[]) => [
      ...prevItems,
      {
        id: newId,
        src: "",
        file: null,
        label: newLabel,
      },
    ]);
  };

  // Remove an image upload item.
  const handleRemoveItem = (id: string) => {
    if (items.length === 4) {
      return;
    }

    const [item] = items.filter((e) => e.id === id);
    if (!item?.src) {
      setItems((prevItems: Images[]) =>
        prevItems.filter((item) => item.id !== id)
      );
      return;
    }
    fileService.deleteFile(item.fileId ?? "").then((res) => {
      if (res.status === StatusCodes.SUCCESS_STATUS)
        galleryService.deleteDocument(item?.$id ?? "").then((res) => {
          if (res.status === StatusCodes.SUCCESS_STATUS) {
            setItems((prevItems: Images[]) =>
              prevItems.filter((item) => item.id !== id)
            );
            showToast(Messages.SUCCESS_MESSAGE, "success");
          } else {
            showToast(Messages.ERRORMESSAGE, "error");
          }
        });
      else {
        showToast(Messages.SOMETHING_WENT_WRONG, "error");
      }
    });
  };

  return (
    <div className="border border-gray-300 p-4 mb-8 rounded-lg shadow-sm bg-black text-white">
      <h2 className="text-xl font-bold mb-4">{sectionTitle}</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 items-center">
        {items?.map((item) => (
          <div key={item.id} className="relative">
            <ImageUpload
              label={item.label || sectionTitle}
              src={item?.src || ""}
              onFileChange={(file) => handleFileChange(file, item.id)}
              onUpload={() => handleUpload(item.id)}
              isAlreadyUploaded={item.isAlreadyUploaded}
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
              onClick={() => handleAddItem(sectionTitle)}
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
            onClick={() => handleAddItem(sectionTitle)}
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
