import { LayoutDashboard, Wallet, Settings, BarChart2, KeyRound } from "lucide-react";
import { NavSection, StatsCard } from "./types";

export const navSections: NavSection[] = [
  {
    label: "Project",
    items: [
      { name: "Overview", icon: LayoutDashboard, href: "/dashboard" },
      { name: "Transactions", icon: Wallet, href: "/dashboard/transactions" },
      { name: "Analytics", icon: BarChart2, href: "/dashboard/analytics" },
      { name: "API Keys", icon: KeyRound, href: "/dashboard/api-keys" },
      { name: "Settings", icon: Settings, href: "/dashboard/project-settings" },
    ],
  },
  {
    label: "Account",
    items: [
      { name: "Account Settings", icon: Settings, href: "/dashboard/account-settings" },
      { name: "Billing", icon: Wallet, href: "/dashboard/billing" },
    ],
  },
];

export const projects = [
  {
    id: 1,
    name: "Tribbe",
    description: "A modern payments platform for Africa.",
    logo: "/images/dark.png",
    owner: "Kelly",
    createdAt: "2024-06-20",
  },
  {
    id: 2,
    name: "Green Wallet",
    description: "Eco-friendly digital wallet.",
    owner: "Amina",
    createdAt: "2024-05-15",
  },
  {
    id: 3,
    name: "MarketHub",
    description: "Marketplace for local businesses.",
    owner: "Samuel",
    createdAt: "2024-04-10",
    logo: "/images/light.png",
  },
];

export const stats: StatsCard[] = [
  {
    id: 1,
    title: "Total Payments",
    value: 234,
  },
  {
    id: 2,
    title: "Failed Payments",
    value: 120,
    classNames: "",
  },
  {
    id: 3,
    title: "Total Revenue",
    value: 350000,
  },
];
