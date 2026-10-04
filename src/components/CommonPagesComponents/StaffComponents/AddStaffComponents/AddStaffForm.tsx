"use client"

import React, { useState, useRef } from "react"
import { useTranslation } from "react-i18next"
import { useRouter, usePathname } from "next/navigation"
import { ArrowLeft, Upload, X, Loader2 } from "lucide-react"
import Image from "next/image"
import { toast } from "react-toastify"
import SelectRoleDropdown from "./SelectRoleDropdown"
import AssignRoleConfirmModal from "./AssignRoleConfirmModal"
import { useGetRolesQuery, useCreateStaffMutation } from "@/redux/features/shared/staff/staffAPI"
import { getErrorMessage } from "@/lib/auth"

function AddStaffForm() {
  const { t } = useTranslation("dashboard")
  const router = useRouter()
  const pathname = usePathname()
  const basePath = pathname.startsWith("/admin") ? "/admin" : "/dashboard"

  const { data: rolesResponse, isLoading: rolesLoading } = useGetRolesQuery()
  const [createStaff, { isLoading: isCreating }] = useCreateStaffMutation()

  const [staffName, setStaffName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [selectedRoleName, setSelectedRoleName] = useState("")
  const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null)
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const [confirmOpen, setConfirmOpen] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const fileInputRef = useRef<HTMLInputElement>(null)

  const roles = (rolesResponse?.data || []).map((r) => ({
    id: r.id,
    name: r.role_name,
  }))

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image file size must be less than 5MB")
        return
      }
      setProfileImageFile(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const handleRemoveImage = () => {
    setProfileImageFile(null)
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
      setPreviewUrl(null)
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleRoleChange = (roleName: string, roleId?: number) => {
    setSelectedRoleName(roleName)
    if (roleId) {
      setSelectedRoleId(roleId)
    } else {
      const found = roles.find((r) => r.name === roleName)
      setSelectedRoleId(found ? found.id : null)
    }
    if (errors.role) {
      setErrors((prev) => ({ ...prev, role: "" }))
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!staffName.trim()) newErrors.staffName = t("staff.validation.staffNameRequired", "Staff name is required")
    if (!email.trim()) {
      newErrors.email = t("staff.validation.emailRequired", "Email is required")
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Please enter a valid email address"
    }
    if (!phone.trim()) newErrors.phone = t("staff.validation.phoneRequired", "Phone is required")
    if (!selectedRoleId) newErrors.role = t("staff.validation.roleRequired", "Role is required")
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      setConfirmOpen(true)
    }
  }

  const handleConfirmAssign = async () => {
    if (!selectedRoleId) return

    const formData = new FormData()
    formData.append("staff_name", staffName.trim())
    formData.append("email", email.trim())
    formData.append("phone", phone.trim())
    formData.append("role_id", String(selectedRoleId))
    if (profileImageFile) {
      formData.append("profile_image", profileImageFile)
    }

    try {
      const res = await createStaff(formData).unwrap()
      toast.success(res?.message || "Staff created successfully.")
      setConfirmOpen(false)
      router.push(`${basePath}/staff/staff-management`)
    } catch (err: any) {
      const errorMessage = getErrorMessage(
        err,
        "Failed to create staff member. Please try again."
      )
      toast.error(errorMessage)
      setConfirmOpen(false)
    }
  }

  const handleCancelAssign = () => {
    setConfirmOpen(false)
    router.back()
  }

  const handleCreateNewRole = () => {
    router.push(`${basePath}/staff/role-management`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="p-2 rounded-lg border border-white/10 hover:bg-white/5 text-primary transition-colors cursor-pointer shrink-0"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary">
            {t("staff.addNewStaff")}
          </h1>
          <p className="text-secondary text-sm mt-1">
            {t("staff.addNewStaffSubtitle")}
          </p>
        </div>
      </div>
      <div className="h-px bg-white/10" />

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        {/* Profile Image Upload */}
        <div>
          <label className="block text-sm font-medium text-primary mb-2">
            Profile Image
          </label>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-lg bg-muted border border-white/10 flex items-center justify-center overflow-hidden relative shrink-0">
              {previewUrl ? (
                <Image
                  src={previewUrl}
                  alt="Profile preview"
                  fill
                  unoptimized
                  className="object-cover"
                />
              ) : (
                <Upload className="w-6 h-6 text-secondary" />
              )}
            </div>
            <div className="space-y-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="staff-profile-image"
              />
              <div className="flex items-center gap-2">
                <label
                  htmlFor="staff-profile-image"
                  className="px-3.5 py-2 rounded-lg border border-white/10 text-xs text-primary hover:bg-white/5 transition-colors cursor-pointer"
                >
                  Choose Image
                </label>
                {previewUrl && (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="p-2 rounded-lg border border-white/10 text-secondary hover:text-custom-red hover:bg-white/5 transition-colors cursor-pointer"
                    title="Remove image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <p className="text-xs text-secondary">
                Recommended size: 500x500px, max 5MB. JPG, PNG or WEBP.
              </p>
            </div>
          </div>
        </div>

        {/* Staff Name */}
        <div>
          <label className="block text-sm font-medium text-primary mb-2">
            {t("staff.columns.staff")}
          </label>
          <input
            type="text"
            value={staffName}
            onChange={(e) => {
              setStaffName(e.target.value)
              if (errors.staffName) setErrors((prev) => ({ ...prev, staffName: "" }))
            }}
            placeholder="Staff name"
            className="w-full px-4 py-3 rounded-lg bg-muted border border-white/10 text-sm text-primary placeholder:text-secondary focus:outline-none focus:ring-1 focus:ring-custom-yellow/50"
          />
          {errors.staffName && (
            <p className="text-xs text-custom-red mt-1">{errors.staffName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-primary mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (errors.email) setErrors((prev) => ({ ...prev, email: "" }))
            }}
            placeholder="Email address"
            className="w-full px-4 py-3 rounded-lg bg-muted border border-white/10 text-sm text-primary placeholder:text-secondary focus:outline-none focus:ring-1 focus:ring-custom-yellow/50"
          />
          {errors.email && (
            <p className="text-xs text-custom-red mt-1">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-primary mb-2">
            Phone
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value)
              if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }))
            }}
            placeholder="+447700900123"
            className="w-full px-4 py-3 rounded-lg bg-muted border border-white/10 text-sm text-primary placeholder:text-secondary focus:outline-none focus:ring-1 focus:ring-custom-yellow/50"
          />
          {errors.phone && (
            <p className="text-xs text-custom-red mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Role Selection */}
        <div>
          <SelectRoleDropdown
            value={selectedRoleName}
            onChange={handleRoleChange}
            roles={roles}
            onCreateNewRole={handleCreateNewRole}
            isLoading={rolesLoading}
          />
          {errors.role && (
            <p className="text-xs text-custom-red mt-1">{errors.role}</p>
          )}
        </div>

        {/* Submit Button */}
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
        onCancel={handleCancelAssign}
        isLoading={isCreating}
      />
    </div>
  )
}

export default AddStaffForm
