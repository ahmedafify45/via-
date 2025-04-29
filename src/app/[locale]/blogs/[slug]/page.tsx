import BlogDetails from "@/components/blogs/BlogDetails";

// Mock blog data (replace with API or database call)
const blogData = {
  "blog-1": {
    title: "Top 5 Marketing Automation Strategies to Boost",
    image: "/images/blog.png",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    date: "Feb 20, 2025",
    author: "John Doe",
    category: "Web Design",
    tags: ["Social Designs", "Photo shoot", "Branding"],
    imageDescription: "/images/blogDetails.png",
  },
  "blog-2": {
    title: "How to Make a Website",
    image: "/images/blog.png",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    date: "Feb 21, 2025",
    author: "Jane Smith",
    category: "Development",
    tags: ["Coding", "Web Development", "Tutorial"],
    imageDescription: "/images/blogDetails.png",
  },
  "blog-3": {
    title: "How to Make a Website",
    image: "/images/blog.png",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    date: "Feb 21, 2025",
    author: "Jane Smith",
    category: "Development",
    tags: ["Coding", "Web Development", "Tutorial"],
    imageDescription: "/images/blogDetails.png",
  },
  "blog-4": {
    title: "How to Make a Website",
    image: "/images/blog.png",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    date: "Feb 21, 2025",
    author: "Jane Smith",
    category: "Development",
    tags: ["Coding", "Web Development", "Tutorial"],
    imageDescription: "/images/blogDetails.png",
  },
  "blog-5": {
    title: "How to Make a Website",
    image: "/images/blog.png",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    date: "Feb 21, 2025",
    author: "Jane Smith",
    category: "Development",
    tags: ["Coding", "Web Development", "Tutorial"],
    imageDescription: "/images/blogDetails.png",
  },
  "blog-6": {
    title: "How to Make a Website",
    image: "/images/blog.png",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    date: "Feb 21, 2025",
    author: "Jane Smith",
    category: "Development",
    tags: ["Coding", "Web Development", "Tutorial"],
    imageDescription: "/images/blogDetails.png",
  },
  "blog-7": {
    title: "How to Make a Website",
    image: "/images/blog.png",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    date: "Feb 21, 2025",
    author: "Jane Smith",
    category: "Development",
    tags: ["Coding", "Web Development", "Tutorial"],
    imageDescription: "/images/blogDetails.png",
  },
  "blog-8": {
    title: "How to Make a Website",
    image: "/images/blog.png",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    date: "Feb 21, 2025",
    author: "Jane Smith",
    category: "Development",
    tags: ["Coding", "Web Development", "Tutorial"],
    imageDescription: "/images/blogDetails.png",
  },
};
export default function Bolgs({ params }: { params: { slug: string } }) {
  const blogs = blogData[params.slug as keyof typeof blogData];

  if (!blogs) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">Portfolio not found</h1>
      </div>
    );
  }

  return <BlogDetails blog={blogs} />;
}
