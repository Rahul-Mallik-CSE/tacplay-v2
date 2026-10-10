/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface SubscriptionState {
  billingCycle: "monthly" | "annual"
  selectedPlanCode: string | null
  upgradingPlanCode: string | null
}

const initialState: SubscriptionState = {
  billingCycle: "monthly",
  selectedPlanCode: null,
  upgradingPlanCode: null,
}

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    setBillingCycle: (state, action: PayloadAction<"monthly" | "annual">) => {
      state.billingCycle = action.payload
    },
    setSelectedPlanCode: (state, action: PayloadAction<string | null>) => {
      state.selectedPlanCode = action.payload
    },
    setUpgradingPlanCode: (state, action: PayloadAction<string | null>) => {
      state.upgradingPlanCode = action.payload
    },
    resetSubscriptionState: () => initialState,
  },
})

export const {
  setBillingCycle,
  setSelectedPlanCode,
  setUpgradingPlanCode,
  resetSubscriptionState,
} = subscriptionSlice.actions

export default subscriptionSlice.reducer
