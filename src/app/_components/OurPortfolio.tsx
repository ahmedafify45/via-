import Portfolio from "@/components/profile";
import { Button } from "@/components/ui/button";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PortfolioAds from "./PortfolioAds";
export const portfolio = [
  { title: "All", slug: "all" },
  { title: "Social Designs", slug: "social-designs" },
  { title: "Photo shoot", slug: "photo-shoot" },
  { title: "Branding", slug: "branding" },
];
function OurPortfolio() {
  return (
    <section className="px-4 md:px-6 lg:px-8">
      <div>
        <div className="flex flex-col items-center justify-center pt-[40px] md:pt-[60px] lg:pt-[80px]">
          <h2 className="text-primary text-[32px] md:text-[40px] lg:text-[48px] font-bold text-center">
            Our Portfolio
          </h2>
          <p className="text-white text-center max-w-[600px] mt-2 md:mt-4 text-sm md:text-base">
            Comprehensive marketing solutions tailored to your unique business
            needs and goals.
          </p>
        </div>
        <Portfolio portfolio={portfolio} />
        <div className="flex justify-center mb-[40px] md:mb-[60px] lg:mb-[80px]">
          <Button className="w-[140px] md:w-[160px] h-[48px] md:h-[56px] flex items-center justify-center gap-2 text-sm md:text-base">
            See More
            <span className="bg-white text-black w-[40px] md:w-[48px] h-[40px] md:h-[48px] flex items-center justify-center rounded-tl-[12px] md:rounded-tl-[16px] rounded-br-[12px] md:rounded-br-[16px]">
              <FontAwesomeIcon
                icon={faArrowRight}
                className="text-sm md:text-base"
              />
            </span>
          </Button>
        </div>
      </div>
      <PortfolioAds />
    </section>
  );
}

export default OurPortfolio;
