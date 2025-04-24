import Image from "next/image";

function AboutDetails() {
  const details = [
    {
      number: "10",
      title: "Years of Experience",
      plus: "+",
    },
    {
      number: "250",
      title: "Projects Completed",
      plus: "+",
    },
    {
      number: "250",
      title: "Projects Completed",
      plus: "+",
    },
    {
      number: "95",
      title: "Client Satisfaction",
      plus: "+",
    },
    {
      number: "15",
      title: "Industry Awards",
    },
  ];
  return (
    <div className="bg-white">
      <div className="w-full">
        <Image
          src="/images/aboutdetails.png"
          alt="details.png"
          width={1920}
          height={1080}
          className="w-full h-auto"
          priority
        />
      </div>
      <div className="flex flex-col xl:flex-row items-center justify-between px-4 md:px-8 lg:px-[89px] py-8 md:py-12 lg:py-[45px] gap-8 md:gap-4 lg:gap-0">
        {details.map((item, index) => (
          <div key={index} className="text-center">
            <p className="text-4xl lg:text-6xl lg:text-[82px] font-bold">
              {item.number} <span className="text-primary">{item.plus}</span>
            </p>
            <p className="text-sm md:text-base lg:text-lg">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AboutDetails;
