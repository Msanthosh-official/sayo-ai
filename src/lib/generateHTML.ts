// Prompt-based HTML generator - creates different previews based on keywords in the prompt

interface TemplateConfig {
  title: string;
  subtitle: string;
  bgColor: string;
  accentColor: string;
  accentGradient: string;
  sections: string;
}

function detectTemplate(prompt: string): TemplateConfig {
  const p = prompt.toLowerCase();

  if (p.includes("portfolio") || p.includes("personal")) {
    return {
      title: "John Doe — Creative Developer",
      subtitle: "I build beautiful digital experiences with code and creativity.",
      bgColor: "#0f172a",
      accentColor: "#38bdf8",
      accentGradient: "linear-gradient(135deg, #38bdf8, #818cf8)",
      sections: `
        <div class="cards">
          <div class="card"><h3>🎨 UI Design</h3><p>Crafting pixel-perfect interfaces</p></div>
          <div class="card"><h3>💻 Development</h3><p>React, TypeScript, Node.js</p></div>
          <div class="card"><h3>🚀 Performance</h3><p>Fast, accessible, SEO-ready</p></div>
        </div>
        <div class="projects">
          <h2>Featured Projects</h2>
          <div class="cards">
            <div class="card"><h3>E-Commerce App</h3><p>Full-stack shopping platform</p></div>
            <div class="card"><h3>Dashboard UI</h3><p>Analytics & data visualization</p></div>
            <div class="card"><h3>Mobile App</h3><p>Cross-platform React Native</p></div>
          </div>
        </div>`,
    };
  }

  if (p.includes("landing") || p.includes("startup") || p.includes("saas")) {
    return {
      title: "Launch Your Next Big Idea",
      subtitle: "The all-in-one platform to build, ship, and scale your SaaS product.",
      bgColor: "#fafafa",
      accentColor: "#7c3aed",
      accentGradient: "linear-gradient(135deg, #7c3aed, #ec4899)",
      sections: `
        <div class="features">
          <div class="cards">
            <div class="card"><h3>⚡ Lightning Fast</h3><p>Optimized for speed and performance</p></div>
            <div class="card"><h3>🔒 Secure</h3><p>Enterprise-grade security built in</p></div>
            <div class="card"><h3>📊 Analytics</h3><p>Real-time insights and metrics</p></div>
          </div>
        </div>
        <div class="pricing">
          <h2>Simple Pricing</h2>
          <div class="cards">
            <div class="card"><h3>Starter</h3><p class="price">$9/mo</p><p>Perfect for individuals</p></div>
            <div class="card highlight"><h3>Pro</h3><p class="price">$29/mo</p><p>For growing teams</p></div>
            <div class="card"><h3>Enterprise</h3><p class="price">Custom</p><p>For large organizations</p></div>
          </div>
        </div>`,
    };
  }

  if (p.includes("blog") || p.includes("article") || p.includes("magazine")) {
    return {
      title: "The Daily Digest",
      subtitle: "Stories, insights, and ideas that matter.",
      bgColor: "#fffbeb",
      accentColor: "#d97706",
      accentGradient: "linear-gradient(135deg, #d97706, #ea580c)",
      sections: `
        <div class="articles">
          <div class="cards">
            <div class="card"><span class="tag">Technology</span><h3>The Future of AI in Web Development</h3><p>How artificial intelligence is reshaping how we build...</p><span class="meta">5 min read • Mar 7, 2026</span></div>
            <div class="card"><span class="tag">Design</span><h3>Minimalism in Modern UI</h3><p>Why less is more in today's digital landscape...</p><span class="meta">3 min read • Mar 6, 2026</span></div>
            <div class="card"><span class="tag">Startup</span><h3>From Idea to MVP in 48 Hours</h3><p>A step-by-step guide to rapid prototyping...</p><span class="meta">7 min read • Mar 5, 2026</span></div>
          </div>
        </div>`,
    };
  }

  if (p.includes("ecommerce") || p.includes("e-commerce") || p.includes("shop") || p.includes("store")) {
    return {
      title: "StyleHub — Modern Fashion",
      subtitle: "Discover curated collections for every occasion.",
      bgColor: "#fdf2f8",
      accentColor: "#e11d48",
      accentGradient: "linear-gradient(135deg, #e11d48, #f59e0b)",
      sections: `
        <div class="products">
          <h2>Trending Now</h2>
          <div class="cards">
            <div class="card product"><div class="img-placeholder">👕</div><h3>Premium T-Shirt</h3><p class="price">$49.99</p><button class="btn-sm">Add to Cart</button></div>
            <div class="card product"><div class="img-placeholder">👟</div><h3>Running Shoes</h3><p class="price">$129.99</p><button class="btn-sm">Add to Cart</button></div>
            <div class="card product"><div class="img-placeholder">🎒</div><h3>Backpack</h3><p class="price">$79.99</p><button class="btn-sm">Add to Cart</button></div>
          </div>
        </div>`,
    };
  }

  if (p.includes("restaurant") || p.includes("food") || p.includes("cafe") || p.includes("menu")) {
    return {
      title: "Bella Cucina",
      subtitle: "Authentic Italian dining experience in the heart of the city.",
      bgColor: "#fef3c7",
      accentColor: "#92400e",
      accentGradient: "linear-gradient(135deg, #92400e, #dc2626)",
      sections: `
        <div class="menu">
          <h2>Our Menu</h2>
          <div class="cards">
            <div class="card"><h3>🍝 Pasta Carbonara</h3><p>Classic Roman recipe with pancetta</p><p class="price">$18</p></div>
            <div class="card"><h3>🍕 Margherita Pizza</h3><p>Fresh mozzarella, basil, tomato</p><p class="price">$16</p></div>
            <div class="card"><h3>🥗 Caesar Salad</h3><p>Crispy romaine, parmesan, croutons</p><p class="price">$12</p></div>
          </div>
        </div>
        <div class="cta-section"><h2>Reserve a Table</h2><p>Call us at (555) 123-4567 or book online</p><button class="btn">Book Now</button></div>`,
    };
  }

  if (p.includes("contact") || p.includes("form")) {
    return {
      title: "Get in Touch",
      subtitle: "We'd love to hear from you. Send us a message!",
      bgColor: "#f0fdf4",
      accentColor: "#16a34a",
      accentGradient: "linear-gradient(135deg, #16a34a, #2dd4bf)",
      sections: `
        <div class="form-section">
          <form class="contact-form">
            <input type="text" placeholder="Your Name" class="form-input" />
            <input type="email" placeholder="Email Address" class="form-input" />
            <textarea placeholder="Your Message" rows="4" class="form-input"></textarea>
            <button type="button" class="btn">Send Message</button>
          </form>
        </div>`,
    };
  }

  // Default: generate based on prompt words
  const words = prompt.trim().split(/\s+/);
  const title = words.slice(0, 4).join(" ");
  return {
    title: title.charAt(0).toUpperCase() + title.slice(1),
    subtitle: prompt.length > 60 ? prompt.slice(0, 60) + "..." : prompt,
    bgColor: "#f8fafc",
    accentColor: "#dc2626",
    accentGradient: "linear-gradient(135deg, #dc2626, #f59e0b)",
    sections: `
      <div class="cards">
        <div class="card"><h3>✨ AI Generated</h3><p>Built from your prompt</p></div>
        <div class="card"><h3>🎯 Custom Design</h3><p>Tailored to your needs</p></div>
        <div class="card"><h3>🚀 Ready to Deploy</h3><p>One-click publishing</p></div>
      </div>`,
  };
}

export function generateHTMLFromPrompt(prompt: string): string {
  const t = detectTemplate(prompt);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', system-ui, sans-serif; background: ${t.bgColor}; min-height: 100vh; color: #1f2937; }
    .hero { text-align: center; padding: 4rem 2rem 2rem; }
    h1 { font-size: 2.8rem; font-weight: 800; background: ${t.accentGradient}; -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 1rem; line-height: 1.2; }
    .hero > p { color: #6b7280; font-size: 1.15rem; max-width: 550px; margin: 0 auto 2rem; line-height: 1.6; }
    .btn { padding: 0.85rem 2.2rem; background: ${t.accentGradient}; color: white; border: none; border-radius: 12px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: transform 0.2s; }
    .btn:hover { transform: translateY(-2px); }
    .btn-sm { padding: 0.5rem 1.2rem; background: ${t.accentGradient}; color: white; border: none; border-radius: 8px; font-size: 0.85rem; font-weight: 600; cursor: pointer; }
    .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1.2rem; max-width: 700px; margin: 1.5rem auto; padding: 0 1rem; }
    .card { background: white; border-radius: 16px; padding: 1.8rem; box-shadow: 0 4px 20px rgba(0,0,0,0.06); transition: transform 0.2s; }
    .card:hover { transform: translateY(-4px); }
    .card h3 { color: ${t.accentColor}; font-size: 1.05rem; margin-bottom: 0.5rem; font-weight: 700; }
    .card p { font-size: 0.9rem; color: #9ca3af; line-height: 1.5; }
    .card .price { font-size: 1.4rem; font-weight: 800; color: ${t.accentColor}; margin: 0.5rem 0; }
    .card.highlight { border: 2px solid ${t.accentColor}; }
    .card .tag { display: inline-block; background: ${t.accentColor}15; color: ${t.accentColor}; font-size: 0.75rem; font-weight: 600; padding: 0.25rem 0.75rem; border-radius: 20px; margin-bottom: 0.75rem; }
    .card .meta { font-size: 0.8rem; color: #d1d5db; margin-top: 0.75rem; display: block; }
    .card .img-placeholder { font-size: 3rem; margin-bottom: 0.75rem; }
    h2 { text-align: center; font-size: 1.8rem; font-weight: 700; margin: 3rem 0 1rem; color: #374151; }
    .projects, .features, .pricing, .articles, .menu, .products { padding: 1rem 2rem; }
    .cta-section { text-align: center; padding: 3rem 2rem; }
    .cta-section p { color: #6b7280; margin: 0.5rem 0 1.5rem; }
    .form-section { max-width: 500px; margin: 0 auto; padding: 2rem; }
    .contact-form { display: flex; flex-direction: column; gap: 1rem; }
    .form-input { padding: 0.85rem 1rem; border: 1.5px solid #e5e7eb; border-radius: 10px; font-size: 1rem; font-family: inherit; outline: none; transition: border-color 0.2s; }
    .form-input:focus { border-color: ${t.accentColor}; }
    footer { text-align: center; padding: 2rem; color: #9ca3af; font-size: 0.85rem; margin-top: 2rem; border-top: 1px solid #f3f4f6; }
  </style>
</head>
<body>
  <div class="hero">
    <h1>${t.title}</h1>
    <p>${t.subtitle}</p>
    <button class="btn">Get Started</button>
  </div>
  ${t.sections}
  <footer>Built with Sayo.ai — AI Website Builder</footer>
</body>
</html>`;
}
