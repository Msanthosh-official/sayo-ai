import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { prompt, pageCount } = await req.json();
    if (!prompt || typeof prompt !== "string") {
      return new Response(JSON.stringify({ error: "Prompt is required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const pages = Math.min(Math.max(pageCount || 1, 1), 5);

    const systemPrompt = `You are an expert web designer. Generate a complete, beautiful, production-ready HTML website based on the user's description.

RULES:
- Return ONLY valid JSON array of pages: [{"name": "Page Name", "html": "<!DOCTYPE html>..."}]
- Each page must be a COMPLETE standalone HTML document with embedded CSS and inline styles
- Use modern design: CSS Grid, Flexbox, gradients, shadows, rounded corners, smooth transitions
- Include Google Fonts via <link> tag for typography variety
- Use a cohesive color palette that matches the website's purpose
- Make it responsive with media queries
- Add hover effects, subtle animations with CSS @keyframes
- Include realistic placeholder content (not lorem ipsum)
- Each page should have its own navigation linking to other pages
- Generate ${pages} page(s): typically Home${pages > 1 ? ", About" : ""}${pages > 2 ? ", Services/Products" : ""}${pages > 3 ? ", Contact" : ""}${pages > 4 ? ", Blog/Gallery" : ""}
- Make the design unique and visually stunning - use creative layouts, not generic templates
- Include SVG icons inline where appropriate
- Add a footer with links and copyright
- DO NOT include any JavaScript - only HTML and CSS
- The HTML must render perfectly in an iframe

IMPORTANT: Return ONLY the JSON array, no markdown, no code fences, no explanation.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Create a website for: ${prompt}` },
        ],
        stream: false,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI generation failed" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    let content = data.choices?.[0]?.message?.content || "";

    // Clean up potential markdown fences
    content = content.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();

    let parsedPages;
    try {
      parsedPages = JSON.parse(content);
      if (!Array.isArray(parsedPages)) {
        parsedPages = [{ name: "Home", html: content }];
      }
    } catch {
      // If JSON parse fails, treat the whole thing as HTML
      parsedPages = [{ name: "Home", html: content }];
    }

    // Validate each page has name and html
    parsedPages = parsedPages.map((p: any, i: number) => ({
      name: p.name || `Page ${i + 1}`,
      html: typeof p.html === "string" ? p.html : String(p.html || ""),
    }));

    return new Response(JSON.stringify({ pages: parsedPages }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-website error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
