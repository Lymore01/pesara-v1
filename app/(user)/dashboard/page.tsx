"use client";

import { Input } from "@/components/ui/input";
import { NewProject } from "@/features/dashboard/components/forms/new-project";
import { useSidebar } from "@/features/dashboard/components/Nav/sidebar-context";
import { projects } from "@/features/dashboard/lib/constants";
import { getInitials } from "@/lib/utils";
import { ArrowRightIcon, Search } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div>
      <HeaderSection />
      <ProjectsSection />
    </div>
  );
}

export const HeaderSection = () => {
  return (
    <div className="flex items-center gap-2">
      <SearchBox />
      <NewProject />
    </div>
  );
};

export const SearchBox = () => {
  return (
    <div className="relative">
      <Input
        placeholder={"Search for a project..."}
        type="text"
        className="py-4 text-muted-foreground hover:text-foreground pr-10 text-xs"
      />
      <button
        type="button"
        onClick={() => {}}
        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
        tabIndex={-1}
      >
        <Search size={16} />
      </button>
    </div>
  );
};

export const ProjectsSection = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mt-8">
      {projects.map((project, idx) => (
        <ProjectCard project={project} key={idx} />
      ))}
    </section>
  );
};

export const ProjectCard = ({ project }: { project: any }) => {
  const initials = getInitials(project.name);

  return (
    <Link
      href={`/dashboard/project/${project.name}`}
      key={project.id}
      className="rounded-sm border bg-card text-card-foreground shadow-sm p-6 flex flex-col gap-2 cursor-pointer hover:bg-accent transition-colors group relative"
    >
      <div className="flex items-center gap-3 mb-2">
        {project.logo ? (
          <img
            src={project.logo}
            alt={project.name}
            className="w-10 h-10 rounded-full object-cover shadow"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-900 to-emerald-900/20 flex items-center justify-center text-white font-bold text-lg shadow">
            {initials}
          </div>
        )}

        <h3 className="font-semibold text-sm">{project.name}</h3>
      </div>
      <p className="text-sm text-muted-foreground">{project.description}</p>
      <div className="flex justify-end items-center mt-4 text-xs text-muted-foreground">
        <span>{project.createdAt}</span>
      </div>
      <div className="absolute top-6 right-6 hidden group-hover:block transition-all ease-in-out">
        <ArrowRightIcon size={16} className="text-card-foreground" />
      </div>
    </Link>
  );
};
