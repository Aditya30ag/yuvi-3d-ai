"use client";

import React, { useEffect, useState } from "react";
import { X, Crown, Check } from "lucide-react";

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlan?: string;
}

type BillingCycle = "monthly" | "yearly";

interface Plan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number; // per month, billed yearly
  coins: number;
  features: string[];
  highlighted?: boolean;
}

// Placeholder plans — replace prices and limits once billing is wired up.
// Coin costs mirror useWorkspace: 10 per image, 20 per 3D model.
const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    description: "Try the studio and generate your first models.",
    monthlyPrice: 0,
    yearlyPrice: 0,
    coins: 100,
    features: [
      "100 coins per month",
      "Up to 5 3D models",
      "Hyperbolic engine",
      "STL downloads",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description: "For makers who print every week.",
    monthlyPrice: 12,
    yearlyPrice: 10,
    coins: 1000,
    features: [
      "1,000 coins per month",
      "Up to 50 3D models",
      "All engines incl. Fal.ai Trellis",
      "Priority generation queue",
      "Commercial use",
    ],
    highlighted: true,
  },
  {
    id: "studio",
    name: "Studio",
    description: "For teams and high-volume production.",
    monthlyPrice: 39,
    yearlyPrice: 32,
    coins: 5000,
    features: [
      "5,000 coins per month",
      "Up to 250 3D models",
      "All engines incl. Fal.ai Trellis",
      "Fastest generation queue",
      "Commercial use",
      "Priority support",
    ],
  },
];

export function PricingModal({ isOpen, onClose, currentPlan = "free" }: PricingModalProps) {
  const [cycle, setCycle] = useState<BillingCycle>("monthly");

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pricing-modal-title"
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 dark:bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-4xl max-h-[calc(100vh-2rem)] overflow-y-auto bg-bg-surface border border-border-subtle rounded-2xl shadow-2xl transition-all duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle bg-bg-surface-secondary/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-neon-green/10 border border-neon-green/20 flex items-center justify-center text-neon-green">
              <Crown className="w-4 h-4" />
            </div>
            <div>
              <h2 id="pricing-modal-title" className="text-base font-bold text-text-primary">
                Upgrade your plan
              </h2>
              <p className="text-xs text-text-muted">
                More coins, faster engines, and commercial use
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close pricing"
            className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-surface-hover transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Billing cycle toggle */}
        <div className="flex justify-center pt-5">
          <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-bg-surface-secondary border border-border-subtle">
            {(["monthly", "yearly"] as BillingCycle[]).map((value) => (
              <button
                key={value}
                onClick={() => setCycle(value)}
                className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                  cycle === value
                    ? "bg-bg-surface text-text-primary shadow-sm"
                    : "text-text-muted hover:text-text-primary"
                }`}
              >
                {value === "monthly" ? "Monthly" : "Yearly"}
                {value === "yearly" && (
                  <span className="ml-1.5 text-[10px] font-bold text-neon-green">Save ~20%</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
          {PLANS.map((plan) => {
            const price = cycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
            const isCurrent = plan.id === currentPlan;

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col rounded-xl border p-5 transition-colors ${
                  plan.highlighted
                    ? "border-neon-green/60 bg-neon-green/5 shadow-[0_0_20px_var(--neon-green-glow)]"
                    : "border-border-subtle bg-bg-surface-secondary/40"
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute -top-2.5 left-5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-neon-green text-[#050508]">
                    Most popular
                  </span>
                )}

                <h3 className="text-sm font-bold text-text-primary">{plan.name}</h3>
                <p className="mt-1 text-xs text-text-muted min-h-[32px]">{plan.description}</p>

                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-text-primary">${price}</span>
                  <span className="text-xs text-text-muted">/ month</span>
                </div>
                <p className="mt-1 text-[11px] text-text-muted h-4">
                  {price > 0 && cycle === "yearly" ? `Billed $${price * 12} yearly` : ""}
                </p>

                <ul className="mt-4 space-y-2 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-xs text-text-primary">
                      <Check className="w-3.5 h-3.5 mt-px shrink-0 text-neon-green stroke-[3]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  disabled={isCurrent}
                  className={`mt-5 w-full py-2 rounded-lg text-xs font-bold transition-all active:scale-[0.98] ${
                    isCurrent
                      ? "bg-bg-surface-secondary border border-border-subtle text-text-muted cursor-default"
                      : plan.highlighted
                        ? "btn-primary cursor-pointer"
                        : "bg-bg-surface-secondary hover:bg-bg-surface-hover border border-border-subtle text-text-primary cursor-pointer"
                  }`}
                >
                  {isCurrent ? "Current plan" : `Upgrade to ${plan.name}`}
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-border-subtle bg-bg-surface-secondary/30 text-xs text-text-muted text-center">
          Image generation costs 10 coins · Image-to-3D costs 20 coins
        </div>
      </div>
    </div>
  );
}
