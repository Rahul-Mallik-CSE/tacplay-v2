"use client"

/**
 * ArenaInfoTab.tsx
 * Editable form for arena basic information including name, description,
 * country and city selection (using country-state-city library), and address.
 * Uses EditSaveButton for edit/save toggle workflow.
 */

import React, { useEffect, useMemo, useRef, useState } from "react"
import { Check, ChevronDown, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Country, City } from "country-state-city"
import { toast } from "react-toastify"
import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"
import type { ArenaInfoForm, ArenaInfoTabProps } from "@/types/DashboardTypes/ArenaManagementTypes"
import { mockArenaInfo } from "../../../../mock-data/DashboardMockData/arena-management-mock-data"
import SectionHeader from "../SectionHeader"
import EditSaveButton from "../EditSaveButton"

function SearchableCitySelect({
  value,
  onChange,
  disabled,
  cities,
  placeholder,
  searchPlaceholder,
}: {
  value: string
  onChange: (city: string) => void
  disabled?: boolean
  cities: string[]
  placeholder: string
  searchPlaceholder?: string
}) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleOutsideClick)
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [open])

  useEffect(() => {
    if (!open) {
      setSearch("")
    }
  }, [open])

  const filteredCities = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) {
      return cities.slice(0, 100)
    }
    return cities.filter((c) => c.toLowerCase().includes(q)).slice(0, 100)
  }, [cities, search])

  const hasExactMatch = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return true
    return cities.some((c) => c.toLowerCase() === q)
  }, [cities, search])

  return (
    <div ref={dropdownRef} className="relative w-full">
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen((prev) => !prev)}
        className={cn(
          "w-full bg-input/30 border border-white/10 text-primary h-11 px-3 py-2 text-sm rounded-md flex items-center justify-between transition-colors outline-none",
          disabled
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer hover:bg-input/50 focus-visible:ring-1 focus-visible:ring-white/20",
          !value && "text-muted-foreground",
        )}
      >
        <span className="truncate">{value || placeholder}</span>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-muted-foreground transition-transform duration-200 shrink-0",
            open && "rotate-180",
          )}
        />
      </button>

      {open && !disabled && (
        <div className="absolute left-0 top-full mt-1.5 w-full z-50 bg-card border border-white/10 rounded-md shadow-2xl overflow-hidden backdrop-blur-md animate-in fade-in-0 zoom-in-95 duration-150">
          <div className="p-2 border-b border-white/10 flex items-center gap-2 bg-input/20">
            <Search className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            <input
              type="text"
              autoFocus
              placeholder={searchPlaceholder || "Search city..."}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-xs text-primary placeholder:text-muted-foreground outline-none"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="text-xs text-muted-foreground hover:text-primary px-1"
              >
                Clear
              </button>
            )}
          </div>

          <div className="max-h-60 overflow-y-auto p-1 scrollbar-thin">
            {filteredCities.map((city) => {
              const isSelected = city === value
              return (
                <button
                  key={city}
                  type="button"
                  onClick={() => {
                    onChange(city)
                    setOpen(false)
                  }}
                  className={cn(
                    "w-full flex items-center justify-between px-2.5 py-2 text-xs rounded-sm text-left transition-colors cursor-pointer",
                    isSelected
                      ? "bg-custom-yellow/20 text-custom-yellow font-semibold"
                      : "text-primary hover:bg-white/5",
                  )}
                >
                  <span className="truncate">{city}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 shrink-0 ml-2" />}
                </button>
              )
            })}

            {filteredCities.length === 0 && (
              <div className="p-3 text-center text-xs text-muted-foreground">
                No cities found
              </div>
            )}

            {search.trim() && !hasExactMatch && (
              <button
                type="button"
                onClick={() => {
                  onChange(search.trim())
                  setOpen(false)
                }}
                className="w-full mt-1 border-t border-white/10 px-2.5 py-2 text-xs text-left text-custom-yellow hover:bg-custom-yellow/10 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>Use &ldquo;{search.trim()}&rdquo;</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

const ArenaInfoTab = ({ arenaInfo = mockArenaInfo }: ArenaInfoTabProps) => {
  const { t } = useTranslation("dashboard")
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState<ArenaInfoForm | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const allCountries = useMemo(() => Country.getAllCountries(), [])

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

  const selectedCountry = useMemo(() => {
    if (!form.country) return null
    return (
      allCountries.find(
        (c) =>
          c.name.toLowerCase() === form.country.toLowerCase() ||
          c.isoCode.toLowerCase() === form.country.toLowerCase(),
      ) ?? null
    )
  }, [allCountries, form.country])

  const countryOptions = useMemo(() => {
    const options = allCountries.map((country) => ({
      key: country.isoCode,
      value: country.name,
    }))
    if (!form.country) return options
    const hasCurrent = options.some(
      (country) =>
        country.value.toLowerCase() === form.country.toLowerCase() ||
        country.key.toLowerCase() === form.country.toLowerCase(),
    )
    if (hasCurrent) return options
    return [...options, { key: `custom-${form.country}`, value: form.country }]
  }, [allCountries, form.country])

  const cityOptions = useMemo(() => {
    if (!selectedCountry) return []
    const rawCities = City.getCitiesOfCountry(selectedCountry.isoCode) || []
    const uniqueNames = Array.from(new Set(rawCities.map((c) => c.name))).sort()

    if (form.city && !uniqueNames.includes(form.city)) {
      return [form.city, ...uniqueNames]
    }
    return uniqueNames
  }, [selectedCountry, form.city])

  const handleToggleEdit = () => {
    if (isEditing) {
      setDraft(null)
      setIsEditing(false)
      return
    }
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
      <SectionHeader
        title={t("onboardingFields.arena.title")}
        subtitle={t("onboardingFields.arena.subtitle")}
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
              setDraft((p) => (p ? { ...p, field_name: e.target.value } : p))
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
              setDraft((p) => (p ? { ...p, description: e.target.value } : p))
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
                setDraft((p) => (p ? { ...p, country: v, city: "" } : p))
              }
              disabled={!isEditing}
            >
              <SelectTrigger className="w-full bg-input/30 border-white/10 text-primary h-11">
                <SelectValue
                  placeholder={t("onboardingFields.arena.countryPlaceholder")}
                />
              </SelectTrigger>
              <SelectContent className="bg-card border-white/10 max-h-60">
                {countryOptions.map((c) => (
                  <SelectItem key={c.key} value={c.value}>
                    {c.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              {t("onboardingFields.arena.cityLabel")}
            </label>
            <SearchableCitySelect
              value={form.city}
              onChange={(cityName) =>
                setDraft((p) => (p ? { ...p, city: cityName } : p))
              }
              disabled={!isEditing || !form.country}
              cities={cityOptions}
              placeholder={t("onboardingFields.arena.cityPlaceholder")}
              searchPlaceholder={t("arena.searchCity", "Search city...")}
            />
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
              setDraft((p) => (p ? { ...p, full_address: e.target.value } : p))
            }
            readOnly={!isEditing}
            className="bg-input/30 border-white/10 text-primary h-11"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <EditSaveButton
          isEditing={isEditing}
          isSaving={isSaving}
          onToggleEdit={handleToggleEdit}
          onSave={handleSave}
        />
      </div>
    </div>
  )
}

export default ArenaInfoTab
