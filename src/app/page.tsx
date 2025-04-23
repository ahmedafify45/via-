import AboutUs from "./_components/AboutUs";
import Hero from "./_components/Hero";
import OurClients from "./_components/OurClients";
import OurPortfolio from "./_components/OurPortfolio";
import OurService from "./_components/OurService";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutUs />
      <OurPortfolio />
      <OurService />
      <OurClients />
    </main>
  );
}
