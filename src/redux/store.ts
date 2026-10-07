/** @format */

import { configureStore } from "@reduxjs/toolkit";
import baseAPI from "@/redux/api/baseAPI";
import authReducer from "@/redux/features/auth/authSlice";
import homeReducer from "@/redux/features/dashboard/home/homeSlice";
import bookingsReducer from "@/redux/features/dashboard/bookings/bookingsSlice";
import fieldProfileReducer from "@/redux/features/dashboard/field-profile/fieldProfileSlice";
import staffReducer from "@/redux/features/shared/staff/staffSlice";
import analyticsReducer from "@/redux/features/dashboard/analytics/analyticsSlice";
import sessionReducer from "@/redux/features/dashboard/session/sessionSlice";
import marketingReducer from "@/redux/features/shared/marketing/marketingSlice";
import adminOverviewReducer from "@/redux/features/admin/overview/overviewSlice";
import adminEarningReducer from "@/redux/features/admin/earning/earningSlice";

export const store = configureStore({
  reducer: {
    [baseAPI.reducerPath]: baseAPI.reducer,
    auth: authReducer,
    home: homeReducer,
    bookings: bookingsReducer,
    fieldProfile: fieldProfileReducer,
    staff: staffReducer,
    analytics: analyticsReducer,
    session: sessionReducer,
    marketing: marketingReducer,
    adminOverview: adminOverviewReducer,
    adminEarning: adminEarningReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
