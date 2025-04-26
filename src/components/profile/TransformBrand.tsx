import { Button } from "../ui/button";

function TransformBrand() {
  return (
    <div className="flex flex-col items-center justify-center gap-[16px]">
      <h4 className="text-primary text-[48px] font-bold">
        Ready to Transform Your Brand?
      </h4>
      <p className="text-white text-[24px] font-medium max-w-[867px]">
        Ready to Transform Your Brand? Let's create a compelling brand identity
        that resonates with your audience and drives business growth.
      </p>
      <div className="flex gap-4">
        <Button className="bg-primary text-blackw-[192px] h-[50px]">
          Start Your Project
        </Button>
        <Button className="bg-transparent text-primary border border-primary w-[192px] h-[50px]">
          View More Work
        </Button>
      </div>
    </div>
  );
}

export default TransformBrand;
