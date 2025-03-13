"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { galleryService } from "@/services";
import { Query } from "appwrite";
import { imageUploadCategory } from "@/constants/imageuploadCategory";

export type ImageListing = {
  id: string;
  title: string;
  category: string;
  src: string;
  year: string;
};
export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [works, setWorks] = useState<ImageListing[]>([]);

  const categories = [
    "all",
    imageUploadCategory.HOME_WEDDING,
    imageUploadCategory.HOME_PERSONAL,
    imageUploadCategory.HOME_MATERNITY,
  ];

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const res = await galleryService.getDocuments([
          Query.select(["src", "title", "category", "$id"]),
          Query.equal("category", [
            imageUploadCategory.HOME_WEDDING,
            imageUploadCategory.HOME_PERSONAL,
            imageUploadCategory.HOME_MATERNITY,
          ]),
        ]);
        setWorks([
          {
            id: "1",
            title: "Digital Dreamscape",
            category: "wedding",
            src: "/recents/1.heic",
            year: "2024",
          },
          {
            id: "2",
            title: "Abstract Harmony",
            category: "wedding",
            src: "/recents/2.heic",
            year: "2023",
          },
          {
            id: "3",
            title: "Metal Flow",
            category: "maternity",
            src: "/recents/3.heic",
            year: "2024",
          },
          {
            id: "4",
            title: "Neon Nights",
            category: "personal",
            src: "/recents/4.heic",
            year: "2023",
          },
          {
            id: "5",
            title: "Nature's Whisper",
            category: "personal",
            src: "/recents/1.heic",
            year: "2024",
          },
          {
            id: "6",
            title: "Bronze Echo",
            category: "maternity",
            src: "/recents/2.heic",
            year: "2023",
          },
        ]);
      } catch (error) {
        console.error("Error fetching works:", error);
        // Fallback data if API fails
        setWorks([
          {
            id: "1",
            title: "Digital Dreamscape",
            category: "wedding",
            src: "/recents/1.heic",
            year: "2024",
          },
          {
            id: "2",
            title: "Abstract Harmony",
            category: "wedding",
            src: "/recents/2.heic",
            year: "2023",
          },
          {
            id: "3",
            title: "Metal Flow",
            category: "maternity",
            src: "/recents/3.heic",
            year: "2024",
          },
          {
            id: "4",
            title: "Neon Nights",
            category: "personal",
            src: "/recents/4.heic",
            year: "2023",
          },
          {
            id: "5",
            title: "Nature's Whisper",
            category: "personal",
            src: "/recents/1.heic",
            year: "2024",
          },
          {
            id: "6",
            title: "Bronze Echo",
            category: "maternity",
            src: "/recents/2.heic",
            year: "2023",
          },
        ]);
      }
    };

    fetchWorks();
  }, []);

  const filteredWorks = works.filter((work) =>
    selectedCategory === "all" ? true : work.category === selectedCategory
  );

  return (
    <section className="bg-black py-20">
      <div className="container mx-auto max-w-6xl">
        {/* Category Filter Buttons */}
        <div className="mb-12 flex flex-wrap justify-center gap-4 items-center">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="text-sm capitalize text-indigo-500"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Image Grid */}
        <motion.div layout className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filteredWorks.map((work) => (
              <motion.div
                key={work.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="overflow-hidden bg-zinc-900">
                  <CardContent className="p-0">
                    <div className="group relative">
                      <img
                        src={work.src || "/placeholder.svg"}
                        alt={work.title}
                        className="w-full transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <h3 className="text-xl font-semibold text-white">
                          {work.title}
                        </h3>
                        <p className="mt-2 text-sm text-gray-300">
                          {work.year}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
