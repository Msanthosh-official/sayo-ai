import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, Eye, GitBranch, Rocket, Search } from "lucide-react";
import { useState } from "react";

const projects = [
  { id: 1, name: "E-commerce Store", edited: "2 hours ago", status: "deployed", desc: "Modern online shop with cart and checkout" },
  { id: 2, name: "Portfolio Website", edited: "1 day ago", status: "draft", desc: "Personal portfolio with project showcase" },
  { id: 3, name: "Blog Platform", edited: "3 days ago", status: "deployed", desc: "Full-featured blog with CMS" },
  { id: 4, name: "Dashboard App", edited: "1 week ago", status: "building", desc: "Analytics dashboard with charts" },
  { id: 5, name: "Landing Page", edited: "2 weeks ago", status: "deployed", desc: "Product launch landing page" },
  { id: 6, name: "Social App", edited: "3 weeks ago", status: "draft", desc: "Social media app prototype" },
];

export default function Projects() {
  const [search, setSearch] = useState("");
  const filtered = projects.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-foreground">Projects</h1>
        <Button variant="hero" size="sm"><Plus className="h-4 w-4 mr-1" /> New Project</Button>
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
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-border bg-card shadow-card p-5 hover:shadow-elevated transition-shadow"
          >
            <div className="h-32 rounded-lg bg-accent mb-4 flex items-center justify-center">
              <div className="h-10 w-24 bg-primary/10 rounded" />
            </div>
            <h3 className="font-display font-semibold text-foreground">{project.name}</h3>
            <p className="text-xs text-muted-foreground mt-1">{project.desc}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className={`h-2 w-2 rounded-full ${project.status === "deployed" ? "bg-green-500" : project.status === "building" ? "bg-secondary" : "bg-muted-foreground/40"}`} />
              <span className="text-xs text-muted-foreground capitalize">{project.status}</span>
              <span className="text-xs text-muted-foreground ml-auto">{project.edited}</span>
            </div>
            <div className="flex gap-2 mt-4">
              <Button variant="outline" size="sm" className="flex-1"><Eye className="h-3.5 w-3.5 mr-1" /> Preview</Button>
              <Button variant="ghost" size="icon" className="h-9 w-9"><GitBranch className="h-3.5 w-3.5" /></Button>
              <Button variant="ghost" size="icon" className="h-9 w-9"><Rocket className="h-3.5 w-3.5" /></Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
