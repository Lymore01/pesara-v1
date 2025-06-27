"use client";

import { cn, getInitials } from "@/lib/utils";
import { useState } from "react";
import { Input } from "./ui/input";
import PaymentMethod from "@/features/dashboard/components/payment-method";
import { Button } from "./ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import Image from "next/image";
import { useCheckout } from "@/providers/checkout-provider";
import Link from "next/link";

export const Checkout = ({ classname }: { classname?: string }) => {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Payment simulated - redirect or handle success logic here.");
    }, 2000);
  };

  return (
    <div
      className={cn(
        "w-full h-screen max-h-screen grid md:grid-cols-2 grid-cols-1 bg-background text-foreground border border-border rounded-md shadow-lg overflow-hidden",
        classname
      )}
    >
      <BrandingAndInfo />

      {/* RIGHT - Payment Form */}
      <div className="flex flex-col justify-center px-8 py-12 max-w-md mx-auto w-full space-y-8">
        <h2 className="text-2xl font-semibold mb-2">Complete Your Payment</h2>

        <div className="space-y-4">
          <div>
            <label className="text-sm mb-1 block">Mobile Number</label>
            <Input
              placeholder="e.g. 0712345678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full py-6"
            />
          </div>

          {/* editable */}
          <div>
            <label className="text-sm mb-1 block">Payment Method</label>
            <p className="text-xs text-muted-foreground mb-2">
              Choose your preferred payment method
            </p>
            <PaymentMethod />
          </div>
        </div>

        <Button
          className="text-sm dark:hover:bg-brand-accent py-6 text-white rounded-md bg-brand flex items-center cursor-pointer"
          disabled={loading || !phone}
          onClick={handlePayment}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
              Processing...
            </>
          ) : (
            "Pay Now"
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center mt-4">
          By proceeding, you agree to Pesara's{" "}
          <a href="/terms" className="underline hover:text-primary">
            Terms of Service
          </a>
          .
        </p>
      </div>
    </div>
  );
};

const order = {
  description: "Premium Subscription",
  items: [{ name: "Subscription (1 month)", price: 1200 }],
  total: 1200,
};

const BrandingAndInfo = () => {
  const { values } = useCheckout();
  const initials = getInitials(values.displayName || "");

  return (
    <div
      className={cn(
        "hidden md:flex flex-col justify-between bg-brand-accent items-center py-8 px-12 h-full min-h-full overflow-y-auto"
      )}
      style={values.primaryColor ? { backgroundColor: values.primaryColor } : undefined}
    >
      <div className="w-full flex items-center gap-3 mb-8">
        <Link href="#" className="hover:bg-brand/20 rounded-full p-2 transition-colors">
          <ArrowLeft className="text-foreground" size={20} />
        </Link>
        {/* editable */}
        {values.logo ? (
          <Image
            src={values.logo}
            alt={values.displayName || "Brand Logo"}
            width={48}
            height={48}
            className="w-12 h-12 rounded-sm object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center text-white font-bold text-lg">
            {initials}
          </div>
        )}
        <span className="font-semibold text-base text-foreground">{values.displayName}</span>
      </div>

      {/* Order Details */}
      {values.orderSummary ? (
        <OrderSummary />
      ) : (
        <div className="w-full p-4 mb-6">
          <Total />
        </div>
      )}

      <div className="mt-auto text-xs text-muted-foreground ">
        Powered by <span className="font-bold text-foreground">Pesara</span>
      </div>
    </div>
  );
};

const OrderSummary = () => {
  return (
    <div className="w-full p-4 mb-6">
      <h2 className="text-base font-semibold mb-2 text-foreground">Order Summary</h2>
      <ul className="mb-2">
        {order.items.map((item, idx) => (
          <li key={idx} className="flex justify-between text-sm text-muted-foreground mb-1">
            <span>{item.name}</span>
            <span>Ksh. {item.price.toLocaleString("en-KE")}</span>
          </li>
        ))}
      </ul>
      <Total />
    </div>
  );
};

const Total = () => {
  return (
    <div className="flex justify-between items-center border-t pt-2 mt-2">
      <span className="font-semibold text-foreground">Total</span>
      <span className="font-bold text-xl text-foreground">
        Ksh. {order.total.toLocaleString("en-KE")}
      </span>
    </div>
  );
};
