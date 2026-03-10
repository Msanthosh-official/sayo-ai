import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, Sparkles, ArrowRight, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useProject } from "@/contexts/ProjectContext";
import { ProjectPreviewCard } from "@/components/ProjectPreviewCard";

const defaultProjects = [
  { id: "d1", name: "E-commerce Store", prompt: "A luxury fashion e-commerce store with product grid and cart", edited: "2 hours ago", status: "deployed", desc: "Modern online shop with cart and checkout" },
  { id: "d2", name: "Portfolio Website", prompt: "A creative developer portfolio with project showcase and skills", edited: "1 day ago", status: "draft", desc: "Personal portfolio with project showcase" },
  { id: "d3", name: "Blog Platform", prompt: "A modern tech blog with featured articles and newsletter", edited: "3 days ago", status: "deployed", desc: "Full-featured blog with CMS" },
  { id: "d4", name: "Fitness Gym", prompt: "A bold fitness gym website with training programs and coaches", edited: "1 week ago", status: "building", desc: "Gym website with programs" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { projects } = useProject();
  const [prompt, setPrompt] = useState("");
  const [isLoggedIn] = useState(false);

  // Merge real projects with defaults
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
  ].slice(0, 4);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {!isLoggedIn && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-primary/20 bg-primary/5 p-5 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl gradient-hero flex items-center justify-center">
              <LogIn className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-foreground">Sign up to save your projects</h3>
              <p className="text-sm text-muted-foreground">Create an account to access all features and deploy your sites.</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate("/login")}>Log In</Button>
            <Button variant="hero" size="sm" onClick={() => navigate("/signup")}>Sign Up <ArrowRight className="h-3.5 w-3.5" /></Button>
          </div>
        </motion.div>
      )}

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <h1 className="font-display text-3xl font-bold text-foreground">Welcome back 👋</h1>
        <p className="text-muted-foreground mt-1">Build something amazing with AI today.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl border border-border bg-card shadow-card p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-5 w-5 text-primary" />
          <h2 className="font-display font-semibold text-lg text-foreground">Quick AI Builder</h2>
        </div>
        <div className="flex gap-3">
          <input
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder="Describe the website you want to build..."
            className="flex-1 px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <Button variant="hero" className="px-6" onClick={() => navigate("/dashboard/builder", { state: { prompt } })}>
            Generate <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-semibold text-xl text-foreground">Recent Projects</h2>
          <Button variant="outline" size="sm" onClick={() => navigate("/dashboard/builder")}>
            <Plus className="h-4 w-4 mr-1" /> New Project
          </Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {allProjects.map((project, i) => (
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
              delay={0.15 + i * 0.05}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
