"use client"

import React, { useState, useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import { useRouter, useParams, usePathname } from "next/navigation"
import { ArrowLeft, Upload, X, Loader2 } from "lucide-react"
import Image from "next/image"
import { toast } from "react-toastify"
import SelectRoleDropdown from "../AddStaffComponents/SelectRoleDropdown"
import {
  useGetStaffDetailsQuery,
  useGetRolesQuery,
  useUpdateStaffMutation,
} from "@/redux/features/shared/staff/staffAPI"
import { toAbsoluteMediaUrl } from "@/lib/utils"
import { getErrorMessage } from "@/lib/auth"

function EditStaffForm() {
  const { t } = useTranslation("dashboard")
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const staffId = params.staffId as string
  const basePath = pathname.startsWith("/admin") ? "/admin" : "/dashboard"

  const { data: staffData, isLoading: staffLoading } = useGetStaffDetailsQuery(
    Number(staffId),
    { skip: !staffId }
  )
  const { data: rolesResponse, isLoading: rolesLoading } = useGetRolesQuery()
  const [updateStaff, { isLoading: isUpdating }] = useUpdateStaffMutation()

  const [staffName, setStaffName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [selectedRoleName, setSelectedRoleName] = useState("")
  const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null)
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const fileInputRef = useRef<HTMLInputElement>(null)

  const roles = (rolesResponse?.data || []).map((r) => ({
    id: r.id,
    name: r.role_name,
  }))

  useEffect(() => {
    if (staffData?.data) {
      const staff = staffData.data
      setStaffName(staff.staff_name || "")
      setEmail(staff.email || "")
      setPhone(staff.phone || "")
      setSelectedRoleName(staff.role_name || "")
      setSelectedRoleId(staff.role_id || null)
      if (staff.profile_image) {
        setExistingImageUrl(toAbsoluteMediaUrl(staff.profile_image))
      }
    }
  }, [staffData])

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
    setExistingImageUrl(null)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    const formData = new FormData()
    formData.append("staff_name", staffName.trim())
    formData.append("email", email.trim())
    formData.append("phone", phone.trim())
    if (selectedRoleId) {
      formData.append("role_id", String(selectedRoleId))
    }
    if (profileImageFile) {
      formData.append("profile_image", profileImageFile)
    }

    try {
      const res = await updateStaff({
        id: Number(staffId),
        body: formData,
      }).unwrap()
      toast.success(res?.message || "Staff updated successfully.")
      router.push(`${basePath}/staff/staff-management`)
    } catch (err: any) {
      const errorMessage = getErrorMessage(
        err,
        "Failed to update staff member. Please try again."
      )
      toast.error(errorMessage)
    }
  }

  const handleCreateNewRole = () => {
    router.push(`${basePath}/staff/role-management`)
  }

  if (staffLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-custom-yellow" />
      </div>
    )
  }

  const displayImageUrl = previewUrl || existingImageUrl

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
            {t("staff.editStaffTitle")}
          </h1>
          <p className="text-secondary text-sm mt-1">
            {t("staff.addNewStaffSubtitle")}
          </p>
        </div>
      </div>
      <div className="h-px bg-white/10" />

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        {/* Profile Image */}
        <div>
          <label className="block text-sm font-medium text-primary mb-2">
            Profile Image
          </label>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-lg bg-muted border border-white/10 flex items-center justify-center overflow-hidden relative shrink-0">
              {displayImageUrl ? (
                <Image
                  src={displayImageUrl}
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
                id="edit-staff-profile-image"
              />
              <div className="flex items-center gap-2">
                <label
                  htmlFor="edit-staff-profile-image"
                  className="px-3.5 py-2 rounded-lg border border-white/10 text-xs text-primary hover:bg-white/5 transition-colors cursor-pointer"
                >
                  Change Image
                </label>
                {displayImageUrl && (
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
            placeholder={t("staff.columns.staff")}
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
            placeholder="Subject...."
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
            placeholder="Phone"
            className="w-full px-4 py-3 rounded-lg bg-muted border border-white/10 text-sm text-primary placeholder:text-secondary focus:outline-none focus:ring-1 focus:ring-custom-yellow/50"
          />
          {errors.phone && (
            <p className="text-xs text-custom-red mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Role */}
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

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2.5 rounded-lg border border-white/10 text-sm text-primary hover:bg-white/5 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isUpdating}
            className="flex items-center gap-2 px-8 py-2.5 rounded-lg bg-custom-red text-white text-sm font-medium hover:bg-custom-red/80 transition-colors cursor-pointer disabled:opacity-50"
          >
            {isUpdating && <Loader2 className="w-4 h-4 animate-spin" />}
            {t("common.saveChanges")}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditStaffForm
