import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Check, X, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PaymentRequest {
  id: string;
  user_id: string;
  plan: string;
  amount: number;
  period: string;
  transaction_id: string;
  status: string;
  created_at: string;
}

export default function AdminPayments() {
  const [requests, setRequests] = useState<PaymentRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchRequests = async () => {
    const { data, error } = await supabase
      .from("payment_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setRequests(data);
    setLoading(false);
  };

  useEffect(() => { fetchRequests(); }, []);

  const handleAction = async (id: string, userId: string, plan: string, action: "approved" | "rejected") => {
    const { error: updateError } = await supabase
      .from("payment_requests")
      .update({ status: action, reviewed_at: new Date().toISOString() })
      .eq("id", id);

    if (updateError) {
      toast.error("Failed to update request");
      return;
    }

    if (action === "approved") {
      const { error: profileError } = await supabase
        .from("profiles")
        .update({ plan })
        .eq("id", userId);

      if (profileError) {
        toast.error("Failed to upgrade user plan");
        return;
      }
    }

    toast.success(`Payment ${action}!`);
    fetchRequests();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </Button>
        <h1 className="font-display text-2xl font-bold text-foreground">Payment Requests</h1>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : requests.length === 0 ? (
        <p className="text-muted-foreground">No payment requests yet.</p>
      ) : (
        <div className="space-y-3">
          {requests.map((req) => (
            <div key={req.id} className="border border-border rounded-xl p-4 bg-card flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-foreground capitalize">{req.plan}</span>
                  <Badge variant={req.status === "approved" ? "default" : req.status === "rejected" ? "destructive" : "secondary"}>
                    {req.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  ${req.amount}/{req.period} · TXN: <span className="font-mono">{req.transaction_id}</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(req.created_at).toLocaleString()}
                </p>
              </div>
              {req.status === "pending" && (
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleAction(req.id, req.user_id, req.plan, "approved")}>
                    <Check className="h-4 w-4 mr-1" /> Approve
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleAction(req.id, req.user_id, req.plan, "rejected")}>
                    <X className="h-4 w-4 mr-1" /> Reject
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
