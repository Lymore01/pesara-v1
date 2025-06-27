import ProjectSettings from "@/features/dashboard/components/forms/project-settings";
import ConfigLayout from "@/features/dashboard/layouts/config-layout";
import { CheckoutProvider } from "@/providers/checkout-provider";
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
    <ConfigLayout title={`Configure ${params.id}'s settings`}>
      <CheckoutProvider>
        <ProjectSettings />
      </CheckoutProvider>
    </ConfigLayout>
  );
}
