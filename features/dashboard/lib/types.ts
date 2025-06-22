import { LucideIcon } from "lucide-react";

export type NavItem = {
  name: string;
  icon: LucideIcon;
  href: string;
};

export type NavSection = {
  label: string;
  items: NavItem[];
};

export type PaymentProviders = "mpesa" | "airtel";

export type StatsCard = {
  id: number;
  title: string;
  value: number;
  classNames?: string;
};
