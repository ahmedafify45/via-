import Image from "next/image";
import Banner from "../custom/banner";
import BlogItem from "./BlogItem";
import CommentSection from "./CommentSection";

function BlogDetails({ blog }: any) {
  return (
    <main className="mx-[80px] my-[220px]">
      <div>
        <Banner title="Our Blogs" subtitle="Home / Blogs" />
        <div className="flex justify-between gap-[20px] lg:flex-row flex-col">
          <div className="flex flex-col gap-[20px]">
            <div>
              <Image
                width={847}
                height={531}
                src={blog.imageDescription}
                alt={blog.imageDescription}
                className="rounded-[4px]"
              />
            </div>
            <h1 className="text-primary text-[24px] font-medium">
              {blog.title} / {blog.date}
            </h1>
            <p className="text-white max-w-[847px]">{blog.description}</p>
          </div>
          <BlogItem />
        </div>
          <CommentSection />
      </div>
    </main>
  );
}

export default BlogDetails;
