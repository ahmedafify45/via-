"use client";
import { Languages } from "@/constants/enums";
import { Blog } from "@/types/Blogs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

interface BlogCardProps {
  blogs: Blog[];
  locale: string;
  columns?: 2 | 3;
}

function BlogCard({ blogs, locale, columns = 2 }: BlogCardProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = columns === 2 ? 6 : 9;
  const totalPages = Math.ceil(blogs.length / blogsPerPage);
  const isEnglish = locale === Languages.ENGLISH;

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  return (
    <div className="flex flex-col items-center w-full">
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 ${
          columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"
        } gap-6 w-full`}
      >
        {currentBlogs.map((blog) => (
          <div
            key={blog.id}
            className="flex flex-col bg-[#17181C] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-[380px] p-4"
          >
            <div className="relative h-[200px] group">
              {isEnglish ? (
                <Image
                  src={
                    blog.thumbnail_en
                      ? blog.thumbnail_en?.data?.full_url
                      : "https://placehold.co/600x400.png"
                  }
                  alt={isEnglish ? blog.title_en : blog.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-[8px]"
                />
              ) : (
                <Image
                  src={
                    blog.thumbnail
                      ? blog.thumbnail?.data?.full_url
                      : "https://placehold.co/600x400.png"
                  }
                  alt={isEnglish ? blog.title_en : blog.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-[8px]"
                />
              )}
              <div className="absolute bottom-0 right-0 bg-primary px-4 py-2 rounded-tl-[16px] rounded-br-[16px] w-full">
                <p className="text-[20px] font-medium flex items-center justify-between">
                  {blog.category
                    ? isEnglish
                      ? blog.category.title_en
                      : blog.category.title
                    : ""}
                  <span className="text-[14px] font-normal">
                    {blog.created_on
                      ? new Date(blog.created_on).toLocaleDateString()
                      : ""}
                  </span>
                </p>
              </div>
            </div>
            <div className="p-6 flex flex-col items-center justify-center gap-4 mt-4">
              <h3 className="text-xl font-semibold text-white mb-4 line-clamp-2 text-center">
                {isEnglish ? blog.title_en : blog.title}
              </h3>
              <Link
                href={`/${locale}/blogs/${blog.slug}`}
                className="text-white text-[18px] font-bold hover:text-primary transition-all duration-300 flex items-center gap-4"
              >
                {isEnglish ? "Read More" : "اعرض المزيد"}{" "}
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className={!isEnglish ? "rotate-180" : ""}
                />
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
