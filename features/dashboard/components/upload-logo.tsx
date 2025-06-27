"use client";

import { Button } from "@/components/ui/button";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { ImagePlus } from "lucide-react";
import { useRef, useState } from "react";

type UploadLogoProps = {
  register?: any;
  classname?: string;
};

export const UploadLogo = ({ register, classname }: UploadLogoProps) => {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  return (
    <FormItem className={cn("flex flex-col md:flex-row md:items-center gap-4 md:gap-8", classname)}>
      <FormLabel className={cn("w-full md:w-60 font-medium", classname ? "hidden" : "block")}>
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
