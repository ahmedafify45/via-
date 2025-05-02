import React from "react";
import Blogs from "@/components/blogs/Blogs";

interface PageProps {
  params: {
    locale: string;
  };
}

function BlogsPage({ params: { locale } }: PageProps) {
  return (
    <main>
      <Blogs locale={locale} />
    </main>
  );
}

export default BlogsPage;
