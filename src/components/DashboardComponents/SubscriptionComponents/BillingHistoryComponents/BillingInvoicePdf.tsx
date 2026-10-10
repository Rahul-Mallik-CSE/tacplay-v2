/**
 * BillingInvoicePdf.tsx
 * PDF invoice document component generated with @react-pdf/renderer.
 */

import React from "react"
import {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer"
import type { BillingHistoryItem } from "@/types/DashboardTypes/SubscriptionTypes"

const styles = StyleSheet.create({
  page: {
    padding: 36,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#111827",
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottomWidth: 2,
    borderBottomColor: "#980009",
    paddingBottom: 16,
    marginBottom: 20,
  },
  brandTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#980009",
    letterSpacing: 1,
  },
  brandSubtitle: {
    fontSize: 9,
    color: "#6b7280",
    marginTop: 2,
  },
  invoiceMetaRight: {
    alignItems: "flex-end",
  },
  invoiceHeaderTag: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
  },
  invoiceId: {
    fontSize: 11,
    color: "#4b5563",
    marginTop: 3,
  },
  dateText: {
    fontSize: 9,
    color: "#6b7280",
    marginTop: 2,
  },
  statusBadge: {
    marginTop: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: "#ecfdf5",
    color: "#059669",
    borderRadius: 4,
    fontSize: 9,
    fontWeight: "bold",
  },
  infoSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    padding: 12,
    backgroundColor: "#f9fafb",
    borderRadius: 6,
  },
  infoCol: {
    width: "48%",
  },
  infoTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  infoText: {
    fontSize: 9,
    color: "#4b5563",
    lineHeight: 1.4,
  },
  table: {
    marginTop: 8,
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#18181b",
    color: "#ffffff",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  thCol1: {
    width: "60%",
    fontSize: 9,
    fontWeight: "bold",
  },
  thCol2: {
    width: "40%",
    fontSize: 9,
    fontWeight: "bold",
    textAlign: "right",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  tdCol1: {
    width: "60%",
    fontSize: 10,
    color: "#111827",
  },
  tdDescSub: {
    fontSize: 8,
    color: "#6b7280",
    marginTop: 2,
  },
  tdCol2: {
    width: "40%",
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "right",
    color: "#111827",
  },
  summarySection: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 8,
  },
  summaryBox: {
    width: "45%",
    padding: 10,
    backgroundColor: "#f9fafb",
    borderRadius: 6,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 3,
  },
  summaryLabel: {
    fontSize: 9,
    color: "#6b7280",
  },
  summaryValue: {
    fontSize: 9,
    color: "#111827",
    fontWeight: "bold",
  },
  summaryTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#d1d5db",
    paddingTop: 6,
    marginTop: 4,
  },
  totalLabel: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#980009",
  },
  totalValue: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#980009",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 36,
    right: 36,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingTop: 10,
    textAlign: "center",
  },
  footerText: {
    fontSize: 8,
    color: "#9ca3af",
  },
})

interface BillingInvoicePdfProps {
  item: BillingHistoryItem
}

export default function BillingInvoicePdf({ item }: BillingInvoicePdfProps) {
  const currencySymbol =
    item.currency === "EUR" ? "€" :
    item.currency === "USD" ? "$" :
    item.currency === "GBP" ? "£" :
    item.currency || "€"

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.brandTitle}>TACPLAY</Text>
            <Text style={styles.brandSubtitle}>
              Paintball Field Management Platform
            </Text>
          </View>
          <View style={styles.invoiceMetaRight}>
            <Text style={styles.invoiceHeaderTag}>INVOICE</Text>
            <Text style={styles.invoiceId}>#{item.invoice_id}</Text>
            <Text style={styles.dateText}>Date: {item.date}</Text>
            <Text style={styles.statusBadge}>
              {(item.payment_status || "PAID").toUpperCase()}
            </Text>
          </View>
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <View style={styles.infoCol}>
            <Text style={styles.infoTitle}>Service Details</Text>
            <Text style={styles.infoText}>Platform: Tacplay Field Dashboard</Text>
            <Text style={styles.infoText}>Subscription Plan: {item.plan}</Text>
            <Text style={styles.infoText}>
              Payment Status: {item.payment_status}
            </Text>
          </View>
          <View style={styles.infoCol}>
            <Text style={styles.infoTitle}>Payment Information</Text>
            <Text style={styles.infoText}>Invoice ID: {item.invoice_id}</Text>
            <Text style={styles.infoText}>
              Paid At: {item.paid_at ? item.paid_at.slice(0, 10) : item.date}
            </Text>
            <Text style={styles.infoText}>Method: Stripe Payment</Text>
          </View>
        </View>

        {/* Line Items Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.thCol1}>DESCRIPTION</Text>
            <Text style={styles.thCol2}>AMOUNT</Text>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tdCol1}>
              <Text>{item.plan} Subscription</Text>
              <Text style={styles.tdDescSub}>
                Access to Tacplay field management features and analytics.
              </Text>
            </View>
            <Text style={styles.tdCol2}>
              {currencySymbol}{item.price}
            </Text>
          </View>
        </View>

        {/* Total Summary */}
        <View style={styles.summarySection}>
          <View style={styles.summaryBox}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal:</Text>
              <Text style={styles.summaryValue}>
                {currencySymbol}{item.price}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tax (0%):</Text>
              <Text style={styles.summaryValue}>{currencySymbol}0.00</Text>
            </View>
            <View style={styles.summaryTotalRow}>
              <Text style={styles.totalLabel}>Total Paid:</Text>
              <Text style={styles.totalValue}>
                {currencySymbol}{item.price}
              </Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Thank you for partnering with Tacplay! This is a system generated
            invoice for your subscription.
          </Text>
          <Text style={[styles.footerText, { marginTop: 2 }]}>
            support@tacplay.com | https://tacplay.com
          </Text>
        </View>
      </Page>
    </Document>
  )
}
