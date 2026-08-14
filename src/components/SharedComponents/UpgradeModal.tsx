/** @format */
"use client";
import React from "react";
import { Check, X } from "lucide-react";
import { Dialog, DialogContent, DialogClose, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface StaticPlan {
  id: string;
  name: string;
  code: string;
  price: number;
  currency: string;
  billing_cycle: string;
  description: string;
  button_text: string;
  is_current: boolean;
}

const STATIC_PLANS: StaticPlan[] = [
  {
    id: "1",
    name: "Bronze Plan",
    code: "field_bronze_monthly",
    price: 0,
    currency: "$",
    billing_cycle: "month",
    description: "Free plan for field owner.",
    button_text: "Active",
    is_current: true,
  },
  {
    id: "2",
    name: "Silver Plan",
    code: "field_silver_monthly",
    price: 29,
    currency: "$",
    billing_cycle: "month",
    description: "Essential for Field Growth.",
    button_text: "Upgrade",
    is_current: false,
  },
  {
    id: "3",
    name: "Gold Plan",
    code: "field_gold_monthly",
    price: 79,
    currency: "$",
    billing_cycle: "month",
    description: "Premium plan for scaling arenas.",
    button_text: "Coming Soon",
    is_current: false,
  },
];

export default function UpgradeModal({ isOpen, onClose }: UpgradeModalProps) {
  const { t } = useTranslation("dashboard");

  const getPlanButtonText = (plan: StaticPlan) => {
    if (plan.is_current) {
      return t("upgradeModal.buttonActive");
    }
    const btnTextLower = plan.button_text?.toLowerCase();
    if (btnTextLower === "active" || btnTextLower === "current") {
      return t("upgradeModal.buttonActive");
    }
    if (btnTextLower === "upgrade" || btnTextLower === "buy now" || btnTextLower === "get started") {
      return t("upgradeModal.buttonUpgrade");
    }
    return plan.button_text;
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="bg-[#0b0b0f] border border-[#2C2740] max-w-300 sm:max-w-300 w-full max-h-[90vh] overflow-y-auto p-0 rounded-2xl"
      >
        {/* Header */}
        <div className="relative px-8 pt-8 pb-4 text-center ">
          <DialogClose asChild>
            <button
              onClick={onClose}
              className="cursor-pointer absolute top-4 right-4 flex items-center gap-1.5 text-[#9a98b8] hover:text-white text-sm font-medium transition-colors"
            >
              {t("upgradeModal.cancel")}
              <span className="w-6 h-6 rounded-full border border-[#2C2740] flex items-center justify-center">
                <X size={12} />
              </span>
            </button>
          </DialogClose>

          <DialogTitle asChild>
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
              {t("upgradeModal.title")}
            </h2>
          </DialogTitle>
          <DialogDescription asChild>
            <p className="text-secondary text-sm max-w-md mx-auto leading-relaxed">
              {t("upgradeModal.subtitle")}
            </p>
          </DialogDescription>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 pb-8 items-stretch">
          {STATIC_PLANS.map((plan) => {
            const isComingSoonPlan = plan.code === "field_gold_monthly";
            const isSelected = plan.is_current && !isComingSoonPlan;
            return (
              <div
                key={plan.id}
                className={cn(
                  "relative rounded-2xl p-5 transition-all duration-200 flex flex-col",
                  isSelected
                    ? "border-2 border-transparent bg-[linear-gradient(#0b0b0f,#0b0b0f)_padding-box,linear-gradient(135deg,#cdba20,#C00069)_border-box] shadow-[0_0_24px_rgba(205,186,32,0.35)]"
                    : "border border-[#2C2740]",
                  isComingSoonPlan
                    ? "opacity-80 cursor-not-allowed"
                    : "cursor-pointer",
                  "bg-[#0b0b0f]",
                )}
              >
                {/* Popular badge */}
                {isSelected && (
                  <div className="absolute top-4 right-4">
                    <Button className="bg-emerald-500/20 text-emerald-400 text-xs font-semibold px-3 py-1 border border-emerald-500/30">
                      {t("upgradeModal.currentPlan")}
                    </Button>
                  </div>
                )}

                {isComingSoonPlan && (
                  <div className="absolute top-4 right-4">
                    <Button className="bg-[#cdba20]/15 text-[#cdba20] text-xs font-semibold px-3 py-1 border border-[#cdba20]/40">
                      {t("upgradeModal.comingSoon")}
                    </Button>
                  </div>
                )}

                {/* Plan name */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-white font-semibold text-sm">
                    {t(`upgradeModal.plans.${plan.code === "field_bronze_monthly" ? "bronze" : plan.code === "field_silver_monthly" ? "silver" : "gold"}`)}
                  </span>
                </div>

                {isComingSoonPlan ? (
                  <div className="flex-1 flex items-center justify-center min-h-36 md:min-h-80 text-[#cdba20] text-sm font-semibold tracking-wide">
                    {t("upgradeModal.comingSoon")}
                  </div>
                ) : (
                  <>
                    {/* Price */}
                    <div className="mb-1">
                      <span className="text-white text-4xl font-bold">
                        {plan.currency} {plan.price}
                      </span>
                      {plan.code !== "field_bronze_monthly" && (
                        <span className="text-[#9a98b8] text-sm ml-1">
                          / {plan.billing_cycle}
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    {plan.code !== "field_bronze_monthly" ? (
                      <p className="text-[#cdba20] text-xs mb-4">
                        {plan.description}
                      </p>
                    ) : (
                      <p className="text-[#cdba20] text-xs mb-4">
                       Free plan for field owner.
                      </p>
                    )}

                    {/* Button */}
                    <button
                      className={cn(
                        "w-full py-2.5 rounded-xl text-sm font-semibold transition-all mb-5",
                        plan.is_current
                          ? "bg-transparent border border-emerald-500/30 text-emerald-400 cursor-default"
                          : plan.code.includes("silver")
                            ? "bg-linear-to-r from-[#980009] via-[#C00069] to-[#980009] text-white shadow-[0_0_12px_rgba(192,0,105,0.4)] hover:opacity-90"
                            : "bg-transparent border border-[#525273] text-white hover:border-white",
                      )}
                      disabled={plan.is_current}
                    >
                      {getPlanButtonText(plan)}
                    </button>

                    {/* Features */}
                    <div>
                      <p className="text-white font-semibold text-sm mb-3">
                        {t("upgradeModal.featuresLabel")}
                      </p>
                      <ul className="space-y-2">
                        {(() => {
                          const localizedFeatures = t(`upgradeModal.features.${plan.code}`, { returnObjects: true });
                          const featuresList = Array.isArray(localizedFeatures) ? localizedFeatures : [];
                          return featuresList.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-center gap-2 text-xs text-[#d1cfe8]"
                            >
                              <Check
                                size={14}
                                className="text-[#980009] shrink-0"
                                strokeWidth={3}
                              />
                              {feature}
                            </li>
                          ));
                        })()}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
