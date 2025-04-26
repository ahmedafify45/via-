import TeamCard from "@/components/team/TeamCard";

export const team = [
  {
    id: 1,
    slug: "jane-cooper-1",
    image: "/images/about/team1.png",
    name: "Jane Cooper",
    job: "Medical Assistant",
    responsibility: " Land Transport",
    phone: "+123 456 7890",
    experience: "9 Years",
    email: "jane.cooper@example.com",
    mission: "I help my clients stand out and they help me grow.",
    facebook: "https://www.facebook.com/jane.cooper",
    instagram: "https://www.instagram.com/jane.cooper",
    twitter: "https://www.twitter.com/jane.cooper",
    youtube: "https://www.linkedin.com/jane.cooper",
  },
  {
    id: 2,
    slug: "jane-cooper-2",
    image: "/images/about/team2.png",
    name: "Jane Cooper",
    job: "Medical Assistant",
    phone: "+123 456 7890",
    responsibility: " Land Transport",
    experience: "10 Years",
    email: "jane.cooper@example.com",
    mission: "I help my clients stand out and they help me grow.",
    facebook: "https://www.facebook.com/jane.cooper",
    instagram: "https://www.instagram.com/jane.cooper",
    twitter: "https://www.twitter.com/jane.cooper",
    youtube: "https://www.linkedin.com/jane.cooper",
  },
  {
    id: 3,
    slug: "jane-cooper-3",
    image: "/images/about/team3.png",
    name: "Jane Cooper",
    job: "Medical Assistant",
    phone: "+123 456 7890",
    responsibility: " Land Transport",
    experience: "11 Years",
    email: "jane.cooper@example.com",
    mission: "I help my clients stand out and they help me grow.",
    facebook: "https://www.facebook.com/jane.cooper",
    instagram: "https://www.instagram.com/jane.cooper",
    twitter: "https://www.twitter.com/jane.cooper",
    youtube: "https://www.linkedin.com/jane.cooper",
  },
  {
    id: 4,
    slug: "jane-cooper-4",
    image: "/images/about/team1.png",
    name: "Jane Cooper",
    job: "Medical Assistant",
    phone: "+123 456 7890",
    esponsibility: " Land Transport",
    xperience: "12 Years",
    email: "jane.cooper@example.com",
    mission: "I help my clients stand out and they help me grow.",
    facebook: "https://www.facebook.com/jane.cooper",
    instagram: "https://www.instagram.com/jane.cooper",
    twitter: "https://www.twitter.com/jane.cooper",
    youtube: "https://www.linkedin.com/jane.cooper",
  },
  {
    id: 5,
    slug: "jane-cooper-5",
    image: "/images/about/team1.png",
    name: "Jane Cooper",
    job: "Medical Assistant",
    responsibility: " Land Transport",
    experience: "13 Years",
    email: "jane.cooper@example.com",
    mission: "I help my clients stand out and they help me grow.",
    facebook: "https://www.facebook.com/jane.cooper",
    instagram: "https://www.instagram.com/jane.cooper",
    twitter: "https://www.twitter.com/jane.cooper",
    youtube: "https://www.linkedin.com/jane.cooper",
  },
];

function Force() {
  return (
    <div className="mx-[80px] mb-[80px]">
      <div className="flex flex-col items-center justify-center text-center">
        <h4 className="text-[24px] md:text-[32px] lg:text-[48px] font-bold text-primary max-w-[1006px]">
          The Force Behind
          <br />
          Marketing Success
        </h4>
        <p className="text-[#FFFFFF] max-w-[1006px] text-[14px] md:text-[18px] lg:text-[24px] font-medium px-2 md:px-4 lg:px-0 mt-2 mb-[16px]">
          Transform the way you work effortlessly track and complete tasks.
          Simplify your workflow, boost your productivity, and achieve more.
        </p>
      </div>
      <TeamCard team={team} />
    </div>
  );
}

export default Force;
