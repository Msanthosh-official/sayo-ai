import { useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, Play, Globe, Code2, Eye, Loader2, Copy, RotateCcw, Check, ExternalLink } from "lucide-react";
import { generateMultiPageHTML } from "@/lib/generateHTML";
import { toast } from "sonner";
import { useProject } from "@/contexts/ProjectContext";

export default function AIBuilder() {
  const location = useLocation();
  const { setCurrentProject, addProject, updateProject } = useProject();
  const [prompt, setPrompt] = useState((location.state as any)?.prompt || "");
  const [isGenerating, setIsGenerating] = useState(false);
  const [pages, setPages] = useState<{ name: string; html: string }[]>([]);
  const [activePage, setActivePage] = useState(0);
  const [viewMode, setViewMode] = useState<"preview" | "code">("preview");
  const [isPublished, setIsPublished] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = useCallback(() => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setPages([]);
    setActivePage(0);
    setIsPublished(false);
    setPublishedUrl(null);
    setTimeout(() => {
      const generated = generateMultiPageHTML(prompt);
      setPages(generated);
      setIsGenerating(false);
      
      const project = {
        id: Date.now().toString(),
        name: prompt.slice(0, 40),
        prompt,
        html: generated[0]?.html || "",
        pages: generated,
        publishedUrl: null,
        deployedUrl: null,
        createdAt: new Date(),
      };
      setCurrentProject(project);
      addProject(project);
      toast.success(`Generated ${generated.length} page${generated.length > 1 ? "s" : ""}!`);
    }, 2500);
  }, [prompt, setCurrentProject, addProject]);

  const handleReset = () => {
    setPages([]);
    setPrompt("");
    setActivePage(0);
    setIsPublished(false);
    setPublishedUrl(null);
    setCurrentProject(null);
  };

  const handlePublish = useCallback(() => {
    if (pages.length === 0) return;
    setIsPublishing(true);
    setTimeout(() => {
      const slug = prompt.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 30);
      const url = `https://${slug}.sayo.ai`;
      setPublishedUrl(url);
      setIsPublished(true);
      setIsPublishing(false);
      // Persist to project context
      const projectId = Date.now().toString();
      const existingId = (window as any).__currentProjectId;
      if (existingId) {
        updateProject(existingId, { publishedUrl: url });
      }
      toast.success("Site published successfully!", {
        description: `${pages.length} page${pages.length > 1 ? "s" : ""} live at ${url}`,
        action: { label: "Copy URL", onClick: () => navigator.clipboard.writeText(url) },
      });
    }, 2000);
  }, [pages, prompt, updateProject]);

  const handleCopy = () => {
    if (pages.length === 0) return;
    navigator.clipboard.writeText(pages[activePage].html);
    setCopied(true);
    toast.success("Code copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const generated = pages.length > 0;
  const currentHTML = pages[activePage]?.html || null;

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-5rem)] flex flex-col gap-4">
      {/* Prompt Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-border bg-card shadow-card p-5"
      >
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="h-5 w-5 text-primary" />
          <h1 className="font-display font-bold text-xl text-foreground">AI Website Builder</h1>
        </div>
        <div className="flex gap-3">
          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder="Describe the website you want to build... e.g. 'A modern portfolio site with a hero section, project gallery, and contact form'"
            rows={3}
            className="flex-1 px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            onKeyDown={e => { if (e.key === "Enter" && e.metaKey) handleGenerate(); }}
          />
          <div className="flex flex-col gap-2">
            <Button variant="hero" className="flex-1" onClick={handleGenerate} disabled={isGenerating || !prompt.trim()}>
              {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
              {isGenerating ? "Generating..." : "Generate"}
            </Button>
            <Button variant="outline" size="sm" onClick={handleReset} disabled={isGenerating}>
              <RotateCcw className="h-3.5 w-3.5 mr-1" /> Reset
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Preview / Code Area */}
      <div className="flex-1 rounded-2xl border border-border bg-card shadow-card overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="h-12 border-b border-border flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-primary/40" />
              <div className="w-3 h-3 rounded-full bg-secondary/60" />
              <div className="w-3 h-3 rounded-full bg-muted-foreground/30" />
            </div>
            {generated && (
              <div className="ml-3 flex items-center gap-1 text-xs text-muted-foreground bg-muted rounded-md px-2 py-1">
                <Globe className="h-3 w-3" />
                {publishedUrl || "preview.sayo.ai"}
              </div>
            )}
          </div>
          {generated && (
            <div className="flex items-center gap-2">
              <Button variant={viewMode === "preview" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("preview")}>
                <Eye className="h-3.5 w-3.5 mr-1" /> Preview
              </Button>
              <Button variant={viewMode === "code" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("code")}>
                <Code2 className="h-3.5 w-3.5 mr-1" /> Code
              </Button>
              {isPublished ? (
                <Button variant="outline" size="sm" onClick={() => {
                  if (publishedUrl) { navigator.clipboard.writeText(publishedUrl); toast.success("URL copied!"); }
                }}>
                  <Check className="h-3.5 w-3.5 mr-1 text-green-500" /> Published
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
              ) : (
                <Button variant="hero" size="sm" onClick={handlePublish} disabled={isPublishing}>
                  {isPublishing ? <><Loader2 className="h-3.5 w-3.5 mr-1 animate-spin" /> Publishing...</> : <><Globe className="h-3.5 w-3.5 mr-1" /> Publish</>}
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Page tabs */}
        {generated && pages.length > 1 && (
          <div className="border-b border-border px-4 flex items-center gap-1 h-10 bg-muted/30 overflow-x-auto">
            {pages.map((page, idx) => (
              <button
                key={page.name}
                onClick={() => setActivePage(idx)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  idx === activePage
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {page.name}
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 relative">
          <AnimatePresence mode="wait">
            {isGenerating && (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="h-16 w-16 rounded-2xl gradient-hero animate-pulse flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-primary-foreground" />
                </div>
                <p className="text-muted-foreground font-medium">Generating your website...</p>
                <div className="w-48 h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div className="h-full gradient-hero rounded-full" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 2.5 }} />
                </div>
              </motion.div>
            )}

            {!isGenerating && generated && viewMode === "preview" && (
              <motion.div key={`preview-${activePage}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full">
                <iframe srcDoc={currentHTML!} className="w-full h-full border-0" title="Preview" sandbox="allow-scripts" />
              </motion.div>
            )}

            {!isGenerating && generated && viewMode === "code" && (
              <motion.div key={`code-${activePage}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full overflow-auto p-4">
                <div className="flex justify-end mb-2">
                  <Button variant="ghost" size="sm" onClick={handleCopy}>
                    {copied ? <Check className="h-3.5 w-3.5 mr-1 text-green-500" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                </div>
                <pre className="text-xs text-muted-foreground bg-muted p-4 rounded-xl overflow-auto font-mono">{currentHTML}</pre>
              </motion.div>
            )}

            {!isGenerating && !generated && (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                <Sparkles className="h-12 w-12 mb-4 opacity-20" />
                <p className="font-display font-medium text-lg">Enter a prompt to generate your website</p>
                <p className="text-sm mt-1">Your live preview will appear here</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
