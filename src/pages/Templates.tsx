import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useMemo, useCallback } from "react";
import { generateHTMLFromPrompt } from "@/lib/generateHTML";
import { Eye, ArrowRight, Search, Pencil, RotateCcw, Check, X, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const templates = [
  // Landing Pages — each with unique theme/style keywords
  { name: "SaaS Landing Page", category: "Landing", prompt: "A modern dark SaaS landing page with pricing tiers and feature showcase", emoji: "🚀" },
  { name: "Startup Launch Page", category: "Landing", prompt: "A bold red startup launch page with waitlist signup and product preview", emoji: "🎯" },
  { name: "Mobile App Landing", category: "Landing", prompt: "A clean minimal mobile app landing page with phone mockups and download buttons", emoji: "📱" },
  { name: "Product Hunt Launch", category: "Landing", prompt: "A warm orange Product Hunt style launch page with upvote counter and features", emoji: "🏹" },
  { name: "AI Tool Landing", category: "Landing", prompt: "A midnight purple AI-powered tool landing page with demo section and API pricing", emoji: "🤖" },
  { name: "Crypto Platform", category: "Landing", prompt: "A dark luxury cryptocurrency trading platform landing with live chart visuals", emoji: "₿" },
  { name: "Dev Tools Landing", category: "Landing", prompt: "An ocean blue developer tools landing page with code snippets and CLI demo", emoji: "🛠️" },
  { name: "SaaS Pricing Page", category: "Landing", prompt: "A light elegant SaaS pricing comparison page with feature tiers and FAQ", emoji: "💰" },
  { name: "Beta Signup Page", category: "Landing", prompt: "A creative pink minimal beta signup landing page with countdown timer", emoji: "⏳" },
  { name: "No-Code Platform", category: "Landing", prompt: "A nature green no-code platform landing with drag-drop demo and use cases", emoji: "🧩" },

  // Portfolio & Personal
  { name: "Developer Portfolio", category: "Personal", prompt: "A creative dark developer portfolio site with project gallery and contact form", emoji: "💻" },
  { name: "Designer Portfolio", category: "Personal", prompt: "A minimal white designer portfolio with case studies and dribbble-style grid", emoji: "🎨" },
  { name: "Photographer Portfolio", category: "Personal", prompt: "A luxury dark photography portfolio with fullscreen gallery and lightbox", emoji: "📸" },
  { name: "Freelancer Site", category: "Personal", prompt: "A warm cozy freelancer personal website with services and testimonials", emoji: "🧑‍💻" },
  { name: "Resume / CV Site", category: "Personal", prompt: "A clean arctic blue resume website with experience timeline and skills chart", emoji: "📄" },
  { name: "Writer Portfolio", category: "Personal", prompt: "An editorial serif writer portfolio with published works and writing samples", emoji: "✍️" },
  { name: "Video Creator", category: "Personal", prompt: "A bold red YouTuber personal brand site with video gallery and merch store", emoji: "🎬" },
  { name: "Music Artist Page", category: "Personal", prompt: "A sunset gradient music artist website with album showcase and tour dates", emoji: "🎵" },
  { name: "3D Artist Portfolio", category: "Personal", prompt: "A midnight dark 3D artist portfolio with project renders gallery", emoji: "🎮" },
  { name: "Architect Portfolio", category: "Personal", prompt: "An elegant light architect portfolio website with project photography", emoji: "🏗️" },

  // E-commerce
  { name: "Fashion Store", category: "Store", prompt: "A luxury gold fashion e-commerce store with product grid and shopping cart", emoji: "👗" },
  { name: "Sneaker Shop", category: "Store", prompt: "A bold fire red sneaker e-commerce store with product showcase and sizes", emoji: "👟" },
  { name: "Jewelry Store", category: "Store", prompt: "An elegant premium jewelry e-commerce store with gold accents and collections", emoji: "💍" },
  { name: "Electronics Store", category: "Store", prompt: "A modern ocean blue electronics e-commerce store with specs and reviews", emoji: "🖥️" },
  { name: "Book Store", category: "Store", prompt: "A warm sand-toned online bookstore with reading lists and author spotlights", emoji: "📚" },
  { name: "Plant Shop", category: "Store", prompt: "A nature green organic plant shop with care guides and eco aesthetic", emoji: "🌿" },
  { name: "Furniture Store", category: "Store", prompt: "A minimal clean furniture store with room showcases and modern design", emoji: "🛋️" },
  { name: "Skincare Brand", category: "Store", prompt: "A light elegant skincare brand store with ingredient highlights and routines", emoji: "🧴" },
  { name: "Artisan Market", category: "Store", prompt: "A creative pink artisan marketplace with craft categories and seller profiles", emoji: "🎪" },
  { name: "Pet Supplies", category: "Store", prompt: "A playful fun pet supplies store with product categories and pet tips", emoji: "🐾" },

  // Blog & Content
  { name: "Tech Blog", category: "Content", prompt: "A modern dark tech blog with featured articles and newsletter signup", emoji: "📝" },
  { name: "Travel Blog", category: "Content", prompt: "An ocean blue travel blog with destination guides and photo galleries", emoji: "✈️" },
  { name: "Food Blog", category: "Content", prompt: "A warm orange food and recipe blog with cooking guides and ingredients", emoji: "🍳" },
  { name: "Design Magazine", category: "Content", prompt: "An editorial serif design magazine website with curated articles layout", emoji: "📰" },
  { name: "Podcast Site", category: "Content", prompt: "A royal purple podcast website with episode player and guest bios", emoji: "🎙️" },
  { name: "Newsletter Landing", category: "Content", prompt: "A clean minimal newsletter landing page with archive and subscribers", emoji: "📬" },
  { name: "Documentation Site", category: "Content", prompt: "An arctic blue documentation site with sidebar navigation and code blocks", emoji: "📖" },
  { name: "Wiki Platform", category: "Content", prompt: "A forest green knowledge wiki platform with categories and search", emoji: "🧠" },
  { name: "Review Site", category: "Content", prompt: "A sunset warm product review blog with ratings and comparisons", emoji: "⭐" },
  { name: "Lifestyle Blog", category: "Content", prompt: "A creative pink lifestyle blog with fashion, wellness and inspiration", emoji: "🌸" },

  // Food & Restaurant
  { name: "Fine Dining", category: "Food", prompt: "A luxury dark fine dining restaurant website with tasting menu and reservations", emoji: "🍽️" },
  { name: "Coffee Shop", category: "Food", prompt: "A warm cozy coffee shop cafe website with menu, hours and location", emoji: "☕" },
  { name: "Sushi Restaurant", category: "Food", prompt: "A midnight dark sushi restaurant website with omakase menu and specials", emoji: "🍣" },
  { name: "Pizza Place", category: "Food", prompt: "A bold red pizza restaurant with wood-fired menu and online ordering", emoji: "🍕" },
  { name: "Bakery Site", category: "Food", prompt: "An elegant light bakery website with pastry gallery and cake orders", emoji: "🧁" },
  { name: "Food Truck", category: "Food", prompt: "A bold orange food truck website with menu and location tracker", emoji: "🚚" },
  { name: "Wine Bar", category: "Food", prompt: "A luxury gold wine bar website with wine list and tasting events", emoji: "🍷" },
  { name: "Brewery Site", category: "Food", prompt: "A forest green craft brewery website with beer menu and taproom info", emoji: "🍺" },
  { name: "Vegan Restaurant", category: "Food", prompt: "A nature eco green vegan restaurant with plant-based menu and sustainability", emoji: "🥬" },
  { name: "Ice Cream Shop", category: "Food", prompt: "A creative fun pink ice cream shop with flavor gallery and specials", emoji: "🍦" },

  // Agency & Business
  { name: "Design Agency", category: "Agency", prompt: "A midnight dark creative design agency website with portfolio and team", emoji: "🏢" },
  { name: "Marketing Agency", category: "Agency", prompt: "A bold red digital marketing agency with case studies and results", emoji: "📈" },
  { name: "Web Dev Agency", category: "Agency", prompt: "A ocean blue web development agency with tech stack and testimonials", emoji: "⚙️" },
  { name: "Consulting Firm", category: "Agency", prompt: "An elegant light consulting firm website with expertise and team profiles", emoji: "💼" },
  { name: "Law Firm", category: "Agency", prompt: "A luxury dark professional law firm website with practice areas and attorneys", emoji: "⚖️" },
  { name: "Accounting Firm", category: "Agency", prompt: "A clean minimal accounting firm website with services and client portal", emoji: "📊" },
  { name: "PR Agency", category: "Agency", prompt: "A creative pink PR communications agency with media coverage and campaigns", emoji: "📣" },
  { name: "Architecture Studio", category: "Agency", prompt: "An elegant white architecture studio with project portfolio and philosophy", emoji: "🏛️" },
  { name: "Branding Studio", category: "Agency", prompt: "A royal purple branding studio with identity projects and process", emoji: "🎪" },
  { name: "Real Estate Agency", category: "Agency", prompt: "A sand warm real estate agency with property listings and agent profiles", emoji: "🏠" },

  // App & Dashboard
  { name: "Analytics Dashboard", category: "App", prompt: "A dark tech SaaS analytics dashboard app with charts and metrics", emoji: "📊" },
  { name: "Project Manager", category: "App", prompt: "An ocean blue project management app dashboard with kanban and timeline", emoji: "📋" },
  { name: "CRM Dashboard", category: "App", prompt: "A midnight purple CRM dashboard with contact management and pipeline", emoji: "🤝" },
  { name: "Finance Dashboard", category: "App", prompt: "A forest green finance app dashboard with budget tracking and charts", emoji: "💵" },
  { name: "Social Media Tool", category: "App", prompt: "A creative pink social media management dashboard with post scheduler", emoji: "📱" },
  { name: "Email Marketing", category: "App", prompt: "A warm orange email marketing dashboard with campaign builder and stats", emoji: "📧" },
  { name: "Inventory Manager", category: "App", prompt: "A clean minimal inventory management dashboard with stock and orders", emoji: "📦" },
  { name: "HR Dashboard", category: "App", prompt: "An arctic blue HR management dashboard with employee directory", emoji: "👥" },
  { name: "Learning Platform", category: "App", prompt: "A royal purple e-learning platform dashboard with courses and progress", emoji: "🎓" },
  { name: "Health Tracker", category: "App", prompt: "A nature green health tracking app dashboard with fitness metrics", emoji: "💪" },

  // Education & Non-profit
  { name: "Online School", category: "Education", prompt: "An arctic blue online school website with courses and enrollment", emoji: "🏫" },
  { name: "Coding Bootcamp", category: "Education", prompt: "A bold dark coding bootcamp website with curriculum and outcomes", emoji: "👨‍💻" },
  { name: "Language School", category: "Education", prompt: "A warm orange language learning school with class schedules and booking", emoji: "🗣️" },
  { name: "Tutoring Platform", category: "Education", prompt: "A clean light tutoring platform with subject matching and scheduling", emoji: "📐" },
  { name: "University Site", category: "Education", prompt: "An elegant serif university website with programs and admissions", emoji: "🎓" },
  { name: "Charity Site", category: "Education", prompt: "A nature green nonprofit charity website with donate button and impact", emoji: "❤️" },
  { name: "Community Hub", category: "Education", prompt: "A creative fun community organization website with events and volunteers", emoji: "🤲" },
  { name: "Church Website", category: "Education", prompt: "A sand warm church community website with services and sermons", emoji: "⛪" },
  { name: "Kids Academy", category: "Education", prompt: "A creative fun colorful kids education academy with activities", emoji: "🧒" },
  { name: "Mentorship Platform", category: "Education", prompt: "A royal purple mentorship platform connecting mentors with mentees", emoji: "🌟" },

  // Health & Wellness
  { name: "Yoga Studio", category: "Wellness", prompt: "A nature green yoga studio website with class schedule and instructors", emoji: "🧘" },
  { name: "Gym & Fitness", category: "Wellness", prompt: "A bold fire red fitness gym website with membership plans and workouts", emoji: "🏋️" },
  { name: "Dental Clinic", category: "Wellness", prompt: "A clean arctic blue dental clinic website with services and booking", emoji: "🦷" },
  { name: "Spa & Wellness", category: "Wellness", prompt: "A luxury gold spa website with treatment menu and appointments", emoji: "💆" },
  { name: "Mental Health", category: "Wellness", prompt: "A forest green mental health therapy website with counselor matching", emoji: "🧠" },
  { name: "Nutrition Coach", category: "Wellness", prompt: "A elegant light nutrition coaching website with meal plans and booking", emoji: "🥗" },
  { name: "Medical Clinic", category: "Wellness", prompt: "An ocean blue medical clinic website with doctor profiles and portal", emoji: "🏥" },
  { name: "Pilates Studio", category: "Wellness", prompt: "A creative pink pilates studio with class booking and membership", emoji: "🤸" },
  { name: "Veterinary Clinic", category: "Wellness", prompt: "A warm cozy veterinary clinic website with pet care and appointments", emoji: "🐶" },
  { name: "Meditation App", category: "Wellness", prompt: "A midnight dark meditation and mindfulness app with guided sessions", emoji: "🕉️" },

  // Events & Travel
  { name: "Conference Site", category: "Events", prompt: "A bold dark tech conference website with speakers and ticket sales", emoji: "🎤" },
  { name: "Wedding Site", category: "Events", prompt: "An elegant light wedding website with RSVP, gallery and timeline", emoji: "💒" },
  { name: "Music Festival", category: "Events", prompt: "A sunset gradient music festival website with lineup and tickets", emoji: "🎪" },
  { name: "Hotel Booking", category: "Events", prompt: "A luxury gold hotel website with room booking and virtual tour", emoji: "🏨" },
  { name: "Travel Agency", category: "Events", prompt: "An ocean blue travel agency website with destination packages", emoji: "🌍" },
  { name: "Adventure Tours", category: "Events", prompt: "A forest green adventure tour company with hiking and expedition packages", emoji: "🏔️" },
  { name: "Coworking Space", category: "Events", prompt: "A clean minimal coworking space website with membership and tour", emoji: "🏢" },
  { name: "Workshop Landing", category: "Events", prompt: "A creative fun workshop landing page with registration and events", emoji: "🎨" },
  { name: "Ticketing Platform", category: "Events", prompt: "A royal purple event ticketing platform with search and checkout", emoji: "🎟️" },
  { name: "Retreat Center", category: "Events", prompt: "A nature eco wellness retreat center with programs and booking", emoji: "🏕️" },
];

const categories = ["All", ...Array.from(new Set(templates.map(t => t.category)))];

function TemplateCard({ template, index, onUse }: { template: typeof templates[0]; index: number; onUse: (prompt: string) => void }) {
  const [editablePrompt, setEditablePrompt] = useState(template.prompt);
  const [isEditing, setIsEditing] = useState(false);
  const [previewKey, setPreviewKey] = useState(0);
  const [currentPrompt, setCurrentPrompt] = useState(template.prompt);
  const [showFullPreview, setShowFullPreview] = useState(false);

  const html = useMemo(() => generateHTMLFromPrompt(currentPrompt), [currentPrompt, previewKey]);

  const handleSaveEdit = () => {
    setCurrentPrompt(editablePrompt);
    setPreviewKey(k => k + 1);
    setIsEditing(false);
    toast.success("Preview regenerated!");
  };

  const handleCancelEdit = () => {
    setEditablePrompt(currentPrompt);
    setIsEditing(false);
  };

  const handleResetPrompt = () => {
    setEditablePrompt(template.prompt);
    setCurrentPrompt(template.prompt);
    setPreviewKey(k => k + 1);
    toast.success("Reset to original prompt");
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: Math.min(index * 0.03, 0.5) }}
        className="rounded-xl border border-border bg-card shadow-card overflow-hidden hover:shadow-elevated transition-all group"
      >
        {/* Preview thumbnail */}
        <div
          className="relative h-48 overflow-hidden bg-muted cursor-pointer"
          onClick={() => setShowFullPreview(true)}
        >
          <iframe
            key={previewKey}
            srcDoc={html}
            className="w-[1200px] h-[800px] border-0 pointer-events-none"
            style={{ transform: "scale(0.167)", transformOrigin: "top left" }}
            title={`${template.name} preview`}
            sandbox=""
            tabIndex={-1}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
          <div className="absolute top-2 left-2">
            <span className="text-xs font-medium text-primary-foreground bg-primary/90 px-2 py-0.5 rounded-md">
              {template.emoji} {template.category}
            </span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-display font-semibold text-foreground">{template.name}</h3>

          {/* Editable prompt area */}
          {isEditing ? (
            <div className="mt-2 space-y-2">
              <textarea
                value={editablePrompt}
                onChange={e => setEditablePrompt(e.target.value)}
                rows={3}
                className="w-full text-xs px-3 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                autoFocus
              />
              <div className="flex gap-1.5">
                <Button variant="hero" size="sm" className="flex-1 text-xs h-7" onClick={handleSaveEdit}>
                  <Sparkles className="h-3 w-3 mr-1" /> Regenerate
                </Button>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={handleCancelEdit}>
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="mt-1 group/prompt">
              <p className="text-xs text-muted-foreground line-clamp-2">{currentPrompt}</p>
              <div className="flex gap-1.5 mt-1 opacity-0 group-hover/prompt:opacity-100 transition-opacity">
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-[10px] text-primary hover:underline flex items-center gap-0.5"
                >
                  <Pencil className="h-2.5 w-2.5" /> Edit prompt
                </button>
                {currentPrompt !== template.prompt && (
                  <button
                    onClick={handleResetPrompt}
                    className="text-[10px] text-muted-foreground hover:underline flex items-center gap-0.5"
                  >
                    <RotateCcw className="h-2.5 w-2.5" /> Reset
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-2 mt-3">
            <Button variant="outline" size="sm" className="flex-1 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => setShowFullPreview(true)}>
              <Eye className="h-3.5 w-3.5 mr-1" /> Preview
            </Button>
            <Button variant="hero" size="sm" className="flex-1 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => onUse(currentPrompt)}>
              Use Template <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Fullscreen preview modal */}
      <AnimatePresence>
        {showFullPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowFullPreview(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-5xl h-[80vh] bg-card rounded-2xl border border-border shadow-elevated overflow-hidden flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              <div className="h-12 border-b border-border flex items-center justify-between px-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-display font-semibold text-foreground">{template.name}</span>
                  <span className="text-xs text-muted-foreground">— {currentPrompt.slice(0, 60)}…</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="hero" size="sm" onClick={() => { setShowFullPreview(false); onUse(currentPrompt); }}>
                    Use Template <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setShowFullPreview(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex-1">
                <iframe srcDoc={html} className="w-full h-full border-0" title="Full preview" sandbox="allow-scripts" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function Templates() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    return templates.filter(t => {
      const matchesCategory = selectedCategory === "All" || t.category === selectedCategory;
      const matchesSearch = !searchQuery || t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.prompt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleUseTemplate = useCallback((prompt: string) => {
    navigate("/dashboard/builder", { state: { prompt } });
  }, [navigate]);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Templates</h1>
        <p className="text-muted-foreground mt-1">
          {templates.length} pre-built templates — pick one, edit the prompt, and customize with AI.
        </p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            className="pl-9"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {categories.map(cat => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              className="text-xs h-8"
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      <p className="text-sm text-muted-foreground">{filtered.length} templates</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((t, i) => (
          <TemplateCard key={t.name} template={t} index={i} onUse={handleUseTemplate} />
        ))}
      </div>
    </div>
  );
}
