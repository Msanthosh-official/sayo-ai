// Lovable-quality HTML generator — produces polished, modern previews

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
}

function detectTemplate(prompt: string): TemplateConfig {
  const p = prompt.toLowerCase();

  if (p.includes("portfolio") || p.includes("personal")) {
    return {
      navBrand: "John.dev",
      navLinks: ["Work", "About", "Contact"],
      title: "I craft digital experiences that people love.",
      subtitle: "Creative developer specializing in modern web applications, design systems, and interactive experiences.",
      bgColor: "#0a0a0a",
      textColor: "#fafafa",
      mutedColor: "#a1a1aa",
      accentColor: "#3b82f6",
      accentGradient: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
      cardBg: "#18181b",
      borderColor: "#27272a",
      heroExtra: `<div style="display:flex;gap:12px;margin-top:2rem;justify-content:center"><a href="#" style="padding:12px 28px;background:linear-gradient(135deg,#3b82f6,#8b5cf6);color:#fff;border-radius:10px;text-decoration:none;font-weight:600;font-size:0.95rem">View My Work</a><a href="#" style="padding:12px 28px;border:1px solid #27272a;color:#fafafa;border-radius:10px;text-decoration:none;font-weight:500;font-size:0.95rem">Download CV</a></div>`,
      sections: `
        <section style="padding:5rem 2rem;max-width:1100px;margin:0 auto">
          <p style="color:#3b82f6;font-weight:600;font-size:0.85rem;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:0.5rem">What I Do</p>
          <h2 style="font-size:2rem;font-weight:700;color:#fafafa;margin-bottom:2.5rem">Skills & Expertise</h2>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1.5rem">
            <div style="background:#18181b;border:1px solid #27272a;border-radius:16px;padding:2rem"><div style="width:48px;height:48px;background:linear-gradient(135deg,#3b82f6,#8b5cf6);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.3rem;margin-bottom:1rem">🎨</div><h3 style="color:#fafafa;font-size:1.15rem;font-weight:600;margin-bottom:0.5rem">UI/UX Design</h3><p style="color:#a1a1aa;font-size:0.9rem;line-height:1.7">Creating intuitive, beautiful interfaces with a focus on user experience and accessibility.</p></div>
            <div style="background:#18181b;border:1px solid #27272a;border-radius:16px;padding:2rem"><div style="width:48px;height:48px;background:linear-gradient(135deg,#3b82f6,#8b5cf6);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.3rem;margin-bottom:1rem">⚡</div><h3 style="color:#fafafa;font-size:1.15rem;font-weight:600;margin-bottom:0.5rem">Frontend Dev</h3><p style="color:#a1a1aa;font-size:0.9rem;line-height:1.7">React, TypeScript, Next.js — building performant apps with modern frameworks.</p></div>
            <div style="background:#18181b;border:1px solid #27272a;border-radius:16px;padding:2rem"><div style="width:48px;height:48px;background:linear-gradient(135deg,#3b82f6,#8b5cf6);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.3rem;margin-bottom:1rem">🔧</div><h3 style="color:#fafafa;font-size:1.15rem;font-weight:600;margin-bottom:0.5rem">Backend & APIs</h3><p style="color:#a1a1aa;font-size:0.9rem;line-height:1.7">Node.js, PostgreSQL, REST & GraphQL APIs with scalable architecture.</p></div>
          </div>
        </section>
        <section style="padding:5rem 2rem;max-width:1100px;margin:0 auto">
          <p style="color:#3b82f6;font-weight:600;font-size:0.85rem;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:0.5rem">Portfolio</p>
          <h2 style="font-size:2rem;font-weight:700;color:#fafafa;margin-bottom:2.5rem">Featured Projects</h2>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1.5rem">
            <div style="background:#18181b;border:1px solid #27272a;border-radius:16px;overflow:hidden"><div style="height:200px;background:linear-gradient(135deg,#1e1b4b,#3b82f6);display:flex;align-items:center;justify-content:center;font-size:2rem">🛒</div><div style="padding:1.5rem"><h3 style="color:#fafafa;font-weight:600;margin-bottom:0.5rem">E-Commerce Platform</h3><p style="color:#a1a1aa;font-size:0.85rem;line-height:1.6">Full-stack shopping experience with payments integration</p><div style="display:flex;gap:6px;margin-top:1rem"><span style="background:#27272a;color:#a1a1aa;padding:4px 10px;border-radius:6px;font-size:0.75rem">React</span><span style="background:#27272a;color:#a1a1aa;padding:4px 10px;border-radius:6px;font-size:0.75rem">Stripe</span></div></div></div>
            <div style="background:#18181b;border:1px solid #27272a;border-radius:16px;overflow:hidden"><div style="height:200px;background:linear-gradient(135deg,#1a2e05,#22c55e);display:flex;align-items:center;justify-content:center;font-size:2rem">📊</div><div style="padding:1.5rem"><h3 style="color:#fafafa;font-weight:600;margin-bottom:0.5rem">Analytics Dashboard</h3><p style="color:#a1a1aa;font-size:0.85rem;line-height:1.6">Real-time data visualization with interactive charts</p><div style="display:flex;gap:6px;margin-top:1rem"><span style="background:#27272a;color:#a1a1aa;padding:4px 10px;border-radius:6px;font-size:0.75rem">Next.js</span><span style="background:#27272a;color:#a1a1aa;padding:4px 10px;border-radius:6px;font-size:0.75rem">D3.js</span></div></div></div>
          </div>
        </section>`,
    };
  }

  if (p.includes("landing") || p.includes("startup") || p.includes("saas")) {
    return {
      navBrand: "LaunchPad",
      navLinks: ["Features", "Pricing", "About", "Contact"],
      title: "Ship faster with the platform built for builders.",
      subtitle: "The all-in-one platform to design, develop, and deploy your SaaS product in record time. No compromises.",
      bgColor: "#09090b",
      textColor: "#fafafa",
      mutedColor: "#a1a1aa",
      accentColor: "#8b5cf6",
      accentGradient: "linear-gradient(135deg, #8b5cf6, #ec4899)",
      cardBg: "#18181b",
      borderColor: "#27272a",
      heroExtra: `<div style="display:flex;gap:12px;margin-top:2rem;justify-content:center"><a href="#" style="padding:14px 32px;background:linear-gradient(135deg,#8b5cf6,#ec4899);color:#fff;border-radius:12px;text-decoration:none;font-weight:600;font-size:1rem;box-shadow:0 0 30px rgba(139,92,246,0.3)">Start Free Trial</a><a href="#" style="padding:14px 32px;border:1px solid #27272a;color:#fafafa;border-radius:12px;text-decoration:none;font-weight:500;font-size:1rem">Watch Demo →</a></div><div style="margin-top:3rem;background:#18181b;border:1px solid #27272a;border-radius:16px;max-width:800px;margin-left:auto;margin-right:auto;overflow:hidden"><div style="padding:12px 16px;border-bottom:1px solid #27272a;display:flex;gap:6px"><div style="width:10px;height:10px;border-radius:50%;background:#ef4444"></div><div style="width:10px;height:10px;border-radius:50%;background:#eab308"></div><div style="width:10px;height:10px;border-radius:50%;background:#22c55e"></div></div><div style="height:300px;background:linear-gradient(180deg,#1e1b4b 0%,#09090b 100%);display:flex;align-items:center;justify-content:center;color:#a1a1aa;font-size:0.9rem">✨ Interactive Dashboard Preview</div></div>`,
      sections: `
        <section style="padding:6rem 2rem;max-width:1100px;margin:0 auto">
          <div style="text-align:center;margin-bottom:3rem"><p style="color:#8b5cf6;font-weight:600;font-size:0.85rem;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:0.5rem">Features</p><h2 style="font-size:2.2rem;font-weight:700;color:#fafafa">Everything you need to ship fast</h2></div>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1.5rem">
            <div style="background:#18181b;border:1px solid #27272a;border-radius:16px;padding:2rem"><div style="font-size:1.5rem;margin-bottom:1rem">⚡</div><h3 style="color:#fafafa;font-size:1.1rem;font-weight:600;margin-bottom:0.5rem">Lightning Performance</h3><p style="color:#a1a1aa;font-size:0.9rem;line-height:1.7">Optimized rendering pipeline delivering sub-100ms load times.</p></div>
            <div style="background:#18181b;border:1px solid #27272a;border-radius:16px;padding:2rem"><div style="font-size:1.5rem;margin-bottom:1rem">🔒</div><h3 style="color:#fafafa;font-size:1.1rem;font-weight:600;margin-bottom:0.5rem">Enterprise Security</h3><p style="color:#a1a1aa;font-size:0.9rem;line-height:1.7">SOC 2 compliant with end-to-end encryption and SSO support.</p></div>
            <div style="background:#18181b;border:1px solid #27272a;border-radius:16px;padding:2rem"><div style="font-size:1.5rem;margin-bottom:1rem">📊</div><h3 style="color:#fafafa;font-size:1.1rem;font-weight:600;margin-bottom:0.5rem">Built-in Analytics</h3><p style="color:#a1a1aa;font-size:0.9rem;line-height:1.7">Real-time metrics dashboard with custom event tracking.</p></div>
          </div>
        </section>
        <section style="padding:5rem 2rem;max-width:1000px;margin:0 auto;text-align:center">
          <p style="color:#8b5cf6;font-weight:600;font-size:0.85rem;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:0.5rem">Pricing</p>
          <h2 style="font-size:2.2rem;font-weight:700;color:#fafafa;margin-bottom:3rem">Simple, transparent pricing</h2>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1.5rem">
            <div style="background:#18181b;border:1px solid #27272a;border-radius:16px;padding:2.5rem;text-align:left"><h3 style="color:#fafafa;font-weight:600;margin-bottom:0.25rem">Starter</h3><p style="color:#a1a1aa;font-size:0.85rem;margin-bottom:1.5rem">For individuals</p><div style="font-size:2.5rem;font-weight:800;color:#fafafa;margin-bottom:1.5rem">$9<span style="font-size:1rem;font-weight:400;color:#a1a1aa">/mo</span></div><a href="#" style="display:block;text-align:center;padding:12px;border:1px solid #27272a;border-radius:10px;color:#fafafa;text-decoration:none;font-weight:500">Get Started</a></div>
            <div style="background:#18181b;border:2px solid #8b5cf6;border-radius:16px;padding:2.5rem;text-align:left;position:relative"><div style="position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#8b5cf6,#ec4899);color:#fff;font-size:0.75rem;font-weight:600;padding:4px 14px;border-radius:20px">Popular</div><h3 style="color:#fafafa;font-weight:600;margin-bottom:0.25rem">Pro</h3><p style="color:#a1a1aa;font-size:0.85rem;margin-bottom:1.5rem">For growing teams</p><div style="font-size:2.5rem;font-weight:800;color:#fafafa;margin-bottom:1.5rem">$29<span style="font-size:1rem;font-weight:400;color:#a1a1aa">/mo</span></div><a href="#" style="display:block;text-align:center;padding:12px;background:linear-gradient(135deg,#8b5cf6,#ec4899);border-radius:10px;color:#fff;text-decoration:none;font-weight:600">Get Started</a></div>
            <div style="background:#18181b;border:1px solid #27272a;border-radius:16px;padding:2.5rem;text-align:left"><h3 style="color:#fafafa;font-weight:600;margin-bottom:0.25rem">Enterprise</h3><p style="color:#a1a1aa;font-size:0.85rem;margin-bottom:1.5rem">Custom solutions</p><div style="font-size:2.5rem;font-weight:800;color:#fafafa;margin-bottom:1.5rem">Custom</div><a href="#" style="display:block;text-align:center;padding:12px;border:1px solid #27272a;border-radius:10px;color:#fafafa;text-decoration:none;font-weight:500">Contact Sales</a></div>
          </div>
        </section>`,
    };
  }

  if (p.includes("blog") || p.includes("article") || p.includes("magazine")) {
    return {
      navBrand: "The Digest",
      navLinks: ["Latest", "Technology", "Design", "About"],
      title: "Ideas worth sharing.",
      subtitle: "Deep dives into technology, design, and the future of building digital products.",
      bgColor: "#fafaf9",
      textColor: "#1c1917",
      mutedColor: "#78716c",
      accentColor: "#ea580c",
      accentGradient: "linear-gradient(135deg, #ea580c, #dc2626)",
      cardBg: "#ffffff",
      borderColor: "#e7e5e4",
      sections: `
        <section style="padding:4rem 2rem;max-width:900px;margin:0 auto">
          <div style="display:flex;flex-direction:column;gap:2rem">
            <article style="display:grid;grid-template-columns:1fr 1fr;gap:2rem;background:#fff;border:1px solid #e7e5e4;border-radius:16px;overflow:hidden"><div style="background:linear-gradient(135deg,#fef3c7,#ea580c);min-height:240px"></div><div style="padding:2rem;display:flex;flex-direction:column;justify-content:center"><span style="color:#ea580c;font-size:0.8rem;font-weight:600;text-transform:uppercase;letter-spacing:0.05em">Featured</span><h3 style="font-size:1.4rem;font-weight:700;color:#1c1917;margin:0.5rem 0">The Future of AI-Powered Development</h3><p style="color:#78716c;font-size:0.9rem;line-height:1.7;margin-bottom:1rem">How machine learning is transforming the way we write, review, and deploy code at scale...</p><span style="color:#a8a29e;font-size:0.8rem">8 min read · Mar 8, 2026</span></div></article>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1.5rem">
              <article style="background:#fff;border:1px solid #e7e5e4;border-radius:16px;overflow:hidden"><div style="height:160px;background:linear-gradient(135deg,#dbeafe,#3b82f6)"></div><div style="padding:1.5rem"><span style="color:#ea580c;font-size:0.75rem;font-weight:600;text-transform:uppercase">Design</span><h3 style="font-size:1.1rem;font-weight:600;color:#1c1917;margin:0.5rem 0">Minimalism in Modern UI</h3><p style="color:#78716c;font-size:0.85rem;line-height:1.6">Why less is more in today's digital landscape...</p><span style="color:#a8a29e;font-size:0.75rem">3 min · Mar 6</span></div></article>
              <article style="background:#fff;border:1px solid #e7e5e4;border-radius:16px;overflow:hidden"><div style="height:160px;background:linear-gradient(135deg,#d1fae5,#10b981)"></div><div style="padding:1.5rem"><span style="color:#ea580c;font-size:0.75rem;font-weight:600;text-transform:uppercase">Startup</span><h3 style="font-size:1.1rem;font-weight:600;color:#1c1917;margin:0.5rem 0">From Idea to MVP in 48 Hours</h3><p style="color:#78716c;font-size:0.85rem;line-height:1.6">A step-by-step guide to rapid prototyping...</p><span style="color:#a8a29e;font-size:0.75rem">7 min · Mar 5</span></div></article>
            </div>
          </div>
        </section>`,
    };
  }

  if (p.includes("ecommerce") || p.includes("e-commerce") || p.includes("shop") || p.includes("store")) {
    return {
      navBrand: "StyleHub",
      navLinks: ["Shop", "Collections", "Sale", "Cart"],
      title: "New Season. New Style.",
      subtitle: "Discover curated collections designed for modern living. Free shipping on orders over $99.",
      bgColor: "#fafafa",
      textColor: "#09090b",
      mutedColor: "#71717a",
      accentColor: "#18181b",
      accentGradient: "linear-gradient(135deg, #18181b, #3f3f46)",
      cardBg: "#ffffff",
      borderColor: "#e4e4e7",
      heroExtra: `<div style="display:flex;gap:12px;margin-top:2rem;justify-content:center"><a href="#" style="padding:14px 36px;background:#18181b;color:#fafafa;border-radius:12px;text-decoration:none;font-weight:600;font-size:1rem">Shop Now</a><a href="#" style="padding:14px 36px;border:1px solid #d4d4d8;color:#18181b;border-radius:12px;text-decoration:none;font-weight:500;font-size:1rem">View Lookbook</a></div>`,
      sections: `
        <section style="padding:5rem 2rem;max-width:1100px;margin:0 auto">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:2.5rem"><h2 style="font-size:1.8rem;font-weight:700;color:#09090b">Trending Now</h2><a href="#" style="color:#71717a;font-size:0.9rem;text-decoration:none">View All →</a></div>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1.5rem">
            <div style="border-radius:16px;overflow:hidden"><div style="height:320px;background:linear-gradient(180deg,#f4f4f5,#e4e4e7);display:flex;align-items:center;justify-content:center;font-size:4rem;border-radius:16px">👕</div><div style="padding:1rem 0"><h3 style="color:#09090b;font-weight:600">Premium Cotton Tee</h3><p style="color:#71717a;font-size:0.85rem;margin:0.25rem 0">Organic cotton · 4 colors</p><p style="color:#09090b;font-weight:700;font-size:1.1rem">$49.00</p></div></div>
            <div style="border-radius:16px;overflow:hidden"><div style="height:320px;background:linear-gradient(180deg,#f4f4f5,#e4e4e7);display:flex;align-items:center;justify-content:center;font-size:4rem;border-radius:16px">👟</div><div style="padding:1rem 0"><h3 style="color:#09090b;font-weight:600">Runner Pro X</h3><p style="color:#71717a;font-size:0.85rem;margin:0.25rem 0">Lightweight · 3 sizes</p><p style="color:#09090b;font-weight:700;font-size:1.1rem">$129.00</p></div></div>
            <div style="border-radius:16px;overflow:hidden"><div style="height:320px;background:linear-gradient(180deg,#f4f4f5,#e4e4e7);display:flex;align-items:center;justify-content:center;font-size:4rem;border-radius:16px">🎒</div><div style="padding:1rem 0"><h3 style="color:#09090b;font-weight:600">Urban Backpack</h3><p style="color:#71717a;font-size:0.85rem;margin:0.25rem 0">Water-resistant · 25L</p><p style="color:#09090b;font-weight:700;font-size:1.1rem">$89.00</p></div></div>
          </div>
        </section>`,
    };
  }

  if (p.includes("restaurant") || p.includes("food") || p.includes("cafe") || p.includes("menu")) {
    return {
      navBrand: "Bella Cucina",
      navLinks: ["Menu", "Reservations", "About", "Contact"],
      title: "A taste of authentic Italy.",
      subtitle: "Hand-crafted dishes made with passion, served in the heart of the city since 1985.",
      bgColor: "#1c1917",
      textColor: "#fafaf9",
      mutedColor: "#a8a29e",
      accentColor: "#dc2626",
      accentGradient: "linear-gradient(135deg, #dc2626, #ea580c)",
      cardBg: "#292524",
      borderColor: "#44403c",
      heroExtra: `<div style="display:flex;gap:12px;margin-top:2rem;justify-content:center"><a href="#" style="padding:14px 32px;background:linear-gradient(135deg,#dc2626,#ea580c);color:#fff;border-radius:12px;text-decoration:none;font-weight:600;font-size:1rem">Reserve a Table</a><a href="#" style="padding:14px 32px;border:1px solid #44403c;color:#fafaf9;border-radius:12px;text-decoration:none;font-weight:500;font-size:1rem">See Menu</a></div>`,
      sections: `
        <section style="padding:5rem 2rem;max-width:900px;margin:0 auto">
          <div style="text-align:center;margin-bottom:3rem"><p style="color:#dc2626;font-weight:600;font-size:0.85rem;letter-spacing:0.1em;text-transform:uppercase">Our Menu</p><h2 style="font-size:2rem;font-weight:700;color:#fafaf9">Signature Dishes</h2></div>
          <div style="display:flex;flex-direction:column;gap:1rem">
            <div style="display:flex;justify-content:space-between;align-items:center;padding:1.5rem 2rem;background:#292524;border:1px solid #44403c;border-radius:14px"><div><h3 style="color:#fafaf9;font-weight:600;margin-bottom:0.25rem">Pasta Carbonara</h3><p style="color:#a8a29e;font-size:0.85rem">Classic Roman recipe · Pancetta · Pecorino</p></div><span style="color:#dc2626;font-size:1.3rem;font-weight:700">$22</span></div>
            <div style="display:flex;justify-content:space-between;align-items:center;padding:1.5rem 2rem;background:#292524;border:1px solid #44403c;border-radius:14px"><div><h3 style="color:#fafaf9;font-weight:600;margin-bottom:0.25rem">Truffle Risotto</h3><p style="color:#a8a29e;font-size:0.85rem">Arborio rice · Black truffle · Parmigiano</p></div><span style="color:#dc2626;font-size:1.3rem;font-weight:700">$28</span></div>
            <div style="display:flex;justify-content:space-between;align-items:center;padding:1.5rem 2rem;background:#292524;border:1px solid #44403c;border-radius:14px"><div><h3 style="color:#fafaf9;font-weight:600;margin-bottom:0.25rem">Osso Buco</h3><p style="color:#a8a29e;font-size:0.85rem">Slow-braised veal shank · Gremolata · Saffron</p></div><span style="color:#dc2626;font-size:1.3rem;font-weight:700">$34</span></div>
          </div>
        </section>
        <section style="text-align:center;padding:5rem 2rem;background:#292524;margin-top:3rem"><h2 style="color:#fafaf9;font-size:1.8rem;font-weight:700;margin-bottom:0.75rem">Reserve Your Experience</h2><p style="color:#a8a29e;margin-bottom:2rem">Open Tuesday–Sunday, 5PM–11PM</p><a href="#" style="padding:14px 36px;background:linear-gradient(135deg,#dc2626,#ea580c);color:#fff;border-radius:12px;text-decoration:none;font-weight:600;font-size:1rem;display:inline-block">Book a Table</a></section>`,
    };
  }

  if (p.includes("contact") || p.includes("form")) {
    return {
      navBrand: "Connect",
      navLinks: ["Home", "About", "Contact"],
      title: "Let's build something together.",
      subtitle: "Have a project in mind? Drop us a message and we'll get back to you within 24 hours.",
      bgColor: "#fafafa",
      textColor: "#09090b",
      mutedColor: "#71717a",
      accentColor: "#16a34a",
      accentGradient: "linear-gradient(135deg, #16a34a, #059669)",
      cardBg: "#ffffff",
      borderColor: "#e4e4e7",
      sections: `
        <section style="padding:4rem 2rem;max-width:560px;margin:0 auto">
          <div style="background:#fff;border:1px solid #e4e4e7;border-radius:20px;padding:2.5rem;box-shadow:0 4px 24px rgba(0,0,0,0.04)">
            <div style="display:flex;flex-direction:column;gap:1.25rem">
              <div><label style="display:block;font-size:0.85rem;font-weight:500;color:#09090b;margin-bottom:0.5rem">Full Name</label><input type="text" placeholder="John Doe" style="width:100%;padding:12px 16px;border:1.5px solid #e4e4e7;border-radius:10px;font-size:0.95rem;font-family:inherit;outline:none;box-sizing:border-box" /></div>
              <div><label style="display:block;font-size:0.85rem;font-weight:500;color:#09090b;margin-bottom:0.5rem">Email</label><input type="email" placeholder="john@example.com" style="width:100%;padding:12px 16px;border:1.5px solid #e4e4e7;border-radius:10px;font-size:0.95rem;font-family:inherit;outline:none;box-sizing:border-box" /></div>
              <div><label style="display:block;font-size:0.85rem;font-weight:500;color:#09090b;margin-bottom:0.5rem">Message</label><textarea rows="5" placeholder="Tell us about your project..." style="width:100%;padding:12px 16px;border:1.5px solid #e4e4e7;border-radius:10px;font-size:0.95rem;font-family:inherit;outline:none;resize:vertical;box-sizing:border-box"></textarea></div>
              <button style="padding:14px;background:linear-gradient(135deg,#16a34a,#059669);color:#fff;border:none;border-radius:12px;font-size:1rem;font-weight:600;cursor:pointer;margin-top:0.5rem">Send Message</button>
            </div>
          </div>
        </section>`,
    };
  }

  // Default
  const words = prompt.trim().split(/\s+/);
  const title = words.slice(0, 6).map((w, i) => i === 0 ? w.charAt(0).toUpperCase() + w.slice(1) : w).join(" ");
  return {
    navBrand: "Sayo",
    navLinks: ["Features", "About", "Contact"],
    title: title || "Your AI-Generated Website",
    subtitle: prompt.length > 80 ? prompt.slice(0, 80) + "..." : prompt,
    bgColor: "#09090b",
    textColor: "#fafafa",
    mutedColor: "#a1a1aa",
    accentColor: "#dc2626",
    accentGradient: "linear-gradient(135deg, #dc2626, #f59e0b)",
    cardBg: "#18181b",
    borderColor: "#27272a",
    heroExtra: `<div style="display:flex;gap:12px;margin-top:2rem;justify-content:center"><a href="#" style="padding:14px 32px;background:linear-gradient(135deg,#dc2626,#f59e0b);color:#fff;border-radius:12px;text-decoration:none;font-weight:600">Get Started</a><a href="#" style="padding:14px 32px;border:1px solid #27272a;color:#fafafa;border-radius:12px;text-decoration:none;font-weight:500">Learn More</a></div>`,
    sections: `
      <section style="padding:5rem 2rem;max-width:1100px;margin:0 auto">
        <div style="text-align:center;margin-bottom:3rem"><p style="color:#dc2626;font-weight:600;font-size:0.85rem;letter-spacing:0.08em;text-transform:uppercase">Features</p><h2 style="font-size:2rem;font-weight:700;color:#fafafa">Built for you</h2></div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1.5rem">
          <div style="background:#18181b;border:1px solid #27272a;border-radius:16px;padding:2rem"><div style="font-size:1.5rem;margin-bottom:1rem">✨</div><h3 style="color:#fafafa;font-size:1.1rem;font-weight:600;margin-bottom:0.5rem">AI Generated</h3><p style="color:#a1a1aa;font-size:0.9rem;line-height:1.7">Custom built from your description with smart defaults.</p></div>
          <div style="background:#18181b;border:1px solid #27272a;border-radius:16px;padding:2rem"><div style="font-size:1.5rem;margin-bottom:1rem">🎯</div><h3 style="color:#fafafa;font-size:1.1rem;font-weight:600;margin-bottom:0.5rem">Production Ready</h3><p style="color:#a1a1aa;font-size:0.9rem;line-height:1.7">Responsive, accessible, and optimized for performance.</p></div>
          <div style="background:#18181b;border:1px solid #27272a;border-radius:16px;padding:2rem"><div style="font-size:1.5rem;margin-bottom:1rem">🚀</div><h3 style="color:#fafafa;font-size:1.1rem;font-weight:600;margin-bottom:0.5rem">One-Click Deploy</h3><p style="color:#a1a1aa;font-size:0.9rem;line-height:1.7">Publish instantly with a custom domain and SSL.</p></div>
        </div>
      </section>`,
  };
}

export function generateHTMLFromPrompt(prompt: string): string {
  const t = detectTemplate(prompt);
  const isDark = t.bgColor.startsWith("#0") || t.bgColor.startsWith("#1");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background: ${t.bgColor}; color: ${t.textColor}; min-height: 100vh; -webkit-font-smoothing: antialiased; }
    a { text-decoration: none; }

    /* Nav */
    nav { display: flex; align-items: center; justify-content: space-between; padding: 1rem 2.5rem; border-bottom: 1px solid ${t.borderColor}; backdrop-filter: blur(12px); position: sticky; top: 0; z-index: 50; background: ${t.bgColor}ee; }
    .nav-brand { font-size: 1.15rem; font-weight: 800; background: ${t.accentGradient}; -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .nav-links { display: flex; gap: 2rem; list-style: none; }
    .nav-links a { color: ${t.mutedColor}; font-size: 0.9rem; font-weight: 500; transition: color 0.2s; }
    .nav-links a:hover { color: ${t.textColor}; }
    .nav-cta { padding: 8px 20px; background: ${t.accentGradient}; color: #fff; border-radius: 8px; font-size: 0.85rem; font-weight: 600; }

    /* Hero */
    .hero { text-align: center; padding: 6rem 2rem 4rem; max-width: 800px; margin: 0 auto; }
    .hero-badge { display: inline-flex; align-items: center; gap: 6px; background: ${t.accentColor}15; color: ${t.accentColor}; font-size: 0.8rem; font-weight: 600; padding: 6px 16px; border-radius: 100px; margin-bottom: 1.5rem; border: 1px solid ${t.accentColor}30; }
    .hero h1 { font-size: clamp(2.2rem, 5vw, 3.5rem); font-weight: 800; line-height: 1.15; letter-spacing: -0.03em; margin-bottom: 1.25rem; color: ${t.textColor}; }
    .hero p { color: ${t.mutedColor}; font-size: 1.15rem; line-height: 1.7; max-width: 600px; margin: 0 auto; }

    /* Footer */
    footer { text-align: center; padding: 3rem 2rem; border-top: 1px solid ${t.borderColor}; color: ${t.mutedColor}; font-size: 0.8rem; margin-top: 4rem; }
    footer a { color: ${t.accentColor}; font-weight: 600; }

    @media (max-width: 768px) {
      nav { padding: 1rem 1.5rem; }
      .nav-links { display: none; }
      .hero { padding: 4rem 1.5rem 3rem; }
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

  <footer>Built with <a href="#">Sayo.ai</a> — AI Website Builder</footer>
</body>
</html>`;
}
