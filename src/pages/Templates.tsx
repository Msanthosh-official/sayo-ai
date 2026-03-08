import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { generateHTMLFromPrompt } from "@/lib/generateHTML";
import { Eye, ArrowRight } from "lucide-react";

const templates = [
  { name: "SaaS Landing Page", category: "Landing", prompt: "A modern SaaS landing page with pricing and features", emoji: "🚀" },
  { name: "Portfolio Website", category: "Personal", prompt: "A creative portfolio site with project gallery and contact form", emoji: "🎨" },
  { name: "E-commerce Store", category: "Store", prompt: "A luxury e-commerce store with product grid and cart", emoji: "🛍️" },
  { name: "Blog Platform", category: "Content", prompt: "A modern blog with featured articles and newsletter signup", emoji: "📝" },
  { name: "Restaurant Site", category: "Food", prompt: "A fine dining restaurant website with menu and reservations", emoji: "🍽️" },
  { name: "Dashboard App", category: "App", prompt: "A startup SaaS app dashboard with analytics and charts", emoji: "📊" },
];

function TemplatePreview({ prompt }: { prompt: string }) {
  const html = generateHTMLFromPrompt(prompt);
  return (
    <div className="relative h-48 overflow-hidden bg-muted">
      <iframe
        srcDoc={html}
        className="w-[1200px] h-[800px] border-0 pointer-events-none"
        style={{ transform: "scale(0.167)", transformOrigin: "top left" }}
        title="Template preview"
        sandbox=""
        tabIndex={-1}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
    </div>
  );
}

export default function Templates() {
  const navigate = useNavigate();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Templates</h1>
        <p className="text-muted-foreground mt-1">Start with a pre-built template and customize it with AI.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {templates.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-border bg-card shadow-card overflow-hidden hover:shadow-elevated transition-all group cursor-pointer hover:border-primary/30"
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            onClick={() => navigate("/dashboard/builder", { state: { prompt: t.prompt } })}
          >
            <TemplatePreview prompt={t.prompt} />
            <div className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{t.emoji}</span>
                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-md">{t.category}</span>
              </div>
              <h3 className="font-display font-semibold text-foreground mt-1">{t.name}</h3>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{t.prompt}</p>
              <div className="flex gap-2 mt-3">
                <Button variant="outline" size="sm" className="flex-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="h-3.5 w-3.5 mr-1" /> Preview
                </Button>
                <Button variant="hero" size="sm" className="flex-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Use Template <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
