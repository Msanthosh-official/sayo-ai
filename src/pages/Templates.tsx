import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { generateHTMLFromPrompt } from "@/lib/generateHTML";
import { Eye, ArrowRight, Search, LayoutGrid, List } from "lucide-react";
import { Input } from "@/components/ui/input";

const templates = [
  // Landing Pages
  { name: "SaaS Landing Page", category: "Landing", prompt: "A modern SaaS landing page with pricing and features", emoji: "🚀" },
  { name: "Startup Launch Page", category: "Landing", prompt: "A bold startup launch page with waitlist signup and product preview", emoji: "🎯" },
  { name: "Mobile App Landing", category: "Landing", prompt: "A mobile app landing page with phone mockups and download buttons", emoji: "📱" },
  { name: "Product Hunt Launch", category: "Landing", prompt: "A Product Hunt style launch page with upvote counter and feature showcase", emoji: "🏹" },
  { name: "AI Tool Landing", category: "Landing", prompt: "An AI-powered tool landing page with demo section and API pricing", emoji: "🤖" },
  { name: "Crypto Platform", category: "Landing", prompt: "A dark cryptocurrency trading platform landing page with live charts", emoji: "₿" },
  { name: "Dev Tools Landing", category: "Landing", prompt: "A developer tools landing page with code snippets and CLI demo", emoji: "🛠️" },
  { name: "SaaS Pricing Page", category: "Landing", prompt: "A SaaS pricing comparison page with feature tiers and FAQ", emoji: "💰" },
  { name: "Beta Signup Page", category: "Landing", prompt: "A minimal beta signup landing page with countdown timer", emoji: "⏳" },
  { name: "No-Code Platform", category: "Landing", prompt: "A no-code platform landing with drag-drop demo and use cases", emoji: "🧩" },

  // Portfolio & Personal
  { name: "Developer Portfolio", category: "Personal", prompt: "A creative developer portfolio site with project gallery and contact form", emoji: "💻" },
  { name: "Designer Portfolio", category: "Personal", prompt: "A minimal designer portfolio with case studies and dribbble-style grid", emoji: "🎨" },
  { name: "Photographer Portfolio", category: "Personal", prompt: "A photography portfolio with fullscreen gallery and lightbox", emoji: "📸" },
  { name: "Freelancer Site", category: "Personal", prompt: "A freelancer personal website with services, testimonials and booking", emoji: "🧑‍💻" },
  { name: "Resume / CV Site", category: "Personal", prompt: "A clean resume website with experience timeline and skills chart", emoji: "📄" },
  { name: "Writer Portfolio", category: "Personal", prompt: "A writer portfolio with published works and writing samples", emoji: "✍️" },
  { name: "Video Creator", category: "Personal", prompt: "A YouTuber personal brand site with video gallery and merch", emoji: "🎬" },
  { name: "Music Artist Page", category: "Personal", prompt: "A music artist website with album showcase and tour dates", emoji: "🎵" },
  { name: "3D Artist Portfolio", category: "Personal", prompt: "A 3D artist portfolio with dark theme and project renders gallery", emoji: "🎮" },
  { name: "Architect Portfolio", category: "Personal", prompt: "An architect portfolio website with project photography and awards", emoji: "🏗️" },

  // E-commerce
  { name: "Fashion Store", category: "Store", prompt: "A luxury fashion e-commerce store with product grid and cart", emoji: "👗" },
  { name: "Sneaker Shop", category: "Store", prompt: "A bold sneaker e-commerce store with product showcase and sizes", emoji: "👟" },
  { name: "Jewelry Store", category: "Store", prompt: "An elegant jewelry e-commerce store with gold accents and collections", emoji: "💍" },
  { name: "Electronics Store", category: "Store", prompt: "A modern electronics e-commerce store with product specs and reviews", emoji: "🖥️" },
  { name: "Book Store", category: "Store", prompt: "An online bookstore with reading lists and author spotlights", emoji: "📚" },
  { name: "Plant Shop", category: "Store", prompt: "A nature-themed plant shop with care guides and green aesthetic", emoji: "🌿" },
  { name: "Furniture Store", category: "Store", prompt: "A minimal furniture store with room showcases and 3D previews", emoji: "🛋️" },
  { name: "Skincare Brand", category: "Store", prompt: "A clean skincare brand store with ingredient highlights and routines", emoji: "🧴" },
  { name: "Artisan Market", category: "Store", prompt: "A handmade artisan marketplace with craft categories and seller profiles", emoji: "🎪" },
  { name: "Pet Supplies", category: "Store", prompt: "A playful pet supplies store with product categories and pet tips", emoji: "🐾" },

  // Blog & Content
  { name: "Tech Blog", category: "Content", prompt: "A modern tech blog with featured articles and newsletter signup", emoji: "📝" },
  { name: "Travel Blog", category: "Content", prompt: "A travel blog with destination guides, photo galleries and itineraries", emoji: "✈️" },
  { name: "Food Blog", category: "Content", prompt: "A food and recipe blog with cooking guides and ingredient lists", emoji: "🍳" },
  { name: "Design Magazine", category: "Content", prompt: "A design magazine website with editorial layout and curated articles", emoji: "📰" },
  { name: "Podcast Site", category: "Content", prompt: "A podcast website with episode player, show notes and guest bios", emoji: "🎙️" },
  { name: "Newsletter Landing", category: "Content", prompt: "A newsletter landing page with archive and subscriber count", emoji: "📬" },
  { name: "Documentation Site", category: "Content", prompt: "A clean documentation site with sidebar navigation and code blocks", emoji: "📖" },
  { name: "Wiki Platform", category: "Content", prompt: "A knowledge wiki platform with categories and search functionality", emoji: "🧠" },
  { name: "Review Site", category: "Content", prompt: "A product review blog with ratings, comparisons and buyer guides", emoji: "⭐" },
  { name: "Lifestyle Blog", category: "Content", prompt: "A lifestyle blog with fashion, wellness and daily inspiration", emoji: "🌸" },

  // Food & Restaurant
  { name: "Fine Dining", category: "Food", prompt: "A fine dining restaurant website with menu and reservations", emoji: "🍽️" },
  { name: "Coffee Shop", category: "Food", prompt: "A cozy coffee shop website with menu, hours and location", emoji: "☕" },
  { name: "Sushi Restaurant", category: "Food", prompt: "A sushi restaurant website with omakase menu and seasonal specials", emoji: "🍣" },
  { name: "Pizza Place", category: "Food", prompt: "A pizza restaurant with wood-fired menu and online ordering", emoji: "🍕" },
  { name: "Bakery Site", category: "Food", prompt: "A bakery website with pastry gallery, custom cake orders and catering", emoji: "🧁" },
  { name: "Food Truck", category: "Food", prompt: "A food truck website with menu, location tracker and catering", emoji: "🚚" },
  { name: "Wine Bar", category: "Food", prompt: "An elegant wine bar website with wine list, tasting events and ambiance", emoji: "🍷" },
  { name: "Brewery Site", category: "Food", prompt: "A craft brewery website with beer menu, tours and taproom info", emoji: "🍺" },
  { name: "Vegan Restaurant", category: "Food", prompt: "A vegan restaurant with plant-based menu and sustainability story", emoji: "🥬" },
  { name: "Ice Cream Shop", category: "Food", prompt: "A fun ice cream shop with flavor gallery and daily specials", emoji: "🍦" },

  // Agency & Business
  { name: "Design Agency", category: "Agency", prompt: "A creative design agency website with portfolio and team", emoji: "🏢" },
  { name: "Marketing Agency", category: "Agency", prompt: "A digital marketing agency with services, case studies and results", emoji: "📈" },
  { name: "Web Dev Agency", category: "Agency", prompt: "A web development agency with tech stack and client testimonials", emoji: "⚙️" },
  { name: "Consulting Firm", category: "Agency", prompt: "A consulting firm website with expertise areas and team profiles", emoji: "💼" },
  { name: "Law Firm", category: "Agency", prompt: "A professional law firm website with practice areas and attorney profiles", emoji: "⚖️" },
  { name: "Accounting Firm", category: "Agency", prompt: "An accounting firm website with services and client portal", emoji: "📊" },
  { name: "PR Agency", category: "Agency", prompt: "A PR and communications agency with media coverage and campaigns", emoji: "📣" },
  { name: "Architecture Studio", category: "Agency", prompt: "An architecture studio with project portfolio and design philosophy", emoji: "🏛️" },
  { name: "Branding Studio", category: "Agency", prompt: "A branding studio with identity projects and creative process", emoji: "🎪" },
  { name: "Real Estate Agency", category: "Agency", prompt: "A real estate agency with property listings, search and agents", emoji: "🏠" },

  // App & Dashboard
  { name: "Analytics Dashboard", category: "App", prompt: "A startup SaaS app dashboard with analytics and charts", emoji: "📊" },
  { name: "Project Manager", category: "App", prompt: "A project management app dashboard with kanban board and timeline", emoji: "📋" },
  { name: "CRM Dashboard", category: "App", prompt: "A CRM dashboard with contact management, pipeline and deal tracking", emoji: "🤝" },
  { name: "Finance Dashboard", category: "App", prompt: "A finance app dashboard with budget tracking, charts and transactions", emoji: "💵" },
  { name: "Social Media Tool", category: "App", prompt: "A social media management dashboard with post scheduler and analytics", emoji: "📱" },
  { name: "Email Marketing", category: "App", prompt: "An email marketing dashboard with campaign builder and subscriber stats", emoji: "📧" },
  { name: "Inventory Manager", category: "App", prompt: "An inventory management dashboard with stock levels and order tracking", emoji: "📦" },
  { name: "HR Dashboard", category: "App", prompt: "An HR management dashboard with employee directory and leave tracker", emoji: "👥" },
  { name: "Learning Platform", category: "App", prompt: "An e-learning platform dashboard with courses, progress and certificates", emoji: "🎓" },
  { name: "Health Tracker", category: "App", prompt: "A health tracking app dashboard with fitness metrics and meal plans", emoji: "💪" },

  // Education & Non-profit
  { name: "Online School", category: "Education", prompt: "An online school website with courses, enrollment and instructor profiles", emoji: "🏫" },
  { name: "Coding Bootcamp", category: "Education", prompt: "A coding bootcamp website with curriculum, outcomes and application", emoji: "👨‍💻" },
  { name: "Language School", category: "Education", prompt: "A language learning school with class schedules and tutor booking", emoji: "🗣️" },
  { name: "Tutoring Platform", category: "Education", prompt: "A tutoring platform with subject matching and scheduling", emoji: "📐" },
  { name: "University Site", category: "Education", prompt: "A university website with programs, campus tour and admissions", emoji: "🎓" },
  { name: "Charity Site", category: "Education", prompt: "A nonprofit charity website with donate button and impact stories", emoji: "❤️" },
  { name: "Community Hub", category: "Education", prompt: "A community organization website with events and volunteer signup", emoji: "🤲" },
  { name: "Church Website", category: "Education", prompt: "A church community website with services, events and sermons", emoji: "⛪" },
  { name: "Kids Academy", category: "Education", prompt: "A fun kids education academy with colorful design and activities", emoji: "🧒" },
  { name: "Mentorship Platform", category: "Education", prompt: "A mentorship platform connecting mentors with mentees for career growth", emoji: "🌟" },

  // Health & Wellness
  { name: "Yoga Studio", category: "Wellness", prompt: "A yoga studio website with class schedule and instructor profiles", emoji: "🧘" },
  { name: "Gym & Fitness", category: "Wellness", prompt: "A fitness gym website with membership plans and workout programs", emoji: "🏋️" },
  { name: "Dental Clinic", category: "Wellness", prompt: "A dental clinic website with services, dentist profiles and booking", emoji: "🦷" },
  { name: "Spa & Wellness", category: "Wellness", prompt: "A luxury spa website with treatment menu and appointment booking", emoji: "💆" },
  { name: "Mental Health", category: "Wellness", prompt: "A mental health therapy website with counselor matching and resources", emoji: "🧠" },
  { name: "Nutrition Coach", category: "Wellness", prompt: "A nutrition coaching website with meal plans and consultation booking", emoji: "🥗" },
  { name: "Medical Clinic", category: "Wellness", prompt: "A medical clinic website with doctor profiles and patient portal", emoji: "🏥" },
  { name: "Pilates Studio", category: "Wellness", prompt: "A pilates studio with class booking, reformer sessions and membership", emoji: "🤸" },
  { name: "Veterinary Clinic", category: "Wellness", prompt: "A veterinary clinic website with pet care services and appointment booking", emoji: "🐶" },
  { name: "Meditation App", category: "Wellness", prompt: "A meditation and mindfulness app landing with guided sessions", emoji: "🕉️" },

  // Events & Travel
  { name: "Conference Site", category: "Events", prompt: "A tech conference website with speakers, schedule and ticket sales", emoji: "🎤" },
  { name: "Wedding Site", category: "Events", prompt: "An elegant wedding website with RSVP, gallery and event timeline", emoji: "💒" },
  { name: "Music Festival", category: "Events", prompt: "A music festival website with lineup, tickets and camping info", emoji: "🎪" },
  { name: "Hotel Booking", category: "Events", prompt: "A luxury hotel website with room booking, amenities and virtual tour", emoji: "🏨" },
  { name: "Travel Agency", category: "Events", prompt: "A travel agency website with destination packages and trip planner", emoji: "🌍" },
  { name: "Adventure Tours", category: "Events", prompt: "An adventure tour company with hiking, rafting and expedition packages", emoji: "🏔️" },
  { name: "Coworking Space", category: "Events", prompt: "A coworking space website with membership plans and virtual tour", emoji: "🏢" },
  { name: "Workshop Landing", category: "Events", prompt: "A creative workshop landing page with registration and past events", emoji: "🎨" },
  { name: "Ticketing Platform", category: "Events", prompt: "An event ticketing platform with search, seat selection and checkout", emoji: "🎟️" },
  { name: "Retreat Center", category: "Events", prompt: "A wellness retreat center with programs, accommodation and booking", emoji: "🏕️" },

  // Creative & Media
  { name: "Film Production", category: "Creative", prompt: "A film production company website with showreel and project archive", emoji: "🎬" },
  { name: "Podcast Network", category: "Creative", prompt: "A podcast network with shows, episodes and host profiles", emoji: "🎧" },
  { name: "Art Gallery", category: "Creative", prompt: "A contemporary art gallery with exhibitions and artist profiles", emoji: "🖼️" },
  { name: "Game Studio", category: "Creative", prompt: "A game development studio with game showcase and team", emoji: "🎮" },
  { name: "Animation Studio", category: "Creative", prompt: "An animation studio with portfolio reel and production services", emoji: "🎞️" },
  { name: "Record Label", category: "Creative", prompt: "A record label website with artist roster and latest releases", emoji: "💿" },
  { name: "Fashion Magazine", category: "Creative", prompt: "A fashion magazine with editorial spreads and trend reports", emoji: "👠" },
  { name: "NFT Marketplace", category: "Creative", prompt: "A dark NFT marketplace with collection showcase and artist drops", emoji: "🖼️" },
  { name: "Streaming Platform", category: "Creative", prompt: "A video streaming platform landing with content library preview", emoji: "📺" },
  { name: "Interior Design", category: "Creative", prompt: "An interior design studio with project gallery and design services", emoji: "🪑" },
];

const categories = ["All", ...Array.from(new Set(templates.map(t => t.category)))];

function TemplatePreview({ prompt }: { prompt: string }) {
  const html = generateHTMLFromPrompt(prompt);
  return (
    <div className="relative h-48 overflow-hidden bg-muted">
      <iframe
        srcDoc={html}
        className="w-[1200px] h-[800px] border-0 pointer-events-none"
        style={{ transform: "scale(0.167)", transformOrigin: "top left" }}
        title="Template preview"
        sandbox=""
        tabIndex={-1}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
    </div>
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

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Templates</h1>
        <p className="text-muted-foreground mt-1">
          {templates.length} pre-built templates — pick one and customize with AI.
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
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i * 0.03, 0.5) }}
            className="rounded-xl border border-border bg-card shadow-card overflow-hidden hover:shadow-elevated transition-all group cursor-pointer hover:border-primary/30"
            onClick={() => navigate("/dashboard/builder", { state: { prompt: t.prompt } })}
          >
            <TemplatePreview prompt={t.prompt} />
            <div className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{t.emoji}</span>
                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-md">{t.category}</span>
              </div>
              <h3 className="font-display font-semibold text-foreground mt-1">{t.name}</h3>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{t.prompt}</p>
              <div className="flex gap-2 mt-3">
                <Button variant="outline" size="sm" className="flex-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="h-3.5 w-3.5 mr-1" /> Preview
                </Button>
                <Button variant="hero" size="sm" className="flex-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Use Template <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
