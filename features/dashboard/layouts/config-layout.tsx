"use client";

export default function ConfigLayout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto my-8 bg-card shadow-md rounded-xl flex flex-col justify-between border border-border">
        <div className="px-0 md:px-6 py-4 border-b border-border">
          <h1 className="text-foreground text-base">{title}</h1>
        </div>
        {children}
      </div>
    </div>
  );
}
