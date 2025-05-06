import React from "react";
import { Button } from "../ui/button";

function BookingButton() {
  return (
    <div>
      <Button
        type="submit"
        className="w-[326px] h-[56px] p-[16px] text-[#0C0D0F]"
      >
        Book Consultation
      </Button>
    </div>
  );
}

export default BookingButton;
