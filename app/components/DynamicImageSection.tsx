"use client";
import React, { useState } from "react";
import ImageUpload from "@/app/components/ImageUpload";
import { CirclePlus, CircleX } from "lucide-react";
import { fileService, galleryService } from "@/services";
import { useToast } from "../context/ToastContextProvider";
import { Messages, StatusCodes } from "@/constants";
import { Images } from "@/types";
import { nanoid } from "nanoid";

const DynamicImageSection = ({
  sectionKey,
  sectionTitle,
  fileAddLimit = 0,
  items = [],
  dispatch,
  category,
  loading,
}: {
  sectionKey: string;
  sectionTitle: string;
  fileAddLimit?: number;
  items: Images[];
  dispatch: any; // Replaces setItems with a reducer-based dispatch
  category: string;
  loading: boolean;
}) => {
  const { showToast } = useToast();
  const [workingId, setWorkingId] = useState<string | null>(null);

  const handleFileChange = (file: File, id: string) => {
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        const img = new Image();
        img.src = reader.result;

        img.onload = () => {
          // Update state via dispatch
          dispatch({
            type: "UPDATE_ITEM",
            payload: {
              key: sectionKey,
              id,
              data: {
                src: reader.result as string,
                file,
                isAlreadyUploaded: false,
              },
            },
          });
        };
      }
    };

    reader.readAsDataURL(file);
  };

  const handleUpload = async (id: string) => {
    debugger;
    setWorkingId(id);
    const item = items.find((i) => i.id === id);
    if (item?.file) {
      const response = await fileService.createFile(item.file);
      const fileId = response?.data || "";
      const url = fileService.getFilePreview(fileId);
      const createdDocument = await galleryService.createDocument({
        id,
        fileId,
        src: url.data || "",
        alt: `${item.label.replaceAll(" ", "-")}`,
        title: "",
        category,
        description: "",
      });

      if (
        response.status === StatusCodes.SUCCESS_STATUS &&
        createdDocument.status === StatusCodes.SUCCESS_STATUS
      ) {
        showToast("File uploaded successfully", "success");

        dispatch({
          type: "MARK_AS_UPLOADED",
          payload: { id, key: sectionKey, fileId },
        });
      } else showToast("Problem while uploading file", "error");
    } else showToast("Please select a file to upload", "error");
    setWorkingId(null);
  };

  const handleAddItem = (initialLabel: string) => {
    if (fileAddLimit !== 0 && items.length === fileAddLimit) {
      showToast(`You can add up to ${fileAddLimit} images`, "error");
      return;
    }

    const newItem = {
      id: nanoid(),
      src: "",
      file: null,
      label: `${initialLabel} ${items.length + 1}`,
      isAlreadyUploaded: false,
      key: sectionKey,
    };

    dispatch({
      type: "ADD_ITEM",
      payload: newItem,
    });
  };

  const handleRemoveItem = (id: string) => {
    setWorkingId(id);
    if (items.length === 4) {
      return;
    }

    const item = items.find((e) => e.id === id);
    if (!item?.src) {
      dispatch({ type: "REMOVE_ITEM", payload: { id, key: sectionKey } });
      return;
    }
    debugger;

    fileService.deleteFile(item.fileId ?? "").then((res) => {
      if (res.status === StatusCodes.SUCCESS_STATUS) {
        galleryService.deleteDocument(item.id ?? "").then((res) => {
          if (res.status === StatusCodes.SUCCESS_STATUS) {
            dispatch({ type: "REMOVE_ITEM", payload: { id, key: sectionKey } });
            showToast(Messages.SUCCESS_MESSAGE, "success");
            setWorkingId(null);
          } else {
            showToast(Messages.ERRORMESSAGE, "error");
            setWorkingId(null);
          }
        });
      } else {
        showToast(Messages.SOMETHING_WENT_WRONG, "error");
        setWorkingId(null);
      }
    });
  };

  return (
    <div className="border border-gray-300 p-4 mb-8 rounded-lg shadow-sm bg-black text-white">
      {loading ? (
        <div className="w-full h-40 bg-gray-700 animate-pulse rounded-md flex justify-center items-center">
          <p>Loading...</p>
        </div>
      ) : (
        <>
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
                {workingId === item.id && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center text-white">
                    {item.isAlreadyUploaded ? "Removing..." : "Uploading..."}
                  </div>
                )}
                {items.length !== 4 && (
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    disabled={workingId === item.id}
                    className={`absolute top-1 right-1 rounded-full w-6 h-6 flex items-center justify-center text-xs
                   ${
                     workingId === item.id
                       ? "bg-gray-500 opacity-50 cursor-not-allowed"
                       : "bg-red-600 hover:bg-red-700 text-white"
                   }
                 `}
                  >
                    <CircleX strokeWidth={1} />
                    {/* {workingId === item.id ? "1" : "0"} */}
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
        </>
      )}
    </div>
  );
};

export default DynamicImageSection;
