"use client"

import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { useRouter } from "next/navigation"
import SelectRoleDropdown from "./SelectRoleDropdown"
import AssignRoleConfirmModal from "./AssignRoleConfirmModal"
import { mockRoles } from "../../../../mock-data/DashboardMockData/staff-mock-data"

function AddStaffForm() {
  const { t } = useTranslation("dashboard")
  const router = useRouter()

  const [staffName, setStaffName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [selectedRole, setSelectedRole] = useState("")
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!staffName.trim()) newErrors.staffName = t("staff.validation.staffNameRequired")
    if (!email.trim()) newErrors.email = t("staff.validation.emailRequired")
    if (!phone.trim()) newErrors.phone = t("staff.validation.phoneRequired")
    if (!selectedRole) newErrors.role = t("staff.validation.roleRequired")
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      setConfirmOpen(true)
    }
  }

  const handleConfirmAssign = () => {
    setConfirmOpen(false)
  }

  const handleCreateNewRole = () => {
    router.push("/dashboard/staff/role-management")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-primary">
          {t("staff.addNewStaff")}
        </h1>
        <p className="text-secondary text-sm mt-1">
          {t("staff.addNewStaffSubtitle")}
        </p>
        <div className="h-px bg-white/10 mt-4" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-primary mb-2">
            {t("staff.columns.staff")}
          </label>
          <input
            type="text"
            value={staffName}
            onChange={(e) => setStaffName(e.target.value)}
            placeholder={t("staff.columns.staff")}
            className="w-full px-4 py-3 rounded-lg bg-muted border border-white/10 text-sm text-primary placeholder:text-secondary focus:outline-none focus:ring-1 focus:ring-custom-yellow/50"
          />
          {errors.staffName && (
            <p className="text-xs text-custom-red mt-1">{errors.staffName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-primary mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Subject...."
            className="w-full px-4 py-3 rounded-lg bg-muted border border-white/10 text-sm text-primary placeholder:text-secondary focus:outline-none focus:ring-1 focus:ring-custom-yellow/50"
          />
          {errors.email && (
            <p className="text-xs text-custom-red mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-primary mb-2">
            Phone
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
            className="w-full px-4 py-3 rounded-lg bg-muted border border-white/10 text-sm text-primary placeholder:text-secondary focus:outline-none focus:ring-1 focus:ring-custom-yellow/50"
          />
          {errors.phone && (
            <p className="text-xs text-custom-red mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <SelectRoleDropdown
            value={selectedRole}
            onChange={setSelectedRole}
            roles={mockRoles}
            onCreateNewRole={handleCreateNewRole}
          />
          {errors.role && (
            <p className="text-xs text-custom-red mt-1">{errors.role}</p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-8 py-2.5 rounded-lg bg-custom-red text-white text-sm font-medium hover:bg-custom-red/80 transition-colors cursor-pointer"
          >
            {t("staff.assignRole")}
          </button>
        </div>
      </form>

      <AssignRoleConfirmModal
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        onConfirm={handleConfirmAssign}
      />
    </div>
  )
}

export default AddStaffForm
