import Hero from "./components/hero";
import Gallery from "./components/gallery";
import Portfolio from "./components/portfolio";
import Contact from "./components/contact";
import Footer from "./components/footer";
import Header from "./components/header";

export default function Page() {
  return (
    <>
      <div className="pb-8">
        <Hero />
        <Gallery />
        <Portfolio />
        <Contact />
      </div>
    </>
  );
}
