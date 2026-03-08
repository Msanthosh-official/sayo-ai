import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, Eye, GitBranch, Rocket, Sparkles, ArrowRight, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const mockProjects = [
  { id: 1, name: "E-commerce Store", edited: "2 hours ago", status: "deployed" },
  { id: 2, name: "Portfolio Website", edited: "1 day ago", status: "draft" },
  { id: 3, name: "Blog Platform", edited: "3 days ago", status: "deployed" },
  { id: 4, name: "Dashboard App", edited: "1 week ago", status: "building" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [isLoggedIn] = useState(false); // mock auth state

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Signup Banner */}
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
            <Button variant="outline" size="sm" onClick={() => navigate("/login")}>
              Log In
            </Button>
            <Button variant="hero" size="sm" onClick={() => navigate("/signup")}>
              Sign Up <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </motion.div>
      )}

      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <h1 className="font-display text-3xl font-bold text-foreground">Welcome back 👋</h1>
        <p className="text-muted-foreground mt-1">Build something amazing with AI today.</p>
      </motion.div>

      {/* Quick AI prompt */}
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

      {/* Projects */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-semibold text-xl text-foreground">Recent Projects</h2>
          <Button variant="outline" size="sm" onClick={() => navigate("/dashboard/builder")}>
            <Plus className="h-4 w-4 mr-1" /> New Project
          </Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.05 }}
              className="rounded-xl border border-border bg-card shadow-card p-5 hover:shadow-elevated transition-shadow group"
            >
              <div className="h-28 rounded-lg bg-accent mb-4 flex items-center justify-center">
                <div className="h-8 w-20 bg-primary/10 rounded" />
              </div>
              <h3 className="font-display font-semibold text-foreground">{project.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">Edited {project.edited}</p>
              <div className="flex items-center gap-1 mt-1">
                <span className={`inline-block h-2 w-2 rounded-full ${project.status === "deployed" ? "bg-green-500" : project.status === "building" ? "bg-secondary" : "bg-muted-foreground/40"}`} />
                <span className="text-xs text-muted-foreground capitalize">{project.status}</span>
              </div>
              <div className="flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="sm"><Eye className="h-3.5 w-3.5" /></Button>
                <Button variant="ghost" size="sm"><GitBranch className="h-3.5 w-3.5" /></Button>
                <Button variant="ghost" size="sm"><Rocket className="h-3.5 w-3.5" /></Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
