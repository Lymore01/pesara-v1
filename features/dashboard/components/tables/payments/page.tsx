import { columns, Payment } from "./columns";
import { DataTable } from "./data-table";

export default async function PaymentLogs() {
  const data: Payment[] = [
    {
      id: "txn1",
      phone: "254712345678",
      amount: 1500,
      status: "success",
      method: "mpesa",
      timestamp: "2024-06-22 10:15:00",
    },
    {
      id: "txn2",
      phone: "254733221100",
      amount: 800,
      status: "pending",
      method: "airtel",
      timestamp: "2024-06-22 11:05:00",
    },
    {
      id: "txn3",
      phone: "254799888777",
      amount: 2300,
      status: "failed",
      method: "mpesa",
      timestamp: "2024-06-21 16:40:00",
    },
    {
      id: "txn4",
      phone: "254701234567",
      amount: 500,
      status: "success",
      method: "airtel",
      timestamp: "2024-06-20 09:30:00",
    },
    {
      id: "txn5",
      phone: "254722334455",
      amount: 1200,
      status: "success",
      method: "mpesa",
      timestamp: "2024-06-19 14:20:00",
    },
  ];

  return (
    <div className="container">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
