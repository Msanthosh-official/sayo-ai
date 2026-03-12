import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import paymentQR from "@/assets/payment-qr.jpeg";

interface QRPaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planName: string;
  price: number;
  period: string;
}

export default function QRPaymentDialog({ open, onOpenChange, planName, price, period }: QRPaymentDialogProps) {
  const [transactionId, setTransactionId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async () => {
    if (!transactionId.trim()) {
      toast.error("Please enter your UPI transaction ID");
      return;
    }
    if (!user) {
      toast.error("Please sign in first");
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("payment_requests").insert({
      user_id: user.id,
      plan: planName.toLowerCase(),
      amount: price,
      period,
      transaction_id: transactionId.trim(),
    });
    setSubmitting(false);

    if (error) {
      toast.error("Failed to submit payment request");
      return;
    }

    toast.success("Payment request submitted!", {
      description: "We'll verify your payment and upgrade your plan shortly.",
    });
    setTransactionId("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Pay for {planName} Plan</DialogTitle>
          <DialogDescription className="text-center">
            Scan the QR code to pay <span className="font-bold text-foreground">${price}/{period}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4 py-4">
          <img
            src={paymentQR}
            alt="Scan to pay with any UPI app"
            className="w-56 h-56 rounded-xl object-contain"
          />

          <div className="w-full space-y-2">
            <label className="text-sm font-medium text-foreground">UPI Transaction ID</label>
            <Input
              placeholder="Enter your transaction ID after payment"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Find this in your UPI app's payment confirmation.
            </p>
          </div>

          <Button
            variant="hero"
            className="w-full"
            onClick={handleSubmit}
            disabled={submitting || !transactionId.trim()}
          >
            {submitting ? "Submitting..." : "Submit Payment for Verification"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
