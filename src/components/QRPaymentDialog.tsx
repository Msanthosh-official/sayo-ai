import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import paymentQR from "@/assets/payment-qr.jpeg";

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
          <img
            src={paymentQR}
            alt="Scan to pay with any UPI app"
            className="w-56 h-56 rounded-xl object-contain"
          />
          <p className="text-xs text-muted-foreground text-center max-w-xs">
            Scan with any UPI app. After completing payment, click below to confirm.
          </p>
          <Button variant="hero" className="w-full" onClick={handleConfirmPayment}>
            I've completed the payment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
