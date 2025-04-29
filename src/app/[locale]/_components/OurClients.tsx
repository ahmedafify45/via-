import Clients from "@/components/clients/client";

function OurClients() {
  return (
    <section className="mt-[80px]">
      <div>
        <p className="text-primary lg:text-[48px] text-[20px] font-medium text-center">
          What Our Clients Say
        </p>
        <Clients />
      </div>
    </section>
  );
}

export default OurClients;
