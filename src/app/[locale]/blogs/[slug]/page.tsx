import BlogDetails from "@/components/blogs/BlogDetails";
import { Metadata } from "next";

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
