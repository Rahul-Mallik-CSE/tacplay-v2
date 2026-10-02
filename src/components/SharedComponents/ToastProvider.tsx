/** @format */

"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * Client-only wrapper for react-toastify's <ToastContainer>.
 * Placed in the root layout so toasts appear on all pages.
 */
export default function ToastProvider() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      toastStyle={{
        borderRadius: "12px",
        fontSize: "14px",
      }}
    />
  );
}
