"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

interface Blog {
  id: number;
  title: string;
  title_en: string;
  slug: string;
  description: string;
  description_en: string;
  thumbnail: string | null;
  thumbnail_en: string | null;
  created_on: string;
  category: number;
  tags: string;
  tags_en: string | null;
  seo_meta: {
    title: string;
    description: string;
  };
  seo_meta_en: {
    title: string;
    description: string;
  };
}

interface BlogCardProps {
  blogs: Blog[];
  locale: string;
}

function BlogCard({ blogs, locale }: BlogCardProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;
  const totalPages = Math.ceil(blogs.length / blogsPerPage);
  const isEnglish = locale === "en";

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-w-4xl">
        {currentBlogs.map((blog) => (
          <div
            key={blog.id}
            className="flex flex-col bg-[#17181C] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 w-full lg:w-[411px] h-[457px] p-[16px]"
          >
            <div className="relative h-[250px] group">
              <Image
                src={
                  isEnglish
                    ? blog.thumbnail_en || blog.thumbnail || "/images/blog.png"
                    : blog.thumbnail || "/images/blog.png"
                }
                alt={isEnglish ? blog.title_en : blog.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-[8px]"
              />
              <div className="absolute bottom-[-20] right-0 bg-primary px-4 py-2 rounded-tl-[16px] rounded-br-[16px] w-full lg:w-[338px] h-[42px]">
                <p className="text-[20px] font-medium flex items-center justify-between">
                  {blog.category}
                  <span className="text-[14px] font-normal">
                    {new Date(blog.created_on).toLocaleDateString()}
                  </span>
                </p>
              </div>
            </div>
            <div className="p-6 flex flex-col items-center justify-center gap-[16px] mt-[20px]">
              <h3 className="text-xl font-semibold text-white mb-4 line-clamp-2 text-center">
                {isEnglish ? blog.title_en : blog.title}
              </h3>
              <Link
                href={`/${locale}/blogs/${blog.slug}`}
                className="text-white text-[18px] font-bold hover:text-primary transition-all duration-300"
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center gap-2 mt-8 flex-wrap justify-center">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-[#17181C] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary transition-colors"
          >
            Previous
          </button>

          {[...Array(Math.min(6, totalPages))].map((_, index) => {
            const pageNumber = index + 1;
            return (
              <button
                key={pageNumber}
                onClick={() => setCurrentPage(pageNumber)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentPage === pageNumber
                    ? "bg-primary text-white"
                    : "bg-[#17181C] text-white hover:bg-primary"
                }`}
              >
                {pageNumber}
              </button>
            );
          })}

          {totalPages > 6 && (
            <>
              <span className="text-white">...</span>
              <button
                onClick={() => setCurrentPage(totalPages)}
                className="px-4 py-2 bg-[#17181C] text-white rounded-lg hover:bg-primary transition-colors"
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-[#17181C] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default BlogCard;
