import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Wand2, Send, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Msg = { role: "user" | "assistant"; content: string };

interface Props {
  html: string | null;
  pageName: string;
  onUpdate: (newHtml: string) => void;
}

const SUGGESTIONS = [
  "Change the hero background to deep blue",
  "Add a testimonials section",
  "Make the buttons rounded and larger",
  "Add a pricing table with 3 tiers",
];

export default function BuilderEditChat({ html, pageName, onUpdate }: Props) {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "I'm your AI editor. Tell me what to change on this page and I'll update the preview live." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const submit = async (text: string) => {
    if (!text.trim() || loading) return;
    if (!html) {
      toast.error("Generate a website first");
      return;
    }
    setMessages(prev => [...prev, { role: "user", content: text }]);
    setInput("");
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("edit-website", {
        body: { html, instruction: text, pageName },
      });
      if (error) throw error;
      if (data?.error) {
        toast.error(data.error);
        setMessages(prev => [...prev, { role: "assistant", content: `Couldn't apply that: ${data.error}` }]);
      } else if (data?.html) {
        onUpdate(data.html);
        setMessages(prev => [...prev, { role: "assistant", content: `Done! Updated ${pageName}.` }]);
        toast.success("Preview updated");
      }
    } catch (e: any) {
      console.error(e);
      toast.error("Edit failed");
      setMessages(prev => [...prev, { role: "assistant", content: "Sorry, that edit failed. Try rephrasing?" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-card border-l border-border">
      <div className="h-12 border-b border-border flex items-center gap-2 px-4">
        <div className="h-7 w-7 rounded-lg gradient-hero flex items-center justify-center">
          <Wand2 className="h-3.5 w-3.5 text-primary-foreground" />
        </div>
        <div>
          <p className="font-semibold text-sm text-foreground">AI Editor</p>
          <p className="text-[10px] text-muted-foreground">Editing: {pageName}</p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-2">
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={`max-w-[90%] rounded-xl px-3 py-2 text-xs ${
              m.role === "user"
                ? "bg-primary text-primary-foreground rounded-br-sm"
                : "bg-muted text-foreground rounded-bl-sm"
            }`}>
              {m.content}
            </div>
          </motion.div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-xl rounded-bl-sm px-3 py-2 flex items-center gap-2 text-xs text-muted-foreground">
              <Loader2 className="h-3 w-3 animate-spin" /> Updating preview…
            </div>
          </div>
        )}

        {messages.length <= 1 && !loading && (
          <div className="pt-2 space-y-1.5">
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground px-1 flex items-center gap-1">
              <Sparkles className="h-2.5 w-2.5" /> Try
            </p>
            {SUGGESTIONS.map(s => (
              <button
                key={s}
                onClick={() => submit(s)}
                className="w-full text-left text-xs px-3 py-2 rounded-lg border border-border bg-background hover:bg-muted transition-colors text-foreground"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-border p-2 flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(input); } }}
          placeholder={html ? "Describe a change…" : "Generate a site first"}
          disabled={loading || !html}
          className="flex-1 px-3 py-2 text-xs rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
        />
        <Button size="sm" onClick={() => submit(input)} disabled={loading || !input.trim() || !html}>
          {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
        </Button>
      </div>
    </div>
  );
}
