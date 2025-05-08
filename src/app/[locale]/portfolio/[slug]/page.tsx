import React from "react";
import PortfolioDetails from "@/components/profile/PortfolioDetails";
import { serverFetcher } from "@/lib/serverFetcher";
import { i18n } from "@/i18n.config";

interface Portfolio {
  id: string;
  slug: string;
}

export async function generateStaticParams() {
  try {
    const response = await serverFetcher<{ data: Portfolio[] }>(
      "/items/portfolios",
      {
        fields: "id,slug",
      }
    );

    const portfolios = response.data || [];

    return i18n.locales.flatMap((locale) =>
      portfolios.map((portfolio) => ({
        locale,
        slug: portfolio.slug,
      }))
    );
  } catch (error) {
    console.error("Error generating portfolio params:", error);
    return [];
  }
}

export default function PortfolioPage() {
  return <PortfolioDetails />;
}
