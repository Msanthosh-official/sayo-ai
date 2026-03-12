import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface QRPaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planName: string;
  price: number;
  period: string;
}

export default function QRPaymentDialog({ open, onOpenChange, planName, price, period }: QRPaymentDialogProps) {
  const handleConfirmPayment = () => {
    toast.success("Payment confirmation sent!", {
      description: "We'll verify your payment and activate your plan shortly.",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Pay for {planName} Plan</DialogTitle>
          <DialogDescription className="text-center">
            Scan the QR code below to pay <span className="font-bold text-foreground">${price}/{period}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4 py-4">
          <div className="w-56 h-56 rounded-xl border-2 border-dashed border-border flex items-center justify-center bg-muted/50">
            {/* Replace with your QR code image */}
            <p className="text-sm text-muted-foreground text-center px-4">
              QR code not set yet. Upload your payment QR code.
            </p>
          </div>

          <p className="text-xs text-muted-foreground text-center max-w-xs">
            After scanning and completing payment, click the button below to confirm.
          </p>

          <Button variant="hero" className="w-full" onClick={handleConfirmPayment}>
            I've completed the payment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
