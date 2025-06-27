"use client";

import { useState } from "react";
import { PaymentProviders } from "../lib/types";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useCheckout } from "@/providers/checkout-provider";

export default function PaymentMethod() {
  const { values } = useCheckout();
  const [picked, setPicked] = useState<PaymentProviders[]>(["mpesa"]);

  const toggleProvider = (provider: PaymentProviders) => {
    setPicked((prev) =>
      prev.includes(provider) ? prev.filter((p) => p !== provider) : [...prev, provider]
    );
  };

  const isPicked = (provider: PaymentProviders): boolean => {
    return picked.includes(provider);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      {values.paymentMethods?.length ? (
        <>
          {values.paymentMethods.includes("mpesa") && (
            <PaymentChoice
              alt="mpesa logo"
              image="/images/mpesa.png"
              isPicked={isPicked}
              provider="mpesa"
              toggleProvider={toggleProvider}
              key={"mpesa"}
            />
          )}
          {values.paymentMethods.includes("airtel") && (
            <PaymentChoice
              alt="airtel logo"
              image="/images/airtel.png"
              isPicked={isPicked}
              provider="airtel"
              toggleProvider={toggleProvider}
              key={"airtel"}
            />
          )}
        </>
      ) : (
        <div className="col-span-2 text-sm text-center text-red-500">
          No payment methods available. Please configure your project settings.
        </div>
      )}
    </div>
  );
}

const PaymentChoice = ({
  provider,
  image,
  alt,
  isPicked,
  toggleProvider,
}: {
  provider: PaymentProviders;
  image: string;
  alt: string;
  isPicked: (provider: PaymentProviders) => boolean;
  toggleProvider: (provider: PaymentProviders) => void;
}) => {
  return (
    <div
      className={cn(
        "h-24 bg-card border border-b rounded-sm grid place-content-center hover:bg-accent hover:text-accent-foreground cursor-pointer relative",
        isPicked(provider) && "bg-accent"
      )}
      onClick={() => toggleProvider(provider)}
      tabIndex={0}
      role="button"
      aria-pressed={isPicked(provider)}
    >
      <Image src={image} alt={alt} width={100} height={100} />
      <div className="absolute top-2 right-2 flex">
        <Input
          type="checkbox"
          className="h-4 w-4 accent-accent rounded-md pointer-events-none"
          checked={isPicked(provider)}
          readOnly
          tabIndex={-1}
        />
      </div>
    </div>
  );
};
