import { i18n } from "@/i18n.config";
import { serverFetcher } from "./serverFetcher";

interface TeamMember {
  id: string;
}

export async function generateTeamMemberParams() {
  try {
    console.log("Fetching team members...");
    const response = await serverFetcher<{ data: TeamMember[] }>(
      "/items/team_members",
      {
        fields: "id",
      }
    );

    if (!response?.data) {
      console.log("No team members found, using fallback paths");
      return i18n.locales.map((locale) => ({ locale, slug: "1" }));
    }

    const slugs = response.data.map((member) => member.id);
    console.log("Found team members with IDs:", slugs);

    // Generate all possible combinations of locales and slugs
    const params = i18n.locales.flatMap((locale) =>
      slugs.map((slug) => ({
        locale,
        slug: slug.toString(),
      }))
    );

    console.log("Generated params:", params);

    // Add undefined locale routes that will redirect to Arabic
    const undefinedLocaleRoutes = slugs.map((slug) => ({
      locale: "undefined",
      slug: slug.toString(),
    }));

    return [...params, ...undefinedLocaleRoutes];
  } catch (error) {
    console.error("Error fetching team members:", error);
    // Return fallback paths if fetch fails
    return [
      ...i18n.locales.map((locale) => ({ locale, slug: "1" })),
      { locale: "undefined", slug: "1" },
    ];
  }
}
