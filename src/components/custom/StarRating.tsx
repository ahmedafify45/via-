import { Star } from "lucide-react";

function StarRating({ rating }: any) {
  const maxStars = 5; // عدد النجوم الثابتة

  return (
    <div className="flex">
      {[...Array(maxStars)].map((_, index) => (
        <Star
          key={index}
          size={18}
          className={`mr-1 ${
            index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

export default StarRating;
