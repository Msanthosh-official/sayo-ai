import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Zap, Crown, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import QRPaymentDialog from "@/components/QRPaymentDialog";

const plans = [
  {
    name: "Free",
    icon: Zap,
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Get started with basic features",
    features: [
      "3 projects",
      "Basic AI generation",
      "Community support",
      "Sayo.ai subdomain",
      "Basic templates",
    ],
    cta: "Current Plan",
    disabled: true,
    popular: false,
  },
  {
    name: "Pro",
    icon: Sparkles,
    monthlyPrice: 19,
    yearlyPrice: 190,
    description: "For professionals and small teams",
    features: [
      "Unlimited projects",
      "Advanced AI generation",
      "Priority support",
      "Custom domains",
      "All premium templates",
      "Remove Sayo branding",
      "Analytics dashboard",
      "GitHub integration",
    ],
    cta: "Upgrade to Pro",
    disabled: false,
    popular: true,
  },
  {
    name: "Enterprise",
    icon: Crown,
    monthlyPrice: 49,
    yearlyPrice: 490,
    description: "For agencies and large teams",
    features: [
      "Everything in Pro",
      "Team collaboration",
      "White-label exports",
      "API access",
      "SSO / SAML",
      "Dedicated support",
      "Custom integrations",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
    disabled: false,
    popular: false,
  },
];

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({ name: "", price: 0 });
  const navigate = useNavigate();

  const handleUpgrade = (planName: string, price: number) => {
    if (planName === "Enterprise") {
      toast.info("Contact us for Enterprise pricing!");
      return;
    }
    setSelectedPlan({ name: planName, price });
    setQrOpen(true);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Button variant="ghost" size="sm" className="mb-4" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </Button>
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold text-foreground">
            Upgrade your plan
          </h1>
          <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
            Choose the plan that fits your needs. Save 20% with yearly billing.
          </p>
        </div>
      </motion.div>

      {/* Billing Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center justify-center gap-3"
      >
        <span className={`text-sm font-medium ${!isYearly ? "text-foreground" : "text-muted-foreground"}`}>
          Monthly
        </span>
        <button
          onClick={() => setIsYearly(!isYearly)}
          className={`relative w-14 h-7 rounded-full transition-colors ${
            isYearly ? "bg-primary" : "bg-muted"
          }`}
        >
          <motion.div
            className="absolute top-0.5 w-6 h-6 rounded-full bg-primary-foreground shadow-md"
            animate={{ left: isYearly ? "calc(100% - 1.625rem)" : "0.125rem" }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </button>
        <span className={`text-sm font-medium ${isYearly ? "text-foreground" : "text-muted-foreground"}`}>
          Yearly
        </span>
        {isYearly && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full"
          >
            Save 20%
          </motion.span>
        )}
      </motion.div>

      {/* Plans Grid */}
      <div className="grid md:grid-cols-3 gap-5">
        {plans.map((plan, i) => {
          const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
          const Icon = plan.icon;
          return (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.05 }}
              className={`relative rounded-2xl border p-6 flex flex-col ${
                plan.popular
                  ? "border-primary bg-card shadow-elevated"
                  : "border-border bg-card shadow-card"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-hero text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                  plan.popular ? "gradient-hero" : "bg-muted"
                }`}>
                  <Icon className={`h-5 w-5 ${plan.popular ? "text-primary-foreground" : "text-muted-foreground"}`} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-foreground">{plan.name}</h3>
                  <p className="text-xs text-muted-foreground">{plan.description}</p>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-4xl font-bold text-foreground">
                    ${price}
                  </span>
                  {price > 0 && (
                    <span className="text-muted-foreground text-sm">
                      /{isYearly ? "year" : "month"}
                    </span>
                  )}
                </div>
                {isYearly && price > 0 && (
                  <p className="text-xs text-muted-foreground mt-1">
                    ${Math.round(price / 12)}/month billed yearly
                  </p>
                )}
              </div>

              <ul className="space-y-3 mb-6 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className={`h-4 w-4 mt-0.5 shrink-0 ${plan.popular ? "text-primary" : "text-muted-foreground"}`} />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? "hero" : "outline"}
                className="w-full"
                disabled={plan.disabled}
                onClick={() => handleUpgrade(plan.name, price)}
              >
                {plan.cta}
              </Button>
            </motion.div>
          );
        })}
      </div>

      <QRPaymentDialog
        open={qrOpen}
        onOpenChange={setQrOpen}
        planName={selectedPlan.name}
        price={selectedPlan.price}
        period={isYearly ? "year" : "month"}
      />

      {/* FAQ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center text-sm text-muted-foreground pb-8"
      >
        <p>All plans include SSL, CDN, and 99.9% uptime guarantee.</p>
        <p className="mt-1">
          Questions? <button className="text-primary font-medium hover:underline" onClick={() => toast.info("Support chat coming soon!")}>Contact support</button>
        </p>
      </motion.div>
    </div>
  );
}
