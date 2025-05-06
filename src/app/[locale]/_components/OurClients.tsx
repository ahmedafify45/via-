import Clients from "@/components/clients/client";

function OurClients() {
  return (
    <section className="mt-[80px]">
      <div className="xl:flex flex-col items-center">
        <p className="text-primary xl:text-[48px] text-[24px] font-medium text-center">
          What Our Clients Say
        </p>
        <Clients />
      </div>
    </section>
  );
}

export default OurClients;
