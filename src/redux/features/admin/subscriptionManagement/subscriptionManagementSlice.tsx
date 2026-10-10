/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface SubscriptionManagementState {
  searchQuery: string
  selectedType: string
  selectedPlan: string
  selectedCountry: string
  selectedBillingCycle: string
  selectedStatus: string
  sortBy: string
  sortOrder: "asc" | "desc"
  currentPage: number
  itemsPerPage: number
}

const initialState: SubscriptionManagementState = {
  searchQuery: "",
  selectedType: "",
  selectedPlan: "",
  selectedCountry: "",
  selectedBillingCycle: "",
  selectedStatus: "",
  sortBy: "created_at",
  sortOrder: "desc",
  currentPage: 1,
  itemsPerPage: 10,
}

const subscriptionManagementSlice = createSlice({
  name: "subscriptionManagement",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
      state.currentPage = 1
    },
    setSelectedType: (state, action: PayloadAction<string>) => {
      state.selectedType = action.payload
      state.currentPage = 1
    },
    setSelectedPlan: (state, action: PayloadAction<string>) => {
      state.selectedPlan = action.payload
      state.currentPage = 1
    },
    setSelectedCountry: (state, action: PayloadAction<string>) => {
      state.selectedCountry = action.payload
      state.currentPage = 1
    },
    setSelectedBillingCycle: (state, action: PayloadAction<string>) => {
      state.selectedBillingCycle = action.payload
      state.currentPage = 1
    },
    setSelectedStatus: (state, action: PayloadAction<string>) => {
      state.selectedStatus = action.payload
      state.currentPage = 1
    },
    setSorting: (
      state,
      action: PayloadAction<{ sortBy: string; sortOrder: "asc" | "desc" }>
    ) => {
      state.sortBy = action.payload.sortBy
      state.sortOrder = action.payload.sortOrder
      state.currentPage = 1
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload
      state.currentPage = 1
    },
    resetSubscriptionFilters: (state) => {
      state.searchQuery = ""
      state.selectedType = ""
      state.selectedPlan = ""
      state.selectedCountry = ""
      state.selectedBillingCycle = ""
      state.selectedStatus = ""
      state.sortBy = "created_at"
      state.sortOrder = "desc"
      state.currentPage = 1
      state.itemsPerPage = 10
    },
  },
})

export const {
  setSearchQuery,
  setSelectedType,
  setSelectedPlan,
  setSelectedCountry,
  setSelectedBillingCycle,
  setSelectedStatus,
  setSorting,
  setCurrentPage,
  setItemsPerPage,
  resetSubscriptionFilters,
} = subscriptionManagementSlice.actions

export default subscriptionManagementSlice.reducer
