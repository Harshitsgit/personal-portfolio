"use client";
import React, { useState } from "react";
import ImageUpload from "@/app/components/ImageUpload";
import { CirclePlus, CircleX } from "lucide-react";
import { galleryService } from "@/services";
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
  showTitleDescButton = false,
}: {
  sectionKey: string;
  sectionTitle: string;
  fileAddLimit?: number;
  items: Images[] | [];
  dispatch: any; // Replaces setItems with a reducer-based dispatch
  category: string;
  loading: boolean;
  showTitleDescButton?: boolean;
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
    const item = items.find((i) => i.id === id);
    if (!item) return;
    if (showTitleDescButton && !item?.title && !item?.description) {
      showToast("Please add title and description", "error");
      return;
    }
    setWorkingId(id);
    if (item?.file) {
      const formData = new FormData();
      formData.append("file", item.file);

      const res = await fetch("/api/file/upload", {
        method: "POST",
        body: formData,
      });

      const response = await res.json();
      if (response.status === StatusCodes.SUCCESS_STATUS) {
        const { key = "", url = "" } = response.data;
        const createdDocument = await galleryService.createDocument({
          id,
          fileId: key,
          src: url,
          alt: `${item.label.replaceAll(" ", "-")}`,
          title: item?.alt || "",
          category,
          description: item?.description || "",
        });
        if (
          response.status === StatusCodes.SUCCESS_STATUS &&
          createdDocument.status === StatusCodes.SUCCESS_STATUS
        ) {
          showToast("File uploaded successfully", "success");
          dispatch({
            type: "MARK_AS_UPLOADED",
            payload: { id, key: sectionKey, fileId: key },
          });
        }
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

  const handleRemoveItem = async (id: string) => {
    setWorkingId(id);
    if (items.length === 4) {
      return;
    }

    const item = items.find((e) => e.id === id);
    if (!item?.src || !item?.isAlreadyUploaded) {
      dispatch({ type: "REMOVE_ITEM", payload: { id, key: sectionKey } });
      return;
    }
    try {
      const res = await fetch("/api/file/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: item.fileId }),
      });

      const result = await res.json();

      if (result?.status === StatusCodes.SUCCESS_STATUS) {
        const deletedRecordResponse = await galleryService.deleteDocument(
          item.id ?? ""
        );
        if (deletedRecordResponse.status === StatusCodes.SUCCESS_STATUS) {
          dispatch({
            type: "REMOVE_ITEM",
            payload: { id, key: sectionKey },
          });
          showToast(Messages.SUCCESS_MESSAGE, "success");
        } else {
          showToast(Messages.ERRORMESSAGE, "error");
        }
        setWorkingId(null);
      } else {
        showToast(Messages.ERRORMESSAGE, "error");
        setWorkingId(null);
      }
    } catch (error) {
      showToast(Messages.ERRORMESSAGE, "error");
    }
  };

  const handleTitleDescriptionUpdation = async (
    id: string,
    title: string,
    description: string
  ): Promise<boolean> => {
    if (!title || !description) {
      showToast("Please enter details properly", "error");
      return false;
    }
    dispatch({
      type: "ADD_TITLE_DESCRIPTION",
      payload: { title, description, id, key: sectionKey },
    });

    const item = items.find((i) => i.id === id);
    debugger;
    if (item?.isAlreadyUploaded) {
      const response = await galleryService.updateDocument(id, {
        fileId: item?.fileId ?? "",
        src: item?.src ?? "",
        alt: item?.alt ?? "",
        title,
        description,
        category,
      });

      if (response.status === StatusCodes.SUCCESS_STATUS) {
        showToast("Details Updated", "success");
      } else showToast("Details Updation failed", "error");
    }

    return true;
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
                  id={item.id}
                  label={item.label || sectionTitle}
                  src={item?.src || ""}
                  onFileChange={(file) => handleFileChange(file, item.id)}
                  onUpload={() => handleUpload(item.id)}
                  isAlreadyUploaded={item.isAlreadyUploaded}
                  showTitleDescButton={showTitleDescButton}
                  handleTitleDescriptionUpdation={
                    handleTitleDescriptionUpdation
                  }
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
