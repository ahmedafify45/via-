import BlogDetails from "@/components/blogs/BlogDetails";
import { Metadata } from "next";
import { serverFetcher } from "@/lib/serverFetcher";
import { i18n } from "@/i18n.config";

interface Blog {
  id: string;
  slug: string;
}

export async function generateStaticParams() {
  try {
    const response = await serverFetcher<{ data: Blog[] }>("/items/posts", {
      fields: "id,slug",
    });

    const blogs = response.data || [];

    return i18n.locales.flatMap((locale) =>
      blogs.map((blog) => ({
        locale,
        slug: blog.slug,
      }))
    );
  } catch (error) {
    console.error("Error generating blog params:", error);
    return [];
  }
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  return {
    title: `Blog - ${params.slug}`,
  };
}

export default async function BlogDetailsPage(props: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const params = await props.params;
  return (
    <main>
      <BlogDetails slug={params.slug} locale={params.locale} />
    </main>
  );
}
