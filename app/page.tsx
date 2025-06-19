"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Header } from "@/components/nav/header";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 bg-background text-foreground">
      <Header />
      <div className="max-w-6xl w-[80%] mx-auto grid lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight font-cal">
            Effortless Payments for Modern Africa
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Pesara lets you accept M-Pesa and other local payment methods via clean APIs,
            components, and dashboards – built for developers & businesses across Africa.
          </p>
          <div className="flex gap-4">
            <Button className="bg-primary">Start building</Button>
            <ModeToggle />
          </div>
        </div>

        <div className="w-full hidden"></div>
      </div>
    </section>
  );
}
