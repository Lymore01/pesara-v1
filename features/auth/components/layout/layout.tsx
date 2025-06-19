"use client";

import { DollarSign } from "lucide-react";
import { EmailButton, GithubButton, GoogleButton, RedirectButton } from "../buttons/buttons";
import { AuthSwitch } from "../auth-switch";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

export default function AuthComponentLayout({
  children,
  type = "sign-in",
}: {
  children: React.ReactNode;
  type?: "sign-in" | "sign-up";
}) {
  const [isEmailMethod, setIsEmailMethod] = useState<boolean>(false);

  const fadeVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <div className="min-w-sm max-w-md h-auto flex flex-col items-center gap-6 text-foreground">
      <div className="flex flex-col items-center gap-4 min-h-[120px]">
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, 5, 0] }}
          transition={{ duration: 1 }}
          className="rounded-full p-1 bg-foreground"
        >
          <DollarSign size={36} className="text-black font-semibold" />
        </motion.div>

        <motion.h1 initial="hidden" animate="visible" variants={fadeVariants} className="text-xl">
          {type === "sign-in" ? "Log in to Pesara" : "Create your account"}
        </motion.h1>
      </div>
      <div className="w-full min-h-[180px] flex items-start justify-center">
        <AnimatePresence mode="wait">
          {isEmailMethod ? (
            <motion.div
              key="email-form"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={fadeVariants}
              transition={{ duration: 0.4 }}
              className="w-3/4 flex flex-col items-center"
            >
              {children}
              <RedirectButton onClick={() => setIsEmailMethod(false)} type={type} />
            </motion.div>
          ) : (
            <motion.div
              key="social-buttons"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={fadeVariants}
              transition={{ duration: 0.4 }}
              className="gap-4 flex flex-col w-3/4"
            >
              <GoogleButton
                onClick={async () => {
                  const res = await signIn("google", { callbackUrl: "/dashboard" });

                  if (res?.error) {
                    toast.error(res.error || "Something went wrong");
                  } else {
                    return;
                  }
                }}
              />
              <GithubButton onClick={() => signIn("github", { callbackUrl: "/dashboard" })} />
              <EmailButton onClick={() => setIsEmailMethod(true)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!isEmailMethod && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeVariants}
          transition={{ delay: 0.2 }}
        >
          <AuthSwitch type={type} />
        </motion.div>
      )}
    </div>
  );
}
