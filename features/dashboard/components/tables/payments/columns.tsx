"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export type Payment = {
  id: string;
  phone: string;
  amount: number;
  status: "pending" | "success" | "failed";
  method: "mpesa" | "airtel";
  timestamp: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "phone",
    header: "Customer Phone",
    cell: ({ row }) => <div className="font-mono">{row.getValue("phone")}</div>,
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-KE").format(amount);
      return <div className="text-right font-medium">Ksh. {formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      let color = "text-yellow-600";
      if (status === "success") color = "text-emerald-600";
      if (status === "failed") color = "text-red-600";
      return (
        <span className={`capitalize font-semibold ${color}`}>{status as Payment["status"]}</span>
      );
    },
  },
  {
    accessorKey: "method",
    header: "Method",
    cell: ({ row }) => (
      <span className="capitalize">{row.getValue("method") === "mpesa" ? "M-PESA" : "Airtel"}</span>
    ),
  },
  {
    accessorKey: "timestamp",
    header: "Timestamp",
    cell: ({ row }) => <span className="font-mono text-xs">{row.getValue("timestamp")}</span>,
  },
  {
    id: "details",
    header: "Details",
    cell: ({ row }) => (
      <Link
        href={`/dashboard/transactions/${row.original.id}`}
        className="text-blue-600 underline text-xs"
      >
        View
      </Link>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
