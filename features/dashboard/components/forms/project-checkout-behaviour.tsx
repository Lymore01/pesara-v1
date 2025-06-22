import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export default function ProjectCheckoutBehavior({ control }: { control: any }) {
  return (
    <div className="p-6 border-b border-border">
      <h2 className="text-sm text-muted-foreground mb-4">Checkout Behavior</h2>
      <div className="flex flex-col gap-8">
        <FormField
          name="redirectUrl"
          control={control}
          render={({ field }) => (
            <FormItem className="flex flex-row items-start gap-8">
              <FormLabel className="w-60 flex items-center">Redirect after Payment</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  <Input
                    className="py-6 text-muted-foreground hover:text-foreground pr-10"
                    placeholder="https://yourdomain.com/thank-you"
                    {...field}
                  />
                  <p className="text-foreground text-sm dark:text-muted-foreground">
                    Where the customer is redirected after a successful payment.
                  </p>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <FormField
            name="guestCheckout"
            control={control}
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel>Allow Phone Update</FormLabel>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
          <p className="text-foreground text-sm dark:text-muted-foreground">
            If true, the user can change the phone number at checkout (useful when customer logs in
            from a device with different phone).
          </p>
        </div>

        <div className="space-y-2">
          <FormField
            name="phoneVerification"
            control={control}
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel>Email Notifications</FormLabel>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
          <p className="text-foreground text-sm dark:text-muted-foreground">
            Send email updates (via Pesara) to customers after payment.
          </p>
        </div>

        <div className="space-y-2">
          <FormField
            name="notifyOnFailed"
            control={control}
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel>Notify on Failed</FormLabel>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
