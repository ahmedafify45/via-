import BlogDetails from "@/components/blogs/BlogDetails";

interface PageProps {
  params: {
    slug: string;
    locale: string;
  };
}

export default function BlogDetailsPage({ params }: PageProps) {
  return <BlogDetails slug={params.slug} locale={params.locale} />;
}
