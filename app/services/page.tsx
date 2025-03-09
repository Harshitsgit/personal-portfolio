import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// Mock projects data
const projects = [
  {
    id: 1,
    title: "Wedding Shoots",
    description:
      "Experience the magic of your big day with our wedding shoots that capture every heartfelt moment, every exquisite detail, and every emotion that makes your celebration truly unforgettable.",
    // technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
    image: "/wedding-shoots/1.jpg?height=600&width=800",
    slug: "wedding-shoots",
    type: "hosted", // hosted project
  },
  {
    id: 2,
    title: "Pre Wedding Shoots",
    description:
      "Celebrate your love story before the big day with our pre-wedding shoots. We create enchanting visuals that set the stage for a lifetime of cherished memories and romantic beginnings.",
    // technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    image: "/pre-wedding/1.heic?height=600&width=800",
    slug: "pre-wedding-shoots",
    type: "hosted", // hosted project
  },
  {
    id: 3,
    title: "Personal Shoots",
    description:
      "Showcase your unique personality and style with our personal shoots. We capture the essence of who you are, creating artistic portraits that tell your story with elegance and creativity.",
    // technologies: ["Next.js", "GraphQL", "PostgreSQL"],
    image: "/personal-shoot/1.heic?height=600&width=800",
    slug: "personal-shoots",
    type: "hosted", // hosted project
  },
  {
    id: 4,
    title: "Maternity",
    description:
      "Embrace the beauty of new beginnings with our maternity photography. We capture the glow, joy, and anticipation of expecting a new life, creating timeless images that celebrate motherhood.",
    // technologies: ["Next.js", "GraphQL", "PostgreSQL"],
    image: "/maternity/1.jpg?height=600&width=800",
    slug: "maternity",
    type: "hosted", // hosted project
  },
  // {
  //   id: 4,
  //   title: "Algorithm Visualizer",
  //   description:
  //     "A tool for visualizing common algorithms like sorting, pathfinding, and graph traversal algorithms.",
  //   technologies: ["JavaScript", "Canvas API", "Data Structures"],
  //   githubUrl: "https://github.com/johndoe/algorithm-visualizer",
  //   image: "/placeholder.svg?height=600&width=800",
  //   type: "github", // GitHub-only project
  // },
  // {
  //   id: 5,
  //   title: "Compiler Design Project",
  //   description:
  //     "A simple compiler implementation that demonstrates lexical analysis, parsing, and code generation.",
  //   technologies: ["C++", "LLVM", "Automata Theory"],
  //   githubUrl: "https://github.com/johndoe/mini-compiler",
  //   image: "/placeholder.svg?height=600&width=800",
  //   type: "github", // GitHub-only project
  // },
  // {
  //   id: 6,
  //   title: "Operating System Kernel",
  //   description:
  //     "A minimal operating system kernel implementing basic process scheduling, memory management, and file systems.",
  //   technologies: ["C", "Assembly", "OS Theory"],
  //   githubUrl: "https://github.com/johndoe/mini-os",
  //   image: "/placeholder.svg?height=600&width=800",
  //   type: "github", // GitHub-only project
  // },
];

export default function ProjectsPage() {
  // Separate hosted and GitHub-only projects
  const hostedProjects = projects.filter(
    (project) => project.type === "hosted"
  );
  const githubProjects = projects.filter(
    (project) => project.type === "github"
  );

  return (
    <div className="pt-20 ">
      <section className="container-custom section-spacing flex flex-col items-center">
        {/* <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="heading-xl mb-6">Projects</h1>
          <p className="body-lg text-muted-foreground">
            A showcase of my work, featuring web applications, design projects,
            and experiments.
          </p>
        </div> */}

        {/* Hosted Projects */}
        <div className="pt-4 pb-20 max-w-6xl">
          {/* <h2 className="heading-lg mb-10 relative">
            Web Projects
            <span className="absolute -z-10 text-[8rem] font-bold text-muted/20 -top-16 -left-6 opacity-80">
              01
            </span>
          </h2> */}

          <div className="grid gap-16 md:gap-24">
            {hostedProjects.map((project, index) => (
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
                    {/* <div className="flex flex-wrap gap-2 mb-8">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div> */}
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors text-black"
                    >
                      <Link href={`/projects/${project.slug}`}>
                        View Project
                      </Link>
                    </Button>
                  </div>
                  <div
                    className={`overflow-hidden rounded-lg ${
                      index % 2 === 1 ? "md:col-start-1" : ""
                    }`}
                  >
                    <div className="relative aspect-video bg-muted rounded-lg overflow-hidden transition-transform group-hover:scale-105 duration-500">
                      <Image
                        src={project.image || "/placeholder.svg"}
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

        {/* GitHub-only Projects */}
        {/* <div>
          <h2 className="heading-lg mb-10 relative">
            Deep CS Projects
            <span className="absolute -z-10 text-[8rem] font-bold text-muted/20 -top-16 -left-6 opacity-80">
              02
            </span>
          </h2>

          <p className="text-xl text-muted-foreground mb-10 max-w-3xl">
            These projects focus on computer science fundamentals and systems
            programming. They're available on GitHub for code review and
            educational purposes.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {githubProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video bg-muted overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-4 w-4" />
                      <span>View on GitHub</span>
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </section>
    </div>
  );
}
