"use client"

import React, { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import CustomTable from "@/components/SharedComponents/CustomTable"
import PlayerSearchBar from "./PlayerSearchBar"
import PlayerMembershipBadge from "./PlayerMembershipBadge"
import PlayerStatusBadge from "./PlayerStatusBadge"
import PlayerCountryFlag from "./PlayerCountryFlag"
import PlayerActionDropdown from "./PlayerActionDropdown"
import PlayerDetailsSheet from "./PlayerDetailsSheet"
import UpgradePlanModal from "./UpgradePlanModal"
import { mockPlayerData } from "../../../mock-data/AdminMockData/player-management-mock-data"
import type { Player } from "@/types/AdminTypes/PlayerManagementTypes"
import Image from "next/image"

function PlayerListTable() {
  const { t } = useTranslation("dashboard")
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
  const [isDetailsSheetOpen, setIsDetailsSheetOpen] = useState(false)
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false)
  const [upgradePlayer, setUpgradePlayer] = useState<Player | null>(null)

  const filteredData = useMemo(() => {
    if (!search.trim()) return mockPlayerData
    const normalizedSearch = search.trim().toLowerCase()
    return mockPlayerData.filter((item) =>
      [item.name, item.email, item.userId, item.username]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(normalizedSearch)),
    )
  }, [search])

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setCurrentPage(1)
  }

  const handleViewDetails = (player: Player) => {
    setSelectedPlayer(player)
    setIsDetailsSheetOpen(true)
  }

  const handleBlockPlayer = (player: Player) => {
    // Handle block player
  }

  const handleUpgradePlan = (player: Player) => {
    setUpgradePlayer(player)
    setIsUpgradeModalOpen(true)
  }

  const handleUpgradeConfirm = () => {
    // Handle upgrade confirm
  }

  const columns: {
    header: string
    accessor: keyof Player | ((row: Player) => React.ReactNode)
    className?: string
  }[] = [
    {
      header: t("playerManagement.columns.user"),
      accessor: (row: Player) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-muted shrink-0 overflow-hidden">
            <Image
              src={row.avatar}
              alt={row.name}
              width={10}
              height={10}
              className="w-full h-full object-cover"
              
            />
          </div>
          <div>
            <p className="text-sm font-medium text-primary">{row.name}</p>
            <p className="text-xs text-muted-foreground">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: t("playerManagement.columns.userId"),
      accessor: (row: Player) => (
        <span className="text-sm text-primary">{row.userId}</span>
      ),
    },
    {
      header: t("playerManagement.columns.country"),
      accessor: (row: Player) => (
        <PlayerCountryFlag countryCode={row.countryCode} />
      ),
    },
    {
      header: t("playerManagement.columns.membership"),
      accessor: (row: Player) => (
        <PlayerMembershipBadge membership={row.membership} size="sm" />
      ),
    },
    {
      header: t("playerManagement.columns.rank"),
      accessor: (row: Player) => (
        <span className="text-sm text-primary">#{row.rank}</span>
      ),
    },
    {
      header: t("playerManagement.columns.joined"),
      accessor: (row: Player) => (
        <span className="text-sm text-primary">{row.joined}</span>
      ),
    },
    {
      header: t("playerManagement.columns.lastActive"),
      accessor: (row: Player) => (
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
          <span className="text-sm text-primary">{row.lastActive}</span>
        </div>
      ),
    },
    {
      header: t("playerManagement.columns.status"),
      accessor: (row: Player) => (
        <PlayerStatusBadge status={row.status} size="sm" />
      ),
    },
  ]

  type TableRow = Player & Record<string, unknown>

  const actionRenderer = (row: Player) => (
    <PlayerActionDropdown
      player={row}
      onViewDetails={handleViewDetails}
      onBlockPlayer={handleBlockPlayer}
    />
  )

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary">
            {t("playerManagement.title")}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <PlayerSearchBar value={search} onChange={handleSearchChange} />
          {/* <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-muted text-sm text-primary hover:bg-muted/80 transition-colors cursor-pointer">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            {t("common.filter")}
          </button> */}
          {/* <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-muted text-sm text-primary hover:bg-muted/80 transition-colors cursor-pointer">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
              />
            </svg>
            {t("playerManagement.sortBy")}
          </button> */}
        </div>
      </div>

      <CustomTable
        data={filteredData as unknown as TableRow[]}
        columns={
          columns as {
            header: string
            accessor: keyof TableRow | ((row: TableRow) => React.ReactNode)
            className?: string
          }[]
        }
        actionRenderer={(row) => actionRenderer(row as Player)}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={(size) => {
          setItemsPerPage(size)
          setCurrentPage(1)
        }}
        minTableWidth="min-w-[1000px]"
      />

      <PlayerDetailsSheet
        player={selectedPlayer}
        open={isDetailsSheetOpen}
        onOpenChange={setIsDetailsSheetOpen}
        onBlockPlayer={handleBlockPlayer}
        onUpgradePlan={handleUpgradePlan}
      />

      <UpgradePlanModal
        player={upgradePlayer}
        open={isUpgradeModalOpen}
        onOpenChange={setIsUpgradeModalOpen}
        onConfirm={handleUpgradeConfirm}
      />
    </div>
  )
}

export default PlayerListTable
