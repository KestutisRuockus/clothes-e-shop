import BrandAdvertisement from "../components/BrandAdvertisement/BrandAdvertisement";
import "../assets/styles/style.css";
import Feedback from "../components/Feedback/Feedback";
import "../assets/styles/style.css";
import LatestNews from "../components/LatestNews/LatestNews";
import BrandLogosSlider from "../components/BrandLogosSlider/BrandLogosSlider";
import Collections from "../components/Collections/Collections";
import { useEffect } from "react";
import BestSeller from "../components/BestSeller/BestSeller";

export default function MainLayout() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  return (
    <div className="w-full bg-white min-h-screen">
      <BrandAdvertisement />
      <BestSeller />
      <Collections />
      <BrandLogosSlider />
      <LatestNews />
      <Feedback />
    </div>
  );
}
