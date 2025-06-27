"use client";

import { Edit } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { UploadLogo } from "@/features/dashboard/components/upload-logo";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useCheckout } from "@/providers/checkout-provider";
import { Switch } from "./ui/switch";

export default function EditButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="absolute size-12 rounded-full grid place-content-center top-16 right-4 z-50 text-xs bg-card text-muted-foreground cursor-pointer">
          <Edit size={20} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-84">
        <div className="px-4 py-2">
          <p className="text-sm font-semibold">Edit Checkout UI</p>
          <p className="text-xs text-muted-foreground">Customize your checkout experience</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <EditForm />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const formSchema = z.object({
  logo: z.string().optional(),
  displayName: z.string().min(2, "Display name is required"),
  primaryColor: z.string().optional(),
  orderSummary: z.boolean().optional(),
  paymentMethods: z.array(z.string()).optional(),
});

const EditForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      logo: "",
      displayName: "",
      primaryColor: "#000000",
      orderSummary: true,
      paymentMethods: ["mpesa"],
    },
  });

  const { register, control, handleSubmit, formState } = form;

  const { values } = useCheckout();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          console.log(data);
          values.setDisplayName(data.displayName);
          console.log("Form submitted with values:", data);
        })}
        className="space-y-4"
      >
        <div className="p-4">
          <UploadLogo register={register} classname="md:flex-col" />
        </div>
        <DropdownMenuSeparator />

        <FormField
          name="displayName"
          control={control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-4 p-4">
              <FormLabel className="w-60">New Display Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your new display name"
                  className="py-6 text-muted-foreground hover:text-foreground pr-10"
                  {...field}
                  value={values.displayName || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    field.onChange(e.target.value);
                    values.setDisplayName(e.target.value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DropdownMenuSeparator />

        {/* primary color */}
        <FormField
          name="primaryColor"
          control={control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-4 p-4">
              <FormLabel className="w-60">Primary Color</FormLabel>
              <FormControl>
                <Input
                  type="color"
                  placeholder="Select primary color"
                  className="w-full h-10 rounded-md border border-border focus:ring-2 focus:ring-primary"
                  {...field}
                  value={values.primaryColor || "#0d2310"}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    field.onChange(e.target.value);
                    values.setPrimaryColor(e.target.value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DropdownMenuSeparator />
        {/* toggle order summary */}
        <FormField
          name="orderSummary"
          control={control}
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between  p-4">
              <div className="space-y-0.5">
                <FormLabel>Order Summary</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                    values.setOrderSummary?.(checked);
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <DropdownMenuSeparator />

        <FormField
          name="paymentMethods"
          control={control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-4 p-4">
              <FormLabel className="w-60">Payment Methods</FormLabel>
              <div className="flex flex-col gap-2">
                <div className="flex items-center">
                  <Switch
                    checked={values.paymentMethods?.includes("mpesa")}
                    onCheckedChange={(checked) => {
                      const newMethods = checked
                        ? [...(values.paymentMethods || []), "mpesa"]
                        : values.paymentMethods?.filter((m) => m !== "mpesa") || [];
                      values.setPaymentMethods?.(newMethods);
                    }}
                  />
                  <span className="ml-2">M-Pesa</span>
                </div>
                <div className="flex items-center">
                  <Switch
                    checked={values.paymentMethods?.includes("airtel")}
                    onCheckedChange={(checked) => {
                      const newMethods = checked
                        ? [...(values.paymentMethods || []), "airtel"]
                        : values.paymentMethods?.filter((m) => m !== "airtel") || [];
                      values.setPaymentMethods?.(newMethods);
                    }}
                  />
                  <span className="ml-2">Airtel Money</span>
                </div>
              </div>
            </FormItem>
          )}
        />
        <DropdownMenuSeparator />
        <FormFooter />
      </form>
    </Form>
  );
};

const FormFooter = () => {
  const { values } = useCheckout();
  return (
    <div className="w-full px-0 md:px-6 py-4 rounded-br-xl rounded-bl-xl flex items-center justify-between gap-2">
      <Button
        type="reset"
        variant="outline"
        className="text-xs flex items-center cursor-pointer"
        onClick={() => {
          values.reset();
        }}
      >
        Reset
      </Button>
      <Button
        type="submit"
        variant="outline"
        className="text-xs dark:hover:bg-brand-accent text-foreground dark:bg-brand flex items-center cursor-pointer"
      >
        Save changes
      </Button>
    </div>
  );
};
