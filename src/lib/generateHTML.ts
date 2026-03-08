// Advanced AI-quality HTML generator — produces stunning, modern previews

interface TemplateConfig {
  title: string;
  subtitle: string;
  navBrand: string;
  navLinks: string[];
  bgColor: string;
  textColor: string;
  mutedColor: string;
  accentColor: string;
  accentGradient: string;
  cardBg: string;
  borderColor: string;
  heroExtra?: string;
  sections: string;
  fontUrl?: string;
  fontFamily?: string;
}

function extractKeywords(prompt: string): string[] {
  return prompt.toLowerCase().split(/\s+/);
}

function detectTemplate(prompt: string): TemplateConfig {
  const p = prompt.toLowerCase();

  if (p.includes("portfolio") || p.includes("personal") || p.includes("resume") || p.includes("cv")) {
    return {
      navBrand: "Alex Chen",
      navLinks: ["Work", "About", "Skills", "Contact"],
      title: "I design & build<br><span style='background:linear-gradient(135deg,#6366f1,#a855f7,#ec4899);-webkit-background-clip:text;-webkit-text-fill-color:transparent'>digital experiences</span>",
      subtitle: "Full-stack developer and designer crafting beautiful, performant web applications. Currently open for freelance opportunities.",
      bgColor: "#050505",
      textColor: "#f5f5f5",
      mutedColor: "#8b8b8b",
      accentColor: "#6366f1",
      accentGradient: "linear-gradient(135deg, #6366f1, #a855f7, #ec4899)",
      cardBg: "#111111",
      borderColor: "#1e1e1e",
      fontUrl: "https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap",
      fontFamily: "'Sora'",
      heroExtra: `
        <div style="display:flex;gap:16px;margin-top:2.5rem;justify-content:center;flex-wrap:wrap">
          <a href="#work" style="padding:14px 32px;background:linear-gradient(135deg,#6366f1,#a855f7);color:#fff;border-radius:14px;text-decoration:none;font-weight:600;font-size:0.95rem;transition:all 0.3s;box-shadow:0 0 30px rgba(99,102,241,0.3)">View My Work</a>
          <a href="#contact" style="padding:14px 32px;background:rgba(255,255,255,0.06);border:1px solid #2a2a2a;color:#f5f5f5;border-radius:14px;text-decoration:none;font-weight:500;font-size:0.95rem;backdrop-filter:blur(10px)">Get in Touch →</a>
        </div>
        <div style="display:flex;justify-content:center;gap:2.5rem;margin-top:3rem;padding-top:3rem;border-top:1px solid #1e1e1e">
          <div style="text-align:center"><div style="font-size:2rem;font-weight:800;background:linear-gradient(135deg,#6366f1,#a855f7);-webkit-background-clip:text;-webkit-text-fill-color:transparent">50+</div><div style="color:#8b8b8b;font-size:0.8rem;margin-top:2px">Projects</div></div>
          <div style="text-align:center"><div style="font-size:2rem;font-weight:800;background:linear-gradient(135deg,#a855f7,#ec4899);-webkit-background-clip:text;-webkit-text-fill-color:transparent">5yr</div><div style="color:#8b8b8b;font-size:0.8rem;margin-top:2px">Experience</div></div>
          <div style="text-align:center"><div style="font-size:2rem;font-weight:800;background:linear-gradient(135deg,#ec4899,#f43f5e);-webkit-background-clip:text;-webkit-text-fill-color:transparent">30+</div><div style="color:#8b8b8b;font-size:0.8rem;margin-top:2px">Clients</div></div>
        </div>`,
      sections: `
        <section id="work" style="padding:6rem 2rem;max-width:1100px;margin:0 auto">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:3rem"><div style="width:6px;height:6px;border-radius:50%;background:#6366f1"></div><span style="color:#6366f1;font-weight:600;font-size:0.85rem;letter-spacing:0.1em;text-transform:uppercase">Featured Work</span></div>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:2rem">
            <div style="background:#111;border:1px solid #1e1e1e;border-radius:20px;overflow:hidden;transition:transform 0.3s"><div style="height:240px;background:linear-gradient(135deg,#0f172a,#1e1b4b,#312e81);display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden"><div style="width:70%;height:70%;background:#1a1a2e;border-radius:12px;border:1px solid #2a2a4e;display:flex;flex-direction:column;padding:16px;gap:8px"><div style="display:flex;gap:4px"><div style="width:6px;height:6px;border-radius:50%;background:#ef4444"></div><div style="width:6px;height:6px;border-radius:50%;background:#eab308"></div><div style="width:6px;height:6px;border-radius:50%;background:#22c55e"></div></div><div style="flex:1;display:grid;grid-template-columns:1fr 2fr;gap:8px"><div style="background:#252540;border-radius:6px"></div><div style="background:#252540;border-radius:6px"></div></div></div></div><div style="padding:1.75rem"><div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:0.75rem"><h3 style="color:#f5f5f5;font-size:1.2rem;font-weight:600">SaaS Dashboard</h3><span style="color:#6366f1;font-size:0.75rem;background:rgba(99,102,241,0.1);padding:4px 10px;border-radius:6px;border:1px solid rgba(99,102,241,0.2)">2024</span></div><p style="color:#8b8b8b;font-size:0.88rem;line-height:1.65">Full analytics platform with real-time data visualization and team collaboration features.</p><div style="display:flex;gap:6px;margin-top:1.25rem;flex-wrap:wrap"><span style="background:#1a1a1a;color:#8b8b8b;padding:4px 12px;border-radius:8px;font-size:0.75rem;border:1px solid #252525">React</span><span style="background:#1a1a1a;color:#8b8b8b;padding:4px 12px;border-radius:8px;font-size:0.75rem;border:1px solid #252525">TypeScript</span><span style="background:#1a1a1a;color:#8b8b8b;padding:4px 12px;border-radius:8px;font-size:0.75rem;border:1px solid #252525">D3.js</span></div></div></div>
            <div style="background:#111;border:1px solid #1e1e1e;border-radius:20px;overflow:hidden;transition:transform 0.3s"><div style="height:240px;background:linear-gradient(135deg,#064e3b,#065f46,#047857);display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden"><div style="width:60%;height:60%;background:rgba(255,255,255,0.08);border-radius:16px;backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.12);display:flex;align-items:center;justify-content:center;font-size:3rem">🛍️</div></div><div style="padding:1.75rem"><div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:0.75rem"><h3 style="color:#f5f5f5;font-size:1.2rem;font-weight:600">E-Commerce App</h3><span style="color:#10b981;font-size:0.75rem;background:rgba(16,185,129,0.1);padding:4px 10px;border-radius:6px;border:1px solid rgba(16,185,129,0.2)">2024</span></div><p style="color:#8b8b8b;font-size:0.88rem;line-height:1.65">Modern shopping experience with AI-powered recommendations and seamless checkout.</p><div style="display:flex;gap:6px;margin-top:1.25rem;flex-wrap:wrap"><span style="background:#1a1a1a;color:#8b8b8b;padding:4px 12px;border-radius:8px;font-size:0.75rem;border:1px solid #252525">Next.js</span><span style="background:#1a1a1a;color:#8b8b8b;padding:4px 12px;border-radius:8px;font-size:0.75rem;border:1px solid #252525">Stripe</span><span style="background:#1a1a1a;color:#8b8b8b;padding:4px 12px;border-radius:8px;font-size:0.75rem;border:1px solid #252525">Prisma</span></div></div></div>
          </div>
        </section>
        <section style="padding:6rem 2rem;max-width:1100px;margin:0 auto">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:3rem"><div style="width:6px;height:6px;border-radius:50%;background:#a855f7"></div><span style="color:#a855f7;font-weight:600;font-size:0.85rem;letter-spacing:0.1em;text-transform:uppercase">Tech Stack</span></div>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:1rem">
            <div style="background:#111;border:1px solid #1e1e1e;border-radius:16px;padding:1.5rem;text-align:center"><div style="font-size:2rem;margin-bottom:0.5rem">⚛️</div><div style="color:#f5f5f5;font-weight:600;font-size:0.9rem">React</div><div style="color:#8b8b8b;font-size:0.75rem;margin-top:2px">Frontend</div></div>
            <div style="background:#111;border:1px solid #1e1e1e;border-radius:16px;padding:1.5rem;text-align:center"><div style="font-size:2rem;margin-bottom:0.5rem">🔷</div><div style="color:#f5f5f5;font-weight:600;font-size:0.9rem">TypeScript</div><div style="color:#8b8b8b;font-size:0.75rem;margin-top:2px">Language</div></div>
            <div style="background:#111;border:1px solid #1e1e1e;border-radius:16px;padding:1.5rem;text-align:center"><div style="font-size:2rem;margin-bottom:0.5rem">🌊</div><div style="color:#f5f5f5;font-weight:600;font-size:0.9rem">Tailwind</div><div style="color:#8b8b8b;font-size:0.75rem;margin-top:2px">Styling</div></div>
            <div style="background:#111;border:1px solid #1e1e1e;border-radius:16px;padding:1.5rem;text-align:center"><div style="font-size:2rem;margin-bottom:0.5rem">🗄️</div><div style="color:#f5f5f5;font-weight:600;font-size:0.9rem">PostgreSQL</div><div style="color:#8b8b8b;font-size:0.75rem;margin-top:2px">Database</div></div>
            <div style="background:#111;border:1px solid #1e1e1e;border-radius:16px;padding:1.5rem;text-align:center"><div style="font-size:2rem;margin-bottom:0.5rem">🐳</div><div style="color:#f5f5f5;font-weight:600;font-size:0.9rem">Docker</div><div style="color:#8b8b8b;font-size:0.75rem;margin-top:2px">DevOps</div></div>
            <div style="background:#111;border:1px solid #1e1e1e;border-radius:16px;padding:1.5rem;text-align:center"><div style="font-size:2rem;margin-bottom:0.5rem">🔥</div><div style="color:#f5f5f5;font-weight:600;font-size:0.9rem">Node.js</div><div style="color:#8b8b8b;font-size:0.75rem;margin-top:2px">Backend</div></div>
          </div>
        </section>
        <section id="contact" style="padding:5rem 2rem;max-width:600px;margin:0 auto;text-align:center">
          <h2 style="color:#f5f5f5;font-size:2rem;font-weight:700;margin-bottom:0.75rem">Let's work together</h2>
          <p style="color:#8b8b8b;margin-bottom:2.5rem">Have a project in mind? I'd love to hear about it.</p>
          <a href="mailto:hello@alexchen.dev" style="display:inline-block;padding:16px 40px;background:linear-gradient(135deg,#6366f1,#a855f7);color:#fff;border-radius:14px;text-decoration:none;font-weight:600;font-size:1rem;box-shadow:0 0 40px rgba(99,102,241,0.25)">hello@alexchen.dev</a>
        </section>`,
    };
  }

  if (p.includes("landing") || p.includes("startup") || p.includes("saas") || p.includes("app")) {
    return {
      navBrand: "Nexus",
      navLinks: ["Features", "Pricing", "Docs", "Blog"],
      title: "The modern platform<br><span style='background:linear-gradient(135deg,#8b5cf6,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent'>for builders</span>",
      subtitle: "Ship products 10x faster with AI-powered development, real-time collaboration, and one-click deployments.",
      bgColor: "#09090b",
      textColor: "#fafafa",
      mutedColor: "#71717a",
      accentColor: "#8b5cf6",
      accentGradient: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
      cardBg: "#18181b",
      borderColor: "#27272a",
      fontUrl: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap",
      fontFamily: "'Plus Jakarta Sans'",
      heroExtra: `
        <div style="display:flex;gap:16px;margin-top:2.5rem;justify-content:center;flex-wrap:wrap">
          <a href="#" style="padding:15px 36px;background:linear-gradient(135deg,#8b5cf6,#06b6d4);color:#fff;border-radius:14px;text-decoration:none;font-weight:700;font-size:1rem;box-shadow:0 4px 30px rgba(139,92,246,0.4);letter-spacing:-0.01em">Start Free Trial</a>
          <a href="#" style="padding:15px 36px;background:rgba(255,255,255,0.05);border:1px solid #27272a;color:#fafafa;border-radius:14px;text-decoration:none;font-weight:500;font-size:1rem;backdrop-filter:blur(12px)">Watch Demo <span style="margin-left:4px">→</span></a>
        </div>
        <div style="margin-top:3rem;display:flex;justify-content:center;gap:1rem;align-items:center;color:#71717a;font-size:0.85rem"><span>Trusted by 10,000+ developers</span></div>
        <div style="margin-top:4rem;background:#111113;border:1px solid #27272a;border-radius:20px;max-width:900px;margin-left:auto;margin-right:auto;overflow:hidden;box-shadow:0 25px 80px rgba(0,0,0,0.5)">
          <div style="padding:14px 18px;border-bottom:1px solid #27272a;display:flex;align-items:center;gap:8px"><div style="display:flex;gap:6px"><div style="width:12px;height:12px;border-radius:50%;background:#ef4444"></div><div style="width:12px;height:12px;border-radius:50%;background:#eab308"></div><div style="width:12px;height:12px;border-radius:50%;background:#22c55e"></div></div><div style="flex:1;text-align:center;color:#52525b;font-size:0.8rem">nexus.app/dashboard</div></div>
          <div style="display:grid;grid-template-columns:200px 1fr;height:350px">
            <div style="border-right:1px solid #27272a;padding:16px;display:flex;flex-direction:column;gap:4px">
              <div style="padding:8px 12px;background:rgba(139,92,246,0.1);border-radius:8px;color:#8b5cf6;font-size:0.8rem;font-weight:500">Dashboard</div>
              <div style="padding:8px 12px;color:#52525b;font-size:0.8rem">Analytics</div>
              <div style="padding:8px 12px;color:#52525b;font-size:0.8rem">Projects</div>
              <div style="padding:8px 12px;color:#52525b;font-size:0.8rem">Settings</div>
            </div>
            <div style="padding:20px;display:flex;flex-direction:column;gap:16px">
              <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px">
                <div style="background:#1a1a1f;border:1px solid #27272a;border-radius:12px;padding:16px"><div style="color:#52525b;font-size:0.75rem;margin-bottom:4px">Revenue</div><div style="color:#fafafa;font-size:1.5rem;font-weight:700">$48.2k</div><div style="color:#22c55e;font-size:0.75rem;margin-top:4px">↑ 12.5%</div></div>
                <div style="background:#1a1a1f;border:1px solid #27272a;border-radius:12px;padding:16px"><div style="color:#52525b;font-size:0.75rem;margin-bottom:4px">Users</div><div style="color:#fafafa;font-size:1.5rem;font-weight:700">2,847</div><div style="color:#22c55e;font-size:0.75rem;margin-top:4px">↑ 8.3%</div></div>
                <div style="background:#1a1a1f;border:1px solid #27272a;border-radius:12px;padding:16px"><div style="color:#52525b;font-size:0.75rem;margin-bottom:4px">Deploys</div><div style="color:#fafafa;font-size:1.5rem;font-weight:700">342</div><div style="color:#06b6d4;font-size:0.75rem;margin-top:4px">↑ 24.1%</div></div>
              </div>
              <div style="flex:1;background:#1a1a1f;border:1px solid #27272a;border-radius:12px;position:relative;overflow:hidden"><svg viewBox="0 0 400 120" style="width:100%;height:100%;position:absolute;bottom:0"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.3"/><stop offset="100%" stop-color="#8b5cf6" stop-opacity="0"/></linearGradient></defs><path d="M0 100 Q50 80 100 70 T200 50 T300 30 T400 20 L400 120 L0 120Z" fill="url(#g)"/><path d="M0 100 Q50 80 100 70 T200 50 T300 30 T400 20" fill="none" stroke="#8b5cf6" stroke-width="2"/></svg></div>
            </div>
          </div>
        </div>`,
      sections: `
        <section style="padding:7rem 2rem;max-width:1100px;margin:0 auto">
          <div style="text-align:center;margin-bottom:4rem"><span style="color:#8b5cf6;font-weight:600;font-size:0.85rem;letter-spacing:0.1em;text-transform:uppercase;display:block;margin-bottom:0.75rem">Features</span><h2 style="font-size:2.5rem;font-weight:800;color:#fafafa;letter-spacing:-0.03em">Everything you need,<br>nothing you don't</h2></div>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:1.5rem">
            <div style="background:#111113;border:1px solid #27272a;border-radius:20px;padding:2.5rem;transition:border-color 0.3s"><div style="width:52px;height:52px;background:linear-gradient(135deg,rgba(139,92,246,0.2),rgba(6,182,212,0.2));border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:1.5rem;margin-bottom:1.5rem;border:1px solid rgba(139,92,246,0.2)">⚡</div><h3 style="color:#fafafa;font-size:1.2rem;font-weight:700;margin-bottom:0.75rem;letter-spacing:-0.01em">Lightning Fast</h3><p style="color:#71717a;font-size:0.92rem;line-height:1.75">Sub-100ms response times with edge computing and intelligent caching. Your users will feel the difference.</p></div>
            <div style="background:#111113;border:1px solid #27272a;border-radius:20px;padding:2.5rem;transition:border-color 0.3s"><div style="width:52px;height:52px;background:linear-gradient(135deg,rgba(6,182,212,0.2),rgba(34,197,94,0.2));border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:1.5rem;margin-bottom:1.5rem;border:1px solid rgba(6,182,212,0.2)">🔒</div><h3 style="color:#fafafa;font-size:1.2rem;font-weight:700;margin-bottom:0.75rem;letter-spacing:-0.01em">Enterprise Security</h3><p style="color:#71717a;font-size:0.92rem;line-height:1.75">SOC 2 Type II compliant. End-to-end encryption, SSO, and role-based access out of the box.</p></div>
            <div style="background:#111113;border:1px solid #27272a;border-radius:20px;padding:2.5rem;transition:border-color 0.3s"><div style="width:52px;height:52px;background:linear-gradient(135deg,rgba(244,63,94,0.2),rgba(251,146,60,0.2));border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:1.5rem;margin-bottom:1.5rem;border:1px solid rgba(244,63,94,0.2)">🤖</div><h3 style="color:#fafafa;font-size:1.2rem;font-weight:700;margin-bottom:0.75rem;letter-spacing:-0.01em">AI-Powered</h3><p style="color:#71717a;font-size:0.92rem;line-height:1.75">Built-in AI assistant that understands your codebase. Get intelligent suggestions and auto-fixes.</p></div>
          </div>
        </section>
        <section style="padding:6rem 2rem;background:#0c0c0e">
          <div style="max-width:1000px;margin:0 auto;text-align:center">
            <span style="color:#06b6d4;font-weight:600;font-size:0.85rem;letter-spacing:0.1em;text-transform:uppercase;display:block;margin-bottom:0.75rem">Pricing</span>
            <h2 style="font-size:2.5rem;font-weight:800;color:#fafafa;margin-bottom:4rem;letter-spacing:-0.03em">Start free, scale infinitely</h2>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.5rem;max-width:950px;margin:0 auto">
              <div style="background:#111113;border:1px solid #27272a;border-radius:20px;padding:3rem;text-align:left"><h3 style="color:#fafafa;font-weight:700;font-size:1.1rem">Starter</h3><p style="color:#71717a;font-size:0.85rem;margin:0.5rem 0 1.5rem">Perfect for side projects</p><div style="margin-bottom:2rem"><span style="font-size:3rem;font-weight:800;color:#fafafa;letter-spacing:-0.03em">$0</span><span style="color:#71717a;font-size:0.9rem">/month</span></div><ul style="list-style:none;padding:0;margin:0 0 2rem;display:flex;flex-direction:column;gap:12px"><li style="color:#a1a1aa;font-size:0.88rem;display:flex;align-items:center;gap:8px"><span style="color:#22c55e">✓</span> 3 projects</li><li style="color:#a1a1aa;font-size:0.88rem;display:flex;align-items:center;gap:8px"><span style="color:#22c55e">✓</span> AI generation</li><li style="color:#a1a1aa;font-size:0.88rem;display:flex;align-items:center;gap:8px"><span style="color:#22c55e">✓</span> Community support</li></ul><a href="#" style="display:block;text-align:center;padding:14px;border:1px solid #27272a;border-radius:12px;color:#fafafa;text-decoration:none;font-weight:600;font-size:0.92rem">Get Started</a></div>
              <div style="background:#111113;border:2px solid #8b5cf6;border-radius:20px;padding:3rem;text-align:left;position:relative;box-shadow:0 0 60px rgba(139,92,246,0.15)"><div style="position:absolute;top:-14px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#8b5cf6,#06b6d4);color:#fff;font-size:0.75rem;font-weight:700;padding:6px 20px;border-radius:100px;letter-spacing:0.02em">POPULAR</div><h3 style="color:#fafafa;font-weight:700;font-size:1.1rem">Pro</h3><p style="color:#71717a;font-size:0.85rem;margin:0.5rem 0 1.5rem">For serious builders</p><div style="margin-bottom:2rem"><span style="font-size:3rem;font-weight:800;color:#fafafa;letter-spacing:-0.03em">$29</span><span style="color:#71717a;font-size:0.9rem">/month</span></div><ul style="list-style:none;padding:0;margin:0 0 2rem;display:flex;flex-direction:column;gap:12px"><li style="color:#a1a1aa;font-size:0.88rem;display:flex;align-items:center;gap:8px"><span style="color:#22c55e">✓</span> Unlimited projects</li><li style="color:#a1a1aa;font-size:0.88rem;display:flex;align-items:center;gap:8px"><span style="color:#22c55e">✓</span> GitHub integration</li><li style="color:#a1a1aa;font-size:0.88rem;display:flex;align-items:center;gap:8px"><span style="color:#22c55e">✓</span> Custom domains</li><li style="color:#a1a1aa;font-size:0.88rem;display:flex;align-items:center;gap:8px"><span style="color:#22c55e">✓</span> Priority support</li></ul><a href="#" style="display:block;text-align:center;padding:14px;background:linear-gradient(135deg,#8b5cf6,#06b6d4);border-radius:12px;color:#fff;text-decoration:none;font-weight:700;font-size:0.92rem;box-shadow:0 4px 20px rgba(139,92,246,0.3)">Start Free Trial</a></div>
              <div style="background:#111113;border:1px solid #27272a;border-radius:20px;padding:3rem;text-align:left"><h3 style="color:#fafafa;font-weight:700;font-size:1.1rem">Enterprise</h3><p style="color:#71717a;font-size:0.85rem;margin:0.5rem 0 1.5rem">Custom solutions</p><div style="margin-bottom:2rem"><span style="font-size:3rem;font-weight:800;color:#fafafa;letter-spacing:-0.03em">Custom</span></div><ul style="list-style:none;padding:0;margin:0 0 2rem;display:flex;flex-direction:column;gap:12px"><li style="color:#a1a1aa;font-size:0.88rem;display:flex;align-items:center;gap:8px"><span style="color:#22c55e">✓</span> Everything in Pro</li><li style="color:#a1a1aa;font-size:0.88rem;display:flex;align-items:center;gap:8px"><span style="color:#22c55e">✓</span> SSO & SAML</li><li style="color:#a1a1aa;font-size:0.88rem;display:flex;align-items:center;gap:8px"><span style="color:#22c55e">✓</span> Dedicated support</li><li style="color:#a1a1aa;font-size:0.88rem;display:flex;align-items:center;gap:8px"><span style="color:#22c55e">✓</span> SLA guarantee</li></ul><a href="#" style="display:block;text-align:center;padding:14px;border:1px solid #27272a;border-radius:12px;color:#fafafa;text-decoration:none;font-weight:600;font-size:0.92rem">Contact Sales</a></div>
            </div>
          </div>
        </section>`,
    };
  }

  if (p.includes("blog") || p.includes("article") || p.includes("magazine") || p.includes("news")) {
    return {
      navBrand: "Chronicle",
      navLinks: ["Latest", "Technology", "Design", "Culture"],
      title: "Stories that<br><span style='background:linear-gradient(135deg,#f59e0b,#ef4444);-webkit-background-clip:text;-webkit-text-fill-color:transparent'>inspire action</span>",
      subtitle: "Deep explorations of technology, design thinking, and the future of digital products. Written by builders, for builders.",
      bgColor: "#faf9f7",
      textColor: "#1a1a1a",
      mutedColor: "#6b6b6b",
      accentColor: "#ef4444",
      accentGradient: "linear-gradient(135deg, #ef4444, #f59e0b)",
      cardBg: "#ffffff",
      borderColor: "#ebebeb",
      fontUrl: "https://fonts.googleapis.com/css2?family=Fraunces:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600&display=swap",
      fontFamily: "'Inter'",
      sections: `
        <section style="padding:5rem 2rem;max-width:1000px;margin:0 auto">
          <article style="display:grid;grid-template-columns:1.2fr 1fr;gap:0;background:#fff;border:1px solid #ebebeb;border-radius:24px;overflow:hidden;margin-bottom:3rem;box-shadow:0 4px 30px rgba(0,0,0,0.04)">
            <div style="background:linear-gradient(135deg,#fef3c7,#fde68a,#fbbf24);min-height:360px;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden"><div style="font-size:5rem;opacity:0.8">🚀</div><div style="position:absolute;bottom:20px;left:20px;background:rgba(0,0,0,0.7);color:#fff;padding:6px 14px;border-radius:8px;font-size:0.75rem;font-weight:600;backdrop-filter:blur(8px)">Featured</div></div>
            <div style="padding:3rem;display:flex;flex-direction:column;justify-content:center"><div style="display:flex;gap:8px;margin-bottom:1rem"><span style="background:#fef3c7;color:#92400e;padding:4px 12px;border-radius:8px;font-size:0.75rem;font-weight:600">Technology</span><span style="color:#6b6b6b;font-size:0.8rem;display:flex;align-items:center">Mar 8, 2026</span></div><h2 style="font-family:'Fraunces',serif;font-size:1.75rem;font-weight:800;color:#1a1a1a;line-height:1.3;margin-bottom:1rem;letter-spacing:-0.02em">The Future of AI-Powered Development Tools</h2><p style="color:#6b6b6b;font-size:0.95rem;line-height:1.8;margin-bottom:1.5rem">An in-depth look at how machine learning is fundamentally reshaping the way developers write, review, and ship code at scale...</p><div style="display:flex;align-items:center;gap:12px"><div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#8b5cf6)"></div><div><div style="color:#1a1a1a;font-weight:600;font-size:0.85rem">Sarah Chen</div><div style="color:#9b9b9b;font-size:0.75rem">8 min read</div></div></div></div>
          </article>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:2rem">
            <article style="background:#fff;border:1px solid #ebebeb;border-radius:20px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.03)"><div style="height:200px;background:linear-gradient(135deg,#dbeafe,#93c5fd,#3b82f6);position:relative"><div style="position:absolute;bottom:12px;left:12px;background:rgba(255,255,255,0.9);padding:4px 10px;border-radius:6px;font-size:0.7rem;font-weight:600;color:#1e40af;backdrop-filter:blur(8px)">Design</div></div><div style="padding:1.75rem"><h3 style="font-family:'Fraunces',serif;font-size:1.15rem;font-weight:700;color:#1a1a1a;margin-bottom:0.5rem;letter-spacing:-0.01em">The Art of Visual Hierarchy</h3><p style="color:#6b6b6b;font-size:0.88rem;line-height:1.7;margin-bottom:1rem">Master the principles that guide users' eyes through your design with intention and clarity.</p><div style="display:flex;justify-content:space-between;align-items:center"><span style="color:#9b9b9b;font-size:0.78rem">5 min read</span><span style="color:#ef4444;font-size:0.78rem;font-weight:600">Read →</span></div></div></article>
            <article style="background:#fff;border:1px solid #ebebeb;border-radius:20px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.03)"><div style="height:200px;background:linear-gradient(135deg,#d1fae5,#6ee7b7,#10b981);position:relative"><div style="position:absolute;bottom:12px;left:12px;background:rgba(255,255,255,0.9);padding:4px 10px;border-radius:6px;font-size:0.7rem;font-weight:600;color:#065f46;backdrop-filter:blur(8px)">Startup</div></div><div style="padding:1.75rem"><h3 style="font-family:'Fraunces',serif;font-size:1.15rem;font-weight:700;color:#1a1a1a;margin-bottom:0.5rem;letter-spacing:-0.01em">From Zero to MVP in 48 Hours</h3><p style="color:#6b6b6b;font-size:0.88rem;line-height:1.7;margin-bottom:1rem">A practical guide to rapid prototyping using modern tools and AI-assisted development.</p><div style="display:flex;justify-content:space-between;align-items:center"><span style="color:#9b9b9b;font-size:0.78rem">7 min read</span><span style="color:#ef4444;font-size:0.78rem;font-weight:600">Read →</span></div></div></article>
            <article style="background:#fff;border:1px solid #ebebeb;border-radius:20px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.03)"><div style="height:200px;background:linear-gradient(135deg,#fce7f3,#f9a8d4,#ec4899);position:relative"><div style="position:absolute;bottom:12px;left:12px;background:rgba(255,255,255,0.9);padding:4px 10px;border-radius:6px;font-size:0.7rem;font-weight:600;color:#9d174d;backdrop-filter:blur(8px)">Culture</div></div><div style="padding:1.75rem"><h3 style="font-family:'Fraunces',serif;font-size:1.15rem;font-weight:700;color:#1a1a1a;margin-bottom:0.5rem;letter-spacing:-0.01em">Remote Work is Not the Future</h3><p style="color:#6b6b6b;font-size:0.88rem;line-height:1.7;margin-bottom:1rem">Why hybrid work models are winning, and what this means for your team's productivity.</p><div style="display:flex;justify-content:space-between;align-items:center"><span style="color:#9b9b9b;font-size:0.78rem">4 min read</span><span style="color:#ef4444;font-size:0.78rem;font-weight:600">Read →</span></div></div></article>
          </div>
        </section>
        <section style="padding:5rem 2rem;background:#1a1a1a;margin-top:3rem">
          <div style="max-width:600px;margin:0 auto;text-align:center"><h2 style="font-family:'Fraunces',serif;color:#fafafa;font-size:2rem;font-weight:800;margin-bottom:1rem">Stay in the loop</h2><p style="color:#9b9b9b;margin-bottom:2rem;font-size:0.95rem">Get the best stories delivered to your inbox every week.</p><div style="display:flex;gap:12px;max-width:440px;margin:0 auto"><input type="email" placeholder="your@email.com" style="flex:1;padding:14px 18px;background:#2a2a2a;border:1px solid #3a3a3a;border-radius:12px;color:#fafafa;font-size:0.92rem;outline:none;font-family:inherit" /><button style="padding:14px 28px;background:linear-gradient(135deg,#ef4444,#f59e0b);color:#fff;border:none;border-radius:12px;font-weight:700;font-size:0.92rem;cursor:pointer">Subscribe</button></div></div>
        </section>`,
    };
  }

  if (p.includes("ecommerce") || p.includes("e-commerce") || p.includes("shop") || p.includes("store")) {
    return {
      navBrand: "MAISON",
      navLinks: ["New In", "Collections", "Sale", "About"],
      title: "Redefine your<br><span style='background:linear-gradient(135deg,#b8860b,#d4a574);-webkit-background-clip:text;-webkit-text-fill-color:transparent'>everyday luxury</span>",
      subtitle: "Curated collections crafted with purpose. Sustainable materials, timeless design, exceptional quality.",
      bgColor: "#fafaf8",
      textColor: "#1a1a1a",
      mutedColor: "#7a7a7a",
      accentColor: "#1a1a1a",
      accentGradient: "linear-gradient(135deg, #1a1a1a, #4a4a4a)",
      cardBg: "#ffffff",
      borderColor: "#e8e8e5",
      fontUrl: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap",
      fontFamily: "'Inter'",
      heroExtra: `
        <div style="display:flex;gap:16px;margin-top:2.5rem;justify-content:center;flex-wrap:wrap">
          <a href="#" style="padding:16px 40px;background:#1a1a1a;color:#fafafa;border-radius:0;text-decoration:none;font-weight:600;font-size:0.85rem;letter-spacing:0.1em;text-transform:uppercase">Shop Collection</a>
          <a href="#" style="padding:16px 40px;border:1.5px solid #1a1a1a;color:#1a1a1a;border-radius:0;text-decoration:none;font-weight:500;font-size:0.85rem;letter-spacing:0.1em;text-transform:uppercase">Our Story</a>
        </div>`,
      sections: `
        <section style="padding:6rem 2rem;max-width:1200px;margin:0 auto">
          <div style="display:flex;justify-content:space-between;align-items:end;margin-bottom:3rem"><div><span style="color:#b8860b;font-weight:600;font-size:0.8rem;letter-spacing:0.15em;text-transform:uppercase;display:block;margin-bottom:0.5rem">New Arrivals</span><h2 style="font-family:'Cormorant Garamond',serif;font-size:2.5rem;font-weight:600;color:#1a1a1a;letter-spacing:-0.02em">Curated for You</h2></div><a href="#" style="color:#7a7a7a;font-size:0.85rem;text-decoration:none;border-bottom:1px solid #7a7a7a;padding-bottom:2px">View All →</a></div>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:2rem">
            <div style="cursor:pointer"><div style="aspect-ratio:3/4;background:linear-gradient(180deg,#f0ede8,#e8e4dd);border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:5rem;margin-bottom:1.25rem;position:relative;overflow:hidden"><span>🧥</span><div style="position:absolute;top:16px;left:16px;background:#1a1a1a;color:#fafafa;padding:4px 12px;font-size:0.7rem;font-weight:600;letter-spacing:0.05em">NEW</div></div><h3 style="color:#1a1a1a;font-weight:500;font-size:0.95rem;margin-bottom:0.25rem">Wool Blend Overcoat</h3><p style="color:#7a7a7a;font-size:0.85rem;margin-bottom:0.5rem">Italian wool · Camel</p><p style="color:#1a1a1a;font-weight:600;font-size:1rem">$485.00</p></div>
            <div style="cursor:pointer"><div style="aspect-ratio:3/4;background:linear-gradient(180deg,#ebe8e2,#ddd8d0);border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:5rem;margin-bottom:1.25rem"><span>👜</span></div><h3 style="color:#1a1a1a;font-weight:500;font-size:0.95rem;margin-bottom:0.25rem">Leather Tote Bag</h3><p style="color:#7a7a7a;font-size:0.85rem;margin-bottom:0.5rem">Full grain leather · Cognac</p><p style="color:#1a1a1a;font-weight:600;font-size:1rem">$320.00</p></div>
            <div style="cursor:pointer"><div style="aspect-ratio:3/4;background:linear-gradient(180deg,#e8e5e0,#d5d0c8);border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:5rem;margin-bottom:1.25rem"><span>👟</span></div><h3 style="color:#1a1a1a;font-weight:500;font-size:0.95rem;margin-bottom:0.25rem">Suede Chelsea Boots</h3><p style="color:#7a7a7a;font-size:0.85rem;margin-bottom:0.5rem">Spanish suede · Sand</p><p style="color:#1a1a1a;font-weight:600;font-size:1rem">$265.00</p></div>
            <div style="cursor:pointer"><div style="aspect-ratio:3/4;background:linear-gradient(180deg,#e5e2dc,#d0ccc4);border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:5rem;margin-bottom:1.25rem;position:relative"><span>⌚</span><div style="position:absolute;top:16px;left:16px;background:#b8860b;color:#fff;padding:4px 12px;font-size:0.7rem;font-weight:600;letter-spacing:0.05em">BESTSELLER</div></div><h3 style="color:#1a1a1a;font-weight:500;font-size:0.95rem;margin-bottom:0.25rem">Minimalist Watch</h3><p style="color:#7a7a7a;font-size:0.85rem;margin-bottom:0.5rem">Swiss movement · Mesh band</p><p style="color:#1a1a1a;font-weight:600;font-size:1rem">$195.00</p></div>
          </div>
        </section>
        <section style="background:#1a1a1a;padding:6rem 2rem;margin-top:2rem">
          <div style="max-width:800px;margin:0 auto;text-align:center"><h2 style="font-family:'Cormorant Garamond',serif;color:#fafafa;font-size:2.5rem;font-weight:600;margin-bottom:1rem">Join the Maison</h2><p style="color:#9b9b9b;font-size:1rem;line-height:1.8;margin-bottom:2.5rem">Subscribe for early access to new collections, exclusive offers, and styling inspiration.</p><div style="display:flex;gap:0;max-width:480px;margin:0 auto"><input type="email" placeholder="Enter your email" style="flex:1;padding:16px 20px;background:#2a2a2a;border:1px solid #3a3a3a;border-right:none;color:#fafafa;font-size:0.9rem;outline:none;font-family:inherit" /><button style="padding:16px 32px;background:#fafafa;color:#1a1a1a;border:none;font-weight:600;font-size:0.85rem;letter-spacing:0.05em;cursor:pointer;text-transform:uppercase">Subscribe</button></div></div>
        </section>`,
    };
  }

  if (p.includes("restaurant") || p.includes("food") || p.includes("cafe") || p.includes("menu")) {
    return {
      navBrand: "Ember & Oak",
      navLinks: ["Menu", "Reservations", "Story", "Events"],
      title: "Where fire meets<br><span style='background:linear-gradient(135deg,#dc2626,#ea580c,#f59e0b);-webkit-background-clip:text;-webkit-text-fill-color:transparent'>flavor</span>",
      subtitle: "Wood-fired cuisine crafted with locally sourced ingredients. An unforgettable dining experience in the heart of downtown.",
      bgColor: "#0f0d0a",
      textColor: "#f5f0e8",
      mutedColor: "#9c9588",
      accentColor: "#dc2626",
      accentGradient: "linear-gradient(135deg, #dc2626, #ea580c, #f59e0b)",
      cardBg: "#1a1714",
      borderColor: "#2a2520",
      fontUrl: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600&display=swap",
      fontFamily: "'Inter'",
      heroExtra: `
        <div style="display:flex;gap:16px;margin-top:2.5rem;justify-content:center;flex-wrap:wrap">
          <a href="#" style="padding:16px 36px;background:linear-gradient(135deg,#dc2626,#ea580c);color:#fff;border-radius:0;text-decoration:none;font-weight:600;font-size:0.85rem;letter-spacing:0.12em;text-transform:uppercase;box-shadow:0 4px 30px rgba(220,38,38,0.3)">Reserve a Table</a>
          <a href="#menu" style="padding:16px 36px;border:1px solid #3a3530;color:#f5f0e8;border-radius:0;text-decoration:none;font-weight:500;font-size:0.85rem;letter-spacing:0.12em;text-transform:uppercase">View Menu</a>
        </div>
        <div style="display:flex;justify-content:center;gap:3rem;margin-top:4rem;padding-top:3rem;border-top:1px solid #2a2520">
          <div style="text-align:center"><div style="font-family:'Playfair Display',serif;font-size:2.5rem;font-weight:700;color:#f5f0e8">4.9</div><div style="color:#f59e0b;font-size:0.85rem;letter-spacing:2px">★★★★★</div><div style="color:#9c9588;font-size:0.75rem;margin-top:4px">500+ reviews</div></div>
          <div style="width:1px;background:#2a2520"></div>
          <div style="text-align:center"><div style="font-family:'Playfair Display',serif;font-size:2.5rem;font-weight:700;color:#f5f0e8">12</div><div style="color:#9c9588;font-size:0.75rem;margin-top:4px">Years of excellence</div></div>
          <div style="width:1px;background:#2a2520"></div>
          <div style="text-align:center"><div style="font-family:'Playfair Display',serif;font-size:2.5rem;font-weight:700;color:#f5f0e8">🏆</div><div style="color:#9c9588;font-size:0.75rem;margin-top:4px">Michelin Guide</div></div>
        </div>`,
      sections: `
        <section id="menu" style="padding:6rem 2rem;max-width:900px;margin:0 auto">
          <div style="text-align:center;margin-bottom:4rem"><span style="color:#dc2626;font-weight:600;font-size:0.8rem;letter-spacing:0.15em;text-transform:uppercase;display:block;margin-bottom:0.75rem">From Our Kitchen</span><h2 style="font-family:'Playfair Display',serif;font-size:2.5rem;font-weight:700;color:#f5f0e8">Signature Dishes</h2></div>
          <div style="display:flex;flex-direction:column;gap:1px;background:#2a2520;border-radius:20px;overflow:hidden">
            <div style="display:flex;justify-content:space-between;align-items:center;padding:2rem 2.5rem;background:#1a1714"><div style="flex:1"><div style="display:flex;align-items:center;gap:12px;margin-bottom:0.5rem"><h3 style="color:#f5f0e8;font-family:'Playfair Display',serif;font-weight:700;font-size:1.2rem">Wagyu Ribeye</h3><span style="background:linear-gradient(135deg,#dc2626,#ea580c);color:#fff;padding:3px 10px;border-radius:4px;font-size:0.65rem;font-weight:700;letter-spacing:0.05em">CHEF'S PICK</span></div><p style="color:#9c9588;font-size:0.88rem;line-height:1.6">A5 Japanese wagyu · wood-fired · bone marrow butter · seasonal vegetables</p></div><span style="color:#f5f0e8;font-family:'Playfair Display',serif;font-size:1.5rem;font-weight:700;margin-left:2rem">$68</span></div>
            <div style="display:flex;justify-content:space-between;align-items:center;padding:2rem 2.5rem;background:#1a1714"><div style="flex:1"><h3 style="color:#f5f0e8;font-family:'Playfair Display',serif;font-weight:700;font-size:1.2rem;margin-bottom:0.5rem">Lobster Risotto</h3><p style="color:#9c9588;font-size:0.88rem;line-height:1.6">Maine lobster tail · saffron arborio · truffle oil · micro herbs</p></div><span style="color:#f5f0e8;font-family:'Playfair Display',serif;font-size:1.5rem;font-weight:700;margin-left:2rem">$45</span></div>
            <div style="display:flex;justify-content:space-between;align-items:center;padding:2rem 2.5rem;background:#1a1714"><div style="flex:1"><h3 style="color:#f5f0e8;font-family:'Playfair Display',serif;font-weight:700;font-size:1.2rem;margin-bottom:0.5rem">Duck Confit</h3><p style="color:#9c9588;font-size:0.88rem;line-height:1.6">24-hour confit · cherry gastrique · roasted root vegetables · crispy skin</p></div><span style="color:#f5f0e8;font-family:'Playfair Display',serif;font-size:1.5rem;font-weight:700;margin-left:2rem">$38</span></div>
            <div style="display:flex;justify-content:space-between;align-items:center;padding:2rem 2.5rem;background:#1a1714"><div style="flex:1"><h3 style="color:#f5f0e8;font-family:'Playfair Display',serif;font-weight:700;font-size:1.2rem;margin-bottom:0.5rem">Pan-Seared Scallops</h3><p style="color:#9c9588;font-size:0.88rem;line-height:1.6">Hokkaido scallops · cauliflower purée · brown butter · capers</p></div><span style="color:#f5f0e8;font-family:'Playfair Display',serif;font-size:1.5rem;font-weight:700;margin-left:2rem">$42</span></div>
          </div>
        </section>
        <section style="padding:5rem 2rem;background:#1a1714;margin-top:2rem">
          <div style="max-width:700px;margin:0 auto;text-align:center"><h2 style="font-family:'Playfair Display',serif;color:#f5f0e8;font-size:2rem;font-weight:700;margin-bottom:0.75rem">Reserve Your Evening</h2><p style="color:#9c9588;margin-bottom:0.5rem;font-size:0.95rem">Tuesday – Sunday · 5:00 PM – 11:00 PM</p><p style="color:#9c9588;margin-bottom:2.5rem;font-size:0.88rem">224 Oak Street, Downtown</p><a href="#" style="display:inline-block;padding:18px 48px;background:linear-gradient(135deg,#dc2626,#ea580c);color:#fff;text-decoration:none;font-weight:700;font-size:0.85rem;letter-spacing:0.12em;text-transform:uppercase;box-shadow:0 4px 30px rgba(220,38,38,0.3)">Book a Table</a></div>
        </section>`,
    };
  }

  // Enhanced default / generic template
  const words = prompt.trim().split(/\s+/);
  const brandName = words.slice(0, 2).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join("");
  return {
    navBrand: brandName || "Sayo",
    navLinks: ["Features", "About", "Pricing", "Contact"],
    title: `Build something<br><span style='background:linear-gradient(135deg,#dc2626,#f59e0b);-webkit-background-clip:text;-webkit-text-fill-color:transparent'>extraordinary</span>`,
    subtitle: prompt.length > 100 ? prompt.slice(0, 100) + "..." : prompt || "Transform your ideas into reality with cutting-edge technology and beautiful design.",
    bgColor: "#09090b",
    textColor: "#fafafa",
    mutedColor: "#71717a",
    accentColor: "#dc2626",
    accentGradient: "linear-gradient(135deg, #dc2626, #f59e0b)",
    cardBg: "#18181b",
    borderColor: "#27272a",
    fontUrl: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap",
    fontFamily: "'Plus Jakarta Sans'",
    heroExtra: `
      <div style="display:flex;gap:16px;margin-top:2.5rem;justify-content:center;flex-wrap:wrap">
        <a href="#" style="padding:15px 36px;background:linear-gradient(135deg,#dc2626,#f59e0b);color:#fff;border-radius:14px;text-decoration:none;font-weight:700;font-size:1rem;box-shadow:0 4px 30px rgba(220,38,38,0.3)">Get Started Free</a>
        <a href="#" style="padding:15px 36px;background:rgba(255,255,255,0.05);border:1px solid #27272a;color:#fafafa;border-radius:14px;text-decoration:none;font-weight:500;font-size:1rem;backdrop-filter:blur(12px)">Learn More →</a>
      </div>`,
    sections: `
      <section style="padding:7rem 2rem;max-width:1100px;margin:0 auto">
        <div style="text-align:center;margin-bottom:4rem"><span style="color:#dc2626;font-weight:600;font-size:0.85rem;letter-spacing:0.1em;text-transform:uppercase;display:block;margin-bottom:0.75rem">Why Choose Us</span><h2 style="font-size:2.5rem;font-weight:800;color:#fafafa;letter-spacing:-0.03em">Built for the modern web</h2></div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:1.5rem">
          <div style="background:#111113;border:1px solid #27272a;border-radius:20px;padding:2.5rem"><div style="width:52px;height:52px;background:linear-gradient(135deg,rgba(220,38,38,0.2),rgba(245,158,11,0.2));border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:1.5rem;margin-bottom:1.5rem;border:1px solid rgba(220,38,38,0.2)">✨</div><h3 style="color:#fafafa;font-size:1.2rem;font-weight:700;margin-bottom:0.75rem">AI-Powered</h3><p style="color:#71717a;font-size:0.92rem;line-height:1.75">Intelligent automation that adapts to your needs and delivers exceptional results every time.</p></div>
          <div style="background:#111113;border:1px solid #27272a;border-radius:20px;padding:2.5rem"><div style="width:52px;height:52px;background:linear-gradient(135deg,rgba(245,158,11,0.2),rgba(34,197,94,0.2));border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:1.5rem;margin-bottom:1.5rem;border:1px solid rgba(245,158,11,0.2)">🚀</div><h3 style="color:#fafafa;font-size:1.2rem;font-weight:700;margin-bottom:0.75rem">Lightning Fast</h3><p style="color:#71717a;font-size:0.92rem;line-height:1.75">Optimized performance with edge computing for sub-second response times globally.</p></div>
          <div style="background:#111113;border:1px solid #27272a;border-radius:20px;padding:2.5rem"><div style="width:52px;height:52px;background:linear-gradient(135deg,rgba(34,197,94,0.2),rgba(6,182,212,0.2));border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:1.5rem;margin-bottom:1.5rem;border:1px solid rgba(34,197,94,0.2)">🔒</div><h3 style="color:#fafafa;font-size:1.2rem;font-weight:700;margin-bottom:0.75rem">Secure by Default</h3><p style="color:#71717a;font-size:0.92rem;line-height:1.75">Enterprise-grade security with encryption, SSO, and compliance built right in.</p></div>
        </div>
      </section>
      <section style="padding:5rem 2rem;background:#0c0c0e">
        <div style="max-width:700px;margin:0 auto;text-align:center">
          <h2 style="font-size:2.2rem;font-weight:800;color:#fafafa;margin-bottom:1rem;letter-spacing:-0.02em">Ready to get started?</h2>
          <p style="color:#71717a;font-size:1rem;margin-bottom:2.5rem">Join thousands of builders who ship faster with our platform.</p>
          <a href="#" style="display:inline-block;padding:16px 48px;background:linear-gradient(135deg,#dc2626,#f59e0b);color:#fff;border-radius:14px;text-decoration:none;font-weight:700;font-size:1rem;box-shadow:0 4px 40px rgba(220,38,38,0.3)">Start Building Free</a>
        </div>
      </section>`,
  };
}

export function generateHTMLFromPrompt(prompt: string): string {
  const t = detectTemplate(prompt);
  const fontUrl = t.fontUrl || "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap";
  const fontFamily = t.fontFamily || "'Inter'";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="${fontUrl}" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: ${fontFamily}, 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background: ${t.bgColor}; color: ${t.textColor}; min-height: 100vh; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
    a { text-decoration: none; transition: opacity 0.2s; }
    a:hover { opacity: 0.85; }
    ::selection { background: ${t.accentColor}40; }
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: ${t.borderColor}; border-radius: 3px; }
    nav { display: flex; align-items: center; justify-content: space-between; padding: 1.1rem 2.5rem; border-bottom: 1px solid ${t.borderColor}; backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); position: sticky; top: 0; z-index: 50; background: ${t.bgColor}e6; }
    .nav-brand { font-size: 1.2rem; font-weight: 800; background: ${t.accentGradient}; -webkit-background-clip: text; -webkit-text-fill-color: transparent; letter-spacing: -0.02em; }
    .nav-links { display: flex; gap: 2.5rem; list-style: none; }
    .nav-links a { color: ${t.mutedColor}; font-size: 0.88rem; font-weight: 500; transition: color 0.2s; }
    .nav-links a:hover { color: ${t.textColor}; opacity: 1; }
    .nav-cta { padding: 9px 22px; background: ${t.accentGradient}; color: #fff; border-radius: 10px; font-size: 0.85rem; font-weight: 600; letter-spacing: -0.01em; }
    .hero { text-align: center; padding: 7rem 2rem 4rem; max-width: 850px; margin: 0 auto; }
    .hero-badge { display: inline-flex; align-items: center; gap: 8px; background: ${t.accentColor}10; color: ${t.accentColor}; font-size: 0.8rem; font-weight: 600; padding: 8px 18px; border-radius: 100px; margin-bottom: 2rem; border: 1px solid ${t.accentColor}25; letter-spacing: 0.02em; }
    .hero h1 { font-size: clamp(2.5rem, 5.5vw, 4rem); font-weight: 800; line-height: 1.12; letter-spacing: -0.04em; margin-bottom: 1.5rem; color: ${t.textColor}; }
    .hero p { color: ${t.mutedColor}; font-size: 1.15rem; line-height: 1.75; max-width: 620px; margin: 0 auto; }
    footer { text-align: center; padding: 3.5rem 2rem; border-top: 1px solid ${t.borderColor}; color: ${t.mutedColor}; font-size: 0.82rem; margin-top: 4rem; }
    footer a { color: ${t.accentColor}; font-weight: 600; }
    @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    .hero { animation: fadeInUp 0.8s ease-out; }
    section { animation: fadeInUp 0.6s ease-out; }
    @media (max-width: 768px) {
      nav { padding: 1rem 1.25rem; }
      .nav-links { display: none; }
      .hero { padding: 5rem 1.25rem 3rem; }
      .hero h1 { font-size: 2.2rem; }
    }
  </style>
</head>
<body>
  <nav>
    <span class="nav-brand">${t.navBrand}</span>
    <ul class="nav-links">
      ${t.navLinks.map(l => `<li><a href="#">${l}</a></li>`).join("")}
    </ul>
    <a href="#" class="nav-cta">Get Started</a>
  </nav>
  <div class="hero">
    <div class="hero-badge">✨ Built with Sayo.ai</div>
    <h1>${t.title}</h1>
    <p>${t.subtitle}</p>
    ${t.heroExtra || ""}
  </div>
  ${t.sections}
  <footer>Built with <a href="#">Sayo.ai</a> — AI-Powered Website Builder</footer>
</body>
</html>`;
}

// Generate multiple pages based on prompt
export function generateMultiPageHTML(prompt: string): { name: string; html: string }[] {
  const p = prompt.toLowerCase();
  const mainPage = generateHTMLFromPrompt(prompt);
  const pages: { name: string; html: string }[] = [{ name: "Home", html: mainPage }];

  // Generate additional pages based on detected type
  if (p.includes("portfolio") || p.includes("personal") || p.includes("resume")) {
    pages.push({ name: "About", html: generateAboutPage(prompt) });
    pages.push({ name: "Contact", html: generateContactPage(prompt) });
  } else if (p.includes("blog") || p.includes("article") || p.includes("magazine")) {
    pages.push({ name: "Article", html: generateArticlePage(prompt) });
    pages.push({ name: "About", html: generateAboutPage(prompt) });
  } else if (p.includes("ecommerce") || p.includes("e-commerce") || p.includes("shop") || p.includes("store")) {
    pages.push({ name: "Products", html: generateProductsPage(prompt) });
    pages.push({ name: "Cart", html: generateCartPage(prompt) });
  } else if (p.includes("restaurant") || p.includes("food") || p.includes("cafe") || p.includes("menu")) {
    pages.push({ name: "Full Menu", html: generateMenuPage(prompt) });
    pages.push({ name: "Reservations", html: generateReservationPage(prompt) });
  } else if (p.includes("landing") || p.includes("saas") || p.includes("startup") || p.includes("app")) {
    pages.push({ name: "Pricing", html: generatePricingPage(prompt) });
    pages.push({ name: "Docs", html: generateDocsPage(prompt) });
  } else {
    pages.push({ name: "About", html: generateAboutPage(prompt) });
  }

  return pages;
}

function makePageShell(title: string, bg: string, textColor: string, accentGradient: string, borderColor: string, mutedColor: string, accentColor: string, fontUrl: string, fontFamily: string, navBrand: string, navLinks: string[], content: string): string {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><link href="${fontUrl}" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:${fontFamily},'Inter',-apple-system,sans-serif;background:${bg};color:${textColor};min-height:100vh;-webkit-font-smoothing:antialiased}a{text-decoration:none;transition:opacity .2s}a:hover{opacity:.85}nav{display:flex;align-items:center;justify-content:space-between;padding:1.1rem 2.5rem;border-bottom:1px solid ${borderColor};backdrop-filter:blur(20px);position:sticky;top:0;z-index:50;background:${bg}e6}.nav-brand{font-size:1.2rem;font-weight:800;background:${accentGradient};-webkit-background-clip:text;-webkit-text-fill-color:transparent}.nav-links{display:flex;gap:2.5rem;list-style:none}.nav-links a{color:${mutedColor};font-size:.88rem;font-weight:500}.nav-cta{padding:9px 22px;background:${accentGradient};color:#fff;border-radius:10px;font-size:.85rem;font-weight:600}footer{text-align:center;padding:3.5rem 2rem;border-top:1px solid ${borderColor};color:${mutedColor};font-size:.82rem;margin-top:4rem}footer a{color:${accentColor};font-weight:600}@keyframes fadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}.content{animation:fadeIn .6s ease-out}@media(max-width:768px){nav{padding:1rem 1.25rem}.nav-links{display:none}}</style></head><body><nav><span class="nav-brand">${navBrand}</span><ul class="nav-links">${navLinks.map(l => `<li><a href="#">${l}</a></li>`).join("")}</ul><a href="#" class="nav-cta">Get Started</a></nav><div class="content">${content}</div><footer>Built with <a href="#">Sayo.ai</a></footer></body></html>`;
}

function generateAboutPage(prompt: string): string {
  const t = detectTemplate(prompt);
  return makePageShell("About", t.bgColor, t.textColor, t.accentGradient, t.borderColor, t.mutedColor, t.accentColor, t.fontUrl || "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap", t.fontFamily || "'Inter'", t.navBrand, t.navLinks,
    `<section style="max-width:800px;margin:0 auto;padding:6rem 2rem;text-align:center"><h1 style="font-size:2.5rem;font-weight:800;margin-bottom:1.5rem;letter-spacing:-0.03em">About Us</h1><p style="color:${t.mutedColor};font-size:1.1rem;line-height:1.8;margin-bottom:3rem">We're a passionate team building the future of web development. Our mission is to make beautiful, professional websites accessible to everyone through the power of AI.</p><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:2rem;margin-top:3rem"><div style="background:${t.cardBg};border:1px solid ${t.borderColor};border-radius:16px;padding:2rem"><div style="font-size:2.5rem;margin-bottom:1rem">🎯</div><h3 style="font-weight:700;margin-bottom:0.5rem">Mission</h3><p style="color:${t.mutedColor};font-size:0.9rem;line-height:1.7">Democratize web design with intelligent AI tools.</p></div><div style="background:${t.cardBg};border:1px solid ${t.borderColor};border-radius:16px;padding:2rem"><div style="font-size:2.5rem;margin-bottom:1rem">👥</div><h3 style="font-weight:700;margin-bottom:0.5rem">Team</h3><p style="color:${t.mutedColor};font-size:0.9rem;line-height:1.7">12 designers and engineers from around the world.</p></div><div style="background:${t.cardBg};border:1px solid ${t.borderColor};border-radius:16px;padding:2rem"><div style="font-size:2.5rem;margin-bottom:1rem">🌍</div><h3 style="font-weight:700;margin-bottom:0.5rem">Global</h3><p style="color:${t.mutedColor};font-size:0.9rem;line-height:1.7">Serving creators in over 50 countries worldwide.</p></div></div></section>`
  );
}

function generateContactPage(prompt: string): string {
  const t = detectTemplate(prompt);
  return makePageShell("Contact", t.bgColor, t.textColor, t.accentGradient, t.borderColor, t.mutedColor, t.accentColor, t.fontUrl || "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap", t.fontFamily || "'Inter'", t.navBrand, t.navLinks,
    `<section style="max-width:600px;margin:0 auto;padding:6rem 2rem"><h1 style="font-size:2.5rem;font-weight:800;margin-bottom:1rem;text-align:center;letter-spacing:-0.03em">Get in Touch</h1><p style="color:${t.mutedColor};text-align:center;margin-bottom:3rem;font-size:1.05rem">Have a question or want to work together? We'd love to hear from you.</p><form style="display:flex;flex-direction:column;gap:1.25rem"><input placeholder="Your Name" style="padding:14px 18px;background:${t.cardBg};border:1px solid ${t.borderColor};border-radius:12px;color:${t.textColor};font-size:0.95rem;outline:none;font-family:inherit" /><input placeholder="Email Address" style="padding:14px 18px;background:${t.cardBg};border:1px solid ${t.borderColor};border-radius:12px;color:${t.textColor};font-size:0.95rem;outline:none;font-family:inherit" /><textarea placeholder="Your Message" rows="5" style="padding:14px 18px;background:${t.cardBg};border:1px solid ${t.borderColor};border-radius:12px;color:${t.textColor};font-size:0.95rem;outline:none;font-family:inherit;resize:vertical"></textarea><button style="padding:16px;background:${t.accentGradient};color:#fff;border:none;border-radius:12px;font-weight:700;font-size:1rem;cursor:pointer">Send Message</button></form></section>`
  );
}

function generateArticlePage(prompt: string): string {
  const t = detectTemplate(prompt);
  return makePageShell("Article", t.bgColor, t.textColor, t.accentGradient, t.borderColor, t.mutedColor, t.accentColor, t.fontUrl || "https://fonts.googleapis.com/css2?family=Fraunces:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap", t.fontFamily || "'Inter'", t.navBrand, t.navLinks,
    `<article style="max-width:720px;margin:0 auto;padding:5rem 2rem"><div style="margin-bottom:2rem"><span style="background:${t.accentColor}15;color:${t.accentColor};padding:4px 12px;border-radius:8px;font-size:0.8rem;font-weight:600">Featured</span><span style="color:${t.mutedColor};font-size:0.85rem;margin-left:12px">March 8, 2026 · 8 min read</span></div><h1 style="font-size:2.8rem;font-weight:800;line-height:1.2;margin-bottom:1.5rem;letter-spacing:-0.03em">The Future of AI-Powered Web Development</h1><p style="color:${t.mutedColor};font-size:1.15rem;line-height:1.8;margin-bottom:2rem">How machine learning is fundamentally reshaping the way we build for the web.</p><div style="height:400px;background:${t.accentGradient};border-radius:16px;margin-bottom:3rem;display:flex;align-items:center;justify-content:center;font-size:4rem;opacity:0.9">🖥️</div><div style="font-size:1.05rem;line-height:2;color:${t.mutedColor}"><p style="margin-bottom:1.5rem">The landscape of web development is undergoing a radical transformation. What once required weeks of coding and design iteration can now be accomplished in minutes with AI-assisted tools.</p><h2 style="color:${t.textColor};font-size:1.5rem;font-weight:700;margin:2rem 0 1rem">The Rise of AI Code Generation</h2><p style="margin-bottom:1.5rem">Modern AI models can understand natural language descriptions and translate them into production-ready code. This isn't just about generating boilerplate — it's about understanding design intent, user experience patterns, and accessibility best practices.</p><blockquote style="border-left:3px solid ${t.accentColor};padding:1rem 1.5rem;margin:2rem 0;background:${t.cardBg};border-radius:0 12px 12px 0;font-style:italic">"The best code is the code you never have to write. AI makes that possible at scale."</blockquote><p style="margin-bottom:1.5rem">Looking ahead, the integration of AI into development workflows will only deepen. We're moving toward a future where the barrier between ideation and implementation virtually disappears.</p></div></article>`
  );
}

function generateProductsPage(prompt: string): string {
  const t = detectTemplate(prompt);
  const products = [
    { name: "Cashmere Sweater", price: "$245", emoji: "🧶", tag: "TRENDING" },
    { name: "Silk Scarf", price: "$120", emoji: "🧣", tag: "NEW" },
    { name: "Leather Belt", price: "$85", emoji: "👔", tag: "" },
    { name: "Canvas Backpack", price: "$180", emoji: "🎒", tag: "BESTSELLER" },
    { name: "Sunglasses", price: "$165", emoji: "🕶️", tag: "" },
    { name: "Linen Shirt", price: "$95", emoji: "👕", tag: "NEW" },
  ];
  return makePageShell("Products", t.bgColor, t.textColor, t.accentGradient, t.borderColor, t.mutedColor, t.accentColor, t.fontUrl || "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap", t.fontFamily || "'Inter'", t.navBrand, t.navLinks,
    `<section style="max-width:1200px;margin:0 auto;padding:4rem 2rem"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:3rem"><h1 style="font-size:2rem;font-weight:800;letter-spacing:-0.03em">All Products</h1><div style="display:flex;gap:8px"><button style="padding:8px 16px;background:${t.cardBg};border:1px solid ${t.borderColor};border-radius:8px;color:${t.textColor};font-size:0.85rem;cursor:pointer;font-family:inherit">Sort by</button><button style="padding:8px 16px;background:${t.cardBg};border:1px solid ${t.borderColor};border-radius:8px;color:${t.textColor};font-size:0.85rem;cursor:pointer;font-family:inherit">Filter</button></div></div><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:2rem">${products.map(p => `<div style="cursor:pointer"><div style="aspect-ratio:3/4;background:${t.cardBg};border:1px solid ${t.borderColor};border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:4rem;margin-bottom:1rem;position:relative">${p.emoji}${p.tag ? `<div style="position:absolute;top:12px;left:12px;background:${t.accentColor};color:#fff;padding:3px 10px;font-size:0.7rem;font-weight:700;border-radius:4px;letter-spacing:0.05em">${p.tag}</div>` : ""}</div><h3 style="font-weight:600;font-size:0.95rem;margin-bottom:0.25rem">${p.name}</h3><p style="font-weight:700">${p.price}</p></div>`).join("")}</div></section>`
  );
}

function generateCartPage(prompt: string): string {
  const t = detectTemplate(prompt);
  return makePageShell("Cart", t.bgColor, t.textColor, t.accentGradient, t.borderColor, t.mutedColor, t.accentColor, t.fontUrl || "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap", t.fontFamily || "'Inter'", t.navBrand, t.navLinks,
    `<section style="max-width:900px;margin:0 auto;padding:4rem 2rem"><h1 style="font-size:2rem;font-weight:800;margin-bottom:2rem;letter-spacing:-0.03em">Shopping Cart</h1><div style="display:grid;grid-template-columns:1.5fr 1fr;gap:3rem"><div><div style="display:flex;flex-direction:column;gap:1px;background:${t.borderColor};border-radius:16px;overflow:hidden"><div style="display:flex;align-items:center;gap:1.5rem;padding:1.5rem;background:${t.cardBg}"><div style="width:80px;height:80px;border-radius:12px;background:${t.bgColor};display:flex;align-items:center;justify-content:center;font-size:2rem;border:1px solid ${t.borderColor}">🧥</div><div style="flex:1"><h3 style="font-weight:600">Wool Blend Overcoat</h3><p style="color:${t.mutedColor};font-size:0.85rem;margin-top:2px">Size: M · Camel</p></div><span style="font-weight:700;font-size:1.1rem">$485</span></div><div style="display:flex;align-items:center;gap:1.5rem;padding:1.5rem;background:${t.cardBg}"><div style="width:80px;height:80px;border-radius:12px;background:${t.bgColor};display:flex;align-items:center;justify-content:center;font-size:2rem;border:1px solid ${t.borderColor}">👜</div><div style="flex:1"><h3 style="font-weight:600">Leather Tote Bag</h3><p style="color:${t.mutedColor};font-size:0.85rem;margin-top:2px">Cognac</p></div><span style="font-weight:700;font-size:1.1rem">$320</span></div></div></div><div style="background:${t.cardBg};border:1px solid ${t.borderColor};border-radius:16px;padding:2rem;height:fit-content"><h3 style="font-weight:700;margin-bottom:1.5rem">Order Summary</h3><div style="display:flex;justify-content:space-between;margin-bottom:0.75rem;color:${t.mutedColor};font-size:0.9rem"><span>Subtotal</span><span>$805.00</span></div><div style="display:flex;justify-content:space-between;margin-bottom:0.75rem;color:${t.mutedColor};font-size:0.9rem"><span>Shipping</span><span>Free</span></div><div style="border-top:1px solid ${t.borderColor};margin:1rem 0;padding-top:1rem;display:flex;justify-content:space-between;font-weight:700;font-size:1.1rem"><span>Total</span><span>$805.00</span></div><button style="width:100%;padding:16px;background:${t.accentGradient};color:#fff;border:none;border-radius:12px;font-weight:700;font-size:1rem;cursor:pointer;margin-top:1rem">Checkout</button></div></div></section>`
  );
}

function generateMenuPage(prompt: string): string {
  const t = detectTemplate(prompt);
  return makePageShell("Menu", t.bgColor, t.textColor, t.accentGradient, t.borderColor, t.mutedColor, t.accentColor, t.fontUrl || "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=Inter:wght@300;400;500&display=swap", t.fontFamily || "'Inter'", t.navBrand, t.navLinks,
    `<section style="max-width:900px;margin:0 auto;padding:5rem 2rem;text-align:center"><h1 style="font-size:2.5rem;font-weight:800;margin-bottom:0.5rem;letter-spacing:-0.03em">Our Full Menu</h1><p style="color:${t.mutedColor};margin-bottom:4rem;font-size:1.05rem">Seasonally inspired, locally sourced</p><div style="text-align:left"><h2 style="font-size:1.3rem;font-weight:700;margin-bottom:2rem;padding-bottom:0.75rem;border-bottom:2px solid ${t.accentColor}">🥗 Starters</h2><div style="display:flex;flex-direction:column;gap:1.5rem;margin-bottom:4rem"><div style="display:flex;justify-content:space-between"><div><h3 style="font-weight:600;margin-bottom:4px">Burrata Salad</h3><p style="color:${t.mutedColor};font-size:0.88rem">Heirloom tomatoes · basil oil · aged balsamic</p></div><span style="font-weight:700;font-size:1.1rem">$18</span></div><div style="display:flex;justify-content:space-between"><div><h3 style="font-weight:600;margin-bottom:4px">Tuna Tartare</h3><p style="color:${t.mutedColor};font-size:0.88rem">Yellowfin tuna · avocado · sesame · crispy wonton</p></div><span style="font-weight:700;font-size:1.1rem">$22</span></div><div style="display:flex;justify-content:space-between"><div><h3 style="font-weight:600;margin-bottom:4px">French Onion Soup</h3><p style="color:${t.mutedColor};font-size:0.88rem">Caramelized onions · gruyère · sourdough crouton</p></div><span style="font-weight:700;font-size:1.1rem">$16</span></div></div><h2 style="font-size:1.3rem;font-weight:700;margin-bottom:2rem;padding-bottom:0.75rem;border-bottom:2px solid ${t.accentColor}">🥩 Mains</h2><div style="display:flex;flex-direction:column;gap:1.5rem;margin-bottom:4rem"><div style="display:flex;justify-content:space-between"><div><h3 style="font-weight:600;margin-bottom:4px">Wagyu Ribeye</h3><p style="color:${t.mutedColor};font-size:0.88rem">A5 Japanese wagyu · bone marrow butter · seasonal vegetables</p></div><span style="font-weight:700;font-size:1.1rem">$68</span></div><div style="display:flex;justify-content:space-between"><div><h3 style="font-weight:600;margin-bottom:4px">Lobster Risotto</h3><p style="color:${t.mutedColor};font-size:0.88rem">Maine lobster · saffron arborio · truffle oil</p></div><span style="font-weight:700;font-size:1.1rem">$45</span></div><div style="display:flex;justify-content:space-between"><div><h3 style="font-weight:600;margin-bottom:4px">Roasted Halibut</h3><p style="color:${t.mutedColor};font-size:0.88rem">Wild halibut · lemon caper sauce · asparagus</p></div><span style="font-weight:700;font-size:1.1rem">$42</span></div></div><h2 style="font-size:1.3rem;font-weight:700;margin-bottom:2rem;padding-bottom:0.75rem;border-bottom:2px solid ${t.accentColor}">🍰 Desserts</h2><div style="display:flex;flex-direction:column;gap:1.5rem"><div style="display:flex;justify-content:space-between"><div><h3 style="font-weight:600;margin-bottom:4px">Crème Brûlée</h3><p style="color:${t.mutedColor};font-size:0.88rem">Madagascar vanilla · caramelized sugar</p></div><span style="font-weight:700;font-size:1.1rem">$14</span></div><div style="display:flex;justify-content:space-between"><div><h3 style="font-weight:600;margin-bottom:4px">Chocolate Lava Cake</h3><p style="color:${t.mutedColor};font-size:0.88rem">Valrhona chocolate · vanilla gelato · berry coulis</p></div><span style="font-weight:700;font-size:1.1rem">$16</span></div></div></div></section>`
  );
}

function generateReservationPage(prompt: string): string {
  const t = detectTemplate(prompt);
  return makePageShell("Reservations", t.bgColor, t.textColor, t.accentGradient, t.borderColor, t.mutedColor, t.accentColor, t.fontUrl || "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=Inter:wght@300;400;500&display=swap", t.fontFamily || "'Inter'", t.navBrand, t.navLinks,
    `<section style="max-width:600px;margin:0 auto;padding:5rem 2rem;text-align:center"><h1 style="font-size:2.5rem;font-weight:800;margin-bottom:0.75rem;letter-spacing:-0.03em">Make a Reservation</h1><p style="color:${t.mutedColor};margin-bottom:3rem;font-size:1.05rem">Join us for an unforgettable dining experience</p><form style="display:flex;flex-direction:column;gap:1.25rem;text-align:left"><div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem"><div><label style="display:block;font-size:0.85rem;font-weight:600;margin-bottom:6px">Date</label><input type="date" style="width:100%;padding:14px 18px;background:${t.cardBg};border:1px solid ${t.borderColor};border-radius:12px;color:${t.textColor};font-size:0.95rem;outline:none;font-family:inherit" /></div><div><label style="display:block;font-size:0.85rem;font-weight:600;margin-bottom:6px">Time</label><select style="width:100%;padding:14px 18px;background:${t.cardBg};border:1px solid ${t.borderColor};border-radius:12px;color:${t.textColor};font-size:0.95rem;outline:none;font-family:inherit;appearance:none"><option>6:00 PM</option><option>7:00 PM</option><option>8:00 PM</option><option>9:00 PM</option></select></div></div><div><label style="display:block;font-size:0.85rem;font-weight:600;margin-bottom:6px">Party Size</label><select style="width:100%;padding:14px 18px;background:${t.cardBg};border:1px solid ${t.borderColor};border-radius:12px;color:${t.textColor};font-size:0.95rem;outline:none;font-family:inherit;appearance:none"><option>2 Guests</option><option>3 Guests</option><option>4 Guests</option><option>5-6 Guests</option><option>7+ Guests</option></select></div><input placeholder="Full Name" style="padding:14px 18px;background:${t.cardBg};border:1px solid ${t.borderColor};border-radius:12px;color:${t.textColor};font-size:0.95rem;outline:none;font-family:inherit" /><input placeholder="Email" style="padding:14px 18px;background:${t.cardBg};border:1px solid ${t.borderColor};border-radius:12px;color:${t.textColor};font-size:0.95rem;outline:none;font-family:inherit" /><textarea placeholder="Special Requests" rows="3" style="padding:14px 18px;background:${t.cardBg};border:1px solid ${t.borderColor};border-radius:12px;color:${t.textColor};font-size:0.95rem;outline:none;font-family:inherit;resize:vertical"></textarea><button style="padding:16px;background:${t.accentGradient};color:#fff;border:none;border-radius:12px;font-weight:700;font-size:1rem;cursor:pointer;margin-top:0.5rem">Reserve Now</button></form></section>`
  );
}

function generatePricingPage(prompt: string): string {
  const t = detectTemplate(prompt);
  return makePageShell("Pricing", t.bgColor, t.textColor, t.accentGradient, t.borderColor, t.mutedColor, t.accentColor, t.fontUrl || "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap", t.fontFamily || "'Inter'", t.navBrand, t.navLinks,
    `<section style="max-width:1000px;margin:0 auto;padding:5rem 2rem;text-align:center"><h1 style="font-size:2.5rem;font-weight:800;margin-bottom:0.75rem;letter-spacing:-0.03em">Simple, Transparent Pricing</h1><p style="color:${t.mutedColor};margin-bottom:4rem;font-size:1.1rem">No hidden fees. Cancel anytime.</p><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;text-align:left"><div style="background:${t.cardBg};border:1px solid ${t.borderColor};border-radius:20px;padding:2.5rem"><h3 style="font-weight:700;font-size:1.1rem">Starter</h3><p style="color:${t.mutedColor};font-size:0.85rem;margin:0.5rem 0 1.5rem">For individuals</p><div style="margin-bottom:2rem"><span style="font-size:3rem;font-weight:800;letter-spacing:-0.03em">$0</span><span style="color:${t.mutedColor};font-size:0.9rem">/mo</span></div><ul style="list-style:none;padding:0;display:flex;flex-direction:column;gap:12px;margin-bottom:2rem"><li style="color:${t.mutedColor};font-size:0.88rem;display:flex;align-items:center;gap:8px"><span style="color:#22c55e">✓</span> 3 projects</li><li style="color:${t.mutedColor};font-size:0.88rem;display:flex;align-items:center;gap:8px"><span style="color:#22c55e">✓</span> AI generation</li><li style="color:${t.mutedColor};font-size:0.88rem;display:flex;align-items:center;gap:8px"><span style="color:#22c55e">✓</span> Basic support</li></ul><a href="#" style="display:block;text-align:center;padding:14px;border:1px solid ${t.borderColor};border-radius:12px;color:${t.textColor};text-decoration:none;font-weight:600">Get Started</a></div><div style="background:${t.cardBg};border:2px solid ${t.accentColor};border-radius:20px;padding:2.5rem;position:relative;box-shadow:0 0 60px ${t.accentColor}15"><div style="position:absolute;top:-14px;left:50%;transform:translateX(-50%);background:${t.accentGradient};color:#fff;font-size:0.75rem;font-weight:700;padding:6px 20px;border-radius:100px">POPULAR</div><h3 style="font-weight:700;font-size:1.1rem">Pro</h3><p style="color:${t.mutedColor};font-size:0.85rem;margin:0.5rem 0 1.5rem">For professionals</p><div style="margin-bottom:2rem"><span style="font-size:3rem;font-weight:800;letter-spacing:-0.03em">$29</span><span style="color:${t.mutedColor};font-size:0.9rem">/mo</span></div><ul style="list-style:none;padding:0;display:flex;flex-direction:column;gap:12px;margin-bottom:2rem"><li style="color:${t.mutedColor};font-size:0.88rem;display:flex;align-items:center;gap:8px"><span style="color:#22c55e">✓</span> Unlimited projects</li><li style="color:${t.mutedColor};font-size:0.88rem;display:flex;align-items:center;gap:8px"><span style="color:#22c55e">✓</span> Custom domains</li><li style="color:${t.mutedColor};font-size:0.88rem;display:flex;align-items:center;gap:8px"><span style="color:#22c55e">✓</span> Priority support</li><li style="color:${t.mutedColor};font-size:0.88rem;display:flex;align-items:center;gap:8px"><span style="color:#22c55e">✓</span> Analytics</li></ul><a href="#" style="display:block;text-align:center;padding:14px;background:${t.accentGradient};border-radius:12px;color:#fff;text-decoration:none;font-weight:700;box-shadow:0 4px 20px ${t.accentColor}30">Start Free Trial</a></div><div style="background:${t.cardBg};border:1px solid ${t.borderColor};border-radius:20px;padding:2.5rem"><h3 style="font-weight:700;font-size:1.1rem">Enterprise</h3><p style="color:${t.mutedColor};font-size:0.85rem;margin:0.5rem 0 1.5rem">For teams</p><div style="margin-bottom:2rem"><span style="font-size:3rem;font-weight:800;letter-spacing:-0.03em">Custom</span></div><ul style="list-style:none;padding:0;display:flex;flex-direction:column;gap:12px;margin-bottom:2rem"><li style="color:${t.mutedColor};font-size:0.88rem;display:flex;align-items:center;gap:8px"><span style="color:#22c55e">✓</span> Everything in Pro</li><li style="color:${t.mutedColor};font-size:0.88rem;display:flex;align-items:center;gap:8px"><span style="color:#22c55e">✓</span> SSO & SAML</li><li style="color:${t.mutedColor};font-size:0.88rem;display:flex;align-items:center;gap:8px"><span style="color:#22c55e">✓</span> SLA guarantee</li></ul><a href="#" style="display:block;text-align:center;padding:14px;border:1px solid ${t.borderColor};border-radius:12px;color:${t.textColor};text-decoration:none;font-weight:600">Contact Sales</a></div></div></section>`
  );
}

function generateDocsPage(prompt: string): string {
  const t = detectTemplate(prompt);
  return makePageShell("Docs", t.bgColor, t.textColor, t.accentGradient, t.borderColor, t.mutedColor, t.accentColor, t.fontUrl || "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap", t.fontFamily || "'Inter'", t.navBrand, t.navLinks,
    `<section style="max-width:1000px;margin:0 auto;padding:4rem 2rem;display:grid;grid-template-columns:240px 1fr;gap:3rem"><aside style="position:sticky;top:80px;height:fit-content"><h3 style="font-weight:700;margin-bottom:1.5rem;font-size:0.9rem;letter-spacing:0.05em;text-transform:uppercase;color:${t.mutedColor}">Documentation</h3><nav style="display:flex;flex-direction:column;gap:4px"><a href="#" style="padding:8px 14px;background:${t.accentColor}15;border-radius:8px;color:${t.accentColor};font-size:0.88rem;font-weight:500">Getting Started</a><a href="#" style="padding:8px 14px;color:${t.mutedColor};font-size:0.88rem;font-weight:500">Installation</a><a href="#" style="padding:8px 14px;color:${t.mutedColor};font-size:0.88rem;font-weight:500">Configuration</a><a href="#" style="padding:8px 14px;color:${t.mutedColor};font-size:0.88rem;font-weight:500">API Reference</a><a href="#" style="padding:8px 14px;color:${t.mutedColor};font-size:0.88rem;font-weight:500">Deployment</a><a href="#" style="padding:8px 14px;color:${t.mutedColor};font-size:0.88rem;font-weight:500">FAQ</a></nav></aside><main><h1 style="font-size:2rem;font-weight:800;margin-bottom:1.5rem;letter-spacing:-0.03em">Getting Started</h1><p style="color:${t.mutedColor};font-size:1.05rem;line-height:1.8;margin-bottom:2rem">Welcome to the docs! This guide will help you get up and running in under 5 minutes.</p><div style="background:${t.cardBg};border:1px solid ${t.borderColor};border-radius:12px;padding:1.5rem;margin-bottom:2rem"><h3 style="font-weight:600;margin-bottom:1rem">Quick Start</h3><pre style="background:${t.bgColor};border:1px solid ${t.borderColor};border-radius:8px;padding:1rem;font-size:0.85rem;overflow-x:auto;color:${t.mutedColor}"><code>npx create-nexus-app my-project\ncd my-project\nnpm run dev</code></pre></div><h2 style="font-size:1.4rem;font-weight:700;margin:2.5rem 0 1rem">Prerequisites</h2><ul style="color:${t.mutedColor};font-size:0.95rem;line-height:2;padding-left:1.5rem"><li>Node.js 18 or later</li><li>npm, yarn, or pnpm</li><li>A code editor (VS Code recommended)</li></ul><h2 style="font-size:1.4rem;font-weight:700;margin:2.5rem 0 1rem">Project Structure</h2><div style="background:${t.cardBg};border:1px solid ${t.borderColor};border-radius:12px;padding:1.5rem;font-family:monospace;font-size:0.85rem;color:${t.mutedColor};line-height:2">my-project/<br>&nbsp;&nbsp;├── src/<br>&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;├── pages/<br>&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;├── components/<br>&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;└── styles/<br>&nbsp;&nbsp;├── public/<br>&nbsp;&nbsp;├── package.json<br>&nbsp;&nbsp;└── config.ts</div></main></section>`
  );
}
