import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Mail, Lock, User, ArrowRight, Github } from "lucide-react";

export default function Signup() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left branding panel */}
      <div className="hidden lg:flex w-1/2 gradient-hero items-center justify-center p-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-md text-primary-foreground"
        >
          <div className="flex items-center gap-2 mb-8">
            <Sparkles className="h-8 w-8" />
            <span className="font-display text-2xl font-bold">Sayo.ai</span>
          </div>
          <h2 className="font-display text-4xl font-bold mb-4">
            Build websites with AI in seconds
          </h2>
          <p className="text-primary-foreground/80 text-lg">
            Describe your vision, and our AI brings it to life with clean, deployable code.
          </p>
        </motion.div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="font-display text-xl font-bold text-foreground">Sayo.ai</span>
          </div>

          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            {isLogin ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-muted-foreground mb-8">
            {isLogin ? "Sign in to continue building" : "Start building AI-powered websites for free"}
          </p>

          <Button
            variant="outline"
            className="w-full mb-6 h-12 text-sm font-medium"
            onClick={() => navigate("/dashboard")}
          >
            <Github className="h-4 w-4 mr-2" />
            Continue with GitHub
          </Button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-3 text-muted-foreground">or</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Full name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="pl-10 h-12"
                />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="pl-10 h-12"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                className="pl-10 h-12"
              />
            </div>

            <Button variant="hero" className="w-full h-12 text-base font-semibold" type="submit">
              {isLogin ? "Sign In" : "Create Account"}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary font-medium hover:underline"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
