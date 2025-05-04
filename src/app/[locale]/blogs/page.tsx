import Blogs from "@/components/blogs/Blogs";

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

async function BlogsPage(props: PageProps) {
  const params = await props.params;

  const {
    locale
  } = params;

  return (
    <main>
      <Blogs locale={locale} />
    </main>
  );
}

export default BlogsPage;
