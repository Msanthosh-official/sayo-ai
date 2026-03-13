import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Zap, Code2, Rocket, GitBranch, Eye, Globe, ArrowRight, Github, Twitter, Sparkles, Check, Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/hooks/use-theme";
import logo from "@/assets/sayo-logo.png";

const features = [
  { icon: Sparkles, title: "AI-Powered Generation", desc: "Describe your website in plain English and watch it come to life instantly." },
  { icon: Code2, title: "Clean Code Output", desc: "Get production-ready React components with Tailwind CSS styling." },
  { icon: Eye, title: "Live Preview", desc: "See real-time changes as your website is being generated." },
  { icon: GitBranch, title: "GitHub Integration", desc: "Auto-push generated code to your GitHub repository." },
  { icon: Rocket, title: "One-Click Deploy", desc: "Deploy to Vercel with a single click and get a live URL." },
  { icon: Globe, title: "Custom Domains", desc: "Connect your own domain to your deployed projects." },
];

const pricing = [
  { name: "Free", price: "$0", period: "/month", features: ["3 projects", "AI generation", "Live preview", "Community support"], cta: "Get Started" },
  { name: "Pro", price: "$19", period: "/month", features: ["Unlimited projects", "GitHub integration", "One-click deploy", "Priority support", "Custom domains"], cta: "Start Building", popular: true },
  { name: "Team", price: "$49", period: "/month", features: ["Everything in Pro", "Team collaboration", "Private repos", "Analytics", "SLA support"], cta: "Contact Sales" },
];

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

export default function Landing() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Sayo.ai" className="h-8 w-auto" />
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={toggleTheme} title="Toggle theme">
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>Login</Button>
            <Button variant="hero" size="sm" onClick={() => navigate("/signup")}>Start Building <ArrowRight className="h-4 w-4" /></Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 overflow-hidden">
        <div className="container mx-auto text-center max-w-4xl">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent text-sm text-muted-foreground mb-8 border border-border">
              <Sparkles className="h-4 w-4 text-primary" /> AI-Powered Website Builder
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6">
              Build apps with AI
              <span className="text-gradient block">instantly</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Describe your vision, and Sayo.ai transforms it into a fully functional website. No coding required — just your imagination.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="hero" size="lg" className="px-8 py-6 text-lg" onClick={() => navigate("/dashboard")}>
                Start Building <ArrowRight className="h-5 w-5" />
              </Button>
              <Button variant="hero-outline" size="lg" className="px-8 py-6 text-lg" onClick={() => navigate("/login")}>
                Login
              </Button>
            </div>
          </motion.div>

          {/* Hero mockup */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 rounded-2xl border border-border shadow-elevated overflow-hidden bg-card"
          >
            <div className="h-10 bg-muted flex items-center px-4 gap-2 border-b border-border">
              <div className="w-3 h-3 rounded-full bg-primary/40" />
              <div className="w-3 h-3 rounded-full bg-secondary/60" />
              <div className="w-3 h-3 rounded-full bg-muted-foreground/30" />
              <div className="ml-4 h-6 bg-background rounded-md flex-1 max-w-md" />
            </div>
            <div className="p-8 grid grid-cols-3 gap-4 min-h-[300px]">
              <div className="col-span-1 space-y-3">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="h-8 bg-muted rounded-lg" style={{ width: `${70 + Math.random() * 30}%` }} />
                ))}
              </div>
              <div className="col-span-2 bg-accent rounded-xl p-6 space-y-4">
                <div className="h-6 bg-primary/10 rounded w-2/3" />
                <div className="h-4 bg-muted rounded w-full" />
                <div className="h-4 bg-muted rounded w-5/6" />
                <div className="h-32 bg-primary/5 rounded-lg mt-4 border border-border" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold mb-4 text-foreground">Everything you need to ship fast</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">From AI generation to one-click deployment, Sayo.ai handles it all.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl border border-border bg-card shadow-card hover:shadow-elevated transition-shadow group"
              >
                <div className="h-12 w-12 rounded-xl gradient-hero flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <f.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2 text-foreground">{f.title}</h3>
                <p className="text-muted-foreground text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-4 bg-accent/30">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold mb-4 text-foreground">Simple, transparent pricing</h2>
            <p className="text-muted-foreground text-lg">Start free, scale as you grow.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {pricing.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ delay: i * 0.1 }}
                className={`p-8 rounded-2xl border bg-card relative ${plan.popular ? "border-primary shadow-elevated scale-105" : "border-border shadow-card"}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 gradient-hero rounded-full text-xs font-semibold text-primary-foreground">
                    Most Popular
                  </div>
                )}
                <h3 className="font-display font-semibold text-xl text-foreground">{plan.name}</h3>
                <div className="mt-4 mb-6">
                  <span className="text-4xl font-bold font-display text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-primary" /> {f}
                    </li>
                  ))}
                </ul>
                <Button variant={plan.popular ? "hero" : "outline"} className="w-full" onClick={() => navigate("/signup")}>
                  {plan.cta}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg gradient-hero flex items-center justify-center">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-foreground">Sayo.ai</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 Sayo.ai. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Github className="h-5 w-5" /></a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Twitter className="h-5 w-5" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
