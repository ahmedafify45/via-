import Clients from "@/components/clients/client";

function OurClients() {
  return (
    <section className="mt-[80px]">
      <div className="lg:flex flex-col items-center">
        <p className="text-primary lg:text-[48px] text-[20px] font-medium text-center">
          What Our Clients Say
        </p>
        <Clients />
      </div>
    </section>
  );
}

export default OurClients;
