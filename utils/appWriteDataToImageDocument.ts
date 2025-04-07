import { Images } from "@/types";
import { Models } from "appwrite";

function converter(documents: Models.Document[]) {
  const images: Images[] = documents.map((doc: Models.Document) => ({
    ...doc,
    src: doc?.src || "/placeholder.jpg",
    title: doc?.title || "Untitled",
    alt: doc?.alt || "Image",
    label: "",
    id: doc?.$id,
    fileId: doc?.fileId || "",
    isAlreadyUploaded: true,
    description: doc?.description || "",
  }));

  return images;
}

export default converter;
