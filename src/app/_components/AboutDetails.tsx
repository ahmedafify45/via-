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
      <div className="flex items-center justify-between px-[89px] py-[45px]">
        {details.map((item, index) => (
          <div key={index}>
            <p className="text-[82px] font-bold">
              {item.number} <span className="text-primary">{item.plus}</span>
            </p>
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AboutDetails;
