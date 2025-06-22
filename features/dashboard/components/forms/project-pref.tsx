import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PaymentMethod from "../payment-method";
import { Input } from "@/components/ui/input";

export default function ProjectPref({ control }: { control: any }) {
  return (
    <div className="p-6 border-b border-border">
      <h2 className="text-sm text-muted-foreground mb-2">Payment Preferences</h2>
      <div className="flex flex-col gap-8">
        <FormField
          name="currency"
          control={control}
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-8">
              <FormLabel className="w-60">Currency</FormLabel>
              <div className="w-full">
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="KES">KES</SelectItem>
                    <SelectItem value="UGX">UGX</SelectItem>
                    <SelectItem value="TZS">TZS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="currency"
          control={control}
          render={({ field }) => (
            <FormItem className="flex flex-row items-start gap-8">
              <FormLabel className="w-60">Payment Provider</FormLabel>
              <PaymentMethod />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="shortCode"
          control={control}
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-8">
              <FormLabel className="w-60">Short Code</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. 600999"
                  type="number"
                  className="py-6 text-muted-foreground hover:text-foreground pr-10"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="consumerKey"
          control={control}
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-8">
              <FormLabel className="w-60">Consumer key</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your consumer key from daraja api"
                  className="py-6 text-muted-foreground hover:text-foreground pr-10"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="consumerSecret"
          control={control}
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-8">
              <FormLabel className="w-60">Consumer Secret</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your consumer secret from daraja api"
                  className="py-6 text-muted-foreground hover:text-foreground pr-10"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="passKey"
          control={control}
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-8">
              <FormLabel className="w-60">Passkey</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your passkey from daraja api"
                  className="py-6 text-muted-foreground hover:text-foreground pr-10"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="environment"
          control={control}
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-8">
              <FormLabel className="w-60">Environment</FormLabel>
              <div className="w-full">
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select environment" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="sandbox">sandbox</SelectItem>
                    <SelectItem value="production">production</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* guide */}
        <p className="text-sm text-muted-foreground">
          To obtain your credentials, visit the{" "}
          <a
            href="https://developer.safaricom.co.ke/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-600"
          >
            Daraja API Portal
          </a>
          . Register your application to get your <strong>Short Code</strong>,{" "}
          <strong>Consumer Key</strong>, <strong>Consumer Secret</strong> and{" "}
          <strong>Passkey</strong>. Use these credentials here to enable secure M-PESA integration
          with Pesara.
        </p>
      </div>
    </div>
  );
}
