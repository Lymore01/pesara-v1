"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { ImagePlus } from "lucide-react";
import PesaraTooltip from "../tooltip";
import ProjectPref from "./project-pref";
import ProjectCheckoutBehavior from "./project-checkout-behaviour";

const formSchema = z.object({
  projectName: z.string().min(1, "Project name is required"),
  projectDescription: z.string().optional(),
  logo: z.any().optional(),
  currency: z.string().min(1),
  paymentMethods: z.array(z.string()).optional(),
  webhookUrl: z.string().url("Must be a valid URL"),
  redirectUrl: z.string().url("Must be a valid URL"),
  guestCheckout: z.boolean().optional(),
  phoneVerification: z.boolean().optional(),
  environment: z.string().min(1),
});

export default function ProjectSettings() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      projectDescription: "",
      currency: "KES",
      webhookUrl: "",
      redirectUrl: "",
      guestCheckout: true,
      phoneVerification: false,
      environment: "sandbox",
    },
  });

  const { register, control, handleSubmit, formState } = form;

  return (
    <Form {...form}>
      <form className="w-full" onSubmit={handleSubmit((data) => console.log(data))}>
        <div className="p-6 border-b border-border">
          <h2 className="text-sm text-muted-foreground mb-2">Project Details</h2>

          <div className="flex flex-col gap-8">
            <FormField
              name="projectName"
              control={control}
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-8">
                  <FormLabel className="w-60">Project Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your project name"
                      className="py-6 text-muted-foreground hover:text-foreground pr-10"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="projectDescription"
              control={control}
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-8">
                  <FormLabel className="w-60">
                    Description
                    <span className="text-muted-foreground text-sm font-normal">(optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe your project" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <UploadLogo register={register} />
          </div>
        </div>

        <ProjectPref control={control} />

        <div className="p-6 border-b border-border">
          <h2 className="text-sm text-muted-foreground mb-2">Webhook Configuration</h2>
          <div className="flex flex-col gap-4">
            <FormField
              name="webhookUrl"
              control={control}
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-8">
                  <FormLabel className="w-60 flex items-center">
                    Webhook URL
                    <PesaraTooltip content="Enter the HTTPS endpoint on your server that will receive real-time payment notifications from Pesara. This URL should be accessible from the internet and able to securely process POST requests with payment event data." />
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://yourdomain.com/webhook"
                      className="py-6 text-muted-foreground hover:text-foreground pr-10"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <ProjectCheckoutBehavior control={control} />

        <FormFooter />
      </form>
    </Form>
  );
}

const FormFooter = () => {
  return (
    <div className="w-full px-0 md:px-6 py-4 rounded-br-xl rounded-bl-xl flex items-center justify-end gap-2">
      <Button variant="outline" className="text-xs">
        Clear
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

type UploadLogoProps = {
  register: any;
};

export const UploadLogo = ({ register }: UploadLogoProps) => {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  return (
    <FormItem className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
      <FormLabel className="w-full md:w-60 font-medium">
        Logo <span className="text-muted-foreground text-sm font-normal">(optional)</span>
      </FormLabel>

      <FormControl>
        <div className="flex items-center gap-4 w-full">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="relative w-16 h-16 rounded-full overflow-hidden border border-border hover:ring-2 hover:ring-brand transition-all shadow-sm"
            aria-label="Upload logo"
          >
            {logoPreview ? (
              <img
                src={logoPreview}
                alt="Logo preview"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <div className="flex items-center justify-center h-full w-full bg-muted">
                <ImagePlus className="w-5 h-5 text-muted-foreground" />
              </div>
            )}
          </button>

          <div>
            <Button
              type="button"
              variant="ghost"
              onClick={() => fileInputRef.current?.click()}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {logoPreview ? "Change logo" : "Upload logo"}
            </Button>
            <p className="text-xs text-muted-foreground mt-1">PNG, JPG or SVG (max 2MB)</p>
          </div>

          <input
            type="file"
            accept="image/*"
            {...register("logo")}
            ref={fileInputRef}
            onChange={handleLogoChange}
            className="hidden"
          />
        </div>
      </FormControl>
    </FormItem>
  );
};
