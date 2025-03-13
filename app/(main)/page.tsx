import Hero from "../components/hero";
import Gallery from "../components/gallery";
import Portfolio from "../components/portfolio";
import { galleryService } from "@/services";
import { Query } from "appwrite";
import { imageUploadCategory } from "@/constants/imageuploadCategory";

export default async function Page() {
  let images: any = [];
  const fetchWorks = async () => {
    try {
      const res = await galleryService.getDocuments([
        Query.select(["src", "title", "alt"]),
        Query.equal("category", imageUploadCategory.HOME_FEATUREDWORKS),
      ]);
      const data = res?.data || [];
      images = data;
    } catch (error) {
      console.error("Error fetching works:", error);
      images = [
        {
          src: "/recents/1.heic",
          alt: "Art piece 1",
          title: "Ethereal Dreams",
        },
        {
          src: "/recents/2.heic",
          alt: "Art piece 2",
          title: "Urban Symphony",
        },
        {
          src: "/recents/3.heic",
          alt: "Art piece 3",
          title: "Digital Nostalgia",
        },
        {
          src: "/recents/4.heic",
          alt: "Art piece 4",
          title: "Abstract Reality",
        },
      ];
    }
  };

  await fetchWorks();

  return (
    <div className="pb-8">
      <Hero />
      <Gallery images={images} />
      <Portfolio />
    </div>
  );
}
