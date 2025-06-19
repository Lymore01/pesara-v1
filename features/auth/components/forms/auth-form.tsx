"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { buttonClassnames } from "../buttons/buttons";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useState } from "react";

interface AuthFormProps<T extends z.ZodTypeAny> {
  schema: T;
  fields: {
    name: keyof z.infer<T>;
    label: string;
    placeholder: string;
    type?: string;
  }[];
  submitLabel: string;
  onSubmit: (data: z.infer<T>) => void;
  isPending: boolean;
}

export function AuthForm<T extends z.ZodTypeAny>({
  schema,
  fields,
  submitLabel,
  onSubmit,
  isPending,
}: AuthFormProps<T>) {
  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues: Object.fromEntries(fields.map((f) => [f.name, ""])) as z.infer<T>,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        {fields.map((fieldConfig) => (
          <FormField
            key={String(fieldConfig.name)}
            control={form.control}
            name={fieldConfig.name as any}
            render={({ field }) => {
              const isPassword = fieldConfig.type === "password";
              const [isPasswordVisible, setPasswordVisible] = useState(false);

              return (
                <FormItem>
                  <FormLabel className="text-muted-foreground">{fieldConfig.label}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder={fieldConfig.placeholder}
                        type={
                          isPassword
                            ? isPasswordVisible
                              ? "text"
                              : "password"
                            : fieldConfig.type || "text"
                        }
                        className="py-6 text-muted-foreground hover:text-foreground pr-10"
                        {...field}
                      />
                      {isPassword && (
                        <button
                          type="button"
                          onClick={() => setPasswordVisible((prev) => !prev)}
                          className="absolute top-1/2 right-3 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          tabIndex={-1}
                        >
                          {isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        ))}

        <Button type="submit" variant="secondary" className={buttonClassnames}>
          {isPending ? (
            <div className="flex items-center">
              <Loader size={16} className="animate-spin mr-2" />{" "}
              {submitLabel === "Login" ? "Logging in..." : "Creating..."}
            </div>
          ) : (
            submitLabel
          )}
        </Button>
      </form>
    </Form>
  );
}
