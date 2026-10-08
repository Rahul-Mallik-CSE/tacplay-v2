"use client"

import React, { useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import { Filter, RotateCcw, ArrowUpDown } from "lucide-react"
import { toast } from "react-toastify"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import {
  setSearchQuery,
  setSelectedStatus,
  setSelectedMembership,
  setSelectedCountry,
  setSorting,
  setCurrentPage,
  setItemsPerPage,
  resetPlayerFilters,
} from "@/redux/features/admin/playerManagement/playerManagementSlice"
import {
  useGetAdminPlayersQuery,
  useUpdatePlayerStatusMutation,
} from "@/redux/features/admin/playerManagement/playerManagementAPI"
import CustomTable from "@/components/SharedComponents/CustomTable"
import FilterSheet from "@/components/SharedComponents/FilterSheet"
import PlayerSearchBar from "./PlayerSearchBar"
import PlayerMembershipBadge from "./PlayerMembershipBadge"
import PlayerStatusBadge from "./PlayerStatusBadge"
import PlayerCountryFlag from "./PlayerCountryFlag"
import PlayerActionDropdown from "./PlayerActionDropdown"
import PlayerDetailsSheet from "./PlayerDetailsSheet"
import PlayerStatusConfirmDialog from "./PlayerStatusConfirmDialog"
import UpgradePlanModal from "./UpgradePlanModal"
import AdminPlayerLoading from "./AdminPlayerLoading"
import { toAbsoluteMediaUrl } from "@/lib/utils"
import type {
  AdminPlayerListItem,
  Player,
} from "@/types/AdminTypes/PlayerManagementTypes"

export default function PlayerListTable() {
  const { t } = useTranslation("dashboard")
  const dispatch = useAppDispatch()

  const {
    searchQuery,
    selectedStatus,
    selectedMembership,
    selectedCountry,
    sortBy,
    order,
    currentPage,
    itemsPerPage,
  } = useAppSelector((state) => state.playerManagement)

  // Fetch players from API
  const {
    data: responseData,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetAdminPlayersQuery({
    search: searchQuery,
    status: selectedStatus || undefined,
    membership: selectedMembership || undefined,
    country: selectedCountry || undefined,
    sort_by: sortBy,
    order: order,
    page: currentPage,
    limit: itemsPerPage,
  })

  // Status mutation
  const [updatePlayerStatus, { isLoading: isUpdatingStatus }] =
    useUpdatePlayerStatusMutation()

  // Sheet and modal states
  const [selectedPlayer, setSelectedPlayer] = useState<AdminPlayerListItem | null>(null)
  const [isDetailsSheetOpen, setIsDetailsSheetOpen] = useState(false)
  const [filterSheetOpen, setFilterSheetOpen] = useState(false)

  // Status confirmation dialog state
  const [statusDialogPlayer, setStatusDialogPlayer] = useState<AdminPlayerListItem | null>(null)
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false)
  const [targetAction, setTargetAction] = useState<"disable" | "enable">("disable")

  // Upgrade modal state
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false)
  const [upgradePlayer, setUpgradePlayer] = useState<AdminPlayerListItem | null>(null)

  const meta = responseData?.meta
  const players = responseData?.data || []
  const filterOptions = meta?.filters?.options
  const sortOptions = meta?.sorting?.options

  const hasActiveFilters = Boolean(
    searchQuery ||
      selectedStatus ||
      selectedMembership ||
      selectedCountry ||
      sortBy !== "joined" ||
      order !== "desc"
  )

  const handleSearchChange = useCallback(
    (value: string) => {
      dispatch(setSearchQuery(value))
    },
    [dispatch]
  )

  const handleViewDetails = (item: AdminPlayerListItem | Player) => {
    const playerItem = item as AdminPlayerListItem
    setSelectedPlayer(playerItem)
    setIsDetailsSheetOpen(true)
  }

  const handleOpenStatusConfirm = (item: AdminPlayerListItem | Player) => {
    const playerItem = item as AdminPlayerListItem
    const isCurrentlyActive =
      playerItem.status_info?.is_active ??
      (playerItem.status?.toLowerCase() === "active")

    setStatusDialogPlayer(playerItem)
    setTargetAction(isCurrentlyActive ? "disable" : "enable")
    setIsStatusDialogOpen(true)
  }

  const handleConfirmStatusChange = async () => {
    if (!statusDialogPlayer) return
    const id = statusDialogPlayer.user_id || statusDialogPlayer.user?.id

    try {
      const res = await updatePlayerStatus({
        id,
        data: { action: targetAction },
      }).unwrap()

      toast.success(
        res?.message ||
          (targetAction === "disable"
            ? "Player disabled successfully"
            : "Player enabled successfully")
      )
      setIsStatusDialogOpen(false)
      setStatusDialogPlayer(null)
    } catch (err: unknown) {
      const errorMsg =
        (err as { data?: { message?: string } })?.data?.message ||
        "Failed to update player status"
      toast.error(errorMsg)
    }
  }

  const handleUpgradePlan = (item: AdminPlayerListItem | Player) => {
    setUpgradePlayer(item as AdminPlayerListItem)
    setIsUpgradeModalOpen(true)
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if (!value) return
    const [field, sortOrder] = value.split(":")
    dispatch(
      setSorting({
        sortBy: field,
        order: (sortOrder as "asc" | "desc") || "desc",
      })
    )
  }

  // FilterSheet sync
  const currentFilterSheetValues: Record<string, string[]> = {
    [t("playerManagement.filter.status", "Status")]: selectedStatus ? [selectedStatus] : [],
    [t("playerManagement.filter.membership", "Membership")]: selectedMembership ? [selectedMembership] : [],
    [t("playerManagement.filter.country", "Country")]: selectedCountry ? [selectedCountry] : [],
  }

  const handleFilterSheetChange = (newFilters: Record<string, string[]>) => {
    const statusVal = newFilters[t("playerManagement.filter.status", "Status")]?.[0] || ""
    const membershipVal = newFilters[t("playerManagement.filter.membership", "Membership")]?.[0] || ""
    const countryVal = newFilters[t("playerManagement.filter.country", "Country")]?.[0] || ""

    dispatch(setSelectedStatus(statusVal))
    dispatch(setSelectedMembership(membershipVal))
    dispatch(setSelectedCountry(countryVal))
  }

  if (isLoading) {
    return <AdminPlayerLoading />
  }

  type TableRow = AdminPlayerListItem & Record<string, unknown>

  const columns: {
    header: string
    accessor: keyof TableRow | ((row: TableRow) => React.ReactNode)
    className?: string
  }[] = [
    {
      header: t("playerManagement.columns.user", "User"),
      accessor: (row: TableRow) => {
        const imageUrl = toAbsoluteMediaUrl(
          row.profile_image || row.user?.profile_image
        )
        const name = row.full_name || row.user?.name || "Player"
        const email = row.email || row.user?.email || ""

        return (
          <div className="flex items-center gap-3 min-w-[180px]">
            <div className="w-10 h-10 rounded-full bg-muted shrink-0 overflow-hidden border border-white/10 flex items-center justify-center">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs font-bold text-primary">
                  {name.slice(0, 2).toUpperCase()}
                </span>
              )}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-primary truncate max-w-[150px]">
                {name}
              </p>
              <p className="text-xs text-muted-foreground truncate max-w-[150px]">
                {email}
              </p>
            </div>
          </div>
        )
      },
    },
    {
      header: t("playerManagement.columns.userId", "User ID"),
      accessor: (row: TableRow) => (
        <span className="text-sm font-mono text-primary">
          {row.display_id || row.player_id || row.user?.display_id || `#CN ${row.user_id}`}
        </span>
      ),
    },
    {
      header: t("playerManagement.columns.country", "Country"),
      accessor: (row: TableRow) => (
        <PlayerCountryFlag
          countryCode={row.country_info?.code}
          countryName={row.country_info?.name || row.country}
        />
      ),
    },
    {
      header: t("playerManagement.columns.membership", "Membership"),
      accessor: (row: TableRow) => (
        <PlayerMembershipBadge
          membership={
            row.membership?.display ||
            row.membership?.plan_name ||
            row.subscription_plan ||
            "Free"
          }
          size="sm"
        />
      ),
    },
    {
      header: t("playerManagement.columns.rank", "Rank"),
      accessor: (row: TableRow) => (
        <span className="text-sm font-semibold text-primary">
          {row.rank?.display || (row.rank?.value ? `#${row.rank.value}` : "-")}
        </span>
      ),
    },
    {
      header: t("playerManagement.columns.joined", "Joined"),
      accessor: (row: TableRow) => (
        <span className="text-sm text-primary">
          {row.joined?.date_display || row.joined?.datetime || "-"}
        </span>
      ),
    },
    {
      header: t("playerManagement.columns.lastActive", "Last Active"),
      accessor: (row: TableRow) => {
        const isNever =
          !row.last_active?.datetime ||
          row.last_active?.display?.toLowerCase() === "never"

        return (
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full shrink-0 ${
                isNever ? "bg-muted-foreground/40" : "bg-emerald-400"
              }`}
            />
            <span className="text-sm text-primary">
              {row.last_active?.display || "Never"}
            </span>
          </div>
        )
      },
    },
    {
      header: t("playerManagement.columns.status", "Status"),
      accessor: (row: TableRow) => (
        <PlayerStatusBadge
          status={row.status_info?.display || row.status}
          size="sm"
        />
      ),
    },
  ]

  const actionRenderer = (row: TableRow) => (
    <PlayerActionDropdown
      player={row}
      onViewDetails={handleViewDetails}
      onToggleStatus={handleOpenStatusConfirm}
      onBlockPlayer={handleOpenStatusConfirm}
    />
  )

  return (
    <div className="space-y-5">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary">
            {meta?.table?.title || t("playerManagement.title", "User Lists")}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Manage player accounts, memberships, rankings, and statuses.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <PlayerSearchBar value={searchQuery} onChange={handleSearchChange} />
          <button
            type="button"
            onClick={() => setFilterSheetOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg border border-white/10 bg-muted text-xs sm:text-sm text-primary hover:bg-muted/80 transition-colors cursor-pointer shrink-0"
          >
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">{t("common.filter", "Filters")}</span>
          </button>
        </div>
      </div>

      {isError && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400 flex items-center justify-between">
          <span>Failed to load player list. Please check your connection.</span>
          <button
            type="button"
            onClick={() => refetch()}
            className="underline hover:text-white font-medium cursor-pointer"
          >
            Retry
          </button>
        </div>
      )}

      {/* Filter and Sort Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Status Filter */}
        <select
          value={selectedStatus}
          onChange={(e) => dispatch(setSelectedStatus(e.target.value))}
          className="bg-card border border-white/10 text-primary text-xs rounded-lg px-3 py-2 outline-none cursor-pointer hover:bg-white/5 transition-colors"
        >
          <option value="" className="bg-card">All Statuses</option>
          {(filterOptions?.status || [
            { label: "Active", value: "active" },
            { label: "Block", value: "blocked" },
          ]).map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-card">
              {opt.label}
            </option>
          ))}
        </select>

        {/* Membership Filter */}
        <select
          value={selectedMembership}
          onChange={(e) => dispatch(setSelectedMembership(e.target.value))}
          className="bg-card border border-white/10 text-primary text-xs rounded-lg px-3 py-2 outline-none cursor-pointer hover:bg-white/5 transition-colors"
        >
          <option value="" className="bg-card">All Memberships</option>
          {(filterOptions?.membership || [
            { label: "Premium", value: "premium" },
            { label: "Free", value: "free" },
          ]).map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-card">
              {opt.label}
            </option>
          ))}
        </select>

        {/* Country Filter */}
        {filterOptions?.country && filterOptions.country.length > 0 && (
          <select
            value={selectedCountry}
            onChange={(e) => dispatch(setSelectedCountry(e.target.value))}
            className="bg-card border border-white/10 text-primary text-xs rounded-lg px-3 py-2 outline-none cursor-pointer hover:bg-white/5 transition-colors"
          >
            <option value="" className="bg-card">All Countries</option>
            {filterOptions.country.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-card">
                {opt.label}
              </option>
            ))}
          </select>
        )}

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-1.5 ml-auto">
          <ArrowUpDown className="w-3.5 h-3.5 text-muted-foreground hidden sm:block" />
          <select
            value={`${sortBy}:${order}`}
            onChange={handleSortChange}
            className="bg-card border border-white/10 text-primary text-xs rounded-lg px-3 py-2 outline-none cursor-pointer hover:bg-white/5 transition-colors"
          >
            {(sortOptions || [
              { label: "Newest Joined", sort_by: "joined", order: "desc" },
              { label: "Oldest Joined", sort_by: "joined", order: "asc" },
              { label: "Rank", sort_by: "rank", order: "asc" },
              { label: "Last Active", sort_by: "last_active", order: "desc" },
              { label: "Name A-Z", sort_by: "name", order: "asc" },
            ]).map((s) => (
              <option
                key={`${s.sort_by}:${s.order}`}
                value={`${s.sort_by}:${s.order}`}
                className="bg-card"
              >
                Sort: {s.label}
              </option>
            ))}
          </select>
        </div>

        {/* Reset Filters Button */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={() => dispatch(resetPlayerFilters())}
            className="flex items-center gap-1.5 px-3 py-2 text-xs rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Main Table with Server-Side Pagination */}
      <div className="relative">
        {isFetching && !isLoading && (
          <div className="absolute inset-0 bg-background/30 backdrop-blur-[1px] z-10 flex items-center justify-center rounded-xl pointer-events-none">
            <span className="px-3 py-1 bg-card border border-white/10 rounded-full text-xs text-primary shadow-lg animate-pulse">
              Updating list...
            </span>
          </div>
        )}

        <CustomTable
          data={players as unknown as TableRow[]}
          columns={columns}
          actionRenderer={(row) => actionRenderer(row as TableRow)}
          serverPagination={true}
          currentPage={meta?.page || currentPage}
          totalPages={meta?.totalPage || 1}
          additionalCount={meta?.total || 0}
          itemsPerPage={itemsPerPage}
          onPageChange={(page) => dispatch(setCurrentPage(page))}
          onItemsPerPageChange={(size) => dispatch(setItemsPerPage(size))}
          minTableWidth="min-w-[1000px]"
        />
      </div>

      {/* Player Details Sheet */}
      <PlayerDetailsSheet
        playerId={selectedPlayer ? (selectedPlayer.user_id || selectedPlayer.user?.id) : null}
        player={selectedPlayer}
        open={isDetailsSheetOpen}
        onOpenChange={setIsDetailsSheetOpen}
        onToggleStatus={handleOpenStatusConfirm}
        onBlockPlayer={handleOpenStatusConfirm}
        onUpgradePlan={handleUpgradePlan}
      />

      {/* Confirmation Dialog for Block/Activate Action */}
      <PlayerStatusConfirmDialog
        open={isStatusDialogOpen}
        onOpenChange={setIsStatusDialogOpen}
        player={statusDialogPlayer}
        targetAction={targetAction}
        onConfirm={handleConfirmStatusChange}
        isLoading={isUpdatingStatus}
      />

      {/* Upgrade Plan Modal */}
      <UpgradePlanModal
        player={upgradePlayer}
        open={isUpgradeModalOpen}
        onOpenChange={setIsUpgradeModalOpen}
        onConfirm={() => {
          toast.info("Plan upgrade request submitted.")
          setIsUpgradeModalOpen(false)
        }}
      />

      {/* Slide-out Filter Sheet */}
      <FilterSheet
        open={filterSheetOpen}
        onOpenChange={setFilterSheetOpen}
        title={t("common.filter", "Filters")}
        filterGroups={[
          {
            title: t("playerManagement.filter.status", "Status"),
            type: "single",
            options: (filterOptions?.status || [
              { label: "Active", value: "active" },
              { label: "Block", value: "blocked" },
            ]).map((o) => ({ label: o.label, value: o.value })),
          },
          {
            title: t("playerManagement.filter.membership", "Membership"),
            type: "single",
            options: (filterOptions?.membership || [
              { label: "Premium", value: "premium" },
              { label: "Free", value: "free" },
            ]).map((o) => ({ label: o.label, value: o.value })),
          },
          ...(filterOptions?.country && filterOptions.country.length > 0
            ? [
                {
                  title: t("playerManagement.filter.country", "Country"),
                  type: "single" as const,
                  options: filterOptions.country.map((o) => ({
                    label: o.label,
                    value: o.value,
                  })),
                },
              ]
            : []),
        ]}
        selectedFilters={currentFilterSheetValues}
        onFilterChange={handleFilterSheetChange}
        onReset={() => dispatch(resetPlayerFilters())}
      />
    </div>
  )
}
