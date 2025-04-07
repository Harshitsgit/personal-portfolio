import Image from "next/image";
import { Button } from "@/components/ui/button";
import { galleryService } from "@/services";
import { Query } from "appwrite";
import { imageUploadCategory } from "@/constants/imageuploadCategory";
import converter from "@/utils/appWriteDataToImageDocument";

export default async function ProjectsPage() {
  let projects: any = [];
  const fetchWorks = async () => {
    const res = await galleryService.getDocuments([
      Query.select(["src", "title", "alt"]),
      Query.equal("category", [
        imageUploadCategory.SERVICES_MATERNITY,
        imageUploadCategory.SERVICES_PERSONAL_SHOOT,
        imageUploadCategory.SERVICES_PRE_WEDDING,
        imageUploadCategory.SERVICES_WEDDING,
      ]),
    ]);

    if (res?.data?.length) {
      const data = converter(res.data);
      projects = data;
    } else {
      projects = [
        {
          id: 1,
          title: "Wedding Shoots",
          description:
            "Experience the magic of your big day with our wedding shoots that capture every heartfelt moment, every exquisite detail, and every emotion that makes your celebration truly unforgettable.",
          // technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
          src: "/wedding-shoots/1.jpg?height=600&width=800",
          // slug: "wedding-shoots",
        },
        {
          id: 2,
          title: "Pre Wedding Shoots",
          description:
            "Celebrate your love story before the big day with our pre-wedding shoots. We create enchanting visuals that set the stage for a lifetime of cherished memories and romantic beginnings.",
          // technologies: ["React", "Node.js", "MongoDB", "Stripe"],
          src: "/pre-wedding/1.heic?height=600&width=800",
          // slug: "pre-wedding-shoots",
        },
        {
          id: 3,
          title: "Personal Shoots",
          description:
            "Showcase your unique personality and style with our personal shoots. We capture the essence of who you are, creating artistic portraits that tell your story with elegance and creativity.",
          // technologies: ["Next.js", "GraphQL", "PostgreSQL"],
          src: "/personal-shoot/1.heic?height=600&width=800",
          // slug: "personal-shoots",
        },
        {
          id: 4,
          title: "Maternity",
          description:
            "Embrace the beauty of new beginnings with our maternity photography. We capture the glow, joy, and anticipation of expecting a new life, creating timeless images that celebrate motherhood.",
          // technologies: ["Next.js", "GraphQL", "PostgreSQL"],
          src: "/maternity/1.jpg?height=600&width=800",
          // slug: "maternity",
        },
      ];
    }
  };

  await fetchWorks();

  return (
    <div className="pt-20 ">
      <section className="container-custom section-spacing flex flex-col items-center">
        <div className="pt-4 pb-20 max-w-6xl">
          <div className="grid gap-16 md:gap-24">
            {projects.map((project, index) => (
              <div key={project.id} className="group">
                <div
                  className={`grid md:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? "md:grid-flow-dense" : ""
                  }`}
                >
                  <div className={index % 2 === 1 ? "md:col-start-2" : ""}>
                    <span className="text-8xl font-bold text-muted/30 group-hover:text-muted/50 transition-colors">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <h2 className="text-4xl font-bold mb-6 -mt-8 group-hover:translate-x-2 transition-transform">
                      {project.title}
                    </h2>
                    <p className="text-xl text-muted-foreground mb-6">
                      {project.description}
                    </p>
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors text-black"
                    >
                      {/* <Link href={`/projects/${project.slug}`}>
                        View Project
                      </Link> */}
                    </Button>
                  </div>
                  <div
                    className={`overflow-hidden rounded-lg ${
                      index % 2 === 1 ? "md:col-start-1" : ""
                    }`}
                  >
                    <div className="relative aspect-video bg-muted rounded-lg overflow-hidden transition-transform group-hover:scale-105 duration-500">
                      <Image
                        src={project.src || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
