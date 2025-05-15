import BlogCard from "@/components/blogs/BlogCard";
import { serverFetcher } from "@/lib/serverFetcher";
import { Blog } from "@/types/Blogs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Languages } from "@/constants/enums";

interface BlogHomeProps {
  locale: string;
}

interface BlogAreaSettings {
  data: {
    id: number;
    title: string;
    title_en: string;
    sub_title: string;
    sub_title_en: string;
    how_many: number;
    is_active: boolean;
    slug: string;
    button_url: string;
    button_url_en: string;
    button_text: string;
    button_text_en: string;
  }[];
}

async function BlogHome({ locale }: BlogHomeProps) {
  const [blogPosts, blogSettings] = await Promise.all([
    serverFetcher<{ data: Blog[] }>("/items/posts", {
      fields: "*.*",
    }),
    serverFetcher<BlogAreaSettings>("/items/home_page_setting", {
      "filter[slug]": "blog-area",
    }),
  ]);

  const blogArea = blogSettings.data[0];

  if (!blogArea?.is_active) {
    return null;
  }

  const title = locale === "ar" ? blogArea.title : blogArea.title_en;
  const subtitle = locale === "ar" ? blogArea.sub_title : blogArea.sub_title_en;
  const limitedBlogs = blogPosts.data.slice(0, blogArea.how_many);

  return (
    <section className="mt-[100px] mx-4 lg:mx-[80px]">
      <div className="flex flex-col justify-center">
        <div className="flex flex-col gap-[20px] items-center justify-center">
          <h5 className="text-primary text-[32px] md:text-[40px] lg:text-[48px] font-bold text-center">
            {title}
          </h5>
          <p className="text-white text-center max-w-[600px] mt-2 mb-5 text-sm md:text-base">
            {subtitle}
          </p>
        </div>
        <BlogCard blogs={limitedBlogs} locale={locale} columns={3} />
      </div>
      <div className="flex justify-center mb-[40px] md:mb-[60px] lg:mb-[80px] mt-[20px]">
        <Button className="w-[140px] md:w-[160px] h-[48px] md:h-[56px] text-sm md:text-base text-black">
          <Link
            href={`/${locale}${
              locale === Languages.ENGLISH
                ? blogArea.button_url_en
                : blogArea.button_url
            }`}
            className="flex items-center justify-center gap-2"
          >
            {locale === Languages.ENGLISH
              ? blogArea.button_text_en
              : blogArea.button_text}
            <span className="bg-white text-black w-[40px] md:w-[48px] h-[40px] md:h-[48px] flex items-center justify-center rounded-tl-[12px] md:rounded-tl-[16px] rounded-br-[12px] md:rounded-br-[16px]">
              <FontAwesomeIcon
                icon={faArrowRight}
                className={locale === Languages.ARABIC ? "rotate-180" : ""}
              />
            </span>
          </Link>
        </Button>
      </div>
    </section>
  );
}

export default BlogHome;
