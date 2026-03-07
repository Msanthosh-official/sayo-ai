import { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, Play, Globe, Code2, Eye, Loader2, Copy, RotateCcw } from "lucide-react";
import { generateHTMLFromPrompt } from "@/lib/generateHTML";

export default function AIBuilder() {
  const location = useLocation();
  const [prompt, setPrompt] = useState((location.state as any)?.prompt || "");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedHTML, setGeneratedHTML] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"preview" | "code">("preview");

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setGeneratedHTML(null);
    setTimeout(() => {
      setGeneratedHTML(generateHTMLFromPrompt(prompt));
      setIsGenerating(false);
    }, 2500);
  };

  const handleReset = () => {
    setGeneratedHTML(null);
    setPrompt("");
  };

  const generated = generatedHTML !== null;

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
        <div className="h-12 border-b border-border flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-primary/40" />
              <div className="w-3 h-3 rounded-full bg-secondary/60" />
              <div className="w-3 h-3 rounded-full bg-muted-foreground/30" />
            </div>
            {generated && (
              <div className="ml-3 flex items-center gap-1 text-xs text-muted-foreground bg-muted rounded-md px-2 py-1">
                <Globe className="h-3 w-3" /> preview.sayo.ai
              </div>
            )}
          </div>
          {generated && (
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "preview" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("preview")}
              >
                <Eye className="h-3.5 w-3.5 mr-1" /> Preview
              </Button>
              <Button
                variant={viewMode === "code" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("code")}
              >
                <Code2 className="h-3.5 w-3.5 mr-1" /> Code
              </Button>
              <Button variant="hero" size="sm">
                <Globe className="h-3.5 w-3.5 mr-1" /> Publish
              </Button>
            </div>
          )}
        </div>

        <div className="flex-1 relative">
          <AnimatePresence mode="wait">
            {isGenerating && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-4"
              >
                <div className="relative">
                  <div className="h-16 w-16 rounded-2xl gradient-hero animate-pulse flex items-center justify-center">
                    <Sparkles className="h-8 w-8 text-primary-foreground" />
                  </div>
                </div>
                <p className="text-muted-foreground font-medium">Generating your website...</p>
                <div className="w-48 h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full gradient-hero rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2.5 }}
                  />
                </div>
              </motion.div>
            )}

            {!isGenerating && generated && viewMode === "preview" && (
              <motion.div key="preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full">
                <iframe
                  srcDoc={generatedHTML!}
                  className="w-full h-full border-0"
                  title="Preview"
                  sandbox="allow-scripts"
                />
              </motion.div>
            )}

            {!isGenerating && generated && viewMode === "code" && (
              <motion.div key="code" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full overflow-auto p-4">
                <div className="flex justify-end mb-2">
                  <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(sampleHTML)}>
                    <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                  </Button>
                </div>
                <pre className="text-xs text-muted-foreground bg-muted p-4 rounded-xl overflow-auto font-mono">
                  {sampleHTML}
                </pre>
              </motion.div>
            )}

            {!isGenerating && !generated && (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground"
              >
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
