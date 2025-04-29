import BookingTitle from "./BookingTitle";
import BookingForm from "./BookingForm";
function Booking() {
  return (
    <section className="flex flex-col gap-[20px]">
      <BookingTitle />
      <BookingForm />
    </section>
  );
}

export default Booking;
