import Image from "next/image";

export default function Home() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 bg-[var(--color-background)] text-[var(--color-foreground)]">
      <div className="max-w-6xl grid lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight font-cal">
            Effortless Payments for Modern Africa
          </h1>
          <p className="text-lg text-secondary-foreground max-w-xl">
            Pesara lets you accept M-Pesa and other local payment methods via
            clean APIs, components, and dashboards – built for developers &
            businesses across Africa.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="px-6 py-3 rounded-xl  bg-black text-white hover:brightness-110 transition"
            >
              Get Started
            </a>
            
          </div>
        </div>

        <div className="w-full">
          <div className="aspect-video bg-[var(--color-surface)] rounded-xl shadow-xl flex items-center justify-center">
            <span className="text-[var(--text-secondary)] font-mono">
              [Product Screenshot]
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
