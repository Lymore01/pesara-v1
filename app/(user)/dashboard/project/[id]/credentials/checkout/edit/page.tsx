import { BGPattern } from "@/components/background-pattern";
import { Checkout } from "@/components/checkout";
import EditButton from "@/components/edit-button";
import { CheckoutProvider } from "@/providers/checkout-provider";

export default function EditCheckoutPage() {
  return (
    <CheckoutProvider>
      <div className="absolute inset-0 flex items-center justify-center bg-background z-30 text-foreground">
        <BGPattern variant="grid" mask="fade-edges" />
        <EditButton />
        <Checkout classname="w-[80%] h-[80%]" />
      </div>
    </CheckoutProvider>
  );
}

/* 
"branding": {
    "logo": "https://yourcdn.com/logo.png",
    "primaryColor": "#22c55e",
    "projectDisplayName": "My Cool Store",
    "darkModeEnabled": true
  },
  "payment": {
    "allowedMethods": ["mpesa", "airtel"],
    "defaultMethod": "mpesa",
    "allowPhoneEdit": true,
    "currency": "KES"
  },
*/
