import Image from "next/image";

function Force() {
  const team = [
    {
      id: 1,
      image: "/images/about/team1.png",
      name: "Jane Cooper",
      job: "Medical Assistant",
    },
    {
      id: 2,
      image: "/images/about/team2.png",
      name: "Jane Cooper",
      job: "Medical Assistant",
    },
    {
      id: 3,
      image: "/images/about/team3.png",
      name: "Jane Cooper",
      job: "Medical Assistant",
    },
    {
      id: 4,
      image: "/images/about/team1.png",
      name: "Jane Cooper",
      job: "Medical Assistant",
    },
    {
      id: 4,
      image: "/images/about/team1.png",
      name: "Jane Cooper",
      job: "Medical Assistant",
    },
  ];
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {team.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center justify-center gap-1 mt-3"
          >
            <div>
              <Image
                src={item.image}
                alt={item.name}
                width={360}
                height={360}
                className="rounded-[8px]"
              />
            </div>
            <h5 className="text-[#D6D6D6] text-[24px] font-bold">
              {item.name}
            </h5>
            <p className="text-[#D6D6D6] text-[20px] font-medium">{item.job}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Force;
