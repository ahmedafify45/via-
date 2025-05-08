import ServiceDetails from "@/components/service/ServiceDetails";
import { serverFetcher } from "@/lib/serverFetcher";
import { i18n } from "@/i18n.config";

interface Service {
  id: string;
  slug: string;
}

export async function generateStaticParams() {
  try {
    const response = await serverFetcher<{ data: Service[] }>(
      "/items/services",
      {
        fields: "id,slug",
      }
    );

    const services = response.data || [];

    return i18n.locales.flatMap((locale) =>
      services.map((service) => ({
        locale,
        slug: service.slug,
      }))
    );
  } catch (error) {
    console.error("Error generating service params:", error);
    return [];
  }
}

export default function ServicePage() {
  return <ServiceDetails />;
}
