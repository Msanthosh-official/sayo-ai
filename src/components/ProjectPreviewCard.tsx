import { generateHTMLFromPrompt } from "@/lib/generateHTML";
import { Button } from "@/components/ui/button";
import { Eye, GitBranch, Rocket, Globe } from "lucide-react";
import { motion } from "framer-motion";

interface ProjectPreviewCardProps {
  name: string;
  prompt: string;
  status: string;
  edited: string;
  desc?: string;
  publishedUrl?: string | null;
  onPreview?: () => void;
  onDeploy?: () => void;
  delay?: number;
}

export function ProjectPreviewCard({
  name, prompt, status, edited, desc, publishedUrl, onPreview, onDeploy, delay = 0,
}: ProjectPreviewCardProps) {
  const html = generateHTMLFromPrompt(prompt);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="rounded-xl border border-border bg-card shadow-card overflow-hidden hover:shadow-elevated transition-all group"
    >
      {/* Live iframe thumbnail */}
      <div className="relative h-36 overflow-hidden bg-muted">
        <iframe
          srcDoc={html}
          className="w-[1200px] h-[800px] border-0 pointer-events-none"
          style={{ transform: "scale(0.155)", transformOrigin: "top left" }}
          title={`${name} preview`}
          sandbox=""
          tabIndex={-1}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent" />
        {publishedUrl && (
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-primary/90 text-primary-foreground text-[10px] font-semibold px-2 py-0.5 rounded-md">
            <Globe className="h-2.5 w-2.5" /> Live
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-display font-semibold text-foreground truncate">{name}</h3>
        {desc && <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{desc}</p>}
        <div className="flex items-center gap-2 mt-2">
          <span className={`h-2 w-2 rounded-full ${
            status === "deployed" ? "bg-green-500" : status === "building" ? "bg-secondary" : "bg-muted-foreground/40"
          }`} />
          <span className="text-xs text-muted-foreground capitalize">{status}</span>
          <span className="text-xs text-muted-foreground ml-auto">{edited}</span>
        </div>
        <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="outline" size="sm" className="flex-1" onClick={onPreview}>
            <Eye className="h-3.5 w-3.5 mr-1" /> Preview
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8"><GitBranch className="h-3.5 w-3.5" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onDeploy}><Rocket className="h-3.5 w-3.5" /></Button>
        </div>
      </div>
    </motion.div>
  );
}
