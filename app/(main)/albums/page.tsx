import React from "react";
import Gallery from "@/app/components/gallery";
import { galleryService } from "@/services";
import { Models, Query } from "appwrite";
import { imageUploadCategory } from "@/constants/imageuploadCategory";
import { Apiresponse } from "@/types";
import converter from "@/utils/appWriteDataToImageDocument";

async function Album() {
  let images: any = [];
  const fetchWorks = async () => {
    try {
      const res: Apiresponse<Models.Document[] | null> =
        await galleryService.getDocuments([
          Query.select(["src", "title", "alt"]),
          Query.equal("category", imageUploadCategory.ALBUM_FEATUREDWORKS),
        ]);
      if (res?.data) {
        const convertedData = converter(res.data);
        images = convertedData;
      }
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
