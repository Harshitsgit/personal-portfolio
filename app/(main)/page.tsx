import Hero from "../components/hero";
import Gallery from "../components/gallery";
import Portfolio from "../components/portfolio";

export default function Page() {
  const images = [
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
  return (
    <div className="pb-8">
      <Hero />
      <Gallery images={images} />
      <Portfolio />
      {/* <Contact /> */}
    </div>
  );
}
