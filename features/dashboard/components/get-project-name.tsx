"use client";

export function getProjectName(path: string) {
  const parts = path.split("/");
  const projectIndex = parts.indexOf("project");
  if (projectIndex !== -1 && parts.length > projectIndex + 1) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground hover:text-foreground text-xs">/</span>
        <p className="text-foreground text-xs">{decodeURI(parts[projectIndex + 1])}</p>
      </div>
    );
  }
  return "";
}
