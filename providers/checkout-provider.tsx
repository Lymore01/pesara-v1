"use client";
import { useSidebar } from "@/features/dashboard/components/Nav/sidebar-context";
import React, { createContext, useContext, useMemo, useState } from "react";

interface CheckoutValues {
  logo: string | null;
  displayName: string | null;
  primaryColor: string | null;
  setLogo: (logo: string | null) => void;
  setDisplayName: (displayName: string | null) => void;
  setPrimaryColor: (primaryColor: string | null) => void;
  orderSummary?: boolean;
  setOrderSummary?: (orderSummary: boolean) => void;
  paymentMethods?: string[];
  setPaymentMethods?: (paymentMethods: string[]) => void;
  reset: () => void;
}

const project = {
  name: "Tribbe",
  logo: "/images/dark.png",
  paymentMethods: ["mpesa", "airtel"],
};

const CheckoutContext = createContext<CheckoutValues | undefined>(undefined);

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const { project: projectName } = useSidebar();
  const [logo, setLogo] = useState<string | null>(project.logo || null);
  const [displayName, setDisplayName] = useState<string | null>(
    String(projectName) || project.name
  );
  const [primaryColor, setPrimaryColor] = useState<string | null>(null);
  const [orderSummary, setOrderSummary] = useState<boolean>(true);
  const [paymentMethods, setPaymentMethods] = useState<string[]>(project.paymentMethods || []);

  function reset() {
    setLogo(project.logo);
    setDisplayName(projectName || project.name);
    setPrimaryColor(null);
    setOrderSummary(true);
    setPaymentMethods(project.paymentMethods || []);
  }

  const value = useMemo<CheckoutValues>(
    () => ({
      logo,
      displayName,
      primaryColor,
      setLogo,
      setDisplayName,
      setPrimaryColor,
      orderSummary,
      setOrderSummary,
      paymentMethods,
      setPaymentMethods,
      reset,
    }),
    [logo, displayName, primaryColor, orderSummary, paymentMethods]
  );

  return <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>;
}

export function useCheckout() {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error("useCheckout must be used within a CheckoutProvider");
  return { values: ctx };
}
