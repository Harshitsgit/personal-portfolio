import React from "react";
import Gallery from "@/app/components/gallery";
import { galleryService } from "@/services";
import { Query } from "appwrite";
import { imageUploadCategory } from "@/constants/imageuploadCategory";

async function Album() {
  let images: any = [];
  const fetchWorks = async () => {
    try {
      const res = await galleryService.getDocuments([
        Query.select(["src", "title", "alt"]),
        Query.equal("category", imageUploadCategory.ALBUM_FEATUREDWORKS),
      ]);
      const data = res?.data || [];
      images = data;
    } catch (error) {
      console.error("Error fetching works:", error);
      images = [
        {
          src: "/albums/1.jpg",
          alt: "Art piece 1",
          title: "Ethereal Dreams",
        },
        {
          src: "/albums/2.jpg",
          alt: "Art piece 2",
          title: "Urban Symphony",
        },
      ];
    }
  };

  await fetchWorks();

  return (
    <div className="pt-20 ">
      <Gallery images={images} />
    </div>
  );
}

export default Album;
