import Loading from "../Loading";
import { Button } from "../ui/button";
import { useFetch } from "@/hooks/useFetch";

interface VideoSection {
  id: number;
  title: string;
  title_en: string;
  sub_title: string;
  sub_title_en: string;
  video_url: string;
  video_url_en: string;
  banner: number;
}

function TransformBrand() {
  const { data, loading, error } = useFetch<{ data: VideoSection[] }>(
    "/items/video_section"
  );

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  if (error) return <div>Error loading data</div>;
  if (!data?.data?.[0]) return null;

  const videoData = data.data[0];

  return (
    <div className="flex flex-col items-center justify-center gap-[16px] px-4 md:px-6 lg:px-0">
      <h4 className="text-primary text-[32px] md:text-[40px] lg:text-[48px] font-bold text-center">
        {videoData.title_en}
      </h4>
      <p className="text-white text-[18px] md:text-[20px] lg:text-[24px] font-medium max-w-[867px] text-center">
        {videoData.sub_title_en}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <Button className="bg-primary text-black w-full sm:w-[192px] h-[50px]">
          Start Your Project
        </Button>
        <Button className="bg-transparent text-primary border border-primary w-full sm:w-[192px] h-[50px]">
          View More Work
        </Button>
      </div>
    </div>
  );
}

export default TransformBrand;
