import Credentials from "@/features/dashboard/components/credentials";
import ConfigLayout from "@/features/dashboard/layouts/config-layout";
import { Metadata } from "next";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const projectName = params.id;
  return {
    title: `${decodeURI(projectName)} | Credentials | Pesara`,
    description: `Manage and configure your ${projectName} project api credentials.`,
  };
}

export default function ApiKey({ params }: Props) {
  return (
    <ConfigLayout title={`${params.id}'s Api Credentials`}>
      <Credentials projectName={params.id} />
    </ConfigLayout>
  );
}
