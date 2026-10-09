/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface FieldManagementState {
  searchQuery: string
  selectedStatus: string
  selectedSubscription: string
  selectedCountry: string
  sortBy: string
  currentPage: number
  itemsPerPage: number

  // Sessions state
  sessionSearchQuery: string
  sessionStatus: string
  sessionMatchType: string
  sessionDate: string
  sessionCurrentPage: number
  sessionItemsPerPage: number
}

const initialState: FieldManagementState = {
  searchQuery: "",
  selectedStatus: "",
  selectedSubscription: "",
  selectedCountry: "",
  sortBy: "newest",
  currentPage: 1,
  itemsPerPage: 10,

  sessionSearchQuery: "",
  sessionStatus: "",
  sessionMatchType: "",
  sessionDate: "",
  sessionCurrentPage: 1,
  sessionItemsPerPage: 10,
}

const fieldManagementSlice = createSlice({
  name: "fieldManagement",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
      state.currentPage = 1
    },
    setSelectedStatus: (state, action: PayloadAction<string>) => {
      state.selectedStatus = action.payload
      state.currentPage = 1
    },
    setSelectedSubscription: (state, action: PayloadAction<string>) => {
      state.selectedSubscription = action.payload
      state.currentPage = 1
    },
    setSelectedCountry: (state, action: PayloadAction<string>) => {
      state.selectedCountry = action.payload
      state.currentPage = 1
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload
      state.currentPage = 1
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload
      state.currentPage = 1
    },
    resetFieldFilters: (state) => {
      state.searchQuery = ""
      state.selectedStatus = ""
      state.selectedSubscription = ""
      state.selectedCountry = ""
      state.sortBy = "newest"
      state.currentPage = 1
      state.itemsPerPage = 10
    },

    // Sessions actions
    setSessionSearchQuery: (state, action: PayloadAction<string>) => {
      state.sessionSearchQuery = action.payload
      state.sessionCurrentPage = 1
    },
    setSessionStatus: (state, action: PayloadAction<string>) => {
      state.sessionStatus = action.payload
      state.sessionCurrentPage = 1
    },
    setSessionMatchType: (state, action: PayloadAction<string>) => {
      state.sessionMatchType = action.payload
      state.sessionCurrentPage = 1
    },
    setSessionDate: (state, action: PayloadAction<string>) => {
      state.sessionDate = action.payload
      state.sessionCurrentPage = 1
    },
    setSessionCurrentPage: (state, action: PayloadAction<number>) => {
      state.sessionCurrentPage = action.payload
    },
    setSessionItemsPerPage: (state, action: PayloadAction<number>) => {
      state.sessionItemsPerPage = action.payload
      state.sessionCurrentPage = 1
    },
    resetSessionFilters: (state) => {
      state.sessionSearchQuery = ""
      state.sessionStatus = ""
      state.sessionMatchType = ""
      state.sessionDate = ""
      state.sessionCurrentPage = 1
      state.sessionItemsPerPage = 10
    },
  },
})

export const {
  setSearchQuery,
  setSelectedStatus,
  setSelectedSubscription,
  setSelectedCountry,
  setSortBy,
  setCurrentPage,
  setItemsPerPage,
  resetFieldFilters,
  setSessionSearchQuery,
  setSessionStatus,
  setSessionMatchType,
  setSessionDate,
  setSessionCurrentPage,
  setSessionItemsPerPage,
  resetSessionFilters,
} = fieldManagementSlice.actions

export default fieldManagementSlice.reducer
