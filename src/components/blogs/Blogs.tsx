import React from "react";
import Banner from "../custom/banner";
import BlogCard from "./BlogCard";
import BlogItem from "./BlogItem";

function Blogs() {
  const blogs = [
    {
      id: 1,
      image: "/images/blog.png",
      title: "Top 5 Marketing AutomationStrategies to Boost.",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      imageDescription: "/images/blogDetails.png",
      date: "Feb 20, 2025",
      author: "John Doe",
      category: "Web Design",

      slug: "blog-1",
    },
    {
      id: 2,
      image: "/images/blog.png",
      title: "Top 5 Marketing AutomationStrategies to Boost.",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      imageDescription: "/images/blogDetails.png",
      date: "Feb 20, 2025",
      slug: "blog-2",
    },
    {
      id: 3,
      image: "/images/blog.png",
      title: "Top 5 Marketing AutomationStrategies to Boost.",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      imageDescription: "/images/blogDetails.png",
      date: "Feb 20, 2025",
      slug: "blog-3",
    },
    {
      id: 4,
      image: "/images/blog.png",
      title: "Top 5 Marketing AutomationStrategies to Boost.",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      imageDescription: "/images/blogDetails.png",
      date: "Feb 20, 2025",
      slug: "blog-4",
    },
    {
      id: 5,
      image: "/images/blog.png",
      title: "Top 5 Marketing AutomationStrategies to Boost.",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      imageDescription: "/images/blogDetails.png",
      date: "Feb 20, 2025",
      slug: "blog-5",
    },
    {
      id: 6,
      image: "/images/blog.png",
      title: "Top 5 Marketing AutomationStrategies to Boost.",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      imageDescription: "/images/blogDetails.png",
      date: "Feb 20, 2025",
      slug: "blog-6",
    },
    {
      id: 7,
      image: "/images/blog.png",
      title: "How to make a website",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      imageDescription: "/images/blogDetails.png",
      date: "Feb 20, 2025",
      slug: "blog-7",
    },
    {
      id: 8,
      image: "/images/blog.png",
      title: "How to make a website",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      imageDescription: "/images/blogDetails.png",
      date: "Feb 20, 2025",
      slug: "blog-8",
    },
  ];
  return (
    <section className="my-[220px] mx-[10px] md:mx-[40px] sm:mx-[20px] lg:mx-[80px]">
      <Banner title="Blogs" subtitle="Home / Blogs" />
      <div className="flex justify-between gap-[20px] lg:flex-row flex-col">
        <BlogCard blogs={blogs} />
        <BlogItem />
      </div>
    </section>
  );
}

export default Blogs;
