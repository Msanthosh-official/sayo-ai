import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { User, Key, Bell } from "lucide-react";

export default function DashboardSettings() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="font-display text-2xl font-bold text-foreground">Settings</h1>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-border bg-card shadow-card p-6 space-y-4">
        <div className="flex items-center gap-3">
          <User className="h-5 w-5 text-primary" />
          <h2 className="font-display font-semibold text-foreground">Profile</h2>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-sm text-muted-foreground block mb-1">Name</label>
            <input defaultValue="Sayo User" className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground block mb-1">Email</label>
            <input defaultValue="user@sayo.ai" className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <Button variant="hero" size="sm">Save Changes</Button>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-xl border border-border bg-card shadow-card p-6 space-y-4">
        <div className="flex items-center gap-3">
          <Key className="h-5 w-5 text-primary" />
          <h2 className="font-display font-semibold text-foreground">API Keys</h2>
        </div>
        <p className="text-sm text-muted-foreground">Manage your API keys for integrations.</p>
        <Button variant="outline" size="sm">Generate API Key</Button>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-xl border border-border bg-card shadow-card p-6 space-y-4">
        <div className="flex items-center gap-3">
          <Bell className="h-5 w-5 text-primary" />
          <h2 className="font-display font-semibold text-foreground">Notifications</h2>
        </div>
        <label className="flex items-center gap-3 text-sm text-muted-foreground cursor-pointer">
          <input type="checkbox" defaultChecked className="rounded border-input accent-primary" />
          Email notifications for deployments
        </label>
        <label className="flex items-center gap-3 text-sm text-muted-foreground cursor-pointer">
          <input type="checkbox" defaultChecked className="rounded border-input accent-primary" />
          Email notifications for project updates
        </label>
      </motion.div>
    </div>
  );
}
