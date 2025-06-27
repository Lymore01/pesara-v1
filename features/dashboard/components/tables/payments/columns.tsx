"use client";

import Tag from "@/components/tag";
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
    accessorKey: "id",
    header: "Transaction ID",
    cell: ({ row }) => (
      <span className="font-mono text-xs bg-muted px-2 py-1 rounded select-all">
        {row.getValue("id")}
      </span>
    ),
  },
  {
    accessorKey: "phone",
    header: "Customer Phone",
    cell: ({ row }) => {
      const phone = row.getValue("phone");

      return <div className="font-mono">{String(phone)}</div>;
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-KE").format(amount);
      const status = row.getValue("status");
      let color = "text-orange-500";
      if (status === "success") color = "text-green-600";
      if (status === "failed") color = "text-red-600";
      return (
        <div className="flex items-start">
          <div className={`text-right font-semibold ${color}`}>Ksh. {formatted}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");

      return (
        <div className="flex items-start">
          <Tag
            variant={status === "failed" ? "error" : status === "pending" ? "warning" : "default"}
            className="mx-0"
          >
            {String(status)}
          </Tag>
        </div>
      );
    },
  },
  {
    accessorKey: "method",
    header: "Method",
    cell: ({ row }) => (
      <span className="capitalize flex items-center gap-1">
        {row.getValue("method") === "mpesa" ? (
          <img src="/images/mpesa.png" alt="M-PESA" className="w-12 h-8 inline" />
        ) : (
          <img src="/images/airtel.png" alt="Airtel" className="w-12 h-8 inline" />
        )}
      </span>
    ),
  },
  {
    accessorKey: "timestamp",
    header: "Timestamp",
    cell: ({ row }) => (
      <span className="font-mono text-xs text-muted-foreground">{row.getValue("timestamp")}</span>
    ),
  },
  {
    id: "details",
    header: "",
    cell: ({ row }) => (
      <Link
        href={`/dashboard/transactions/${row.original.id}`}
        className="text-blue-600 underline text-xs font-medium hover:text-brand-accent transition-colors"
      >
        View
      </Link>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
