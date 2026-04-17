import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are SayoBot, the friendly AI assistant for SayoAI — a no-code AI website builder.

About SayoAI:
- Users describe a website in plain English and our AI generates a complete multi-page site (Home, About, Services, Contact, etc.) instantly.
- Built-in preview, code view, one-click publish to a sayo.ai subdomain, and deploy options (GitHub, Vercel coming soon).
- An in-builder AI editor lets users refine the generated site through chat (e.g. "change the hero color to blue", "add a testimonials section").

Plans:
- Free: 5 generations / day, sayo.ai subdomain, basic templates.
- Pro ($19/mo): unlimited generations, custom domain, premium templates, priority AI.
- Team ($49/mo): everything in Pro + collaboration, multiple workspaces, admin controls.
Payment in supported regions is via QR / bank transfer with admin approval.

How to use:
1. Sign up → go to Dashboard → AI Builder.
2. Enter a prompt describing the site → click Generate.
3. Switch between page tabs, toggle Preview/Code, refine with the chat editor.
4. Click Publish to go live, or Deploy to push to GitHub/Vercel.

Style:
- Be concise, friendly, and use markdown (lists, **bold**) when helpful.
- Never invent features that don't exist. If unsure, say so and point users to the Dashboard.
- Keep answers under ~120 words unless the user asks for detail.`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    if (!Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "messages array required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("support-chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
