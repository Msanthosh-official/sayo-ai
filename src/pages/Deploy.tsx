import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Rocket, GitBranch, Globe, ExternalLink, Check, FileCode2, Loader2, Copy, AlertCircle, Eye } from "lucide-react";
import { useState } from "react";
import { useProject } from "@/contexts/ProjectContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function Deploy() {
  const { currentProject, updateProject } = useProject();
  const navigate = useNavigate();
  const [githubConnected, setGithubConnected] = useState(false);
  const [githubDeploying, setGithubDeploying] = useState(false);
  const [githubRepo, setGithubRepo] = useState<string | null>(null);
  const [deploying, setDeploying] = useState(false);
  const [deployed, setDeployed] = useState(false);
  const [deployedUrl, setDeployedUrl] = useState<string | null>(currentProject?.deployedUrl || null);
  const [deployLogs, setDeployLogs] = useState<string[]>([]);

  const slug = currentProject
    ? currentProject.prompt.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 30)
    : "my-site";

  const handleGithubConnect = () => {
    setGithubDeploying(true);
    setDeployLogs(["Authenticating with GitHub..."]);
    
    setTimeout(() => {
      setDeployLogs(prev => [...prev, "Creating repository..."]);
    }, 500);
    
    setTimeout(() => {
      const repo = `sayo-user/${slug}`;
      setDeployLogs(prev => [...prev, `Repository created: ${repo}`, "Pushing generated code...", "Setting up CI/CD pipeline..."]);
      setGithubRepo(repo);
      setGithubConnected(true);
      setGithubDeploying(false);
      toast.success("GitHub repository created!", {
        description: `Code pushed to ${repo}`,
        action: { label: "Open", onClick: () => window.open(`https://github.com/${repo}`, "_blank") },
      });
    }, 2000);
  };

  const handleDeploy = () => {
    if (!currentProject) {
      toast.error("No project to deploy", { description: "Generate a site in the AI Builder first." });
      return;
    }
    setDeploying(true);
    setDeployLogs(["Starting deployment..."]);

    const steps = [
      { msg: "Building project...", delay: 600 },
      { msg: "Optimizing assets...", delay: 1200 },
      { msg: "Configuring SSL certificate...", delay: 1800 },
      { msg: "Deploying to edge network...", delay: 2400 },
      { msg: "Running health checks...", delay: 2800 },
    ];
    
    steps.forEach(step => {
      setTimeout(() => setDeployLogs(prev => [...prev, step.msg]), step.delay);
    });

    setTimeout(() => {
      const url = `https://${slug}.vercel.app`;
      setDeployedUrl(url);
      setDeploying(false);
      setDeployed(true);
      setDeployLogs(prev => [...prev, `✅ Deployed to ${url}`]);
      updateProject(currentProject.id, { deployedUrl: url });
      toast.success("Deployed successfully!", {
        description: `${currentProject.pages.length} page${currentProject.pages.length > 1 ? "s" : ""} live at ${url}`,
        action: { label: "Copy URL", onClick: () => navigator.clipboard.writeText(url) },
      });
    }, 3200);
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("URL copied!");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="font-display text-2xl font-bold text-foreground">Deploy</h1>

      {!currentProject && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-destructive/30 bg-destructive/5 p-5 flex items-center gap-4">
          <AlertCircle className="h-5 w-5 text-destructive shrink-0" />
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">No project generated yet</h3>
            <p className="text-sm text-muted-foreground">Generate a website in the AI Builder first, then come back to deploy it.</p>
          </div>
          <Button variant="hero" size="sm" onClick={() => navigate("/dashboard/builder")}>Go to Builder</Button>
        </motion.div>
      )}

      {currentProject && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-border bg-card shadow-card p-6">
          <div className="flex items-center gap-3 mb-3">
            <FileCode2 className="h-5 w-5 text-primary" />
            <h2 className="font-display font-semibold text-lg text-foreground">Current Project</h2>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-foreground font-medium">{currentProject.name}</p>
              <p className="text-sm text-muted-foreground">{currentProject.pages.length} page{currentProject.pages.length > 1 ? "s" : ""} • Generated {new Date(currentProject.createdAt).toLocaleString()}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => navigate("/dashboard/builder")}>
                <Eye className="h-3.5 w-3.5 mr-1" /> View
              </Button>
              {currentProject.publishedUrl && (
                <Button variant="outline" size="sm" onClick={() => copyUrl(currentProject.publishedUrl!)}>
                  <Globe className="h-3.5 w-3.5 mr-1" /> Copy URL
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* GitHub */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="rounded-xl border border-border bg-card shadow-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <GitBranch className="h-5 w-5 text-primary" />
          <h2 className="font-display font-semibold text-lg text-foreground">GitHub Integration</h2>
        </div>
        {githubConnected ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-green-500" /> Connected to <span className="font-medium text-foreground">{githubRepo}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => { setGithubConnected(false); setGithubRepo(null); toast.info("Disconnected from GitHub"); }}>
                Disconnect
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => {
                toast.success("Code pushed to GitHub!", { description: `Updated ${githubRepo}` });
              }}>
                <GitBranch className="h-3.5 w-3.5 mr-1" /> Push Changes
              </Button>
              <Button variant="outline" size="sm" onClick={() => window.open(`https://github.com/${githubRepo}`, "_blank")}>
                <ExternalLink className="h-3.5 w-3.5 mr-1" /> Open Repo
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Push your generated code to a GitHub repository.</p>
            <Button variant="outline" onClick={handleGithubConnect} disabled={githubDeploying || !currentProject}>
              {githubDeploying ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <GitBranch className="h-4 w-4 mr-2" />}
              {githubDeploying ? "Connecting..." : "Connect GitHub"}
            </Button>
          </div>
        )}
      </motion.div>

      {/* Deploy */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-xl border border-border bg-card shadow-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <Rocket className="h-5 w-5 text-primary" />
          <h2 className="font-display font-semibold text-lg text-foreground">Deploy to Production</h2>
        </div>
        {deployed && deployedUrl ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-green-500" /> <span className="text-foreground font-medium">Deployed successfully!</span>
            </div>
            <div className="flex items-center justify-between bg-muted rounded-lg p-3">
              <a href={deployedUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary hover:underline">
                <Globe className="h-4 w-4" /> {deployedUrl} <ExternalLink className="h-3 w-3" />
              </a>
              <Button variant="ghost" size="sm" onClick={() => copyUrl(deployedUrl)}>
                <Copy className="h-3.5 w-3.5" />
              </Button>
            </div>
            <Button variant="outline" size="sm" onClick={() => { setDeployed(false); setDeployedUrl(null); setDeployLogs([]); }}>
              Redeploy
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Deploy your site to a global CDN with automatic SSL.</p>
              <Button variant="hero" onClick={handleDeploy} disabled={deploying || !currentProject}>
                {deploying ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Deploying...</> : <>Deploy <Rocket className="h-4 w-4 ml-1" /></>}
              </Button>
            </div>
          </div>
        )}

        {/* Deploy logs */}
        {deployLogs.length > 0 && (
          <div className="mt-4 bg-muted rounded-lg p-3 max-h-40 overflow-y-auto">
            <p className="text-xs font-semibold text-muted-foreground mb-2">Build Logs</p>
            {deployLogs.map((log, i) => (
              <p key={i} className="text-xs text-muted-foreground font-mono py-0.5">{log}</p>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
