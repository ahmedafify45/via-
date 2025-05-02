import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getCurrentLocale } from "@/lib/getCurrentLocale";

export default async function NotFound() {
  const locale = await getCurrentLocale();
  return (
    <html>
      <body className="my-[210px]">
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
              We Can&apos;t Seem To Find The Page You&apos;re Looking For.
            </p>
            <Link href={`/${locale}`}>
              <Button className="text-black h-[50px] w-[174px]">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
        <div></div>
      </body>
    </html>
  );
}
