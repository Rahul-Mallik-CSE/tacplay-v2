/** @format */

import { configureStore } from "@reduxjs/toolkit";
import baseAPI from "@/redux/api/baseAPI";
import authReducer from "@/redux/features/auth/authSlice";
import homeReducer from "@/redux/features/dashboard/home/homeSlice";
import bookingsReducer from "@/redux/features/dashboard/bookings/bookingsSlice";
import fieldProfileReducer from "@/redux/features/dashboard/field-profile/fieldProfileSlice";

export const store = configureStore({
  reducer: {
    [baseAPI.reducerPath]: baseAPI.reducer,
    auth: authReducer,
    home: homeReducer,
    bookings: bookingsReducer,
    fieldProfile: fieldProfileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
