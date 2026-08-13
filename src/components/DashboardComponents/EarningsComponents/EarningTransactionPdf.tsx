/**
 * EarningTransactionPdf.tsx
 * PDF document component for generating transaction receipts.
 * Uses @react-pdf/renderer to create a downloadable PDF
 * with player info and payment info sections.
 */

import React from "react"
import {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer"
import type { TransactionDetailsResponse } from "@/types/DashboardTypes/EarningsTypes"

/** PDF stylesheet definitions */
const pdfStyles = StyleSheet.create({
  page: {
    padding: 28,
    fontSize: 11,
    fontFamily: "Helvetica",
    color: "#111827",
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 10,
    color: "#6b7280",
    marginBottom: 16,
  },
  section: {
    marginBottom: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 700,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    paddingVertical: 3,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  label: {
    width: "42%",
    color: "#6b7280",
  },
  value: {
    width: "58%",
    textAlign: "right",
  },
  footer: {
    marginTop: 16,
    fontSize: 9,
    color: "#6b7280",
    textAlign: "center",
  },
})

/** Single row component for PDF layout */
const Row = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <View style={pdfStyles.row}>
    <Text style={pdfStyles.label}>{label}</Text>
    <Text style={pdfStyles.value}>{String(value)}</Text>
  </View>
)

/** Props for the PDF document component */
interface TransactionDetailsPdfDocumentProps {
  details: TransactionDetailsResponse["data"]["transaction_details"]
  footerText: string
}

/** Main PDF document component */
function TransactionDetailsPdfDocument({
  details,
  footerText,
}: TransactionDetailsPdfDocumentProps) {
  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        {/* Document header */}
        <Text style={pdfStyles.title}>{details.title}</Text>
        <Text style={pdfStyles.subtitle}>{details.subtitle}</Text>

        {/* Player Info Section */}
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>Player Info</Text>
          <Row label="Player ID" value={details.player_info.display_player_id} />
          <Row label="Player Name" value={details.player_info.player_name} />
          <Row label="Email" value={details.player_info.email} />
          <Row
            label="Booking ID"
            value={details.player_info.display_booking_id}
          />
          <Row
            label="Session ID"
            value={details.player_info.display_session_id}
          />
        </View>

        {/* Payment Info Section */}
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>Payment Info</Text>
          <Row
            label="Transaction ID"
            value={details.payment_info.display_transaction_id}
          />
          <Row label="Amount" value={details.payment_info.amount_display} />
          <Row
            label="Platform Fee"
            value={details.payment_info.platform_fee_display}
          />
          <Row
            label="Net Profit"
            value={details.payment_info.net_profit_display}
          />
          <Row
            label="Payment Method"
            value={details.payment_info.payment_method_display}
          />
          <Row
            label="Date & Time"
            value={details.payment_info.date_time_display}
          />
          <Row label="Payment Status" value={details.status_display} />
        </View>

        {/* Footer */}
        <Text style={pdfStyles.footer}>{footerText}</Text>
      </Page>
    </Document>
  )
}

export default TransactionDetailsPdfDocument
