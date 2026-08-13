"use client"

/**
 * ArenaInfoTab.tsx
 * Editable form for arena basic information including name, description,
 * country/city selection (using country-state-city library), and address.
 * Uses EditSaveHeader for edit/save toggle workflow.
 */

import React, { useEffect, useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { City, Country, type ICity, type ICountry } from "country-state-city"
import { toast } from "react-toastify"
import { useTranslation } from "react-i18next"
import type { ArenaInfo, ArenaInfoForm, ArenaInfoTabProps } from "@/types/DashboardTypes/ArenaManagementTypes"
import { mockArenaInfo } from "../../../mock-data/DashboardMockData/arena-management-mock-data"
import EditSaveHeader from "./EditSaveHeader"

const ArenaInfoTab = ({ arenaInfo = mockArenaInfo }: ArenaInfoTabProps) => {
  const { t } = useTranslation("dashboard")
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState<ArenaInfoForm | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const [countries, setCountries] = useState<ICountry[]>([])
  const [cities, setCities] = useState<ICity[]>([])

  const baseForm = useMemo<ArenaInfoForm>(
    () => ({
      field_name: arenaInfo.field_name ?? "",
      description: arenaInfo.description ?? "",
      country: arenaInfo.country?.name ?? "",
      city: arenaInfo.city?.name ?? "",
      full_address: arenaInfo.full_address ?? "",
    }),
    [arenaInfo],
  )

  const form = isEditing ? (draft ?? baseForm) : baseForm

  const countryOptions = useMemo(() => {
    const options = countries.map((country) => ({
      key: country.isoCode,
      value: country.name,
    }))
    if (!form.country) return options
    const hasCurrent = options.some(
      (country) => country.value === form.country,
    )
    if (hasCurrent) return options
    return [...options, { key: `custom-${form.country}`, value: form.country }]
  }, [countries, form.country])

  const cityOptions = useMemo(() => {
    const options = cities.map((city) => ({
      key: city.name,
      value: city.name,
    }))
    if (!form.city) return options
    const hasCurrent = options.some((city) => city.value === form.city)
    if (hasCurrent) return options
    return [...options, { key: `custom-${form.city}`, value: form.city }]
  }, [cities, form.city])

  useEffect(() => {
    let active = true
    const loadCountries = () => {
      const data = Country.getAllCountries()
      if (!active) return
      setCountries(Array.isArray(data) ? data : [])
    }
    loadCountries()
    return () => { active = false }
  }, [])

  useEffect(() => {
    let active = true
    const loadCities = () => {
      const selectedCountry = countries.find(
        (item) => item.name === form.country,
      )
      if (!selectedCountry) { setCities([]); return }
      const data = City.getCitiesOfCountry(selectedCountry.isoCode)
      if (!active) return
      setCities(Array.isArray(data) ? data : [])
    }
    loadCities()
    return () => { active = false }
  }, [countries, form.country])

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
      toast.success(t("arena.arenaInfoTab.updated"))
      setDraft(null)
      setIsEditing(false)
    } catch {
      toast.error(t("arena.arenaInfoTab.updateFailed"))
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <EditSaveHeader
        title={t("onboardingFields.arena.title")}
        subtitle={t("onboardingFields.arena.subtitle")}
        isEditing={isEditing}
        isSaving={isSaving}
        onToggleEdit={handleToggleEdit}
        onSave={handleSave}
      />

      <div className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">
            {t("onboardingFields.arena.nameLabel")}
          </label>
          <Input
            placeholder={t("onboardingFields.arena.namePlaceholder")}
            value={form.field_name}
            onChange={(e) =>
              setDraft((p) => p ? { ...p, field_name: e.target.value } : p)
            }
            readOnly={!isEditing}
            className="bg-input/30 border-white/10 text-primary h-11"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">
            {t("onboardingFields.arena.descLabel")}
          </label>
          <Textarea
            placeholder={t("onboardingFields.arena.descPlaceholder")}
            value={form.description}
            onChange={(e) =>
              setDraft((p) => p ? { ...p, description: e.target.value } : p)
            }
            readOnly={!isEditing}
            className="bg-input/30 border-white/10 text-primary min-h-25"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              {t("onboardingFields.arena.countryLabel")}
            </label>
            <Select
              value={form.country}
              onValueChange={(v) =>
                setDraft((p) => p ? { ...p, country: v, city: "" } : p)
              }
              disabled={!isEditing}
            >
              <SelectTrigger className="w-full bg-input/30 border-white/10 text-primary h-11">
                <SelectValue placeholder={t("onboardingFields.arena.countryPlaceholder")} />
              </SelectTrigger>
              <SelectContent className="bg-card border-white/10">
                {countryOptions.map((c) => (
                  <SelectItem key={c.key} value={c.value}>{c.value}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              {t("onboardingFields.arena.cityLabel")}
            </label>
            <Select
              value={form.city}
              onValueChange={(v) =>
                setDraft((p) => p ? { ...p, city: v } : p)
              }
              disabled={!isEditing}
            >
              <SelectTrigger className="w-full bg-input/30 border-white/10 text-primary h-11">
                <SelectValue placeholder={t("onboardingFields.arena.cityPlaceholder")} />
              </SelectTrigger>
              <SelectContent className="bg-card border-white/10">
                {cityOptions.map((c) => (
                  <SelectItem key={c.key} value={c.value}>{c.value}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">
            {t("onboardingFields.arena.addressLabel")}
          </label>
          <Input
            placeholder={t("onboardingFields.arena.addressPlaceholder")}
            value={form.full_address}
            onChange={(e) =>
              setDraft((p) => p ? { ...p, full_address: e.target.value } : p)
            }
            readOnly={!isEditing}
            className="bg-input/30 border-white/10 text-primary h-11"
          />
        </div>
      </div>
    </div>
  )
}

export default ArenaInfoTab
