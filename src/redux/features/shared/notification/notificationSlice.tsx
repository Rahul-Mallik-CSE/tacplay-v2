/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { NotificationCategory } from "@/types/CommonPageTypes/NotificationTypes"

export interface NotificationState {
  activeTab: NotificationCategory
  page: number
  limit: number
}

const initialState: NotificationState = {
  activeTab: "all",
  page: 1,
  limit: 10,
}

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<NotificationCategory>) => {
      state.activeTab = action.payload
      state.page = 1
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload
    },
    resetNotificationState: () => initialState,
  },
})

export const {
  setActiveTab,
  setPage,
  setLimit,
  resetNotificationState,
} = notificationSlice.actions

export default notificationSlice.reducer
