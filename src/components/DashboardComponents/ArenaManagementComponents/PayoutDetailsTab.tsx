"use client"

import React, { useMemo, useState } from "react"
import { Crown } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "react-toastify"
import { useTranslation } from "react-i18next"
import type { PayoutDetailsData } from "@/types/DashboardTypes/ArenaManagementTypes"
import { mockPayoutDetails } from "./mock-data"
import EditSaveHeader from "./EditSaveHeader"

type PayoutForm = {
  business_name: string
  business_type: string
  contact_phone_number: string
  bank_account_holder_name: string
  bank_name: string
  account_number: string
  iban_routing_number: string
  swift_bic_code: string
}

function PayoutLockedView() {
  const { t } = useTranslation("dashboard")

  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center bg-card border border-white/5 rounded-2xl shadow-xl min-h-[300px]">
      <div className="w-16 h-16 rounded-full bg-custom-red/10 border border-custom-red/20 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(152,0,9,0.3)] animate-pulse">
        <span className="w-6 h-6 text-custom-red">&#128274;</span>
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-primary mb-2">
        {t("arena.payoutTab.unlockTitle", "Unlock Payout Details")}
      </h3>
      <p className="text-sm text-secondary max-w-[420px] mb-6 leading-relaxed">
        {t(
          "arena.payoutTab.unlockDesc",
          "Upgrade your plan to Essential for Field Growth or Gold to view and edit your payout accounts, bank credentials, and manage business details.",
        )}
      </p>
      <button className="flex items-center gap-2 bg-linear-to-r from-[#980009] via-[#C00069] to-[#980009] text-white text-sm font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-all shadow-[0_0_15px_rgba(192,0,105,0.4)] hover:scale-105 active:scale-95 cursor-pointer">
        <Crown className="w-4 h-4 text-[#cdba20]" />
        {t("sidebar.upgrade", "Upgrade")}
      </button>
    </div>
  )
}

interface PayoutDetailsTabProps {
  payoutDetails?: PayoutDetailsData
  showLockedView?: boolean
}

const PayoutDetailsTab = ({
  payoutDetails = mockPayoutDetails,
  showLockedView = false,
}: PayoutDetailsTabProps) => {
  const { t } = useTranslation("dashboard")
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState<PayoutForm | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const baseForm = useMemo<PayoutForm>(
    () => ({
      business_name: payoutDetails.business_name ?? "",
      business_type: payoutDetails.business_type ?? "",
      contact_phone_number: payoutDetails.contact_phone_number ?? "",
      bank_account_holder_name: payoutDetails.bank_account_holder_name ?? "",
      bank_name: payoutDetails.bank_name ?? "",
      account_number: payoutDetails.account_number ?? "",
      iban_routing_number: payoutDetails.iban_routing_number ?? "",
      swift_bic_code: payoutDetails.swift_bic_code ?? "",
    }),
    [payoutDetails],
  )

  const form = isEditing ? (draft ?? baseForm) : baseForm

  const handleToggleEdit = () => {
    if (isEditing) { setDraft(null); setIsEditing(false); return }
    setDraft(baseForm)
    setIsEditing(true)
  }

  const handleSave = async () => {
    if (!draft) return
    setIsSaving(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      toast.success(t("arena.payoutTab.updated"))
      setDraft(null)
      setIsEditing(false)
    } catch {
      toast.error(t("arena.payoutTab.updateFailed"))
    } finally {
      setIsSaving(false)
    }
  }

  const updateField = <K extends keyof PayoutForm>(key: K, value: PayoutForm[K]) => {
    setDraft((p) => p ? { ...p, [key]: value } : p)
  }

  if (showLockedView) return <PayoutLockedView />

  return (
    <div className="space-y-8">
      <EditSaveHeader
        title={t("onboardingFields.payout.title")}
        subtitle={t("onboardingFields.payout.subtitle")}
        isEditing={isEditing}
        isSaving={isSaving}
        onToggleEdit={handleToggleEdit}
        onSave={handleSave}
      />

      <div className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">
            {t("onboardingFields.payout.bizNameLabel")}
          </label>
          <Input
            value={form.business_name}
            onChange={(e) => updateField("business_name", e.target.value)}
            readOnly={!isEditing}
            className="bg-input/30 border-white/10 text-primary h-11"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">
            {t("onboardingFields.payout.bizTypeLabel")}
          </label>
          <Select
            value={form.business_type}
            onValueChange={(v) => updateField("business_type", v)}
            disabled={!isEditing}
          >
            <SelectTrigger className="w-full bg-input/30 border-white/10 text-primary h-11">
              <SelectValue placeholder={t("onboardingFields.payout.bizTypePlaceholder")} />
            </SelectTrigger>
            <SelectContent className="bg-card border-white/10">
              <SelectItem value="individual">{t("onboardingFields.payout.typeIndividual")}</SelectItem>
              <SelectItem value="registered_company">{t("onboardingFields.payout.typeCompany")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">
            {t("onboardingFields.payout.phoneLabel")}
          </label>
          <Input
            value={form.contact_phone_number}
            onChange={(e) => updateField("contact_phone_number", e.target.value)}
            readOnly={!isEditing}
            className="bg-input/30 border-white/10 text-primary h-11"
          />
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-primary">
            {t("onboardingFields.payout.accountDetailsHeader")}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {t("onboardingFields.payout.accountDetailsDesc")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              {t("onboardingFields.payout.holderLabel")}
            </label>
            <Input
              value={form.bank_account_holder_name}
              onChange={(e) => updateField("bank_account_holder_name", e.target.value)}
              readOnly={!isEditing}
              className="bg-input/30 border-white/10 text-primary h-11"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              {t("onboardingFields.payout.bankLabel")}
            </label>
            <Input
              value={form.bank_name}
              onChange={(e) => updateField("bank_name", e.target.value)}
              readOnly={!isEditing}
              className="bg-input/30 border-white/10 text-primary h-11"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">
            {t("onboardingFields.payout.numberLabel")}
          </label>
          <Input
            value={form.account_number}
            onChange={(e) => updateField("account_number", e.target.value)}
            readOnly={!isEditing}
            className="bg-input/30 border-white/10 text-primary h-11"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              {t("onboardingFields.payout.ibanLabel")}
            </label>
            <Input
              value={form.iban_routing_number}
              onChange={(e) => updateField("iban_routing_number", e.target.value)}
              readOnly={!isEditing}
              className="bg-input/30 border-white/10 text-primary h-11"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              {t("onboardingFields.payout.swiftLabel")}
            </label>
            <Input
              value={form.swift_bic_code}
              onChange={(e) => updateField("swift_bic_code", e.target.value)}
              readOnly={!isEditing}
              className="bg-input/30 border-white/10 text-primary h-11"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PayoutDetailsTab
