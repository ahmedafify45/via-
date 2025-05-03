"use client";
import Image from "next/image";
const Loading = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black backdrop-blur-sm z-50">
      <Image
        className="mt-4 text-2xl font-bold text-primary text-center"
        src="/images/logo.png"
        alt="logo"
        width={100}
        height={100}
      />
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
    </div>
  );
};

export default Loading;
