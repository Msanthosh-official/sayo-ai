import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const templates = [
  { name: "SaaS Landing", category: "Landing", color: "bg-primary/10" },
  { name: "Portfolio", category: "Personal", color: "bg-secondary/30" },
  { name: "E-commerce", category: "Store", color: "bg-primary/10" },
  { name: "Blog", category: "Content", color: "bg-secondary/30" },
  { name: "Dashboard", category: "App", color: "bg-primary/10" },
  { name: "Documentation", category: "Docs", color: "bg-secondary/30" },
];

export default function Templates() {
  const navigate = useNavigate();
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="font-display text-2xl font-bold text-foreground">Templates</h1>
      <p className="text-muted-foreground">Start with a pre-built template and customize it with AI.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {templates.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-border bg-card shadow-card overflow-hidden hover:shadow-elevated transition-shadow group cursor-pointer"
            onClick={() => navigate("/dashboard/builder")}
          >
            <div className={`h-40 ${t.color} flex items-center justify-center`}>
              <div className="h-12 w-32 bg-card rounded-lg shadow-sm" />
            </div>
            <div className="p-4">
              <span className="text-xs text-primary font-medium">{t.category}</span>
              <h3 className="font-display font-semibold text-foreground mt-1">{t.name}</h3>
              <Button variant="outline" size="sm" className="mt-3 w-full opacity-0 group-hover:opacity-100 transition-opacity">
                Use Template
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
