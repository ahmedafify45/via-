"use client";

import { Blog } from "@/types/Blogs";
import Image from "next/image";

interface OurBlogProps {
  blogPosts: Blog[];
}

export default function OurBlog({ blogPosts }: OurBlogProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Latest Blog Posts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <Image
                src={post.thumbnail.data.full_url}
                alt={post.title}
                className="w-full h-48 object-cover"
                fill
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.description}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <span>{post.category.title}</span>
                  <span className="mx-2">•</span>
                  <span>{new Date(post.created_on).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
