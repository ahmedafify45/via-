import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="my-[210px]">
      <div className="flex items-center justify-between ">
        <div>
          <Image src="/images/404.png" alt="404" width={400} height={400} />
        </div>
        <div className="flex flex-col gap-[24px] items-center justify-center mr-[182px]">
          <h1 className="text-white text-[113.78px] font-bold">404</h1>
          <h2 className="text-primary text-[48px] font-medium">
            Page Not Found
          </h2>
          <p className="text-white text-[24px] font-normal">
            We Can't Seem To Find The Page You're Looking For.
          </p>
          <Button className="text-black h-[50px] w-[174px]">
            <Link href="/" className="">
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
      <div></div>
    </main>
  );
}
