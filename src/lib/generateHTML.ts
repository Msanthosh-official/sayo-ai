// Dynamic prompt-based HTML generator — builds unique sites from any prompt

interface ParsedPrompt {
  brandName: string;
  tagline: string;
  description: string;
  type: string;
  colorScheme: { bg: string; text: string; muted: string; accent: string; accentGradient: string; card: string; border: string; heroPattern: string; };
  font: { url: string; family: string; display?: string; displayUrl?: string; };
  sections: string[];
  features: { title: string; desc: string; emoji: string }[];
  navLinks: string[];
  tone: "dark" | "light";
  items: { name: string; desc: string; price?: string; emoji: string }[];
}

const COLOR_THEMES = {
  tech: { bg: "#09090b", text: "#fafafa", muted: "#71717a", accent: "#8b5cf6", accentGradient: "linear-gradient(135deg,#8b5cf6,#06b6d4)", card: "#18181b", border: "#27272a", heroPattern: "radial-gradient(circle at 20% 50%,#8b5cf620 0%,transparent 50%),radial-gradient(circle at 80% 50%,#06b6d415 0%,transparent 50%)" },
  warm: { bg: "#0f0d0a", text: "#f5f0e8", muted: "#9c9588", accent: "#ea580c", accentGradient: "linear-gradient(135deg,#ea580c,#f59e0b)", card: "#1a1714", border: "#2a2520", heroPattern: "radial-gradient(ellipse at 30% 0%,#ea580c15 0%,transparent 60%),radial-gradient(ellipse at 70% 100%,#f59e0b10 0%,transparent 60%)" },
  elegant: { bg: "#fafaf8", text: "#1a1a1a", muted: "#7a7a7a", accent: "#1a1a1a", accentGradient: "linear-gradient(135deg,#1a1a1a,#4a4a4a)", card: "#ffffff", border: "#e8e8e5", heroPattern: "linear-gradient(180deg,#f5f5f0 0%,#fafaf8 100%)" },
  creative: { bg: "#050505", text: "#f5f5f5", muted: "#8b8b8b", accent: "#ec4899", accentGradient: "linear-gradient(135deg,#ec4899,#8b5cf6)", card: "#111111", border: "#1e1e1e", heroPattern: "radial-gradient(circle at 50% 0%,#ec489918 0%,transparent 50%),radial-gradient(circle at 0% 100%,#8b5cf612 0%,transparent 50%)" },
  nature: { bg: "#f0f7f0", text: "#1a2e1a", muted: "#5c7a5c", accent: "#16a34a", accentGradient: "linear-gradient(135deg,#16a34a,#059669)", card: "#ffffff", border: "#c8e0c8", heroPattern: "radial-gradient(ellipse at 50% 100%,#16a34a08 0%,transparent 70%)" },
  bold: { bg: "#09090b", text: "#fafafa", muted: "#a1a1aa", accent: "#dc2626", accentGradient: "linear-gradient(135deg,#dc2626,#f59e0b)", card: "#18181b", border: "#27272a", heroPattern: "radial-gradient(circle at 80% 20%,#dc262618 0%,transparent 50%),radial-gradient(circle at 20% 80%,#f59e0b10 0%,transparent 50%)" },
  ocean: { bg: "#0c1222", text: "#e2e8f0", muted: "#64748b", accent: "#0ea5e9", accentGradient: "linear-gradient(135deg,#0ea5e9,#6366f1)", card: "#1e293b", border: "#334155", heroPattern: "radial-gradient(ellipse at 50% 0%,#0ea5e918 0%,transparent 60%),radial-gradient(ellipse at 50% 100%,#6366f110 0%,transparent 60%)" },
  luxury: { bg: "#0a0a0a", text: "#f5f0e0", muted: "#8a8070", accent: "#b8860b", accentGradient: "linear-gradient(135deg,#b8860b,#d4a574)", card: "#151510", border: "#2a2520", heroPattern: "radial-gradient(circle at 50% 30%,#b8860b12 0%,transparent 50%)" },
  editorial: { bg: "#faf9f7", text: "#1a1a1a", muted: "#6b6b6b", accent: "#ef4444", accentGradient: "linear-gradient(135deg,#ef4444,#f97316)", card: "#ffffff", border: "#ebebeb", heroPattern: "linear-gradient(180deg,#fef2f2 0%,#faf9f7 50%)" },
  midnight: { bg: "#0f0f1a", text: "#e8e8f0", muted: "#7070a0", accent: "#818cf8", accentGradient: "linear-gradient(135deg,#818cf8,#c084fc)", card: "#1a1a2e", border: "#2a2a40", heroPattern: "radial-gradient(circle at 30% 20%,#818cf815 0%,transparent 50%),radial-gradient(circle at 70% 80%,#c084fc10 0%,transparent 50%)" },
  sunset: { bg: "#1a0a0a", text: "#fde8d8", muted: "#a08070", accent: "#f97316", accentGradient: "linear-gradient(135deg,#f97316,#ef4444)", card: "#1f1210", border: "#3a2520", heroPattern: "radial-gradient(ellipse at 40% 0%,#f9731618 0%,transparent 50%),radial-gradient(ellipse at 60% 100%,#ef444412 0%,transparent 50%)" },
  forest: { bg: "#0a1210", text: "#d8f0e0", muted: "#608070", accent: "#059669", accentGradient: "linear-gradient(135deg,#059669,#14b8a6)", card: "#101a16", border: "#1a2e24", heroPattern: "radial-gradient(circle at 20% 80%,#05966915 0%,transparent 50%)" },
  royal: { bg: "#0e0a18", text: "#e8e0f8", muted: "#8070a0", accent: "#a855f7", accentGradient: "linear-gradient(135deg,#a855f7,#ec4899)", card: "#1a1428", border: "#2a2040", heroPattern: "radial-gradient(circle at 50% 0%,#a855f718 0%,transparent 50%),radial-gradient(circle at 50% 100%,#ec489910 0%,transparent 60%)" },
  sand: { bg: "#faf6f0", text: "#2a2018", muted: "#8a7a68", accent: "#b45309", accentGradient: "linear-gradient(135deg,#b45309,#d97706)", card: "#fff8f0", border: "#e8dcc8", heroPattern: "linear-gradient(180deg,#fef3c7 0%,#faf6f0 60%)" },
  arctic: { bg: "#f0f8ff", text: "#1a2838", muted: "#6080a0", accent: "#2563eb", accentGradient: "linear-gradient(135deg,#2563eb,#0ea5e9)", card: "#ffffff", border: "#d0e4f0", heroPattern: "radial-gradient(ellipse at 50% 0%,#2563eb08 0%,transparent 60%)" },
};

const FONTS = {
  modern: { url: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap", family: "'Plus Jakarta Sans'" },
  elegant: { url: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap", family: "'Inter'", display: "'Cormorant Garamond',serif", displayUrl: "" },
  creative: { url: "https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap", family: "'Sora'" },
  editorial: { url: "https://fonts.googleapis.com/css2?family=Fraunces:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600&display=swap", family: "'Inter'", display: "'Fraunces',serif" },
  clean: { url: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap", family: "'DM Sans'" },
  playful: { url: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap", family: "'Space Grotesk'" },
};

function parsePrompt(prompt: string): ParsedPrompt {
  const p = prompt.toLowerCase();
  const words = prompt.trim().split(/\s+/);

  // Extract brand name from prompt
  let brandName = "Sayo";
  const namePatterns = [
    /(?:called|named|for|brand)\s+["']?([A-Z][a-zA-Z0-9\s&]+?)["']?(?:\s|,|\.|\b(?:with|that|a|an|the|website|site|page|app))/i,
    /^["']?([A-Z][a-zA-Z0-9\s&]{1,20})["']?\s*[-–—:]/i,
  ];
  for (const pat of namePatterns) {
    const m = prompt.match(pat);
    if (m) { brandName = m[1].trim(); break; }
  }
  if (brandName === "Sayo") {
    // Use context words as brand
    const contextWords = words.filter(w => !["a","an","the","for","with","and","or","but","in","on","at","to","of","my","me","i","want","need","create","make","build","website","site","page","web","app","like","good","great","best","modern","beautiful","stunning","professional","simple","clean","cool","nice"].includes(w.toLowerCase()));
    if (contextWords.length > 0) {
      brandName = contextWords.slice(0, 2).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
    }
  }

  // Detect type
  let type = "generic";
  const typeMap: Record<string, string[]> = {
    portfolio: ["portfolio","personal","resume","cv","freelance","developer","designer"],
    ecommerce: ["ecommerce","e-commerce","shop","store","product","buy","sell","retail","fashion","clothing","jewelry"],
    restaurant: ["restaurant","food","cafe","coffee","menu","dining","bakery","pizza","sushi","bar","pub","bistro","kitchen"],
    blog: ["blog","article","magazine","news","journal","stories","writing","publication","media"],
    saas: ["saas","platform","tool","dashboard","analytics","software","startup","app","api","cloud","service"],
    agency: ["agency","studio","creative","design","marketing","consulting","firm","services"],
    fitness: ["fitness","gym","workout","health","yoga","training","sport","wellness","coach"],
    education: ["education","school","course","learning","academy","university","tutor","teach","class"],
    travel: ["travel","hotel","booking","tour","vacation","resort","destination","flight","adventure"],
    photography: ["photography","photo","gallery","photographer","camera","visual","shots","album"],
    music: ["music","band","artist","album","concert","song","dj","producer","record"],
    real_estate: ["real estate","property","apartment","house","rent","listing","realty","home"],
    medical: ["medical","health","clinic","doctor","hospital","dental","therapy","care","patient"],
    nonprofit: ["nonprofit","charity","donate","cause","volunteer","foundation","ngo","community"],
    event: ["event","conference","summit","meetup","wedding","party","festival","ticket"],
  };
  for (const [t, keywords] of Object.entries(typeMap)) {
    if (keywords.some(k => p.includes(k))) { type = t; break; }
  }

  // Pick color scheme based on type + prompt keywords
  let colorKey = "tech";
  if (p.includes("dark") || p.includes("night") || p.includes("midnight")) colorKey = "midnight";
  else if (p.includes("luxury") || p.includes("premium") || p.includes("gold")) colorKey = "luxury";
  else if (p.includes("nature") || p.includes("green") || p.includes("eco") || p.includes("organic")) colorKey = "nature";
  else if (p.includes("bold") || p.includes("red") || p.includes("fire") || p.includes("energy")) colorKey = "bold";
  else if (p.includes("ocean") || p.includes("blue") || p.includes("sea") || p.includes("water")) colorKey = "ocean";
  else if (p.includes("creative") || p.includes("art") || p.includes("pink") || p.includes("fun")) colorKey = "creative";
  else if (p.includes("clean") || p.includes("minimal") || p.includes("white") || p.includes("light")) colorKey = "elegant";
  else if (p.includes("warm") || p.includes("orange") || p.includes("cozy")) colorKey = "warm";
  else {
    const typeColorMap: Record<string, string> = {
      portfolio: "creative", ecommerce: "sand", restaurant: "warm", blog: "editorial",
      saas: "tech", agency: "midnight", fitness: "bold", education: "arctic",
      travel: "ocean", photography: "royal", music: "sunset", real_estate: "elegant",
      medical: "forest", nonprofit: "nature", event: "bold",
    };
    colorKey = typeColorMap[type] || "tech";
  }
  const colorScheme = COLOR_THEMES[colorKey as keyof typeof COLOR_THEMES];
  const tone = ["elegant", "nature", "editorial", "sand", "arctic"].includes(colorKey) ? "light" : "dark" as "dark" | "light";

  // Pick font
  let fontKey = "modern";
  if (["restaurant", "ecommerce", "luxury", "real_estate"].some(t => type === t)) fontKey = "elegant";
  else if (["blog", "editorial"].some(t => type === t || p.includes(t))) fontKey = "editorial";
  else if (["portfolio", "photography", "music"].some(t => type === t)) fontKey = "creative";
  else if (["fitness", "event"].some(t => type === t)) fontKey = "playful";
  else if (["saas", "agency"].some(t => type === t)) fontKey = "clean";
  const font = FONTS[fontKey as keyof typeof FONTS];

  // Generate relevant content
  const contentGen = getContentForType(type, prompt, brandName);

  return {
    brandName,
    tagline: contentGen.tagline,
    description: contentGen.description,
    type,
    colorScheme,
    font,
    sections: contentGen.sections,
    features: contentGen.features,
    navLinks: contentGen.navLinks,
    tone,
    items: contentGen.items,
  };
}

interface ContentData {
  tagline: string;
  description: string;
  navLinks: string[];
  sections: string[];
  features: { title: string; desc: string; emoji: string }[];
  items: { name: string; desc: string; price?: string; emoji: string }[];
}

function getContentForType(type: string, prompt: string, brand: string): ContentData {
  const p = prompt.toLowerCase();

  const contentMap: Record<string, ContentData> = {
    portfolio: {
      tagline: `I create <span class='grad'>digital experiences</span> that matter`,
      description: "Designer & developer crafting thoughtful, performant web experiences. Currently available for new projects.",
      navLinks: ["Work", "About", "Skills", "Contact"],
      sections: ["projects", "skills", "contact"],
      features: [
        { title: "UI/UX Design", desc: "Creating intuitive interfaces with a focus on user delight and accessibility.", emoji: "🎨" },
        { title: "Frontend Dev", desc: "Building responsive, performant applications with modern frameworks.", emoji: "⚡" },
        { title: "Brand Identity", desc: "Developing cohesive visual systems that tell your brand's story.", emoji: "💎" },
      ],
      items: [
        { name: "E-Commerce Redesign", desc: "Complete UI overhaul resulting in 40% conversion increase", emoji: "🛍️" },
        { name: "SaaS Dashboard", desc: "Real-time analytics platform for enterprise clients", emoji: "📊" },
        { name: "Mobile Banking App", desc: "Fintech app serving 100K+ daily active users", emoji: "💳" },
        { name: "Brand Identity System", desc: "Full visual identity for a sustainable fashion startup", emoji: "🎯" },
      ],
    },
    ecommerce: {
      tagline: `Discover your <span class='grad'>signature style</span>`,
      description: p.includes("jewelry") ? "Handcrafted pieces that tell your story. Ethically sourced, beautifully designed." :
        p.includes("fashion") || p.includes("clothing") ? "Curated collections blending timeless elegance with modern design." :
        "Premium products curated for quality, designed for life. Free shipping on orders over $100.",
      navLinks: ["Shop", "Collections", "New In", "Sale"],
      sections: ["products", "features", "newsletter"],
      features: [
        { title: "Free Shipping", desc: "Complimentary delivery on all orders over $100 worldwide.", emoji: "🚚" },
        { title: "Easy Returns", desc: "30-day hassle-free returns. No questions asked.", emoji: "↩️" },
        { title: "Secure Payment", desc: "256-bit SSL encryption. Apple Pay, Google Pay accepted.", emoji: "🔒" },
      ],
      items: p.includes("jewelry") ? [
        { name: "Aurora Pendant", desc: "18k gold · Lab-grown diamond", price: "$285", emoji: "✨" },
        { name: "Luna Ring", desc: "Sterling silver · Moonstone", price: "$165", emoji: "💍" },
        { name: "Soleil Earrings", desc: "Gold vermeil · Citrine drops", price: "$195", emoji: "🌟" },
        { name: "Celestial Bracelet", desc: "Rose gold · Star charms", price: "$220", emoji: "⭐" },
      ] : p.includes("fashion") || p.includes("clothing") ? [
        { name: "Merino Wool Sweater", desc: "Italian yarn · Relaxed fit", price: "$185", emoji: "🧥" },
        { name: "Linen Trousers", desc: "Japanese linen · High waist", price: "$145", emoji: "👖" },
        { name: "Silk Blend Shirt", desc: "Mulberry silk · Classic cut", price: "$210", emoji: "👔" },
        { name: "Canvas Sneakers", desc: "Organic cotton · Rubber sole", price: "$95", emoji: "👟" },
      ] : [
        { name: "Premium Collection", desc: "Our finest curated selection", price: "$299", emoji: "⭐" },
        { name: "Essential Series", desc: "Everyday luxury essentials", price: "$149", emoji: "💎" },
        { name: "Limited Edition", desc: "Exclusive small-batch items", price: "$399", emoji: "🔥" },
        { name: "Starter Pack", desc: "Perfect introduction set", price: "$89", emoji: "🎁" },
      ],
    },
    restaurant: {
      tagline: `Where flavor meets <span class='grad'>artistry</span>`,
      description: p.includes("sushi") ? "Omakase experience with the freshest seasonal fish. Reservations recommended." :
        p.includes("pizza") ? "Wood-fired Neapolitan pizza made with imported Italian ingredients." :
        p.includes("cafe") || p.includes("coffee") ? "Specialty coffee and artisan pastries in a cozy atmosphere." :
        "Farm-to-table cuisine celebrating local ingredients and seasonal flavors.",
      navLinks: ["Menu", "Reserve", "Story", "Events"],
      sections: ["menu", "testimonial", "reservation"],
      features: [
        { title: "Farm to Table", desc: "Ingredients sourced from local farms within 50 miles.", emoji: "🌱" },
        { title: "Award Winning", desc: "Recognized by Michelin Guide and James Beard Foundation.", emoji: "🏆" },
        { title: "Private Dining", desc: "Intimate spaces for celebrations up to 40 guests.", emoji: "🍷" },
      ],
      items: p.includes("sushi") ? [
        { name: "Omakase Course", desc: "12-piece chef's selection · seasonal fish", price: "$120", emoji: "🍣" },
        { name: "Dragon Roll", desc: "Eel · avocado · tobiko · unagi sauce", price: "$22", emoji: "🐉" },
        { name: "Wagyu Tataki", desc: "A5 seared · ponzu · microgreens", price: "$38", emoji: "🥩" },
        { name: "Matcha Tiramisu", desc: "Ceremonial grade · mascarpone", price: "$14", emoji: "🍵" },
      ] : p.includes("pizza") ? [
        { name: "Margherita DOP", desc: "San Marzano · fior di latte · basil", price: "$18", emoji: "🍕" },
        { name: "Truffle Bianca", desc: "Black truffle · ricotta · mozzarella", price: "$24", emoji: "🍄" },
        { name: "Diavola", desc: "Spicy salami · Calabrian chili · honey", price: "$20", emoji: "🌶️" },
        { name: "Burrata Salad", desc: "Heirloom tomato · arugula · aged balsamic", price: "$16", emoji: "🥗" },
      ] : p.includes("cafe") || p.includes("coffee") ? [
        { name: "Pour Over", desc: "Single origin · rotating selection", price: "$6", emoji: "☕" },
        { name: "Oat Latte", desc: "Double shot · house-made oat milk", price: "$7", emoji: "🥛" },
        { name: "Croissant", desc: "Butter · 72-hour laminated dough", price: "$5", emoji: "🥐" },
        { name: "Açaí Bowl", desc: "Organic açaí · granola · seasonal fruit", price: "$14", emoji: "🫐" },
      ] : [
        { name: "Herb-Crusted Salmon", desc: "Wild-caught · dill cream · roasted vegetables", price: "$34", emoji: "🐟" },
        { name: "Braised Short Rib", desc: "Red wine reduction · truffle mash · gremolata", price: "$42", emoji: "🥩" },
        { name: "Seasonal Risotto", desc: "Arborio rice · parmesan · market vegetables", price: "$28", emoji: "🍚" },
        { name: "Chocolate Fondant", desc: "Valrhona · vanilla bean ice cream · berries", price: "$16", emoji: "🍫" },
      ],
    },
    blog: {
      tagline: `Stories that <span class='grad'>inspire action</span>`,
      description: "Deep explorations at the intersection of technology, design, and culture. Written by builders, for builders.",
      navLinks: ["Latest", "Topics", "About", "Subscribe"],
      sections: ["featured", "articles", "newsletter"],
      features: [
        { title: "Technology", desc: "Deep dives into emerging tech and development practices.", emoji: "💻" },
        { title: "Design", desc: "Visual thinking, UX patterns, and creative processes.", emoji: "🎨" },
        { title: "Culture", desc: "The human side of building digital products.", emoji: "🌍" },
      ],
      items: [
        { name: "The Future of AI-First Development", desc: "How language models are reshaping software engineering workflows", emoji: "🤖" },
        { name: "Design Systems at Scale", desc: "Lessons from maintaining a design system across 200+ components", emoji: "📐" },
        { name: "Remote Work is Evolving", desc: "Why async-first culture beats traditional remote work", emoji: "🏠" },
        { name: "From Concept to Launch in 48 Hours", desc: "A practical guide to rapid prototyping and validation", emoji: "🚀" },
      ],
    },
    saas: {
      tagline: `The modern platform <span class='grad'>for builders</span>`,
      description: "Ship products 10x faster with AI-powered development, real-time collaboration, and one-click deployments.",
      navLinks: ["Features", "Pricing", "Docs", "Blog"],
      sections: ["dashboard", "features", "pricing", "cta"],
      features: [
        { title: "Lightning Fast", desc: "Sub-100ms response times with edge computing and intelligent caching.", emoji: "⚡" },
        { title: "Enterprise Security", desc: "SOC 2 compliant. End-to-end encryption and SSO out of the box.", emoji: "🔒" },
        { title: "AI-Powered", desc: "Built-in AI that understands your codebase for intelligent suggestions.", emoji: "🤖" },
      ],
      items: [
        { name: "Starter", desc: "3 projects · Community support", price: "Free", emoji: "🌱" },
        { name: "Pro", desc: "Unlimited projects · Priority support · Custom domains", price: "$29/mo", emoji: "⚡" },
        { name: "Enterprise", desc: "SSO · SLA · Dedicated support · Custom integrations", price: "Custom", emoji: "🏢" },
      ],
    },
    agency: {
      tagline: `We build <span class='grad'>digital products</span> people love`,
      description: "A full-service digital studio specializing in brand strategy, product design, and web development.",
      navLinks: ["Work", "Services", "About", "Contact"],
      sections: ["projects", "services", "clients"],
      features: [
        { title: "Brand Strategy", desc: "Research-driven positioning that resonates with your audience.", emoji: "🎯" },
        { title: "Product Design", desc: "User-centered design from concept to polished interfaces.", emoji: "🎨" },
        { title: "Development", desc: "Scalable, performant applications built with modern tech.", emoji: "⚙️" },
      ],
      items: [
        { name: "Fintech Startup Rebrand", desc: "Complete visual identity and product redesign", emoji: "💳" },
        { name: "E-Commerce Platform", desc: "Custom shopping experience for luxury brand", emoji: "👜" },
        { name: "Healthcare App", desc: "Patient portal serving 500K+ users", emoji: "🏥" },
        { name: "SaaS Marketing Site", desc: "High-converting landing pages with 3x ROI", emoji: "📈" },
      ],
    },
    fitness: {
      tagline: `Transform your body, <span class='grad'>elevate your life</span>`,
      description: "Expert-led training programs, nutrition coaching, and a community that pushes you to be your best.",
      navLinks: ["Programs", "Coaches", "Schedule", "Join"],
      sections: ["programs", "trainers", "cta"],
      features: [
        { title: "Personal Training", desc: "1-on-1 sessions tailored to your goals and fitness level.", emoji: "💪" },
        { title: "Nutrition Plans", desc: "Custom meal plans designed by certified nutritionists.", emoji: "🥗" },
        { title: "Group Classes", desc: "High-energy sessions from HIIT to yoga, 7 days a week.", emoji: "🏃" },
      ],
      items: [
        { name: "Strength Foundations", desc: "8-week program · Build muscle & confidence", price: "$49/mo", emoji: "🏋️" },
        { name: "HIIT Cardio Blast", desc: "6-week program · Burn fat & boost endurance", price: "$39/mo", emoji: "🔥" },
        { name: "Yoga & Mobility", desc: "Ongoing · Flexibility & recovery focus", price: "$29/mo", emoji: "🧘" },
        { name: "Elite Performance", desc: "12-week program · Competition prep", price: "$99/mo", emoji: "🏆" },
      ],
    },
    education: {
      tagline: `Learn skills that <span class='grad'>shape the future</span>`,
      description: "Expert-crafted courses in technology, design, and business. Learn at your pace, build real projects.",
      navLinks: ["Courses", "Paths", "Community", "Pricing"],
      sections: ["courses", "features", "testimonials"],
      features: [
        { title: "Project-Based", desc: "Learn by building real-world projects with expert guidance.", emoji: "🛠️" },
        { title: "Expert Instructors", desc: "Learn from industry professionals at top companies.", emoji: "👨‍🏫" },
        { title: "Certificates", desc: "Earn recognized credentials to boost your career.", emoji: "📜" },
      ],
      items: [
        { name: "Full-Stack Web Development", desc: "React, Node.js, databases · 12 weeks", price: "$499", emoji: "💻" },
        { name: "UX/UI Design Mastery", desc: "Figma, research, prototyping · 8 weeks", price: "$399", emoji: "🎨" },
        { name: "Data Science with Python", desc: "ML, analytics, visualization · 10 weeks", price: "$449", emoji: "📊" },
        { name: "Digital Marketing", desc: "SEO, ads, social strategy · 6 weeks", price: "$299", emoji: "📱" },
      ],
    },
    travel: {
      tagline: `Discover your next <span class='grad'>adventure</span>`,
      description: "Curated travel experiences that connect you with authentic cultures, hidden gems, and unforgettable moments.",
      navLinks: ["Destinations", "Experiences", "Plan", "About"],
      sections: ["destinations", "features", "newsletter"],
      features: [
        { title: "Local Guides", desc: "Experience destinations through knowledgeable local experts.", emoji: "🗺️" },
        { title: "Handpicked Stays", desc: "Boutique hotels and unique accommodations vetted by our team.", emoji: "🏨" },
        { title: "24/7 Support", desc: "Dedicated travel concierge available around the clock.", emoji: "📞" },
      ],
      items: [
        { name: "Kyoto Cultural Immersion", desc: "7 days · Temples, tea ceremonies, local cuisine", price: "$2,499", emoji: "⛩️" },
        { name: "Amalfi Coast Road Trip", desc: "5 days · Coastal drives, wine tours, beaches", price: "$1,899", emoji: "🏖️" },
        { name: "Iceland Northern Lights", desc: "4 days · Hot springs, glaciers, aurora hunting", price: "$2,199", emoji: "🌌" },
        { name: "Marrakech Discovery", desc: "6 days · Souks, desert camp, Atlas Mountains", price: "$1,699", emoji: "🏜️" },
      ],
    },
    photography: {
      tagline: `Capturing moments that <span class='grad'>last forever</span>`,
      description: "Professional photography services for weddings, portraits, brands, and editorial. Based in New York.",
      navLinks: ["Portfolio", "Services", "About", "Book"],
      sections: ["gallery", "services", "contact"],
      features: [
        { title: "Weddings", desc: "Timeless, documentary-style wedding photography.", emoji: "💒" },
        { title: "Portraits", desc: "Natural light portraits that reveal authentic personality.", emoji: "📸" },
        { title: "Commercial", desc: "Product and brand photography for digital and print.", emoji: "🏢" },
      ],
      items: [
        { name: "Mountain Dawn", desc: "Landscape · Colorado Rockies", emoji: "🏔️" },
        { name: "Urban Rhythm", desc: "Street · New York City", emoji: "🌆" },
        { name: "Golden Hour Portrait", desc: "Portrait · Natural light", emoji: "🌅" },
        { name: "Product Flatlay", desc: "Commercial · Beauty brand", emoji: "✨" },
      ],
    },
    music: {
      tagline: `Feel the <span class='grad'>rhythm</span>`,
      description: "New album 'Echoes' out now. Tour dates, music, merch, and more.",
      navLinks: ["Music", "Tour", "Merch", "About"],
      sections: ["latest", "tour", "merch"],
      features: [
        { title: "Stream Now", desc: "Available on Spotify, Apple Music, and all platforms.", emoji: "🎵" },
        { title: "Live Shows", desc: "Intimate venues and festival stages worldwide.", emoji: "🎤" },
        { title: "Exclusive Merch", desc: "Limited edition drops and tour exclusives.", emoji: "👕" },
      ],
      items: [
        { name: "Echoes (Album)", desc: "12 tracks · Released 2026", emoji: "💿" },
        { name: "NYC – Brooklyn Steel", desc: "Mar 28 · Doors 7pm", price: "$45", emoji: "🗽" },
        { name: "LA – The Wiltern", desc: "Apr 5 · Doors 8pm", price: "$50", emoji: "🌴" },
        { name: "London – Brixton Academy", desc: "Apr 18 · Doors 7:30pm", price: "£40", emoji: "🇬🇧" },
      ],
    },
    real_estate: {
      tagline: `Find your perfect <span class='grad'>place</span>`,
      description: "Premium residential and commercial properties. Expert guidance through every step of your journey.",
      navLinks: ["Listings", "Sell", "About", "Contact"],
      sections: ["listings", "services", "cta"],
      features: [
        { title: "Expert Agents", desc: "Dedicated professionals with deep local market knowledge.", emoji: "👤" },
        { title: "Virtual Tours", desc: "Explore properties from anywhere with 3D walkthroughs.", emoji: "🏠" },
        { title: "Market Analysis", desc: "Data-driven pricing and investment insights.", emoji: "📊" },
      ],
      items: [
        { name: "Modern Loft – SoHo", desc: "2BR · 1,200 sqft · Floor-to-ceiling windows", price: "$1.2M", emoji: "🏙️" },
        { name: "Beachfront Villa", desc: "4BR · Ocean view · Private pool", price: "$2.8M", emoji: "🏖️" },
        { name: "Downtown Penthouse", desc: "3BR · Rooftop terrace · 360° views", price: "$3.5M", emoji: "🌆" },
        { name: "Suburban Family Home", desc: "5BR · Large garden · Top-rated schools", price: "$850K", emoji: "🏡" },
      ],
    },
    medical: {
      tagline: `Your health, <span class='grad'>our priority</span>`,
      description: "Comprehensive healthcare with a patient-first approach. Accepting new patients.",
      navLinks: ["Services", "Doctors", "Book", "About"],
      sections: ["services", "team", "booking"],
      features: [
        { title: "General Care", desc: "Preventive health, checkups, and chronic condition management.", emoji: "🩺" },
        { title: "Telehealth", desc: "Virtual appointments from the comfort of your home.", emoji: "💻" },
        { title: "Specialists", desc: "Access to a network of board-certified specialists.", emoji: "👨‍⚕️" },
      ],
      items: [
        { name: "Annual Checkup", desc: "Comprehensive health assessment", emoji: "📋" },
        { name: "Virtual Consultation", desc: "Video appointment · Same-day available", emoji: "📱" },
        { name: "Lab Work & Testing", desc: "Full panel · Results in 24 hours", emoji: "🔬" },
        { name: "Wellness Program", desc: "Personalized health plan · Ongoing support", emoji: "💪" },
      ],
    },
    nonprofit: {
      tagline: `Together, we can <span class='grad'>change the world</span>`,
      description: "Empowering communities through education, healthcare, and sustainable development since 2010.",
      navLinks: ["Mission", "Impact", "Get Involved", "Donate"],
      sections: ["impact", "programs", "donate"],
      features: [
        { title: "Education", desc: "Building schools and training teachers in underserved areas.", emoji: "📚" },
        { title: "Healthcare", desc: "Mobile clinics providing free care to remote communities.", emoji: "🏥" },
        { title: "Sustainability", desc: "Clean water and renewable energy projects.", emoji: "🌱" },
      ],
      items: [
        { name: "50,000+", desc: "Students educated through our programs", emoji: "🎓" },
        { name: "120", desc: "Communities served across 15 countries", emoji: "🌍" },
        { name: "95¢", desc: "Of every dollar goes directly to programs", emoji: "💚" },
        { name: "200+", desc: "Active volunteers worldwide", emoji: "🤝" },
      ],
    },
    event: {
      tagline: `The event of <span class='grad'>the year</span>`,
      description: "Join industry leaders, innovators, and creators for two days of talks, workshops, and networking.",
      navLinks: ["Speakers", "Schedule", "Tickets", "FAQ"],
      sections: ["speakers", "schedule", "tickets"],
      features: [
        { title: "30+ Speakers", desc: "World-class experts sharing cutting-edge insights.", emoji: "🎤" },
        { title: "Workshops", desc: "Hands-on sessions to level up your skills.", emoji: "🛠️" },
        { title: "Networking", desc: "Connect with 2,000+ attendees from around the world.", emoji: "🤝" },
      ],
      items: [
        { name: "Early Bird", desc: "Full access · All sessions · Lunch included", price: "$199", emoji: "🎟️" },
        { name: "Regular", desc: "Full access · All sessions · Lunch included", price: "$349", emoji: "🎫" },
        { name: "VIP", desc: "Front row · Speaker dinner · Exclusive swag", price: "$599", emoji: "⭐" },
        { name: "Group (5+)", desc: "20% discount · Team coordination", price: "$279/ea", emoji: "👥" },
      ],
    },
  };

  const content = contentMap[type] || {
    tagline: `Build something <span class='grad'>extraordinary</span>`,
    description: prompt.length > 120 ? prompt.slice(0, 120) + "..." : prompt || "Transform your ideas into reality with cutting-edge technology.",
    navLinks: ["Features", "About", "Pricing", "Contact"],
    sections: ["features", "about", "cta"],
    features: [
      { title: "Powerful & Fast", desc: "Built for performance with modern architecture and optimized delivery.", emoji: "⚡" },
      { title: "Easy to Use", desc: "Intuitive interface designed for everyone, from beginners to experts.", emoji: "✨" },
      { title: "Always Secure", desc: "Enterprise-grade security with encryption and compliance built in.", emoji: "🔒" },
    ],
    items: [
      { name: "Getting Started", desc: "Everything you need to begin", emoji: "🚀" },
      { name: "Advanced Features", desc: "Unlock the full potential", emoji: "💎" },
      { name: "Enterprise", desc: "Custom solutions for teams", emoji: "🏢" },
    ],
  };

  return content;
}

function buildSectionHTML(section: string, parsed: ParsedPrompt): string {
  const c = parsed.colorScheme;
  const displayFont = parsed.font.display || parsed.font.family;

  switch (section) {
    case "projects":
    case "gallery":
      return `<section style="padding:6rem 2rem;max-width:1100px;margin:0 auto">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:3rem"><div style="width:6px;height:6px;border-radius:50%;background:${c.accent}"></div><span style="color:${c.accent};font-weight:600;font-size:0.85rem;letter-spacing:0.1em;text-transform:uppercase">${section === "gallery" ? "Portfolio" : "Featured Work"}</span></div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:2rem">
          ${parsed.items.map((item, i) => {
            const gradients = ["135deg,#1e1b4b,#312e81","135deg,#064e3b,#047857","135deg,#7c2d12,#b45309","135deg,#4c1d95,#7c3aed"];
            const g = gradients[i % gradients.length];
            return `<div style="background:${c.card};border:1px solid ${c.border};border-radius:20px;overflow:hidden;transition:transform .3s">
              <div style="height:220px;background:linear-gradient(${g});display:flex;align-items:center;justify-content:center;font-size:4rem">${item.emoji}</div>
              <div style="padding:1.75rem"><h3 style="color:${c.text};font-size:1.15rem;font-weight:700;margin-bottom:.5rem">${item.name}</h3><p style="color:${c.muted};font-size:.88rem;line-height:1.65">${item.desc}</p></div>
            </div>`;
          }).join("")}
        </div>
      </section>`;

    case "products":
    case "listings":
      return `<section style="padding:6rem 2rem;max-width:1200px;margin:0 auto">
        <div style="display:flex;justify-content:space-between;align-items:end;margin-bottom:3rem"><div><span style="color:${c.accent};font-weight:600;font-size:.8rem;letter-spacing:.15em;text-transform:uppercase;display:block;margin-bottom:.5rem">${section === "listings" ? "Featured Properties" : "New Arrivals"}</span><h2 style="font-family:${displayFont};font-size:2.5rem;font-weight:700;color:${c.text};letter-spacing:-.02em">${section === "listings" ? "Latest Listings" : "Curated for You"}</h2></div><a href="#" style="color:${c.muted};font-size:.85rem;text-decoration:none;border-bottom:1px solid ${c.muted};padding-bottom:2px">View All →</a></div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:2rem">
          ${parsed.items.map((item, i) => {
            const bgs = ["180deg,#f0ede8,#e8e4dd","180deg,#e8edf0,#dde4e8","180deg,#ede8f0,#e4dde8","180deg,#e8f0ec,#dde8e2"];
            const bg = parsed.tone === "light" ? bgs[i % bgs.length] : ["135deg,#1e1b4b,#312e81","135deg,#064e3b,#047857","135deg,#4c1d95,#7c3aed","135deg,#7c2d12,#b45309"][i % 4];
            return `<div style="cursor:pointer"><div style="aspect-ratio:${section === "listings" ? "16/10" : "3/4"};background:linear-gradient(${bg});border-radius:${parsed.tone === "light" ? "4px" : "16px"};display:flex;align-items:center;justify-content:center;font-size:4rem;margin-bottom:1.25rem;position:relative;overflow:hidden">${item.emoji}${i === 0 ? `<div style="position:absolute;top:16px;left:16px;background:${c.accent};color:#fff;padding:4px 12px;font-size:.7rem;font-weight:600;letter-spacing:.05em;border-radius:4px">NEW</div>` : ""}</div><h3 style="color:${c.text};font-weight:600;font-size:.95rem;margin-bottom:.25rem">${item.name}</h3><p style="color:${c.muted};font-size:.85rem;margin-bottom:.5rem">${item.desc}</p>${item.price ? `<p style="color:${c.text};font-weight:700;font-size:1rem">${item.price}</p>` : ""}</div>`;
          }).join("")}
        </div>
      </section>`;

    case "menu":
      return `<section style="padding:6rem 2rem;max-width:900px;margin:0 auto">
        <div style="text-align:center;margin-bottom:4rem"><span style="color:${c.accent};font-weight:600;font-size:.8rem;letter-spacing:.15em;text-transform:uppercase;display:block;margin-bottom:.75rem">From Our Kitchen</span><h2 style="font-family:${displayFont};font-size:2.5rem;font-weight:700;color:${c.text}">Signature Dishes</h2></div>
        <div style="display:flex;flex-direction:column;gap:1px;background:${c.border};border-radius:20px;overflow:hidden">
          ${parsed.items.map((item, i) => `<div style="display:flex;justify-content:space-between;align-items:center;padding:2rem 2.5rem;background:${c.card}"><div style="flex:1"><div style="display:flex;align-items:center;gap:12px;margin-bottom:.5rem"><span style="font-size:1.5rem">${item.emoji}</span><h3 style="color:${c.text};font-family:${displayFont};font-weight:700;font-size:1.2rem">${item.name}</h3>${i === 0 ? `<span style="background:${c.accentGradient};color:#fff;padding:3px 10px;border-radius:4px;font-size:.65rem;font-weight:700">CHEF'S PICK</span>` : ""}</div><p style="color:${c.muted};font-size:.88rem;line-height:1.6;padding-left:2.75rem">${item.desc}</p></div>${item.price ? `<span style="color:${c.text};font-family:${displayFont};font-size:1.5rem;font-weight:700;margin-left:2rem">${item.price}</span>` : ""}</div>`).join("")}
        </div>
      </section>`;

    case "features":
    case "services":
    case "programs":
      return `<section style="padding:7rem 2rem;max-width:1100px;margin:0 auto">
        <div style="text-align:center;margin-bottom:4rem"><span style="color:${c.accent};font-weight:600;font-size:.85rem;letter-spacing:.1em;text-transform:uppercase;display:block;margin-bottom:.75rem">${section === "services" ? "Our Services" : section === "programs" ? "Programs" : "Features"}</span><h2 style="font-size:2.5rem;font-weight:800;color:${c.text};letter-spacing:-.03em">${section === "services" ? "What We Do" : section === "programs" ? "Find Your Program" : "Everything you need"}</h2></div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1.5rem">
          ${parsed.features.map(f => `<div style="background:${c.card};border:1px solid ${c.border};border-radius:20px;padding:2.5rem;transition:border-color .3s"><div style="width:52px;height:52px;background:${c.accent}18;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:1.5rem;margin-bottom:1.5rem;border:1px solid ${c.accent}25">${f.emoji}</div><h3 style="color:${c.text};font-size:1.2rem;font-weight:700;margin-bottom:.75rem">${f.title}</h3><p style="color:${c.muted};font-size:.92rem;line-height:1.75">${f.desc}</p></div>`).join("")}
        </div>
      </section>`;

    case "skills":
      const skills = [
        { name: "React", emoji: "⚛️", cat: "Frontend" }, { name: "TypeScript", emoji: "🔷", cat: "Language" },
        { name: "Tailwind", emoji: "🌊", cat: "Styling" }, { name: "Node.js", emoji: "🔥", cat: "Backend" },
        { name: "PostgreSQL", emoji: "🗄️", cat: "Database" }, { name: "Figma", emoji: "🎨", cat: "Design" },
      ];
      return `<section style="padding:6rem 2rem;max-width:1100px;margin:0 auto">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:3rem"><div style="width:6px;height:6px;border-radius:50%;background:${c.accent}"></div><span style="color:${c.accent};font-weight:600;font-size:.85rem;letter-spacing:.1em;text-transform:uppercase">Tech Stack</span></div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:1rem">
          ${skills.map(s => `<div style="background:${c.card};border:1px solid ${c.border};border-radius:16px;padding:1.5rem;text-align:center"><div style="font-size:2rem;margin-bottom:.5rem">${s.emoji}</div><div style="color:${c.text};font-weight:600;font-size:.9rem">${s.name}</div><div style="color:${c.muted};font-size:.75rem;margin-top:2px">${s.cat}</div></div>`).join("")}
        </div>
      </section>`;

    case "pricing":
      return `<section style="padding:6rem 2rem;background:${parsed.tone === "dark" ? c.card : "#f8f8f6"}">
        <div style="max-width:1000px;margin:0 auto;text-align:center">
          <span style="color:${c.accent};font-weight:600;font-size:.85rem;letter-spacing:.1em;text-transform:uppercase;display:block;margin-bottom:.75rem">Pricing</span>
          <h2 style="font-size:2.5rem;font-weight:800;color:${c.text};margin-bottom:4rem;letter-spacing:-.03em">Start free, scale infinitely</h2>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(270px,1fr));gap:1.5rem;max-width:950px;margin:0 auto">
            ${parsed.items.map((item, i) => {
              const isPop = i === 1;
              return `<div style="background:${parsed.tone === "dark" ? "#111113" : "#fff"};border:${isPop ? `2px solid ${c.accent}` : `1px solid ${c.border}`};border-radius:20px;padding:3rem;text-align:left;position:relative;${isPop ? `box-shadow:0 0 60px ${c.accent}20` : ""}">
                ${isPop ? `<div style="position:absolute;top:-14px;left:50%;transform:translateX(-50%);background:${c.accentGradient};color:#fff;font-size:.75rem;font-weight:700;padding:6px 20px;border-radius:100px">POPULAR</div>` : ""}
                <div style="font-size:1.5rem;margin-bottom:.5rem">${item.emoji}</div>
                <h3 style="color:${c.text};font-weight:700;font-size:1.1rem">${item.name}</h3>
                <p style="color:${c.muted};font-size:.85rem;margin:.5rem 0 1.5rem">${item.desc}</p>
                <div style="margin-bottom:2rem"><span style="font-size:2.5rem;font-weight:800;color:${c.text}">${item.price || "Free"}</span></div>
                <a href="#" style="display:block;text-align:center;padding:14px;${isPop ? `background:${c.accentGradient};color:#fff;font-weight:700` : `border:1px solid ${c.border};color:${c.text};font-weight:600`};border-radius:12px;text-decoration:none;font-size:.92rem">Get Started</a>
              </div>`;
            }).join("")}
          </div>
        </div>
      </section>`;

    case "dashboard":
      return `<section style="padding:4rem 2rem;max-width:900px;margin:0 auto">
        <div style="background:${c.card};border:1px solid ${c.border};border-radius:20px;overflow:hidden;box-shadow:0 25px 80px rgba(0,0,0,0.3)">
          <div style="padding:14px 18px;border-bottom:1px solid ${c.border};display:flex;align-items:center;gap:8px"><div style="display:flex;gap:6px"><div style="width:12px;height:12px;border-radius:50%;background:#ef4444"></div><div style="width:12px;height:12px;border-radius:50%;background:#eab308"></div><div style="width:12px;height:12px;border-radius:50%;background:#22c55e"></div></div><div style="flex:1;text-align:center;color:${c.muted};font-size:.8rem">${parsed.brandName.toLowerCase()}.app/dashboard</div></div>
          <div style="display:grid;grid-template-columns:180px 1fr;min-height:320px">
            <div style="border-right:1px solid ${c.border};padding:16px;display:flex;flex-direction:column;gap:4px">
              <div style="padding:8px 12px;background:${c.accent}15;border-radius:8px;color:${c.accent};font-size:.8rem;font-weight:500">Dashboard</div>
              <div style="padding:8px 12px;color:${c.muted};font-size:.8rem">Analytics</div>
              <div style="padding:8px 12px;color:${c.muted};font-size:.8rem">Projects</div>
              <div style="padding:8px 12px;color:${c.muted};font-size:.8rem">Settings</div>
            </div>
            <div style="padding:20px;display:flex;flex-direction:column;gap:16px">
              <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px">
                <div style="background:${c.bg};border:1px solid ${c.border};border-radius:12px;padding:16px"><div style="color:${c.muted};font-size:.75rem;margin-bottom:4px">Revenue</div><div style="color:${c.text};font-size:1.5rem;font-weight:700">$48.2k</div><div style="color:#22c55e;font-size:.75rem;margin-top:4px">↑ 12.5%</div></div>
                <div style="background:${c.bg};border:1px solid ${c.border};border-radius:12px;padding:16px"><div style="color:${c.muted};font-size:.75rem;margin-bottom:4px">Users</div><div style="color:${c.text};font-size:1.5rem;font-weight:700">2,847</div><div style="color:#22c55e;font-size:.75rem;margin-top:4px">↑ 8.3%</div></div>
                <div style="background:${c.bg};border:1px solid ${c.border};border-radius:12px;padding:16px"><div style="color:${c.muted};font-size:.75rem;margin-bottom:4px">Growth</div><div style="color:${c.text};font-size:1.5rem;font-weight:700">24%</div><div style="color:${c.accent};font-size:.75rem;margin-top:4px">↑ 4.1%</div></div>
              </div>
              <div style="flex:1;background:${c.bg};border:1px solid ${c.border};border-radius:12px;min-height:140px;position:relative;overflow:hidden"><svg viewBox="0 0 400 120" style="width:100%;height:100%;position:absolute;bottom:0"><defs><linearGradient id="cg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${c.accent}" stop-opacity="0.3"/><stop offset="100%" stop-color="${c.accent}" stop-opacity="0"/></linearGradient></defs><path d="M0 100 Q50 80 100 70 T200 50 T300 30 T400 20 L400 120 L0 120Z" fill="url(#cg)"/><path d="M0 100 Q50 80 100 70 T200 50 T300 30 T400 20" fill="none" stroke="${c.accent}" stroke-width="2"/></svg></div>
            </div>
          </div>
        </div>
      </section>`;

    case "articles":
    case "featured":
      return `<section style="padding:5rem 2rem;max-width:1000px;margin:0 auto">
        ${section === "featured" && parsed.items.length > 0 ? `<article style="display:grid;grid-template-columns:1.2fr 1fr;gap:0;background:${c.card};border:1px solid ${c.border};border-radius:24px;overflow:hidden;margin-bottom:3rem;box-shadow:0 4px 30px rgba(0,0,0,.04)"><div style="background:linear-gradient(135deg,#fef3c7,#fde68a,#fbbf24);min-height:320px;display:flex;align-items:center;justify-content:center;font-size:5rem">${parsed.items[0].emoji}</div><div style="padding:3rem;display:flex;flex-direction:column;justify-content:center"><span style="background:${c.accent}15;color:${c.accent};padding:4px 12px;border-radius:8px;font-size:.75rem;font-weight:600;width:fit-content;margin-bottom:1rem">Featured</span><h2 style="font-family:${displayFont};font-size:1.75rem;font-weight:800;color:${c.text};line-height:1.3;margin-bottom:1rem">${parsed.items[0].name}</h2><p style="color:${c.muted};font-size:.95rem;line-height:1.8">${parsed.items[0].desc}</p></div></article>` : ""}
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:2rem">
          ${parsed.items.slice(section === "featured" ? 1 : 0).map((item, i) => {
            const gradients = ["135deg,#dbeafe,#93c5fd","135deg,#d1fae5,#6ee7b7","135deg,#fce7f3,#f9a8d4","135deg,#e0e7ff,#a5b4fc"];
            return `<article style="background:${c.card};border:1px solid ${c.border};border-radius:20px;overflow:hidden"><div style="height:200px;background:linear-gradient(${gradients[i % gradients.length]});display:flex;align-items:center;justify-content:center;font-size:3rem">${item.emoji}</div><div style="padding:1.75rem"><h3 style="font-family:${displayFont};font-size:1.15rem;font-weight:700;color:${c.text};margin-bottom:.5rem">${item.name}</h3><p style="color:${c.muted};font-size:.88rem;line-height:1.7;margin-bottom:1rem">${item.desc}</p><span style="color:${c.accent};font-size:.78rem;font-weight:600">Read →</span></div></article>`;
          }).join("")}
        </div>
      </section>`;

    case "contact":
    case "booking":
    case "reservation":
      return `<section style="padding:5rem 2rem;max-width:600px;margin:0 auto;text-align:center">
        <h2 style="font-family:${displayFont};color:${c.text};font-size:2rem;font-weight:700;margin-bottom:.75rem">${section === "reservation" ? "Reserve Your Table" : section === "booking" ? "Book an Appointment" : "Get in Touch"}</h2>
        <p style="color:${c.muted};margin-bottom:2.5rem">${section === "reservation" ? "Tuesday – Sunday · 5:00 PM – 11:00 PM" : section === "booking" ? "Available Monday through Friday, 9am – 5pm" : "Have a project in mind? Let's talk."}</p>
        <div style="display:flex;flex-direction:column;gap:1rem;max-width:400px;margin:0 auto;text-align:left">
          <input placeholder="${section === "reservation" ? "Name" : "Your name"}" style="padding:14px 18px;background:${c.card};border:1px solid ${c.border};border-radius:12px;color:${c.text};font-size:.92rem;outline:none;font-family:inherit" />
          <input placeholder="${section === "reservation" ? "Phone" : "Email"}" style="padding:14px 18px;background:${c.card};border:1px solid ${c.border};border-radius:12px;color:${c.text};font-size:.92rem;outline:none;font-family:inherit" />
          ${section === "reservation" ? `<input type="date" style="padding:14px 18px;background:${c.card};border:1px solid ${c.border};border-radius:12px;color:${c.text};font-size:.92rem;outline:none;font-family:inherit" />` : `<textarea placeholder="Your message" rows="4" style="padding:14px 18px;background:${c.card};border:1px solid ${c.border};border-radius:12px;color:${c.text};font-size:.92rem;outline:none;font-family:inherit;resize:none"></textarea>`}
          <button style="padding:16px;background:${c.accentGradient};color:#fff;border:none;border-radius:12px;font-weight:700;font-size:.95rem;cursor:pointer;letter-spacing:.02em">${section === "reservation" ? "Reserve Now" : section === "booking" ? "Book Appointment" : "Send Message"}</button>
        </div>
      </section>`;

    case "newsletter":
      return `<section style="padding:5rem 2rem;background:${parsed.tone === "dark" ? c.card : "#1a1a1a"};margin-top:2rem">
        <div style="max-width:600px;margin:0 auto;text-align:center"><h2 style="font-family:${displayFont};color:${parsed.tone === "dark" ? c.text : "#fafafa"};font-size:2rem;font-weight:700;margin-bottom:1rem">Stay in the loop</h2><p style="color:${parsed.tone === "dark" ? c.muted : "#9b9b9b"};margin-bottom:2rem;font-size:.95rem">Get updates delivered to your inbox.</p><div style="display:flex;gap:12px;max-width:440px;margin:0 auto"><input type="email" placeholder="your@email.com" style="flex:1;padding:14px 18px;background:${parsed.tone === "dark" ? c.bg : "#2a2a2a"};border:1px solid ${parsed.tone === "dark" ? c.border : "#3a3a3a"};border-radius:12px;color:#fafafa;font-size:.92rem;outline:none;font-family:inherit" /><button style="padding:14px 28px;background:${c.accentGradient};color:#fff;border:none;border-radius:12px;font-weight:700;font-size:.92rem;cursor:pointer">Subscribe</button></div></div>
      </section>`;

    case "cta":
    case "donate":
      return `<section style="padding:5rem 2rem;background:${parsed.tone === "dark" ? c.card : "#f8f8f6"}">
        <div style="max-width:700px;margin:0 auto;text-align:center">
          <h2 style="font-size:2.2rem;font-weight:800;color:${c.text};margin-bottom:1rem;letter-spacing:-.02em">${section === "donate" ? "Make a Difference Today" : "Ready to get started?"}</h2>
          <p style="color:${c.muted};font-size:1rem;margin-bottom:2.5rem">${section === "donate" ? "Every contribution creates lasting impact in communities around the world." : "Join thousands who already trust us."}</p>
          <a href="#" style="display:inline-block;padding:16px 48px;background:${c.accentGradient};color:#fff;border-radius:14px;text-decoration:none;font-weight:700;font-size:1rem;box-shadow:0 4px 40px ${c.accent}30">${section === "donate" ? "Donate Now" : "Start Free"}</a>
        </div>
      </section>`;

    case "impact":
      return `<section style="padding:6rem 2rem;max-width:1000px;margin:0 auto;text-align:center">
        <span style="color:${c.accent};font-weight:600;font-size:.85rem;letter-spacing:.1em;text-transform:uppercase;display:block;margin-bottom:.75rem">Our Impact</span>
        <h2 style="font-size:2.5rem;font-weight:800;color:${c.text};margin-bottom:4rem">Numbers that matter</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:2rem">
          ${parsed.items.map(item => `<div style="background:${c.card};border:1px solid ${c.border};border-radius:20px;padding:2.5rem"><div style="font-size:2.5rem;margin-bottom:.5rem">${item.emoji}</div><div style="font-size:2.5rem;font-weight:800;background:${c.accentGradient};-webkit-background-clip:text;-webkit-text-fill-color:transparent">${item.name}</div><p style="color:${c.muted};font-size:.9rem;margin-top:.5rem">${item.desc}</p></div>`).join("")}
        </div>
      </section>`;

    case "testimonial":
    case "testimonials":
      return `<section style="padding:5rem 2rem;max-width:800px;margin:0 auto;text-align:center">
        <span style="color:${c.accent};font-weight:600;font-size:.85rem;letter-spacing:.1em;text-transform:uppercase;display:block;margin-bottom:2rem">What People Say</span>
        <blockquote style="background:${c.card};border:1px solid ${c.border};border-radius:24px;padding:3rem;margin:0"><p style="color:${c.text};font-family:${displayFont};font-size:1.3rem;font-weight:500;line-height:1.7;font-style:italic;margin-bottom:2rem">"Absolutely incredible experience. The attention to detail and quality exceeded all our expectations. We'll definitely be back."</p><div style="display:flex;align-items:center;justify-content:center;gap:12px"><div style="width:44px;height:44px;border-radius:50%;background:${c.accentGradient}"></div><div style="text-align:left"><div style="color:${c.text};font-weight:600;font-size:.9rem">Sarah Mitchell</div><div style="color:${c.muted};font-size:.8rem">Verified Customer</div></div></div></blockquote>
      </section>`;

    case "team":
    case "trainers":
    case "speakers":
      const roles = section === "trainers" ? ["Head Coach", "Yoga Instructor", "Nutritionist"] : section === "speakers" ? ["Keynote Speaker", "Workshop Lead", "Panelist"] : ["CEO & Founder", "Head of Design", "Lead Engineer"];
      const names = ["Alex Rivera", "Sarah Chen", "Marcus Kim"];
      return `<section style="padding:6rem 2rem;max-width:1000px;margin:0 auto">
        <div style="text-align:center;margin-bottom:4rem"><span style="color:${c.accent};font-weight:600;font-size:.85rem;letter-spacing:.1em;text-transform:uppercase;display:block;margin-bottom:.75rem">${section === "speakers" ? "Speakers" : "Our Team"}</span><h2 style="font-size:2.5rem;font-weight:800;color:${c.text}">${section === "speakers" ? "Featured Speakers" : "Meet the Team"}</h2></div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:2rem">
          ${names.map((name, i) => `<div style="text-align:center"><div style="width:120px;height:120px;border-radius:50%;background:${c.accentGradient};margin:0 auto 1.5rem;opacity:.8"></div><h3 style="color:${c.text};font-weight:700;font-size:1.1rem">${name}</h3><p style="color:${c.accent};font-size:.85rem;font-weight:500;margin-top:.25rem">${roles[i]}</p></div>`).join("")}
        </div>
      </section>`;

    case "schedule":
      return `<section style="padding:6rem 2rem;max-width:800px;margin:0 auto">
        <div style="text-align:center;margin-bottom:3rem"><h2 style="font-size:2.5rem;font-weight:800;color:${c.text}">Schedule</h2></div>
        <div style="display:flex;flex-direction:column;gap:1px;background:${c.border};border-radius:16px;overflow:hidden">
          ${["9:00 AM – Opening Keynote", "10:30 AM – Workshop: Building at Scale", "12:00 PM – Lunch & Networking", "1:30 PM – Panel: Future of Technology", "3:00 PM – Lightning Talks", "5:00 PM – Closing & Happy Hour"].map(s => `<div style="padding:1.25rem 2rem;background:${c.card};display:flex;justify-content:space-between;align-items:center"><span style="color:${c.text};font-weight:500;font-size:.95rem">${s}</span></div>`).join("")}
        </div>
      </section>`;

    case "tickets":
      return buildSectionHTML("pricing", parsed);

    case "courses":
      return buildSectionHTML("products", parsed);

    case "destinations":
      return buildSectionHTML("products", parsed);

    case "latest":
    case "tour":
    case "merch":
      return buildSectionHTML("products", parsed);

    case "clients":
      return `<section style="padding:4rem 2rem;border-top:1px solid ${c.border}">
        <div style="max-width:900px;margin:0 auto;text-align:center"><p style="color:${c.muted};font-size:.85rem;margin-bottom:2rem;letter-spacing:.1em;text-transform:uppercase">Trusted by leading brands</p><div style="display:flex;justify-content:center;gap:4rem;flex-wrap:wrap;opacity:.5">${["Acme Corp","TechStart","Globex","Initech","Umbrella"].map(n => `<span style="color:${c.text};font-weight:700;font-size:1.3rem;letter-spacing:-.02em">${n}</span>`).join("")}</div></div>
      </section>`;

    default:
      return "";
  }
}

function buildFullPage(parsed: ParsedPrompt, contentSections: string[], pageOverride?: { title: string; subtitle: string; badge?: string; ctaLabel?: string }): string {
  const c = parsed.colorScheme;
  const fontUrl = parsed.font.url;
  const fontFamily = parsed.font.family;
  const displayFont = parsed.font.display || fontFamily;

  const sectionsHTML = contentSections.map(s => buildSectionHTML(s, parsed)).join("\n");

  const heroTitle = pageOverride?.title || parsed.tagline;
  const heroDesc = pageOverride?.subtitle || parsed.description;
  const heroBadge = pageOverride?.badge || "✨ Built with Sayo.ai";
  const heroCta = pageOverride?.ctaLabel || (parsed.type === "ecommerce" ? "Shop Now" : parsed.type === "restaurant" ? "Reserve a Table" : parsed.type === "fitness" ? "Start Training" : parsed.type === "event" ? "Get Tickets" : parsed.type === "nonprofit" ? "Donate Now" : "Get Started");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="${fontUrl}" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: ${fontFamily}, -apple-system, BlinkMacSystemFont, sans-serif; background: ${c.bg}; color: ${c.text}; min-height: 100vh; -webkit-font-smoothing: antialiased; }
    a { text-decoration: none; transition: opacity 0.2s; }
    a:hover { opacity: 0.85; }
    ::selection { background: ${c.accent}40; }
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: ${c.border}; border-radius: 3px; }
    .grad { background: ${c.accentGradient}; -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    nav { display: flex; align-items: center; justify-content: space-between; padding: 1.1rem 2.5rem; border-bottom: 1px solid ${c.border}; backdrop-filter: blur(20px); position: sticky; top: 0; z-index: 50; background: ${c.bg}e6; }
    .nav-brand { font-size: 1.2rem; font-weight: 800; background: ${c.accentGradient}; -webkit-background-clip: text; -webkit-text-fill-color: transparent; letter-spacing: -0.02em; }
    .nav-links { display: flex; gap: 2.5rem; list-style: none; }
    .nav-links a { color: ${c.muted}; font-size: 0.88rem; font-weight: 500; transition: color 0.2s; }
    .nav-links a:hover { color: ${c.text}; opacity: 1; }
    .nav-cta { padding: 9px 22px; background: ${c.accentGradient}; color: #fff; border-radius: 10px; font-size: 0.85rem; font-weight: 600; }
    .hero { text-align: center; padding: 7rem 2rem 4rem; max-width: 850px; margin: 0 auto; }
    .hero-badge { display: inline-flex; align-items: center; gap: 8px; background: ${c.accent}10; color: ${c.accent}; font-size: 0.8rem; font-weight: 600; padding: 8px 18px; border-radius: 100px; margin-bottom: 2rem; border: 1px solid ${c.accent}25; }
    .hero h1 { font-size: clamp(2.5rem, 5.5vw, 4rem); font-weight: 800; line-height: 1.12; letter-spacing: -0.04em; margin-bottom: 1.5rem; }
    .hero p { color: ${c.muted}; font-size: 1.15rem; line-height: 1.75; max-width: 620px; margin: 0 auto; }
    footer { text-align: center; padding: 3.5rem 2rem; border-top: 1px solid ${c.border}; color: ${c.muted}; font-size: 0.82rem; margin-top: 4rem; }
    footer a { color: ${c.accent}; font-weight: 600; }
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
    <span class="nav-brand">${parsed.brandName}</span>
    <ul class="nav-links">
      ${parsed.navLinks.map(l => `<li><a href="#">${l}</a></li>`).join("")}
    </ul>
    <a href="#" class="nav-cta">${heroCta}</a>
  </nav>
  <div class="hero">
    <div class="hero-badge">${heroBadge}</div>
    <h1>${heroTitle}</h1>
    <p>${heroDesc}</p>
    <div style="display:flex;gap:16px;margin-top:2.5rem;justify-content:center;flex-wrap:wrap">
      <a href="#" style="padding:15px 36px;background:${c.accentGradient};color:#fff;border-radius:14px;text-decoration:none;font-weight:700;font-size:1rem;box-shadow:0 4px 30px ${c.accent}40">${heroCta}</a>
      <a href="#" style="padding:15px 36px;background:${c.text}08;border:1px solid ${c.border};color:${c.text};border-radius:14px;text-decoration:none;font-weight:500;font-size:1rem;backdrop-filter:blur(12px)">Learn More →</a>
    </div>
    ${!pageOverride && parsed.type === "portfolio" ? `<div style="display:flex;justify-content:center;gap:2.5rem;margin-top:3rem;padding-top:3rem;border-top:1px solid ${c.border}"><div style="text-align:center"><div style="font-size:2rem;font-weight:800;background:${c.accentGradient};-webkit-background-clip:text;-webkit-text-fill-color:transparent">50+</div><div style="color:${c.muted};font-size:.8rem">Projects</div></div><div style="text-align:center"><div style="font-size:2rem;font-weight:800;background:${c.accentGradient};-webkit-background-clip:text;-webkit-text-fill-color:transparent">5yr</div><div style="color:${c.muted};font-size:.8rem">Experience</div></div><div style="text-align:center"><div style="font-size:2rem;font-weight:800;background:${c.accentGradient};-webkit-background-clip:text;-webkit-text-fill-color:transparent">30+</div><div style="color:${c.muted};font-size:.8rem">Clients</div></div></div>` : ""}
    ${!pageOverride && parsed.type === "saas" ? `<div style="margin-top:1.5rem;color:${c.muted};font-size:.85rem">Trusted by 10,000+ developers</div>` : ""}
  </div>
  ${sectionsHTML}
  <footer>Built with <a href="#">Sayo.ai</a> — AI-Powered Website Builder</footer>
</body>
</html>`;
}

// Keep backward compat
export function generateHTMLFromPrompt(prompt: string): string {
  const parsed = parsePrompt(prompt);
  return buildFullPage(parsed, parsed.sections);
}

export function generateMultiPageHTML(prompt: string): { name: string; html: string }[] {
  const parsed = parsePrompt(prompt);
  const pages: { name: string; html: string }[] = [{ name: "Home", html: buildFullPage(parsed, parsed.sections) }];

  // Sub-page definitions with unique hero content per page
  const subPageMap: Record<string, { name: string; sections: string[]; hero: { title: string; subtitle: string; badge: string; ctaLabel: string } }[]> = {
    portfolio: [
      { name: "About", sections: ["skills", "testimonial"], hero: { title: `The story <span class='grad'>behind the work</span>`, subtitle: `I'm a passionate designer & developer with ${Math.floor(Math.random()*5)+3}+ years of experience building digital products. I believe great design solves real problems.`, badge: "👋 About Me", ctaLabel: "Download CV" } },
      { name: "Contact", sections: ["contact"], hero: { title: `Let's <span class='grad'>work together</span>`, subtitle: "Have a project in mind? I'd love to hear about it. Let's chat and bring your ideas to life.", badge: "📬 Get in Touch", ctaLabel: "Send Message" } },
    ],
    ecommerce: [
      { name: "Shop", sections: ["products"], hero: { title: `Browse our <span class='grad'>full collection</span>`, subtitle: "Explore all products across every category. Filter by style, price, or season to find exactly what you're looking for.", badge: "🛍️ All Products", ctaLabel: "Shop All" } },
      { name: "About", sections: ["features", "testimonial", "newsletter"], hero: { title: `Our <span class='grad'>story & values</span>`, subtitle: "We believe in quality craftsmanship, sustainable sourcing, and creating products that stand the test of time.", badge: "💫 Our Story", ctaLabel: "Learn More" } },
    ],
    restaurant: [
      { name: "Menu", sections: ["menu"], hero: { title: `Explore our <span class='grad'>full menu</span>`, subtitle: "Every dish is crafted with seasonal ingredients sourced from local farms. Our chef rotates specials weekly.", badge: "🍽️ Our Menu", ctaLabel: "Order Now" } },
      { name: "Reservations", sections: ["reservation", "testimonial"], hero: { title: `Book your <span class='grad'>dining experience</span>`, subtitle: "Secure your table for an unforgettable evening. Private dining available for parties of 8 or more.", badge: "📅 Reserve a Table", ctaLabel: "Book Now" } },
    ],
    blog: [
      { name: "All Articles", sections: ["articles"], hero: { title: `All <span class='grad'>published stories</span>`, subtitle: "Browse our complete archive of articles spanning technology, design, culture, and beyond.", badge: "📚 Archive", ctaLabel: "Read Latest" } },
      { name: "About", sections: ["features", "newsletter"], hero: { title: `About <span class='grad'>this publication</span>`, subtitle: "We're a team of writers, thinkers, and builders sharing insights from the frontlines of technology and design.", badge: "✍️ About Us", ctaLabel: "Subscribe" } },
    ],
    saas: [
      { name: "Pricing", sections: ["pricing", "cta"], hero: { title: `Simple, <span class='grad'>transparent pricing</span>`, subtitle: "No hidden fees, no surprises. Start free and scale as you grow. Cancel anytime.", badge: "💰 Plans & Pricing", ctaLabel: "Start Free" } },
      { name: "Features", sections: ["features", "dashboard"], hero: { title: `Built for <span class='grad'>modern teams</span>`, subtitle: "Every feature is designed to help your team move faster, collaborate better, and ship with confidence.", badge: "🚀 All Features", ctaLabel: "Try it Free" } },
    ],
    agency: [
      { name: "Our Work", sections: ["projects", "clients"], hero: { title: `Selected <span class='grad'>case studies</span>`, subtitle: "A showcase of our best work across branding, web design, and product development for ambitious companies.", badge: "🏆 Portfolio", ctaLabel: "Start a Project" } },
      { name: "Contact", sections: ["contact"], hero: { title: `Start a <span class='grad'>conversation</span>`, subtitle: "Whether you have a detailed brief or just a rough idea, we'd love to hear from you and explore how we can help.", badge: "💬 Let's Talk", ctaLabel: "Get in Touch" } },
    ],
    fitness: [
      { name: "Programs", sections: ["products", "trainers"], hero: { title: `Find your <span class='grad'>perfect program</span>`, subtitle: "From beginner to advanced, our programs are designed by certified trainers to match your fitness level and goals.", badge: "🏋️ Training Programs", ctaLabel: "Browse Programs" } },
      { name: "Join Us", sections: ["pricing", "cta"], hero: { title: `Membership <span class='grad'>plans & pricing</span>`, subtitle: "Flexible plans that fit your lifestyle. All memberships include access to our full facility and group classes.", badge: "💪 Become a Member", ctaLabel: "Join Now" } },
    ],
    education: [
      { name: "Courses", sections: ["products", "features"], hero: { title: `Explore all <span class='grad'>courses</span>`, subtitle: "Learn from industry experts with project-based courses. Earn certificates and build a portfolio that stands out.", badge: "🎓 Course Catalog", ctaLabel: "Enroll Now" } },
      { name: "Pricing", sections: ["pricing"], hero: { title: `Invest in <span class='grad'>your future</span>`, subtitle: "Affordable plans for individuals and teams. Financial aid available. Start learning today.", badge: "📋 Plans", ctaLabel: "Get Started" } },
    ],
    travel: [
      { name: "Destinations", sections: ["products", "features"], hero: { title: `Explore <span class='grad'>destinations</span>`, subtitle: "Handpicked destinations across 6 continents. Each trip is curated by local experts for an authentic experience.", badge: "🌍 Where to Go", ctaLabel: "Explore" } },
      { name: "Plan Your Trip", sections: ["contact"], hero: { title: `Plan your <span class='grad'>dream trip</span>`, subtitle: "Tell us your ideal travel style, budget, and dates. Our experts will craft a personalized itinerary just for you.", badge: "🗓️ Trip Planning", ctaLabel: "Start Planning" } },
    ],
    photography: [
      { name: "Gallery", sections: ["gallery"], hero: { title: `The <span class='grad'>full portfolio</span>`, subtitle: "A curated collection of work across weddings, portraits, commercial, and fine art photography.", badge: "📷 Portfolio", ctaLabel: "View Gallery" } },
      { name: "Book a Session", sections: ["pricing", "contact"], hero: { title: `Book a <span class='grad'>photo session</span>`, subtitle: "Let's create something beautiful together. Choose a package or reach out for a custom quote.", badge: "📅 Book Now", ctaLabel: "Book Session" } },
    ],
    music: [
      { name: "Tour Dates", sections: ["products"], hero: { title: `Catch us <span class='grad'>live on tour</span>`, subtitle: "Check out upcoming shows and get tickets before they sell out. VIP meet & greet packages available.", badge: "🎤 Live Shows", ctaLabel: "Get Tickets" } },
      { name: "Merch", sections: ["products"], hero: { title: `Official <span class='grad'>merchandise</span>`, subtitle: "Limited edition drops, tour exclusives, and fan favorites. Worldwide shipping available.", badge: "👕 Merch Store", ctaLabel: "Shop Merch" } },
    ],
    real_estate: [
      { name: "Listings", sections: ["listings"], hero: { title: `Browse all <span class='grad'>properties</span>`, subtitle: "Explore our full portfolio of residential and commercial listings. Virtual tours available for every property.", badge: "🏠 All Listings", ctaLabel: "View Properties" } },
      { name: "Contact Agent", sections: ["contact"], hero: { title: `Connect with <span class='grad'>an expert</span>`, subtitle: "Our experienced agents are ready to help you find your dream home or sell your property at the best price.", badge: "🤝 Get Expert Help", ctaLabel: "Contact Us" } },
    ],
    medical: [
      { name: "Services", sections: ["features", "team"], hero: { title: `Our <span class='grad'>medical services</span>`, subtitle: "Comprehensive care from board-certified physicians. From routine checkups to specialist referrals, we've got you covered.", badge: "🩺 Services", ctaLabel: "Book Appointment" } },
      { name: "Book", sections: ["booking"], hero: { title: `Schedule your <span class='grad'>appointment</span>`, subtitle: "Book online in minutes. Same-day appointments available. Telehealth options for your convenience.", badge: "📅 Book Online", ctaLabel: "Schedule Now" } },
    ],
    nonprofit: [
      { name: "Our Impact", sections: ["impact", "features"], hero: { title: `Measuring our <span class='grad'>real impact</span>`, subtitle: "Transparency is at our core. See exactly how donations are used and the communities we've helped transform.", badge: "📊 Impact Report", ctaLabel: "View Report" } },
      { name: "Donate", sections: ["donate"], hero: { title: `Support our <span class='grad'>mission</span>`, subtitle: "Every dollar makes a difference. 95¢ of every dollar goes directly to programs. Tax-deductible donations.", badge: "❤️ Give Today", ctaLabel: "Donate Now" } },
    ],
    event: [
      { name: "Schedule", sections: ["schedule", "speakers"], hero: { title: `Full event <span class='grad'>schedule</span>`, subtitle: "Two days packed with keynotes, workshops, panels, and networking opportunities. Something for everyone.", badge: "📋 Event Schedule", ctaLabel: "Get Tickets" } },
      { name: "Tickets", sections: ["tickets"], hero: { title: `Get your <span class='grad'>tickets now</span>`, subtitle: "Early bird pricing available for a limited time. Group discounts for teams of 5+. All tickets include lunch.", badge: "🎫 Buy Tickets", ctaLabel: "Buy Now" } },
    ],
  };

  const subPages = subPageMap[parsed.type] || [
    { name: "About", sections: ["features"], hero: { title: `About <span class='grad'>${parsed.brandName}</span>`, subtitle: `Learn more about who we are, what we do, and why we do it. ${parsed.brandName} was built to make a difference.`, badge: "👋 About Us", ctaLabel: "Learn More" } },
    { name: "Contact", sections: ["contact"], hero: { title: `Get in <span class='grad'>touch</span>`, subtitle: "We'd love to hear from you. Send us a message and we'll get back to you as soon as possible.", badge: "📬 Contact", ctaLabel: "Send Message" } },
  ];

  for (const sub of subPages) {
    pages.push({ name: sub.name, html: buildFullPage(parsed, sub.sections, sub.hero) });
  }

  return pages;
}
