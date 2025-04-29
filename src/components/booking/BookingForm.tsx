import BookingButton from "./BookingButton";
import BookingInput from "./BookingInput";

function BookingForm() {
  return (
    <form className="mt-[30px] bg-[#17181C] py-[20px] md:py-[30px] px-[16px] md:px-[24px] rounded-[4px] max-w-[839px] mx-auto w-full">
      <h2 className="text-white text-[20px] md:text-[24px] font-bold ">
        Your Information
      </h2>
      <div className="w-full">
        <BookingInput />
      </div>
      <div className="flex justify-center mt-[24px]">
        <BookingButton />
      </div>
    </form>
  );
}

export default BookingForm;
