import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Rocket, GitBranch, Globe, ExternalLink, Check } from "lucide-react";
import { useState } from "react";

export default function Deploy() {
  const [githubConnected, setGithubConnected] = useState(false);
  const [deploying, setDeploying] = useState(false);
  const [deployed, setDeployed] = useState(false);

  const handleDeploy = () => {
    setDeploying(true);
    setTimeout(() => { setDeploying(false); setDeployed(true); }, 3000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="font-display text-2xl font-bold text-foreground">Deploy</h1>

      {/* GitHub */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-border bg-card shadow-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <GitBranch className="h-5 w-5 text-primary" />
          <h2 className="font-display font-semibold text-lg text-foreground">GitHub Integration</h2>
        </div>
        {githubConnected ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Check className="h-4 w-4 text-green-500" /> Connected to <span className="font-medium text-foreground">sayo-user/my-project</span>
          </div>
        ) : (
          <Button variant="outline" onClick={() => setGithubConnected(true)}>
            <GitBranch className="h-4 w-4 mr-2" /> Connect GitHub
          </Button>
        )}
      </motion.div>

      {/* Deploy */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-xl border border-border bg-card shadow-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <Rocket className="h-5 w-5 text-primary" />
          <h2 className="font-display font-semibold text-lg text-foreground">Publish to Vercel</h2>
        </div>
        {deployed ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-green-500" /> <span className="text-foreground font-medium">Deployed successfully!</span>
            </div>
            <a href="#" className="flex items-center gap-2 text-sm text-primary hover:underline">
              <Globe className="h-4 w-4" /> https://my-project.vercel.app <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        ) : (
          <Button variant="hero" onClick={handleDeploy} disabled={deploying}>
            {deploying ? "Deploying..." : "Publish to Vercel"} <Rocket className="h-4 w-4" />
          </Button>
        )}
      </motion.div>
    </div>
  );
}
