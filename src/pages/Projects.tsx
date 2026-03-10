import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProject } from "@/contexts/ProjectContext";
import { ProjectPreviewCard } from "@/components/ProjectPreviewCard";

const defaultProjects = [
  { id: "p1", name: "E-commerce Store", prompt: "A luxury fashion e-commerce store with product grid and shopping cart", edited: "2 hours ago", status: "deployed", desc: "Modern online shop with cart and checkout" },
  { id: "p2", name: "Portfolio Website", prompt: "A creative developer portfolio site with project showcase and contact form", edited: "1 day ago", status: "draft", desc: "Personal portfolio with project showcase" },
  { id: "p3", name: "Blog Platform", prompt: "A modern tech blog platform with featured articles and newsletter signup", edited: "3 days ago", status: "deployed", desc: "Full-featured blog with CMS" },
  { id: "p4", name: "Fitness Gym", prompt: "A bold fitness gym website with workout programs and trainer profiles", edited: "1 week ago", status: "building", desc: "Gym website with programs" },
  { id: "p5", name: "Restaurant Site", prompt: "A fine dining sushi restaurant website with menu and reservations", edited: "2 weeks ago", status: "deployed", desc: "Restaurant with menu and reservations" },
  { id: "p6", name: "Travel Agency", prompt: "A travel adventure agency website with destinations and booking", edited: "3 weeks ago", status: "draft", desc: "Travel agency with trip booking" },
];

export default function Projects() {
  const navigate = useNavigate();
  const { projects } = useProject();
  const [search, setSearch] = useState("");

  const allProjects = [
    ...projects.map(p => ({
      id: p.id,
      name: p.name,
      prompt: p.prompt,
      edited: "Just now",
      status: p.publishedUrl ? "deployed" : "draft",
      desc: p.prompt.slice(0, 60),
      publishedUrl: p.publishedUrl,
    })),
    ...defaultProjects,
  ];

  const filtered = allProjects.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-foreground">Projects</h1>
        <Button variant="hero" size="sm" onClick={() => navigate("/dashboard/builder")}>
          <Plus className="h-4 w-4 mr-1" /> New Project
        </Button>
      </div>
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search projects..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((project, i) => (
          <ProjectPreviewCard
            key={project.id}
            name={project.name}
            prompt={project.prompt}
            status={project.status}
            edited={project.edited}
            desc={project.desc}
            publishedUrl={(project as any).publishedUrl}
            onPreview={() => navigate("/dashboard/builder", { state: { prompt: project.prompt } })}
            onDeploy={() => navigate("/dashboard/deploy")}
            delay={i * 0.05}
          />
        ))}
      </div>
    </div>
  );
}
