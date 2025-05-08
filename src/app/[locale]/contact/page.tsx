import Contact from "@/components/contact/Contact";
import { generateStaticParams } from "@/lib/generateStaticParams";

export { generateStaticParams };

function Contactpage() {
  return (
    <main>
      <Contact />
    </main>
  );
}

export default Contactpage;
