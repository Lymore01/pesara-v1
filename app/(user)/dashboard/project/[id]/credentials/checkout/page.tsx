import CheckoutUI from "@/components/checkout-ui";
import { CheckoutProvider } from "@/providers/checkout-provider";
import { Metadata } from "next";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const projectName = params.id;
  return {
    title: `${decodeURI(projectName)} | Checkout | Pesara`,
    description: `Manage and configure your ${projectName} checkout page.`,
  };
}

export default function CheckoutPage({ params }: Props) {
  return (
    <CheckoutProvider>
      <CheckoutUI projectName={params.id} />
    </CheckoutProvider>
  );
}
