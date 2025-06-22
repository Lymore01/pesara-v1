import ProjectSettings from "@/features/dashboard/components/forms/project-settings";
import { Metadata } from "next";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const projectName = params.id;
  return {
    title: `${decodeURI(projectName)} | Settings | Pesara`,
    description: `Manage and configure your ${projectName} project settings in Pesara.`,
  };
}

export default function Settings({ params }: Props) {
  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto my-8 bg-card shadow-md rounded-xl flex flex-col justify-between border border-border">
        <div className="px-0 md:px-6 py-4 border-b border-border">
          <h1 className="text-foreground text-base">Configure {params.id}'s settings</h1>
        </div>

        <ProjectSettings />
      </div>
    </div>
  );
}
