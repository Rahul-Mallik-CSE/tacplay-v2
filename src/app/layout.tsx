import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import I18nProvider from "@/components/SharedComponents/I18nProvider";
import "./globals.css";
import ReduxProvider from "@/redux/ReduxProvider";
import ToastProvider from "@/components/SharedComponents/ToastProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://fieldowner.tacplay.eu";
const SITE_NAME = "TACPlay";
const SITE_DESCRIPTION =
  "TACPlay Field Owner Dashboard — Manage your arena, sessions, bookings, earnings, and player engagement from one powerful platform.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Field Owner Dashboard`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "TACPlay",
    "field owner",
    "arena management",
    "football arena",
    "session booking",
    "match management",
    "sports dashboard",
    "field rental",
    "player management",
    "booking platform",
  ],
  authors: [{ name: "TACPlay" }],
  creator: "TACPlay",
  publisher: "TACPlay",
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Field Owner Dashboard`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/Tacplay-logo-2.png",
        width: 1200,
        height: 630,
        alt: "TACPlay Field Owner Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Field Owner Dashboard`,
    description: SITE_DESCRIPTION,
    images: ["/Tacplay-logo-2.png"],
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/Tacplay-logo-2.png",
    apple: "/Tacplay-logo-2.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <I18nProvider>
          <ReduxProvider>
            {children}
            <ToastProvider />
          </ReduxProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
