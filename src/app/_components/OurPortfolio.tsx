import Portfolio from "@/components/profile";
import { Button } from "@/components/ui/button";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PortfolioAds from "./PortfolioAds";

function OurPortfolio() {
  const portfolio = [
    { title: "All" },
    { title: "Social Designs" },
    { title: "Photo shoot" },
    { title: "Branding" },
  ];
  return (
    <section>
      <div>
        <div className="flex flex-col items-center justify-center pt-[80px]">
          <h2 className="text-primary text-[48px] font-bold">Our Portfolio</h2>
          <p className="text-white">
            Comprehensive marketing solutions tailored to your unique business
            needs and goals.
          </p>
        </div>
        <Portfolio portfolio={portfolio} />
        <div className="flex justify-center mb-[80px]">
          <Button className="w-[160px] h-[56px] flex items-center justify-center gap-2">
            See More
            <span className="bg-white text-black w-[48px] h-[48px] flex items-center justify-center rounded-tl-[16px] rounded-br-[16px]">
              <FontAwesomeIcon icon={faArrowRight} />
            </span>
          </Button>
        </div>
      </div>
      <PortfolioAds />
    </section>
  );
}

export default OurPortfolio;
