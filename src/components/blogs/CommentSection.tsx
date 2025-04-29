"use client"
import { useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import Image from "next/image";
import { Button } from "../ui/button";

interface Comment {
  name: string;
  email: string;
  comment: string;
  replies?: Comment[];
}

function CommentSection() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [formData, setFormData] = useState<Comment>({
    name: "",
    email: "",
    comment: "",
  });
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [showComments, setShowComments] = useState(true);

  const countTotalComments = (comments: Comment[]): number => {
    return comments.reduce((total, comment) => {
      return total + 1 + (comment.replies ? countTotalComments(comment.replies) : 0);
    }, 0);
  };

  const totalComments = countTotalComments(comments);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.comment) {
      if (replyingTo !== null) {
        // Add reply to the specific comment
        const updatedComments = [...comments];
        const parentComment = updatedComments[replyingTo];
        if (!parentComment.replies) {
          parentComment.replies = [];
        }
        parentComment.replies.push(formData);
        setComments(updatedComments);
      } else {
        // Add new comment
        setComments([...comments, formData]);
      }
      setFormData({ name: "", email: "", comment: "" });
      setReplyingTo(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReply = (index: number) => {
    setReplyingTo(index);
  };

  const handleDeleteReply = (commentIndex: number, replyIndex: number) => {
    const updatedComments = [...comments];
    updatedComments[commentIndex].replies?.splice(replyIndex, 1);
    setComments(updatedComments);
  };

  const renderComment = (comment: Comment, index: number, isReply = false, parentIndex?: number) => (
    <div key={index} className={`p-4 border-b-1 bordr-[#EBEBEB80] ${!isReply ? 'border-b border-gray-200' : ''}`}>
      <div className="flex items-center gap-4">
        {!isReply && <Image src="/images/commintImage.png" alt="commentImage" width={80} height={80} className="rounded-full"/>}
        <div className="flex-1">
          <h3 className={`font-medium ${isReply ? 'text-[20px]' : 'text-[24px]'} text-white`}>{comment.name}</h3>
          <p className="mt-2 text-white text-[14px] font-medium">{comment.comment}</p>
        </div>
        <div className="flex items-center gap-2">
          {!isReply && (
            <button
              onClick={() => handleReply(index)}
              className="mt-2 text-sm text-primary hover:text-primary/80"
            >
              Reply
            </button>
          )}
          {isReply && parentIndex !== undefined && (
            <button
              onClick={() => handleDeleteReply(parentIndex, index)}
              className="mt-2 text-sm text-primary hover:text-red-700"
            >
              Delete
            </button>
          )}
        </div>
      </div>
      {comment.replies && (
        <div className="mt-4 space-y-2">
          {comment.replies.map((reply, replyIndex) => renderComment(reply, replyIndex, true, index))}
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded hover:bg-primary/20"
        >
          <span>Comments ({totalComments})</span>
          <svg
            className={`w-4 h-4 transition-transform ${showComments ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      
      {showComments && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mt-8 space-y-4">
            {comments.map((comment, index) => renderComment(comment, index))}
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="name" className="text-white text-[20px] font-medium">Full Name</label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
                className="w-[1280px] h-[56px] border border-accent"
              required
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="email" className="text-white text-[20px] font-medium">Email Address</label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-[1280px] h-[56px] border border-accent"
              required
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="comment" className="text-white text-[20px] font-medium">Comment</label>
            <Textarea
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              placeholder={replyingTo !== null ? "Your Reply" : "Your Comment"}
              className="text-white w-[1280px] h-[56px] border border-accent"
              rows={4}
              required
              
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="submit"
            className="bg-transparent text-primary border border-primary w-[129px] h-[50px] hover:text-black"
            >
              {replyingTo !== null ? "Send Reply" : "Send Comment"}
            </Button>
            {replyingTo !== null && (
              <Button
                type="button"
                onClick={() => setReplyingTo(null)}
                className="px-4 py-2 text-gray-500 hover:text-gray-700"
              >
                Cancel Reply
              </Button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}

export default CommentSection;
