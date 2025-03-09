import React from "react";
import Gallery from "@/app/components/gallery";

function Album() {
  const images = [
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
    // {
    //   src: "/albums/3.jpg",
    //   alt: "Art piece 3",
    //   title: "Digital Nostalgia",
    // },
    // {
    //   src: "/albums/4.jpg",
    //   alt: "Art piece 4",
    //   title: "Abstract Reality",
    // },
  ];
  return (
    <div className="pt-20 ">
      <Gallery images={images} />
    </div>
  );
}

export default Album;
