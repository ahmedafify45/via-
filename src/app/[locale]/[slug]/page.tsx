import { team } from "@/app/[locale]/_components/about/Force";
import Banner from "@/components/custom/banner";
import {
  faYoutube,
  faInstagram,
  faTwitter,
  faFacebookF,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return team.map((member) => ({
    slug: member.slug,
  }));
}

export default function TeamMemberPage({ params }: PageProps) {
  const member = team.find((m) => m.slug === params.slug);

  if (!member) {
    notFound();
  }

  return (
    <main className="mx-4 md:mx-[80px] my-[80px] md:my-[150px]">
      <div>
        <Banner title="Our Teams" subtitle="Home / Our Teams /Team Details" />
        <div className="flex flex-col md:flex-row gap-[24px] md:gap-[48px] bg-[#17181C] py-[16px] px-4 md:px-0">
          <div className="w-full md:w-auto">
            <Image
              src={member.image}
              alt={member.name}
              width={450}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="text-white flex flex-col gap-[12px] md:gap-[16px]">
            <h1 className="text-[28px] md:text-[38px] font-bold">
              {member.name}
            </h1>
            <p className="text-primary text-[16px] md:text-[20px] font-bold">
              {member.job}
            </p>
            <p className="text-[16px] md:text-[20px] font-medium">
              {member.mission}
            </p>
            <p className="text-[16px] md:text-[20px] font-medium">
              Responsibility: {member.responsibility}
            </p>
            <p className="text-[16px] md:text-[20px] font-medium">
              Experience: {member.experience}
            </p>
            <p className="text-[16px] md:text-[20px] font-medium">
              Email: {member.email}
            </p>
            <p className="text-[16px] md:text-[20px] font-medium">
              Phone: {member.phone}
            </p>
            <div className="flex items-center gap-[12px] md:gap-[16px]">
              <Link
                target="_blank"
                href={member.facebook}
                className="bg-[#787878] text-white py-[4px] px-[2px] w-[28px] h-[28px] md:w-[32px] md:h-[32px] rounded-full flex items-center justify-center"
              >
                <FontAwesomeIcon
                  icon={faFacebookF}
                  className="w-[12px] h-[10px] md:w-[14px] md:h-[12px]"
                />
              </Link>
              <Link
                target="_blank"
                href={member.instagram}
                className="bg-[#787878] text-white py-[4px] px-[2px] w-[28px] h-[28px] md:w-[32px] md:h-[32px] rounded-full flex items-center justify-center"
              >
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="w-[12px] h-[10px] md:w-[14px] md:h-[12px]"
                />
              </Link>
              <Link
                target="_blank"
                href={member.twitter}
                className="bg-[#787878] text-white py-[4px] px-[2px] w-[28px] h-[28px] md:w-[32px] md:h-[32px] rounded-full flex items-center justify-center"
              >
                <FontAwesomeIcon
                  icon={faTwitter}
                  className="w-[12px] h-[10px] md:w-[14px] md:h-[12px]"
                />
              </Link>
              <Link
                target="_blank"
                href={member.youtube}
                className="bg-[#787878] text-white py-[4px] px-[2px] w-[28px] h-[28px] md:w-[32px] md:h-[32px] rounded-full flex items-center justify-center"
              >
                <FontAwesomeIcon
                  icon={faYoutube}
                  className="w-[12px] h-[10px] md:w-[14px] md:h-[12px]"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[60px] md:mt-[140px] px-4 md:px-0">
        <h2 className="text-[32px] md:text-[48px] font-bold text-primary">
          Personal Experience
        </h2>
        <p className="text-[16px] md:text-[20px] font-medium text-[#FFFFFF] mt-4">
          Lorem ipsum dolor sit amet consectetur. Dictum fermentum tempor turpis
          quis justo arcu et volutpat. Auctor laoreet velit ridiculus tristique.
        </p>
      </div>
    </main>
  );
}
{
  /* <div className="container mx-auto px-4 py-12">
<div className="max-w-4xl mx-auto">
  <div className="flex flex-col md:flex-row gap-8 items-start">
    <div className="w-full md:w-1/3">
      <Image
        src={member.image}
        alt={member.name}
        width={400}
        height={400}
        className="rounded-lg w-full"
      />
    </div>
    <div className="w-full md:w-2/3">
      <h1 className="text-4xl font-bold text-primary mb-4">
        {member.name}
      </h1>
      <h2 className="text-2xl text-[#D6D6D6] mb-6">{member.job}</h2>
      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-[#D6D6D6]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
          enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat.
        </p>
        <p className="text-lg text-[#D6D6D6] mt-4">
          Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
          cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.
        </p>
      </div>
    </div>
  </div>
</div>
</div> */
}
