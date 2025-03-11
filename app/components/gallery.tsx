// "use client";

// import { motion } from "framer-motion";
// import { useRef } from "react";
// import { useInView } from "framer-motion";
// import Image from "next/image";
// import { Marquee } from "@/components/ui/marquee";

// export default function Gallery() {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true });

//   const images = [
//     {
//       src: "/recents/1.heic",
//       alt: "Art piece 1",
//       title: "Ethereal Dreams",
//     },
//     {
//       src: "/recents/2.heic",
//       alt: "Art piece 2",
//       title: "Urban Symphony",
//     },
//     {
//       src: "/recents/3.heic",
//       alt: "Art piece 3",
//       title: "Digital Nostalgia",
//     },
//     {
//       src: "/recents/4.heic",
//       alt: "Art piece 4",
//       title: "Abstract Reality",
//     },
//   ];

//   return (
//     <section className="relative py-20">
//       <div ref={ref} className="container mx-auto px-4">
//         <motion.h2
//           className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl"
//           initial={{ opacity: 0 }}
//           animate={isInView ? { opacity: 1 } : { opacity: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           Featured Works
//         </motion.h2>

//         <Marquee repeat={4}>
//           <div className="flex gap-8 flex-nowrap">
//             {images.map((image, index) => (
//               <motion.div
//                 key={index}
//                 className="relative overflow-hidden rounded-lg"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={
//                   isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
//                 }
//                 transition={{ duration: 0.5, delay: index * 0.2 }}
//                 whileHover={{ scale: 1.1 }}
//               >
//                 <div className="overflow-hidden">
//                   <Image
//                     width={350}
//                     height={450}
//                     src={image.src || "/placeholder.svg"}
//                     alt={image.alt}
//                     className="object-cover transition-transform duration-500"
//                   />
//                 </div>
//                 <motion.div
//                   className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-6"
//                   initial={{ opacity: 0 }}
//                   whileHover={{ opacity: 1 }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   <h3 className="text-xl font-semibold text-white">
//                     {image.title}
//                   </h3>
//                 </motion.div>
//               </motion.div>
//             ))}
//           </div>
//         </Marquee>
//       </div>
//     </section>
//   );
// }

"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import Image from "next/image";
import { Marquee } from "@/components/ui/marquee";

interface ImageItem {
  src: string;
  alt: string;
  title: string;
}

interface GalleryProps {
  images: ImageItem[];
  width?: number;
  height?: number;
}

export default function Gallery({
  images,
  width = 350,
  height = 450,
}: Readonly<GalleryProps>) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="relative pb-20 pt-10">
      <div ref={ref} className="container mx-auto px-4">
        <motion.h2
          className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          Featured Works
        </motion.h2>

        <Marquee repeat={4}>
          <div className="flex gap-8 flex-nowrap">
            {images.map((image, index) => (
              <motion.div
                key={index}
                className="relative overflow-hidden rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ scale: 1.1 }}
              >
                <div className="overflow-hidden">
                  <Image
                    width={width}
                    height={height}
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    className="object-cover transition-transform duration-500"
                  />
                </div>
                <motion.div
                  className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-6"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-xl font-semibold text-white">
                    {image.title}
                  </h3>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  );
}
